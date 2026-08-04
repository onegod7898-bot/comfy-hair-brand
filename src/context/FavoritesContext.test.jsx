import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { FavoritesProvider, useFavorites } from './FavoritesContext'

const wrapper = ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>

describe('useFavorites', () => {
  it('throws when used outside a FavoritesProvider', () => {
    expect(() => renderHook(() => useFavorites())).toThrow(
      'useFavorites must be used within FavoritesProvider'
    )
  })

  it('seeds default favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.has('1')).toBe(true)
    expect(result.current.has('3')).toBe(true)
    expect(result.current.has('2')).toBe(false)
  })

  it('adds a new favorite via toggle', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => result.current.toggle('2'))
    expect(result.current.has('2')).toBe(true)
  })

  it('removes an existing favorite via toggle', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => result.current.toggle('1'))
    expect(result.current.has('1')).toBe(false)
  })

  it('exposes the favorites set', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.favorites instanceof Set).toBe(true)
  })
})
