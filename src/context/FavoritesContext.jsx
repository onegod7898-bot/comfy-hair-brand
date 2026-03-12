import { createContext, useContext, useState, useCallback } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(new Set(['1', '3']))

  const toggle = useCallback((id) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return new Set(next)
    })
  }, [])

  const has = useCallback((id) => ids.has(id), [ids])

  return (
    <FavoritesContext.Provider value={{ favorites: ids, toggle, has }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
