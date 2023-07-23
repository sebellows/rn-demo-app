import SearchScreen from './screens/Search.screen'
import ResultsScreen from './screens/ResultDetails.screen'
import { NotFound } from './screens/NotFound'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export const SCREENS = {
  Search: {
    title: 'Search Local Restaurants',
    component: SearchScreen,
  },
  Results: {
    title: 'Search Results',
    component: ResultsScreen,
  },
  NotFound: {
    title: 'Not Found',
    component: NotFound,
  },
}

export type StackNavProp<T extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  T
>

export type RootStackParamList = {
  Search: undefined
  Results: { id: string }
  NotFound: { path: string }
}

export type StackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>

// Make the default RootParamList the same as the RootStackParamList
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
