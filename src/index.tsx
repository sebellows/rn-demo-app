import { StatusBar } from 'expo-status-bar'
import { useMemo, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchScreen from './screens/Search.screen'
import { createTheme, ThemeProvider } from './theme'
import ResultsListScreen from './screens/ResultsList.screen'

const Stack = createStackNavigator()

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const THEME_PERSISTENCE_KEY = 'THEME_TYPE'

export const App = () => {
  const [darkMode, toggleDarkMode] = useState(false)

  const theme = useMemo(() => createTheme({ mode: darkMode ? 'dark' : 'light' }), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: 'Business Search' }}>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ResultsList" component={ResultsListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
