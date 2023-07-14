import { BaseTheme, PropValue, StyleTransformer, Theme, ThemeKey } from '../types'

function isThemeKey<Key extends ThemeKey>(theme: Theme, key: unknown): key is Key {
  if (typeof key === 'string' && key in theme && theme[key] !== undefined) {
    return true
  }
  return false
}

/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
export function getThemeValue<TVal extends PropValue, K extends ThemeKey = ThemeKey>(
  value: TVal | undefined,
  {
    theme,
    transform,
    themeKey,
  }: {
    theme: Theme
    transform?: StyleTransformer<K, TVal>
    themeKey?: K
  },
) {
  if (transform) return transform({ value, theme, themeKey })
  if (isThemeKey(theme, themeKey)) {
    if (value && theme[themeKey][value as string] === undefined)
      throw new Error(`Value '${value}' does not exist in theme['${String(themeKey)}']`)

    return value ? theme[themeKey][value as string] : value
  }

  return value
}
