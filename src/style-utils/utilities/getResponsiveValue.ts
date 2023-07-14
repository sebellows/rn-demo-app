import {
  Dimensions,
  PropValue,
  ResponsiveValue,
  StyleTransformer,
  ThemeKey,
  Breakpoints,
  Theme,
  ThemeValue,
} from '../types'

import { getThemeValue } from './getThemeValue'
import { getValueForScreenSize } from './getValueForScreenSize'
import { isResponsiveObjectValue } from './isResponsiveObjectValue'

/**
 * Gets actual value for a given `themeKey` based on `breakpoints` and current `dimensions`.
 */
export const getResponsiveValue = <TVal extends PropValue, K extends ThemeKey>(
  propValue: ResponsiveValue<TVal, Breakpoints>,
  {
    theme,
    transform,
    dimensions,
    themeKey,
  }: {
    theme: Theme
    transform?: StyleTransformer<K, TVal>
    dimensions: Dimensions
    themeKey?: K
  },
): (K extends ThemeKey ? ThemeValue<K> : never) | TVal | null | undefined => {
  const val = isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue

  return getThemeValue(val, { theme, transform, themeKey })
}
