// Video files in public/videos/ - each product has its own video (no duplicates)
const VIDEO_BASE = '/videos'

export const wigCategories = [
  { id: 'glueless', name: 'Glueless Wigs', description: 'Easy to wear, no adhesive needed. Perfect for beginners.' },
  { id: 'lace-front', name: 'Lace Front Wigs', description: 'Natural hairline with undetectable lace. Our bestseller.' },
  { id: 'curly', name: 'Curly Wigs', description: 'Voluminous curls for bold, beautiful statements.' },
  { id: 'bone-straight', name: 'Bone Straight Wigs', description: 'Sleek, silky straight hair for a polished look.' },
  { id: 'colored', name: 'Colored Wigs', description: 'Express yourself with stunning colors and tones.' },
]

export const wigProducts = [
  {
    id: '1',
    name: 'Celebrity Fringe Natural',
    categoryId: 'lace-front',
    description: 'Human hair. Maintaining: Hair serum. Perfect natural look.',
    video: `${VIDEO_BASE}/video5877251518637284396.mp4`,
    price: 29500,
    normalPrice: 35000,
    dealCode: 'FFS 80',
    tag: 'Bestseller',
  },
  {
    id: '2',
    name: 'Full Frontal Deep Wave Curls',
    categoryId: 'curly',
    description: 'Human hair closure body HHB. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284395.mp4`,
    price: 38500,
    normalPrice: 45000,
    dealCode: 'FFS 79',
    tag: 'New Arrival',
  },
  {
    id: '3',
    name: 'Full Closure Bob 10 Inches',
    categoryId: 'glueless',
    description: 'Human hair 💯. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284394.mp4`,
    price: 30000,
    normalPrice: 40000,
    dealCode: 'FFS 72',
    tag: 'Hot',
  },
  {
    id: '4',
    name: 'Tiwa full frontal human hair',
    categoryId: 'lace-front',
    description: 'Maintaining: Hair serum. Stunning frontal style.',
    video: `${VIDEO_BASE}/video5877251518637284393.mp4`,
    price: 25000,
    normalPrice: null,
    dealCode: 'FFS 45',
  },
  {
    id: '5',
    name: 'Kim k Closure Silky straight',
    categoryId: 'curly',
    description: 'Human hair blend. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284392.mp4`,
    price: 65000,
    normalPrice: null,
    dealCode: 'FFS 30',
  },
  {
    id: '6',
    name: 'Full Closure Bob 10 inches',
    categoryId: 'curly',
    description: 'Human hair 💯. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284391.mp4`,
    price: 40000,
    normalPrice: null,
    dealCode: 'FFS 70',
  },
  {
    id: '7',
    name: 'Full closure bob 12 inches',
    categoryId: 'glueless',
    description: 'Human hair. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284424.mp4`,
    price: 35000,
    normalPrice: null,
    dealCode: 'FFS 47',
    tag: 'Bestseller',
  },
  {
    id: '8',
    name: 'Full frontal wine 10 inches',
    categoryId: 'colored',
    description: 'Human hair 💯. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284425.mp4`,
    price: 40000,
    normalPrice: null,
    dealCode: 'FFS 50',
  },
  {
    id: '9',
    name: 'Kim K Closure Silky Straight 30 Inches',
    categoryId: 'bone-straight',
    description: 'China high grade human hair blend. Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284426.mp4`,
    price: 55000,
    normalPrice: 65000,
    dealCode: 'FFS 74',
  },
  {
    id: '10',
    name: 'Full Closure DD Piano 20 Inches',
    categoryId: 'curly',
    description: 'Human hair. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284427.mp4`,
    price: 136500,
    normalPrice: 170000,
    dealCode: 'FFS 77',
    tag: 'Hot',
  },
  {
    id: '11',
    name: 'Full Frontal Two Tone Orange 10 Inches',
    categoryId: 'colored',
    description: 'Human hair 💯. Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284428.mp4`,
    price: 35000,
    normalPrice: null,
    dealCode: 'FFS 59',
  },
  {
    id: '12',
    name: '13by3 Zara Straight Orange',
    categoryId: 'bone-straight',
    description: 'Maintaining: Hair serum.',
    video: `${VIDEO_BASE}/video5877251518637284429.mp4`,
    price: 40000,
    normalPrice: null,
    dealCode: 'FFS 32',
  },
]

export function getProductById(id) {
  return wigProducts.find((p) => p.id === id) || null
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return wigProducts
  return wigProducts.filter((p) => p.categoryId === categoryId)
}

export function getFeaturedProducts() {
  return wigProducts.filter((p) => p.tag).slice(0, 8)
}

export function getGalleryProducts() {
  return wigProducts.slice(0, 8)
}

export function getOtherProducts(currentId, limit = 6) {
  return wigProducts.filter((p) => p.id !== currentId).slice(0, limit)
}

/** First product in each category - for Shop by style category cards */
export function getFirstProductPerCategory() {
  return wigCategories.map((cat) => ({
    category: cat,
    product: wigProducts.find((p) => p.categoryId === cat.id) || null,
  }))
}
