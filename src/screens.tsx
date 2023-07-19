// import type { NavigatorScreenParams } from '@react-navigation/native'
import SearchScreen from './screens/Search.screen'
import ResultsListScreen from './screens/ResultsList.screen'

export const SCREENS = {
  Search: {
    title: 'Search Local Restaurants',
    component: SearchScreen,
  },
  Results: {
    title: 'Search Results',
    component: ResultsListScreen,
  },
}

type ParamListTypes = {
  Home: undefined
  NotFound: undefined
  // LinkComponent: NavigatorScreenParams<LinkComponentDemoParamList> | undefined
}

export type RootStackParamList = {
  [P in Exclude<keyof typeof SCREENS, keyof ParamListTypes>]: undefined
} & ParamListTypes

// Make the default RootParamList the same as the RootStackParamList
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
