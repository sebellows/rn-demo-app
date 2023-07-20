import { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import Animated, { AnimateProps } from 'react-native-reanimated'
import { createBox } from '@shopify/restyle'

import { Theme } from '../theme'

/**
 * A version of the themed Box component that uses react-native-reanimated's extended
 * View as the base component.
 */
export const AnimatedBox = createBox<Theme, PropsWithChildren<AnimateProps<ViewProps>>>(
  Animated.View,
)
