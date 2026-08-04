import { describe, it, expect } from 'vitest'
import {
  wigCategories,
  wigProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getGalleryProducts,
  getOtherProducts,
  getFirstProductPerCategory,
} from './wigProducts'

describe('wigProducts data', () => {
  it('every product references a known category', () => {
    const categoryIds = new Set(wigCategories.map((c) => c.id))
    for (const p of wigProducts) {
      expect(categoryIds.has(p.categoryId)).toBe(true)
    }
  })

  it('product ids are unique', () => {
    const ids = wigProducts.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('getProductById', () => {
  it('returns the matching product', () => {
    const product = getProductById('1')
    expect(product).not.toBeNull()
    expect(product.name).toBe('Full Frontal Helena Bounce')
  })

  it('returns null for an unknown id', () => {
    expect(getProductById('does-not-exist')).toBeNull()
  })

  it('returns null when id is undefined', () => {
    expect(getProductById(undefined)).toBeNull()
  })
})

describe('getProductsByCategory', () => {
  it('returns all products when no category is given', () => {
    expect(getProductsByCategory()).toBe(wigProducts)
  })

  it('returns all products for the "all" category', () => {
    expect(getProductsByCategory('all')).toBe(wigProducts)
  })

  it('filters products by category id', () => {
    const laceFront = getProductsByCategory('lace-front')
    expect(laceFront.length).toBeGreaterThan(0)
    expect(laceFront.every((p) => p.categoryId === 'lace-front')).toBe(true)
  })

  it('returns an empty array for an unknown category', () => {
    expect(getProductsByCategory('unknown')).toEqual([])
  })
})

describe('getFeaturedProducts', () => {
  it('returns only tagged products', () => {
    const featured = getFeaturedProducts()
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.every((p) => p.tag)).toBe(true)
  })

  it('returns at most 8 products', () => {
    expect(getFeaturedProducts().length).toBeLessThanOrEqual(8)
  })
})

describe('getGalleryProducts', () => {
  it('returns the first 8 products', () => {
    const gallery = getGalleryProducts()
    expect(gallery).toHaveLength(8)
    expect(gallery).toEqual(wigProducts.slice(0, 8))
  })
})

describe('getOtherProducts', () => {
  it('excludes the current product', () => {
    const others = getOtherProducts('1')
    expect(others.every((p) => p.id !== '1')).toBe(true)
  })

  it('respects the default limit of 6', () => {
    expect(getOtherProducts('1')).toHaveLength(6)
  })

  it('respects a custom limit', () => {
    expect(getOtherProducts('1', 3)).toHaveLength(3)
  })
})

describe('getFirstProductPerCategory', () => {
  it('returns an entry for every category', () => {
    const entries = getFirstProductPerCategory()
    expect(entries).toHaveLength(wigCategories.length)
  })

  it('pairs each category with its first product', () => {
    for (const { category, product } of getFirstProductPerCategory()) {
      if (product) {
        expect(product.categoryId).toBe(category.id)
      }
    }
  })
})
