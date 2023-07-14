import { useContext } from 'react'

import { Theme } from '../types'
import { ThemeContext } from '../theme.context'

const useTheme = () => useContext(ThemeContext) as Theme

export { useTheme }
