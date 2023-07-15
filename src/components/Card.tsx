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

type CardProps = BoxProps & VariantProps<'cardVariants'>
const props = Object.assign(
  {},
  boxStyleFunctions,
  createVariant({
    themeKey: 'cardVariants',
  }),
)

export const Card = createStyleComponent<CardProps>([...props], View)
