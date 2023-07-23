import { View } from 'react-native'
import { ComponentProps, PropsWithChildren, forwardRef } from 'react'
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  AllProps,
  all,
} from '@shopify/restyle'

import { Theme } from '../theme'
import { hasOwn, isPlainObject } from '../utils'

type RestyleProps = AllProps<Theme> & VariantProps<Theme, 'cardVariants'>

const ElevationLevels = [0, 1, 2, 3, 4, 5]

type Elevation = (typeof ElevationLevels)[number]
type ElevationValue = (typeof ElevationLevels)[number] | SharedValue<number>

type ElevatableProps = RestyleProps &
  Omit<ComponentProps<typeof Animated.View>, keyof RestyleProps> & {
    elevation?: Elevation
  }

const ElevatableLayer = createRestyleComponent<PropsWithChildren<ElevatableProps>, Theme>(
  [...all, createVariant({ themeKey: 'cardVariants' })],
  Animated.View,
)

const shadowColor = '#000'
const iOSShadowOutputRanges = [
  {
    shadowOpacity: 0.15,
    height: [0, 1, 2, 4, 6, 8],
    shadowRadius: [0, 3, 6, 8, 10, 12],
  },
  {
    shadowOpacity: 0.3,
    height: [0, 1, 1, 1, 2, 4],
    shadowRadius: [0, 1, 2, 3, 3, 4],
  },
]

function resolveShadowLayerStyle(elevation: ElevationValue, layer: 0 | 1) {
  if (isPlainObject(elevation) && hasOwn(elevation, 'value')) {
    return {
      shadowColor,
      shadowOpacity: interpolate(
        elevation.value,
        [0, 1],
        [0, iOSShadowOutputRanges[layer].shadowOpacity],
        'clamp',
      ),
      shadowOffset: {
        width: 0,
        height: interpolate(elevation.value, ElevationLevels, iOSShadowOutputRanges[layer].height),
      },
      shadowRadius: interpolate(
        elevation.value,
        ElevationLevels,
        iOSShadowOutputRanges[layer].shadowRadius,
      ),
    }
  }

  const level = elevation as number

  return {
    shadowColor,
    shadowOpacity: elevation ? iOSShadowOutputRanges[layer].shadowOpacity : 0,
    shadowOffset: {
      width: 0,
      height: iOSShadowOutputRanges[layer].height[level],
    },
    shadowRadius: iOSShadowOutputRanges[layer].shadowRadius[level],
  }
}

const Elevatable = forwardRef<typeof View, PropsWithChildren<ElevatableProps>>(
  ({ children, elevation: initialElevation = 1, variant, ...props }, ref) => {
    const elevation = useSharedValue(initialElevation)
    const animatedOuterStyle = useAnimatedStyle(() => {
      return resolveShadowLayerStyle(elevation, 0)
    })
    const animatedInnerStyle = useAnimatedStyle(() => {
      return resolveShadowLayerStyle(elevation, 1)
    })

    return (
      <ElevatableLayer ref={ref} style={animatedOuterStyle}>
        <ElevatableLayer style={animatedInnerStyle}>{children}</ElevatableLayer>
      </ElevatableLayer>
    )
  },
)

Elevatable.displayName = 'Elevatable'

export { Elevatable }
