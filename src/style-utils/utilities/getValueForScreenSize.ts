import { isPlainObject } from '../../utils'
import { AtLeastOneResponsiveValue, Breakpoint, Breakpoints, Dimensions } from '../types'

/**
 * Returns actual value for given `responsiveValue`, `breakpoints`, and current `dimensions`.
 */
export const getValueForScreenSize = <TVal>({
  responsiveValue,
  breakpoints,
  dimensions,
}: {
  responsiveValue: AtLeastOneResponsiveValue<TVal, Breakpoints>
  breakpoints: Breakpoints
  dimensions: Dimensions
}): TVal | undefined => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    const valAWidth = getWidth(valA[1])
    const valBWidth = getWidth(valB[1])

    return valAWidth - valBWidth
  })

  const { width, height } = dimensions

  return sortedBreakpoints.reduce<TVal | undefined>((acc, [key, value]) => {
    const validation1 = width >= getWidth(value) && responsiveValue[key] !== undefined
    const validation2 =
      (isPlainObject(value) && height >= value.height) || typeof value === 'number'

    if (validation1 && validation2) {
      return responsiveValue[key] as TVal
    }

    return acc
  }, undefined)
}

function getWidth(value: Breakpoint) {
  if (isPlainObject(value)) {
    return value.width
  }

  return value
}
