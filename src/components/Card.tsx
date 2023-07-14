import { View } from 'react-native'
import {
  BoxProps,
  StyleFunctionContainer,
  VariantProps,
  boxStyleFunctions,
  createStyleComponent,
  createVariant,
} from '../style-utils'

const variant = createVariant({
  themeKey: 'cardVariants',
})

export const Card = createStyleComponent<BoxProps & VariantProps<'cardVariants'>>(
  [...boxStyleFunctions, variant] as StyleFunctionContainer<
    BoxProps & VariantProps<'cardVariants'>
  >[],
  View,
)
