import {useTheme} from './hooks/useTheme'
import {useDashboardData} from './hooks/useDashboardData'
import { StatCard} from './components/dashboard/StatCard'



function App() {
  const {theme,toggleTheme} = useTheme()
  const { data, loading, error } = useDashboardData()

   if (loading && !error)
    {
      return <p>載入中…</p>
    }
    if (error) {
     
       return <p>{error}</p>
    }

     const foodCount = data.items.filter(item =>item.type ==='food').length;
    const outfitCount = data.items.filter(item =>item.type ==='outfit').length;
  
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold text-blue-600">Hello,Vite+React</h1>
      <button onClick={toggleTheme}>切換主題</button>
      <p>目前主題:{theme}</p>
     <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="餐廳數" value={foodCount} hint="來自 Picko 前台" />
      <StatCard label="服飾數" value={outfitCount} hint="來自picko前台" />
</div>
    </div>
  )
}

export default App
