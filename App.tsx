import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { ThemeProvider } from './src/style-utils'
import { useState } from 'react'
import { resolveTheme } from './src/theme'
import { Card } from './src/components'

export default function App() {
  const [darkMode, toggleDarkMode] = useState(false)

  return (
    <ThemeProvider mode={darkMode ? 'dark' : 'light'} themeResolver={resolveTheme}>
      <Card variant="base">
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </Card>
    </ThemeProvider>
  )
}
