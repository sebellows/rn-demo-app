import { useContext } from 'react'

import { Theme } from './createTheme'
import { ThemeContext } from './theme.context'

const useTheme = () => useContext(ThemeContext) as Theme

export { useTheme }
