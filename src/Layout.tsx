import AsyncStorage from '@react-native-async-storage/async-storage'

import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { InitialState, NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchScreen from './screens/Search.screen'
import { createTheme, ThemeProvider } from './theme'
import ResultsListScreen from './screens/ResultsList.screen'
import { Card } from './components'

const Stack = createStackNavigator()

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const THEME_PERSISTENCE_KEY = 'THEME_MODE'

export const Layout = () => {
  const [darkMode, toggleDarkMode] = useState(false)
  const [reducedMotion, toggleReducedMotion] = useState(false)
  const theme = useMemo(
    () => createTheme({ mode: darkMode ? 'dark' : 'light', reducedMotionEnabled: reducedMotion }),
    [darkMode, reducedMotion],
  )
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

          if (theme.mode !== themeMode) {
            toggleDarkMode(themeMode === 'dark')
          }
        } catch (e) {
          // Ignore
        }
      }
    }

    restoreState()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Card variant="base">
        <NavigationContainer
          initialState={initialState}
          onStateChange={state =>
            AsyncStorage?.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
          }
        >
          <Stack.Navigator screenOptions={{ headerTitle: 'Business Search' }}>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ResultsList" component={ResultsListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </Card>
    </ThemeProvider>
  )
}
