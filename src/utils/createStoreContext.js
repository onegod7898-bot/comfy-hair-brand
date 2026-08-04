import { createContext, useContext } from 'react'

/**
 * Create a context plus a hook that throws when used outside its provider.
 * Returns [Context, useContextValue].
 */
export function createStoreContext(name) {
  const Context = createContext(null)

  function useContextValue() {
    const ctx = useContext(Context)
    if (!ctx) throw new Error(`use${name} must be used within ${name}Provider`)
    return ctx
  }

  return [Context, useContextValue]
}
