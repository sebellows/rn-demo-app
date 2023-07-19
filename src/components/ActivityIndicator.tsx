import { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Theme, useTheme } from '../theme'
import { WithComponentProps } from '../types'
import { get } from '../utils'
import { Box } from './Box'
import {
  AnimationProps,
  BaseTheme,
  ColorProps,
  LayoutProps,
  SelectStyleProps,
  animation,
  color,
  composeStyleFunctions,
  layout,
  useStyle,
} from '../style-utils'

type StyleProps = AnimationProps<Theme> & ColorProps<Theme> & LayoutProps<Theme>

const styleFunctions = composeStyleFunctions([animation, color, layout])
const containerStyleFunctions = composeStyleFunctions([layout])

type CustomActivityIndicatorProps = StyleProps & {
  /**
   * Whether to show the indicator or hide it.
   */
  animating?: boolean

  /**
   * Size of the indicator.
   */
  size?: 'small' | 'large' | number

  /**
   * Whether the indicator should hide when not animating.
   */
  hidesWhenStopped?: boolean
}

export type ActivityIndicatorProps = WithComponentProps<'View', CustomActivityIndicatorProps>

const DURATION = 2400

/**
 * Activity indicator is used to present progress of some activity in the app.
 * It can be used as a drop-in for the ActivityIndicator shipped with React Native.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ActivityIndicator, MD2Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ActivityIndicator animating={true} color={MD2Colors.red800} />
 * );
 *
 * export default MyComponent;
 * ```
 */
const ActivityIndicator = ({
  animating = true,
  color: indicatorColor,
  hidesWhenStopped = true,
  size: indicatorSize = 'small',
  style,
  ...rest
}: ActivityIndicatorProps) => {
  const theme = useTheme()
  const styleProps = useStyle(containerStyleFunctions, rest)
  const { current: timer } = useRef<Animated.Value>(new Animated.Value(0))
  const { current: fade } = useRef<Animated.Value>(
    new Animated.Value(!animating && hidesWhenStopped ? 0 : 1),
  )

  const rotation = useRef<Animated.CompositeAnimation | undefined>(undefined)
  const scale = get(theme, 'animations.defaults.scale', 1)

  const startRotation = useCallback(() => {
    // Show indicator
    Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 1,
      isInteraction: false,
      useNativeDriver: true,
    }).start()

    // Circular animation in loop
    if (rotation.current) {
      timer.setValue(0)
      Animated.loop(rotation.current).start()
    }
  }, [scale, fade, timer])

  const stopRotation = () => {
    if (rotation.current) {
      rotation.current.stop()
    }
  }

  useEffect(() => {
    if (rotation.current === undefined) {
      // Circular animation in loop
      rotation.current = Animated.timing(timer, {
        duration: DURATION,
        easing: Easing.linear,
        // Animated.loop does not work if useNativeDriver is true on web
        useNativeDriver: Platform.OS !== 'web',
        toValue: 1,
        isInteraction: false,
      })
    }

    if (animating) {
      startRotation()
    } else if (hidesWhenStopped) {
      // Hide indicator first and then stop rotation
      Animated.timing(fade, {
        duration: 200 * scale,
        toValue: 0,
        useNativeDriver: true,
        isInteraction: false,
      }).start(stopRotation)
    } else {
      stopRotation()
    }
  }, [animating, fade, hidesWhenStopped, startRotation, scale, timer])

  const color = indicatorColor || theme.colors?.primary
  const size =
    typeof indicatorSize === 'string'
      ? indicatorSize === 'small'
        ? 24
        : 48
      : indicatorSize
      ? indicatorSize
      : 24

  const frames = (60 * DURATION) / 1000
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0)
  const containerStyle = {
    width: size,
    height: size / 2,
    overflow: 'hidden' as const,
  }

  return (
    <Box
      style={style}
      alignItems="center"
      justifyContent="center"
      {...rest}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <Animated.View style={[{ width: size, height: size, opacity: fade }]} collapsable={false}>
        {[0, 1].map(index => {
          // Thanks to https://github.com/n4kz/react-native-indicators for the great work
          const inputRange = Array.from(
            new Array(frames),
            (_, frameIndex) => frameIndex / (frames - 1),
          )
          const outputRange = Array.from(new Array(frames), (_, frameIndex) => {
            let progress = (2 * frameIndex) / (frames - 1)
            const rotation = index ? +(360 - 15) : -(180 - 15)

            if (progress > 1.0) {
              progress = 2.0 - progress
            }

            const direction = index ? -1 : +1

            return `${direction * (180 - 30) * easing(progress) + rotation}deg`
          })

          const layerStyle = {
            width: size,
            height: size,
            transform: [
              {
                rotate: timer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [`${0 + 30 + 15}deg`, `${2 * 360 + 30 + 15}deg`],
                }),
              },
            ],
          }

          const viewportStyle = {
            width: size,
            height: size,
            transform: [
              {
                translateY: index ? -size / 2 : 0,
              },
              {
                rotate: timer.interpolate({ inputRange, outputRange }),
              },
            ],
          }

          const offsetStyle = index ? { top: size / 2 } : null

          const lineStyle = {
            width: size,
            height: size,
            borderColor: color,
            borderWidth: size / 10,
            borderRadius: size / 2,
          }

          return (
            <Animated.View key={index} style={[styles.layer]}>
              <Animated.View style={layerStyle}>
                <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
                  <Animated.View style={viewportStyle}>
                    <Animated.View style={containerStyle} collapsable={false}>
                      <Animated.View style={lineStyle} />
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          )
        })}
      </Animated.View>
    </Box>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ActivityIndicator
