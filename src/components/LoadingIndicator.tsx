import { PropsWithChildren, useCallback, useEffect } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
  interpolate,
} from 'react-native-reanimated'
import { BoxProps } from '@shopify/restyle'

import { range } from '../utils'
import { Theme } from '../theme'
import { useGlobalSettings } from '../GlobalContext'
import { IconSizeKey, iconDimensionsFromSize, parseIconSize } from '../theme/styles'

import { AnimatedBox } from './AnimatedBox'

type ActivityIndicatorProps = BoxProps<Theme> & {
  /** Show the indicator or hide it. */
  animating?: boolean

  /** Set custom color for border color of indicator. */
  variant?: keyof Theme['colors']

  /**
   * Size of the indicator.
   */
  size?: IconSizeKey | number

  style?: StyleProp<ViewStyle>
}

const DURATION = 2400
const FRAMES = (60 * DURATION) / 1000
const SPINNER_LAYERS = [0, 1]

const calcInputOutput = (layerIndex: number) => {
  const inputRange = range(FRAMES)
  const outputRange = range<number>(FRAMES, (_, i) => {
    let progress = (2 * i) / (FRAMES - 1)
    const rotation = layerIndex ? +(360 - 15) : -(180 - 15)

    if (progress > 1.0) {
      progress = 2.0 - progress
    }

    const direction = layerIndex || -1

    return direction * (180 - 30) * Easing.linear(progress) + rotation
  })

  return [inputRange, outputRange]
}

const ViewportLayer = ({
  children,
  size,
  layerIndex,
}: PropsWithChildren<{ size: number; layerIndex: number }>) => {
  const rotation = useSharedValue(0)

  const animatedLayerStyle = useAnimatedStyle(() => {
    const [inputRange, outputRange] = calcInputOutput(layerIndex)
    const rotate = interpolate(rotation.value, inputRange, outputRange)

    return {
      transform: [
        {
          translateY: layerIndex ? -size / 2 : 0,
        },
        {
          rotate: `${rotate}deg`,
        },
      ],
    }
  })

  return (
    <AnimatedBox width={size} height={size} style={animatedLayerStyle}>
      {children}
    </AnimatedBox>
  )
}

const LoadingIndicator = ({
  animating = true,
  variant = 'primary',
  size: indicatorSize = 'small',
  style,
  ...rest
}: ActivityIndicatorProps) => {
  const { reducedMotionEnabled = false } = useGlobalSettings()

  const rotation = useSharedValue(0)
  const fade = useSharedValue(Number(!!animating))

  const animatedStyle = useAnimatedStyle(() => {
    const scale = Number(!reducedMotionEnabled)
    const rotate = withRepeat(
      withTiming(rotation.value * 360, {
        duration: DURATION,
        easing: Easing.linear,
      }),
      -1, // loop infinitely
    )

    return {
      opacity: withTiming(fade.value, { duration: 200 * scale }),
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    }
  })

  useEffect(() => {
    if (!animating && rotation.value) {
      cancelAnimation(rotation)
    }

    return () => {
      if (animating && rotation.value) {
        cancelAnimation(rotation)
      }
    }
  }, [])

  const offsetStyle = useCallback((index: number) => (index ? { top: size / 2 } : null), [])

  const animatedLayerStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotation.value, [0, 1], [0 + 30 + 15, 2 * 360 + 30 + 15])

    return {
      transform: [{ rotate: `${rotate}deg` }],
    }
  })

  const size = parseIconSize(indicatorSize)
  const { width, height } = iconDimensionsFromSize(indicatorSize)

  return (
    <AnimatedBox
      style={style}
      alignItems="center"
      justifyContent="center"
      {...rest}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: !!rotation.value }}
    >
      <AnimatedBox
        width={width}
        height={height}
        overflow="hidden"
        style={animatedStyle}
        collapsable={false}
      >
        {SPINNER_LAYERS.map(index => {
          return (
            <AnimatedBox
              key={index}
              alignItems="center"
              justifyContent="center"
              style={[StyleSheet.absoluteFillObject]}
            >
              <AnimatedBox style={animatedLayerStyle}>
                <AnimatedBox
                  width={size}
                  height={size}
                  overflow="hidden"
                  style={offsetStyle(index)}
                  collapsable={false}
                >
                  <ViewportLayer size={size} layerIndex={index}>
                    <AnimatedBox width={size} height={size} overflow="hidden" collapsable={false}>
                      <AnimatedBox
                        width={size}
                        height={size}
                        borderColor={variant}
                        borderRadius={indicatorSize === 'small' ? 'iconSmall' : 'iconLarge'}
                        borderWidth={size / 10}
                      />
                    </AnimatedBox>
                  </ViewportLayer>
                </AnimatedBox>
              </AnimatedBox>
            </AnimatedBox>
          )
        })}
      </AnimatedBox>
    </AnimatedBox>
  )
}

LoadingIndicator.name = 'LoadingIndicator'

export { LoadingIndicator }
