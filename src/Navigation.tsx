import { createStackNavigator } from '@react-navigation/stack'
import {
  InitialState,
  NavigationContainer,
  NavigationState,
  Theme as RNNavigationTheme,
} from '@react-navigation/native'

import SearchScreen from './screens/Search.screen'
import ResultsScreen from './screens/ResultDetails.screen'
import { RootStackParamList } from './routes'

const Stack = createStackNavigator<RootStackParamList>()

export const Navigation = ({
  theme,
  initialState,
  onStateChange,
}: {
  theme: RNNavigationTheme
  initialState?: InitialState
  onStateChange: (state: NavigationState | undefined) => void
}) => {
  return (
    <NavigationContainer theme={theme} initialState={initialState} onStateChange={onStateChange}>
      <Stack.Navigator screenOptions={{ headerTitle: 'Business Search' }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
