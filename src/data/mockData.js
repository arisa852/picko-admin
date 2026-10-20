import pickoDb from './picko-db.json'

// 原始資料沒有收藏數，用 id 算一個固定的假數字
// offset 讓餐廳和穿搭的數字不要一樣
function mockFavoriteCount(id, offset = 0) {
  return ((id * 73 + offset) % 380) + 20
}

// 26 間餐廳 → 自動改寫成後台格式
const foodItems = pickoDb.restaurantlist.map((restaurant) => ({
  key: `food-${restaurant.id}`,
  type: 'food',
  name: restaurant.name,
  category: restaurant.category,
  tag: restaurant.locationTag,
  rating: restaurant.rating,
  favoriteCount: mockFavoriteCount(restaurant.id),
}))

// 35 件穿搭 → 自動改寫成後台格式
const outfitItems = pickoDb.outfits.map((outfit) => ({
  key: `outfit-${outfit.id}`,
  type: 'outfit',
  name: outfit.name,
  category: outfit.category,
  tag: outfit.season,       // 穿搭沒有地區，改放季節
  rating: null,             // 穿搭沒有評分
  favoriteCount: mockFavoriteCount(outfit.id, 150),
}))

// 合併成一份，給表格用
export const items = [...foodItems, ...outfitItems]

// 把日期轉成 '2026-10-13' 這種格式
function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 產生最近 N 天的每日資料，越接近今天數字越大（模擬成長）
function buildDailyStats(days) {
  const stats = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - 1 - i))  // 從 89 天前一路算到今天

    stats.push({
      date: formatDate(date),
      favorites: 20 + Math.round(i * 0.4) + ((i * 7) % 9),  // 整體上升，加一點起伏
      signups: 4 + Math.round(i * 0.1) + ((i * 5) % 5),
    })
  }
  return stats
}

export const dailyStats = buildDailyStats(90)