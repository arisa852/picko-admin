import { items, dailyStats } from '../data/mockData'

export function fetchDashboardData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 網址加上 ?fail 就模擬伺服器失敗，方便測試錯誤畫面
      const shouldFail = new URLSearchParams(window.location.search).has('fail')

      if (shouldFail) {
        reject(new Error('伺服器暫時無法回應，請稍後再試'))
      } else {
        resolve({ items, dailyStats })
      }
    }, 800)
  })
}