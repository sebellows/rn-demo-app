import React from 'react'
import { View } from 'react-native'

import { createStyleComponent } from './createStyleComponent'
import { StyleFunctionContainer } from './types'
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

type BaseBoxProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  BorderProps &
  ShadowProps &
  PositionProps

export type BoxProps<EnableShorthand extends boolean = true> = BaseBoxProps &
  EnableShorthand extends true
  ? BaseBoxProps & SpacingShorthandProps & BackgroundColorShorthandProps
  : BaseBoxProps

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
  Props = React.ComponentProps<typeof View> & { children?: React.ReactNode },
  EnableShorthand extends boolean = true,
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createStyleComponent<
    BoxProps<EnableShorthand> & Omit<Props, keyof BoxProps<EnableShorthand>>
  >(boxStyleFunctions as StyleFunctionContainer<BoxProps<EnableShorthand>>[], BaseComponent)
}

export { createBox }
