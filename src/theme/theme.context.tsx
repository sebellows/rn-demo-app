import React, { PropsWithChildren } from 'react'

import { RootTheme } from '@/style-utils/types'

export const ThemeContext = React.createContext({
  breakpoints: {},
  spacing: {},
})

export const ThemeProvider = ({
  theme,
  children,
}: PropsWithChildren<{
  theme: RootTheme
}>) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
