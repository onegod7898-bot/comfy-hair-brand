import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createOrder, updateOrderStatus, listOrders } from './ordersApi'

describe('ordersApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function mockResponse({ ok = true, status = 200, json = {} } = {}) {
    fetch.mockResolvedValue({ ok, status, json: () => Promise.resolve(json) })
  }

  describe('createOrder', () => {
    it('POSTs normalized items and returns json', async () => {
      mockResponse({ json: { id: 'abc', status: 'pending' } })
      const items = [{ name: 'Wig', price: 40000, qty: 2, extra: 'ignored' }]

      const result = await createOrder(items, 80000)

      expect(result).toEqual({ id: 'abc', status: 'pending' })
      const [url, opts] = fetch.mock.calls[0]
      expect(url).toBe('/api/orders')
      expect(opts.method).toBe('POST')
      const body = JSON.parse(opts.body)
      expect(body).toEqual({
        items: [{ name: 'Wig', price: 40000, qty: 2 }],
        total: 80000,
      })
    })

    it('defaults qty to 1 when missing', async () => {
      mockResponse({ json: { id: 'x' } })
      await createOrder([{ name: 'Wig', price: 100 }], 100)
      const body = JSON.parse(fetch.mock.calls[0][1].body)
      expect(body.items[0].qty).toBe(1)
    })

    it('throws when the response is not ok', async () => {
      mockResponse({ ok: false, status: 500 })
      await expect(createOrder([{ name: 'a', price: 1 }], 1)).rejects.toThrow(
        'Failed to create order'
      )
    })
  })

  describe('updateOrderStatus', () => {
    it('PATCHes the order status without auth by default', async () => {
      mockResponse({ json: { id: '1', status: 'cancelled' } })
      const result = await updateOrderStatus('1', 'cancelled')

      expect(result).toEqual({ id: '1', status: 'cancelled' })
      const [url, opts] = fetch.mock.calls[0]
      expect(url).toBe('/api/orders/1')
      expect(opts.method).toBe('PATCH')
      expect(opts.headers.Authorization).toBeUndefined()
      expect(JSON.parse(opts.body)).toEqual({ status: 'cancelled' })
    })

    it('adds a bearer token when an admin secret is provided', async () => {
      mockResponse({ json: {} })
      await updateOrderStatus('1', 'shipped', 'secret')
      expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer secret')
    })

    it('throws when the response is not ok', async () => {
      mockResponse({ ok: false, status: 400 })
      await expect(updateOrderStatus('1', 'shipped')).rejects.toThrow(
        'Failed to update order'
      )
    })
  })

  describe('listOrders', () => {
    it('sends the admin secret as query param and bearer header', async () => {
      mockResponse({ json: [{ id: '1' }] })
      const result = await listOrders('sec ret')

      expect(result).toEqual([{ id: '1' }])
      const [url, opts] = fetch.mock.calls[0]
      expect(url).toBe('/api/orders?admin=sec%20ret')
      expect(opts.method).toBe('GET')
      expect(opts.headers.Authorization).toBe('Bearer sec ret')
    })

    it('omits the query param when no secret is provided', async () => {
      mockResponse({ json: [] })
      await listOrders()
      expect(fetch.mock.calls[0][0]).toBe('/api/orders')
    })

    it('throws a specific message on 401', async () => {
      mockResponse({ ok: false, status: 401 })
      await expect(listOrders('bad')).rejects.toThrow(/Invalid password/)
    })

    it('throws a generic message on other errors', async () => {
      mockResponse({ ok: false, status: 500 })
      await expect(listOrders('x')).rejects.toThrow('Failed to load orders.')
    })
  })
})
