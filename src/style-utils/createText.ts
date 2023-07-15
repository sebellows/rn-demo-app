import React, { PropsWithChildren } from 'react'
import { Text } from 'react-native'

import { createStyleComponent } from './createStyleComponent'
import { RootTheme, StyleFunctionContainer } from './types'
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

type BaseTextProps<TTheme extends RootTheme> = ColorProps<TTheme> &
  OpacityProps<TTheme> &
  VisibleProps<TTheme> &
  TypographyProps<TTheme> &
  SpacingProps<TTheme> &
  TextShadowProps<TTheme> &
  VariantProps<TTheme, 'textVariants'>

export type TextProps<
  TTheme extends RootTheme,
  EnableShorthand extends boolean = true,
> = EnableShorthand extends true
  ? BaseTextProps<TTheme> & SpacingShorthandProps<TTheme>
  : BaseTextProps<TTheme>

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

export type TextStyleProps = PropsWithChildren<React.ComponentProps<typeof Text>>

const createText = <
  TTheme extends RootTheme,
  Props = TextStyleProps,
  EnableShorthand extends boolean = true,
>(
  BaseComponent: React.ComponentType<any> = Text,
) => {
  return createStyleComponent<
    TextProps<TTheme, EnableShorthand> & Omit<Props, keyof TextProps<TTheme, EnableShorthand>>,
    TTheme
  >(
    textStyleFunctions as StyleFunctionContainer<TextProps<TTheme, EnableShorthand>, TTheme>[],
    BaseComponent,
  )
}

export { createText }
