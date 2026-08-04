import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const items = [
  { name: 'Wig A', price: 40000, qty: 2 },
  { name: 'Wig B', price: 5000 },
]

async function loadNotify(formId) {
  vi.resetModules()
  if (formId === undefined) vi.stubEnv('VITE_FORMSPREE_FORM_ID', '')
  else vi.stubEnv('VITE_FORMSPREE_FORM_ID', formId)
  return import('./notify')
}

describe('notify', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  describe('when no form id is configured', () => {
    it('does not call fetch for cart notifications', async () => {
      const { notifyCart } = await loadNotify(undefined)
      notifyCart(items)
      expect(fetch).not.toHaveBeenCalled()
    })

    it('returns { ok: false } for newsletter signup', async () => {
      const { notifyNewsletterSignup } = await loadNotify(undefined)
      await expect(notifyNewsletterSignup('Ada', 'ada@example.com')).resolves.toEqual({
        ok: false,
      })
      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('notifyCart', () => {
    it('posts a formatted cart message with totals', async () => {
      const { notifyCart } = await loadNotify('form123')
      notifyCart(items)

      expect(fetch).toHaveBeenCalledTimes(1)
      const [url, opts] = fetch.mock.calls[0]
      expect(url).toBe('https://formspree.io/f/form123')
      const body = JSON.parse(opts.body)
      expect(body._subject).toContain('added to cart')
      // 40000*2 + 5000*1 = 85,000
      expect(body.message).toContain('Total: ₦85,000')
      expect(body.message).toContain('Wig A')
    })

    it('does nothing for an empty cart', async () => {
      const { notifyCart } = await loadNotify('form123')
      notifyCart([])
      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('notifyOrder', () => {
    it('includes the total and Nigeria payment accounts', async () => {
      const { notifyOrder } = await loadNotify('form123')
      notifyOrder(items, 85000)

      const body = JSON.parse(fetch.mock.calls[0][1].body)
      expect(body._subject).toContain('New order placed')
      expect(body.message).toContain('Total: ₦85,000')
      expect(body.message).toContain('8116500217')
      expect(body.message).toContain('0728405092')
    })
  })

  describe('notifyOrderCancelled', () => {
    it('posts an order-cancelled message with details', async () => {
      const { notifyOrderCancelled } = await loadNotify('form123')
      notifyOrderCancelled(items, 85000)

      const body = JSON.parse(fetch.mock.calls[0][1].body)
      expect(body._subject).toContain('Order cancelled')
      expect(body.message).toContain('cancelled their order')
      expect(body.message).toContain('Total was: ₦85,000')
    })

    it('still posts when no items are provided', async () => {
      const { notifyOrderCancelled } = await loadNotify('form123')
      notifyOrderCancelled(null, null)

      expect(fetch).toHaveBeenCalledTimes(1)
      const body = JSON.parse(fetch.mock.calls[0][1].body)
      expect(body.message).toContain('cancelled their order')
    })
  })

  describe('notifyNewsletterSignup', () => {
    it('posts the signup and returns ok on success', async () => {
      const { notifyNewsletterSignup } = await loadNotify('form123')
      const result = await notifyNewsletterSignup('  Ada  ', '  ada@example.com  ')

      expect(result).toEqual({ ok: true })
      const body = JSON.parse(fetch.mock.calls[0][1].body)
      expect(body.name).toBe('Ada')
      expect(body.email).toBe('ada@example.com')
    })

    it('returns { ok: false } when email is blank', async () => {
      const { notifyNewsletterSignup } = await loadNotify('form123')
      const result = await notifyNewsletterSignup('Ada', '   ')
      expect(result).toEqual({ ok: false })
      expect(fetch).not.toHaveBeenCalled()
    })

    it('returns { ok: false } when fetch rejects', async () => {
      fetch.mockRejectedValueOnce(new Error('network'))
      const { notifyNewsletterSignup } = await loadNotify('form123')
      const result = await notifyNewsletterSignup('Ada', 'ada@example.com')
      expect(result).toEqual({ ok: false })
    })
  })
})
