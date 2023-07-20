import { Dimensions } from '@shopify/restyle'
import { Dimensions as RNDimensions } from 'react-native'

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
