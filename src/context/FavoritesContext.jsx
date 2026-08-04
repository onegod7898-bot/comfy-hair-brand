import { useState, useCallback } from 'react'
import { createStoreContext } from '../utils/createStoreContext'

const [FavoritesContext, useFavorites] = createStoreContext('Favorites')

export { useFavorites }

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
