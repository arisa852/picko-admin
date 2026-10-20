import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
  // TODO 1：用 useContext 讀取 ThemeContext，存成變數
  const Context = useContext(ThemeContext)

  // TODO 2：如果讀到的是 null，丟出錯誤提醒「必須在 ThemeProvider 內使用」
  if(Context === null){
	throw new Error('必須在ThemeProvider內使用')
  }

  // TODO 3：回傳讀到的東西
  return Context
}