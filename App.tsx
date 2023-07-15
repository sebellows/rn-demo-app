import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { useMemo, useState } from 'react'

import { createTheme, ThemeProvider } from './src/theme'
import { Card } from './src/components'

export default function App() {
  const [darkMode, toggleDarkMode] = useState(false)

  const theme = useMemo(() => createTheme(darkMode ? 'dark' : 'light'), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <Card variant="base">
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </Card>
    </ThemeProvider>
  )
}
