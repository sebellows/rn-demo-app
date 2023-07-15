import { AtLeastOneResponsiveValue, Breakpoints, ResponsiveValue, RootTheme } from '../types'

import { getKeys } from '@/utils'

export const isResponsiveObjectValue = <TTheme extends RootTheme, TVal>(
  val: ResponsiveValue<TVal, Breakpoints>,
  theme: TTheme,
): val is AtLeastOneResponsiveValue<TVal, Breakpoints> => {
  if (!val || typeof val !== 'object') return false

  return getKeys(val).every(key => theme.breakpoints[key as string] !== undefined)
}
