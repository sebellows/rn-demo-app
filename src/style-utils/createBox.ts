import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { createStyleComponent } from './createStyleComponent'
import { RootTheme, StyleFunctionContainer } from './types'
import {
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  layout,
  spacing,
  border,
  shadow,
  position,
  BackgroundColorProps,
  OpacityProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  visible,
  VisibleProps,
  SpacingShorthandProps,
  BackgroundColorShorthandProps,
  spacingShorthand,
} from './styleFunctions'

type BaseBoxProps<TTheme extends RootTheme> = BackgroundColorProps<TTheme> &
  OpacityProps<TTheme> &
  VisibleProps<TTheme> &
  LayoutProps<TTheme> &
  SpacingProps<TTheme> &
  BorderProps<TTheme> &
  ShadowProps<TTheme> &
  PositionProps<TTheme>

export type BoxProps<
  TTheme extends RootTheme,
  EnableShorthand extends boolean = true,
> = BaseBoxProps<TTheme> & EnableShorthand extends true
  ? BaseBoxProps<TTheme> & SpacingShorthandProps<TTheme> & BackgroundColorShorthandProps<TTheme>
  : BaseBoxProps<TTheme>

export const boxStyleFunctions = [
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  visible,
  layout,
  spacing,
  spacingShorthand,
  border,
  shadow,
  position,
]

const createBox = <
  TTheme extends RootTheme,
  Props = PropsWithChildren<React.ComponentProps<typeof View>>,
  EnableShorthand extends boolean = true,
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createStyleComponent<
    BoxProps<TTheme, EnableShorthand> & Omit<Props, keyof BoxProps<TTheme, EnableShorthand>>,
    TTheme
  >(
    boxStyleFunctions as StyleFunctionContainer<BoxProps<TTheme, EnableShorthand>, TTheme>[],
    BaseComponent,
  )
}

export { createBox }
