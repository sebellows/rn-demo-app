import React, { PropsWithChildren } from 'react'

import { AppTheme } from '@/style-utils/types'

export const ThemeContext = React.createContext({
  breakpoints: {},
  spacing: {},
})

export const ThemeProvider = ({
  theme,
  children,
}: PropsWithChildren<{
  theme: AppTheme
}>) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
