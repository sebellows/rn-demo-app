import { PropValue, RootTheme, StyleTransformer } from '../types'

function isThemeKey<TTheme extends RootTheme, Key extends keyof TTheme>(
  theme: TTheme,
  key: unknown,
): key is Key {
  if (typeof key === 'string' && key in theme && theme[key] !== undefined) {
    return true
  }
  return false
}

/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
export function getThemeValue<
  TVal extends PropValue,
  TTheme extends RootTheme,
  K extends keyof TTheme = keyof TTheme,
>(
  value: TVal | undefined,
  {
    theme,
    transform,
    themeKey,
  }: {
    theme: TTheme
    transform?: StyleTransformer<TTheme, K, TVal>
    themeKey?: K
  },
) {
  if (isThemeKey(theme, themeKey)) {
    if (transform) return transform({ value, theme, themeKey })

    if (value && theme[themeKey][value as string] === undefined)
      throw new Error(`Value '${value}' does not exist in theme['${String(themeKey)}']`)

    return value ? theme[themeKey][value as string] : value
  }

  return value
}
