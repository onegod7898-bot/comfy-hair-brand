import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

const productA = { id: 'a', name: 'Wig A', price: 40000 }
const productB = { id: 'b', name: 'Wig B', price: 5000 }

describe('useCart', () => {
  it('throws when used outside a CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within CartProvider'
    )
  })

  it('starts empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.count).toBe(0)
    expect(result.current.total).toBe(0)
  })

  it('adds an item with a default qty of 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(productA))
    expect(result.current.items).toEqual([{ ...productA, qty: 1 }])
    expect(result.current.count).toBe(1)
    expect(result.current.total).toBe(40000)
  })

  it('increments qty when adding an existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(productA))
    act(() => result.current.addItem({ ...productA, qty: 2 }))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].qty).toBe(3)
    expect(result.current.count).toBe(3)
  })

  it('computes count and total across multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(productA))
    act(() => result.current.addItem(productB))
    expect(result.current.count).toBe(2)
    expect(result.current.total).toBe(45000)
  })

  it('updates qty by a delta', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(productA))
    act(() => result.current.updateQty('a', 2))
    expect(result.current.items[0].qty).toBe(3)
  })

  it('removes an item when qty drops to zero or below', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(productA))
    act(() => result.current.updateQty('a', -5))
    expect(result.current.items).toEqual([])
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(productA))
    act(() => result.current.addItem(productB))
    act(() => result.current.clearCart())
    expect(result.current.items).toEqual([])
    expect(result.current.count).toBe(0)
  })
})
