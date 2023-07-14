import { AtLeastOneResponsiveValue, Breakpoints, ResponsiveValue, Theme } from '../types'

import { getKeys } from '@/utils'

export const isResponsiveObjectValue = <TVal>(
  val: ResponsiveValue<TVal, Breakpoints>,
  theme: Theme,
): val is AtLeastOneResponsiveValue<TVal, Breakpoints> => {
  if (!val || typeof val !== 'object') return false

  return getKeys(val).every(key => theme.breakpoints[key as string] !== undefined)
}
