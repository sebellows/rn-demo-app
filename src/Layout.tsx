// import AsyncStorage from '@react-native-async-storage/async-storage'

// import { StatusBar } from 'expo-status-bar'
// import { useEffect, useMemo, useState } from 'react'
// import { Linking, Platform } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { InitialState, NavigationContainer } from '@react-navigation/native'
// import { SafeAreaView } from 'react-native-safe-area-context'

// import SearchScreen from './screens/Search.screen'
// import ResultsScreen from './screens/Results.screen'
// import { Card } from './components'
// import { ThemeProvider } from '@shopify/restyle'
// import { GlobalSettingsProvider } from './GlobalContext'
// import { updateTheme } from './theme'
// import { ColorMode } from './theme/color'

// const Stack = createStackNavigator()

// const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
// const THEME_PERSISTENCE_KEY = 'THEME_MODE'

// export const Layout = () => {
//   const [darkMode, toggleDarkMode] = useState(false)
//   const [reducedMotionEnabled, setReducedMotion] = useState(false)
//   const [initialState, setInitialState] = useState<InitialState | undefined>()

//   const theme = useMemo(() => updateTheme(darkMode), [darkMode])

//   useEffect(() => {
//     const restoreState = async () => {
//       try {
//         const initialUrl = await Linking.getInitialURL()

//         if (Platform.OS !== 'web' || initialUrl === null) {
//           const savedState = await AsyncStorage?.getItem(NAVIGATION_PERSISTENCE_KEY)

//           const state = savedState ? JSON.parse(savedState) : undefined

//           if (state !== undefined) {
//             setInitialState(state)
//           }
//         }
//       } finally {
//         try {
//           const themeMode = await AsyncStorage?.getItem(THEME_PERSISTENCE_KEY)
//           const currentMode = darkMode ? 'dark' : 'light'

//           if (currentMode !== themeMode) {
//             toggleDarkMode(themeMode === 'dark')
//           }
//         } catch (e) {
//           // Ignore
//         }
//       }
//     }

//     restoreState()
//   }, [])

//   return (
//     <GlobalSettingsProvider
//       mode={darkMode ? 'dark' : 'light'}
//       reducedMotionEnabled={reducedMotionEnabled}
//     >
//       <ThemeProvider theme={theme}>
//         <Card>
//           <StatusBar style="auto" />
//           <NavigationContainer
//             theme={{ dark: darkMode, colors: theme.colors as RNNavigationTheme['colors'] }}
//             initialState={initialState}
//             onStateChange={state =>
//               AsyncStorage?.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
//             }
//           >
//             <Stack.Navigator screenOptions={{ headerTitle: 'Business Search' }}>
//               <Stack.Screen name="Search" component={SearchScreen} />
//               <Stack.Screen name="Results" component={ResultsScreen} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </Card>
//       </ThemeProvider>
//     </GlobalSettingsProvider>
//   )
// }
