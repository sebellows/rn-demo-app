import { Dimensions } from '@shopify/restyle'
import { Dimensions as RNDimensions } from 'react-native'

/**
 * TODO: Aspect-Ratios have not been implemented in the theme yet. This
 * should be removed if there are no future plans to move forward with them.
 */

export type AspectRatio = `${string}:${string}`

export const isAspectRatio = (value: unknown): value is AspectRatio => {
  if (typeof value === 'string' && value.includes(':')) {
    return true
  }
  return false
}

export const applyAspectRatio = (ratio: AspectRatio, value?: number): Dimensions => {
  if (typeof value !== 'number') {
    value = RNDimensions.get('screen').width
  }

  if (!isAspectRatio(ratio)) {
  }

  const [horz, vert] = ratio.split(':').map(parseFloat)

  return { width: value, height: (horz / vert) * value }
}
