import { useState, useCallback } from 'react'
import { createStoreContext } from '../utils/createStoreContext'
import { cartSubtotal } from '../utils/format'

const [CartContext, useCart] = createStoreContext('Cart')

export { useCart }

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = cartSubtotal(items)

  const updateQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    )
  }, [])

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i))
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, count, total, updateQty, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
