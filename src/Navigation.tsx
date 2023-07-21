import { createStackNavigator } from '@react-navigation/stack'
import {
  InitialState,
  NavigationContainer,
  NavigationState,
  Theme as RNNavigationTheme,
} from '@react-navigation/native'

import SearchScreen from './screens/Search.screen'
import ResultsScreen from './screens/Results.screen'
import { RootStackParamList } from './screens'
import { Box, IconButton } from './components'

type HeaderIconButtonProps = {
  icon: string
  onPress: () => void
}

function HeaderIconButton(props: HeaderIconButtonProps) {
  let { icon, onPress } = props
  return <IconButton name={icon} onPress={onPress} color="primary" mr="8" />
}

const Stack = createStackNavigator<RootStackParamList>()

export const Navigation = ({
  theme,
  initialState,
  onStateChange,
}: {
  theme: RNNavigationTheme
  initialState: InitialState
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
