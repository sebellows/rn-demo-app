import React, { useMemo } from 'react'

import { Theme } from './types'
import { ColorMode } from './color'

export const ThemeContext = React.createContext({
  spacing: {},
})

type ThemeResolver = (dark?: boolean) => Theme

export const ThemeProvider = ({
  mode,
  themeResolver,
  children,
}: {
  mode?: ColorMode
  themeResolver: ThemeResolver
  children: React.ReactNode
}) => {
  const theme = useMemo(() => themeResolver(mode === 'dark'), [mode])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
