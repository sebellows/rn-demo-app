import { ValueOf } from 'type-fest'
import {
  Dimensions,
  PropValue,
  ResponsiveValue,
  StyleTransformer,
  Breakpoints,
  RootTheme,
} from '../types'

import { getThemeValue } from './getThemeValue'
import { getValueForScreenSize } from './getValueForScreenSize'
import { isResponsiveObjectValue } from './isResponsiveObjectValue'

/**
 * Gets actual value for a given `themeKey` based on `breakpoints` and current `dimensions`.
 */
export const getResponsiveValue = <
  TVal extends PropValue,
  TTheme extends RootTheme,
  K extends keyof TTheme,
>(
  propValue: ResponsiveValue<TVal, Breakpoints>,
  {
    theme,
    transform,
    dimensions,
    themeKey,
  }: {
    theme: TTheme
    transform?: StyleTransformer<TTheme, K, TVal>
    dimensions: Dimensions
    themeKey?: K
  },
): (K extends keyof TTheme ? ValueOf<TTheme, K> : never) | TVal | null | undefined => {
  const val = isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue

  return getThemeValue(val, { theme, transform, themeKey })
}
