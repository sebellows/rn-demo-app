import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo, useState } from 'react'
import { Linking, Platform, Switch, useColorScheme } from 'react-native'
import { registerRootComponent } from 'expo'
import { Asset } from 'expo-asset'
import { Assets } from '@react-navigation/elements'
import { InitialState, Theme as RNNavigationTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider } from '@shopify/restyle'

import { updateTheme } from './theme'
import { GlobalSettingsProvider } from './GlobalContext'
import { Navigation } from './Navigation'

Asset.loadAsync(Assets)

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const THEME_PERSISTENCE_KEY = 'THEME_TYPE'

const App = () => {
  const colorScheme = useColorScheme()
  const [darkMode, toggleDarkMode] = useState(colorScheme === 'dark')
  const [reducedMotionEnabled, setReducedMotion] = useState(false)
  const [initialState, setInitialState] = useState<InitialState | undefined>()

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()

        if (Platform.OS !== 'web' || initialUrl === null) {
          const savedState = await AsyncStorage?.getItem(NAVIGATION_PERSISTENCE_KEY)

          const state = savedState ? JSON.parse(savedState) : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        try {
          const themeMode = await AsyncStorage?.getItem(THEME_PERSISTENCE_KEY)
          const currentMode = darkMode ? 'dark' : 'light'

          if (currentMode !== themeMode) {
            toggleDarkMode(themeMode === 'dark')
          }
        } catch (e) {
          // Ignore
        }
      }
    }

    restoreState()
  }, [])

  const theme = useMemo(() => updateTheme(darkMode), [darkMode])

  return (
    <GlobalSettingsProvider
      mode={darkMode ? 'dark' : 'light'}
      reducedMotionEnabled={reducedMotionEnabled}
    >
      <StatusBar style="auto" />
      <ThemeProvider theme={theme}>
        <Navigation
          theme={{ dark: darkMode, colors: theme.colors as RNNavigationTheme['colors'] }}
          initialState={initialState}
          onStateChange={state =>
            AsyncStorage?.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
          }
        />
      </ThemeProvider>
    </GlobalSettingsProvider>
  )
}

registerRootComponent(App)
