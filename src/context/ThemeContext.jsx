import { createContext, useState ,useEffect,useMemo, useCallback} from 'react'

export const ThemeContext = createContext(null)

const STORAGE_KEY = 'picko-admin-theme'

function getInitialTheme() {
  // TODO 2：從 localStorage 讀出存過的值
  const storedTheme = localStorage.getItem(STORAGE_KEY)

  // TODO 3：如果是 'light' 或 'dark' 就直接回傳
  if(storedTheme === 'light'|| storedTheme ==='dark'){
    return storedTheme
    }
  // TODO 4：沒存過的話，系統偏好深色就回傳 'dark'，否則 'light'
  const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches
  return prefersDark ? 'dark':'light'

}


export function ThemeProvider({ children }) {
 const [theme, setTheme] = useState(getInitialTheme)

  // 2. 記住函式：沒有讀任何會變的值，所以依賴是空陣列
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [])

  // 3. 記住物件：theme 變了才產生新物件
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  // 4. 副作用：把 theme 同步到 <html> 和 localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // 5. 回傳 JSX
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

 





