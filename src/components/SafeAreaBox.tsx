import { all, createRestyleComponent, createVariant } from '@shopify/restyle'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Theme } from '../theme'

import { CardProps } from './Card'

const SafeAreaBox = createRestyleComponent<CardProps<typeof SafeAreaView>, Theme>([
  ...all,
  createVariant({
    themeKey: 'cardVariants',
  }),
])

export { SafeAreaBox }
