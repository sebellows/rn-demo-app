import React from 'react'
import { Text } from 'react-native'

import { createStyleComponent } from './createStyleComponent'
import { StyleFunctionContainer } from './types'
import {
  color,
  opacity,
  spacing,
  typography,
  textShadow,
  visible,
  ColorProps,
  OpacityProps,
  SpacingProps,
  TextShadowProps,
  TypographyProps,
  VisibleProps,
  spacingShorthand,
  SpacingShorthandProps,
} from './styleFunctions'
import { createVariant, VariantProps } from './createVariant'

type BaseTextProps = ColorProps &
  OpacityProps &
  VisibleProps &
  TypographyProps &
  SpacingProps &
  TextShadowProps &
  VariantProps<'textVariants'>

export type TextProps<EnableShorthand extends boolean = true> = EnableShorthand extends true
  ? BaseTextProps & SpacingShorthandProps
  : BaseTextProps

export const textStyleFunctions = [
  color,
  opacity,
  visible,
  typography,
  spacing,
  spacingShorthand,
  textShadow,
  createVariant({ themeKey: 'textVariants' }),
]

export type TextStyleProps = React.ComponentProps<typeof Text> & { children?: React.ReactNode }

const createText = <Props = TextStyleProps, EnableShorthand extends boolean = true>(
  BaseComponent: React.ComponentType<any> = Text,
) => {
  return createStyleComponent<
    TextProps<EnableShorthand> & Omit<Props, keyof TextProps<EnableShorthand>>
  >(textStyleFunctions as StyleFunctionContainer<TextProps<EnableShorthand>>[], BaseComponent)
}

export { createText }
