import { useEffect, useState } from 'react'
import { fetchDashboardData } from '../services/dashboardApi'

export function useDashboardData() {
  // TODO 1：宣告三個狀態
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  //   data    → 初始值 null（還沒拿到資料）
  //   loading → 初始值 true（一進頁面就在讀取）
  //   error   → 初始值 null（還沒出錯）

  useEffect(() => {
    fetchDashboardData()
      .then((result) => {
        // TODO 2：成功時，把 result 存進 data
		setData(result)
      })
      .catch((err) => {
        // TODO 3：失敗時，把 err.message 存進 error
		setError(err.message)
      })
      .finally(() => {
        // TODO 4：不管成功失敗，都把 loading 設成 false
		setLoading(false)
      })
  }, []) // 空陣列：只在元件第一次出現時執行一次

  return { data, loading, error }
}