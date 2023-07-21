import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo, useState } from 'react'
import { Linking, Platform, Switch, useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  InitialState,
  NavigationContainer,
  Theme as RNNavigationTheme,
} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'

import SearchScreen from './screens/Search.screen'
import ResultsScreen from './screens/ResultDetails.screen'
import { updateTheme } from './theme'
import { GlobalSettingsProvider } from './GlobalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Navigation } from './Navigation'

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const THEME_PERSISTENCE_KEY = 'THEME_TYPE'

export const App = () => {
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
