import { getThemeValue } from './utilities'
import {
  Dimensions,
  StyleFunction,
  RNStyleProperty,
  StyleTransformer,
  AnyProps,
  RootTheme,
} from './types'
import { getResponsiveValue } from './utilities/getResponsiveValue'
import { isString, isUndefined } from '../utils'

const getMemoizedMapHashKey = (
  dimensions: Dimensions | null,
  themeKey: string,
  property: string,
  value: string | number | boolean,
) => {
  return `${dimensions?.height}x${dimensions?.width}-${themeKey}-${property}-${value}`
}

const memoizedThemes: WeakMap<RootTheme, any> = new WeakMap()

const createStyleFunction = <
  TTheme extends RootTheme = RootTheme,
  TProps extends AnyProps = AnyProps,
  P extends keyof TProps = keyof TProps,
  K extends keyof TTheme = keyof TTheme,
  S extends RNStyleProperty = RNStyleProperty,
>({
  property,
  transform,
  styleProperty,
  themeKey,
}: {
  property: P
  transform?: StyleTransformer<TTheme, K, TProps[P]>
  styleProperty?: S
  themeKey?: K
}) => {
  const styleProp = styleProperty || property.toString()

  const func: StyleFunction<TProps, TTheme, S | P> = (props, { theme, dimensions }) => {
    if (memoizedThemes.get(theme) == null) {
      memoizedThemes.set(theme, {})
    }

    const memoizedMapHashKey = (() => {
      if (!isString(themeKey) || !isString(property) || isUndefined(props[property])) {
        return null
      }

      /**
       * The following code is required to ensure all variants that have different breakpoint objects
       * are turned into unique strings. By simply retuning String(props[property]), two different
       * variants with breakpoints will return the same string.
       *
       * For example, if we have the following variant:
       *
       * spacingVariant: {
       *   defaults: {},
       *   noPadding: {
       *     phone: 'none',
       *     tablet: 'none',
       *   },
       *   mediumPadding: {
       *     phone: 'm',
       *     tablet: 'm',
       *   }
       * }
       *
       * using `String(props[property])` will turn both variants into `[object Object]`, making them
       * equivalent and resulting in separate styles being memoized into the same hash key.
       * By building the propertyValue string ourselves from the breakpoints, we can format the
       * variants to be "phone:nonetablet:none" and "phone:mtablet:m" respectively, making each
       * memoized hash key unique.
       */
      let propertyValue = ''
      if (typeof props[property] === 'object') {
        for (const [breakpoint, value] of Object.entries(props[property])) {
          propertyValue += `${breakpoint}:${value}`
        }
      } else {
        propertyValue = String(props[property])
      }

      return getMemoizedMapHashKey(dimensions, String(themeKey), String(property), propertyValue)
    })()

    if (memoizedMapHashKey != null) {
      const memoizedValue = memoizedThemes.get(theme)[memoizedMapHashKey]
      if (memoizedValue != null) {
        return memoizedValue
      }
    }

    const value = (() => {
      if (isResponsiveTheme(theme) && dimensions) {
        return getResponsiveValue(props[property], {
          theme,
          dimensions,
          themeKey,
          transform,
        })
      } else {
        return getThemeValue(props[property], { theme, themeKey, transform })
      }
    })()

    if (isUndefined(value)) return {}

    if (memoizedMapHashKey != null) {
      memoizedThemes.get(theme)[memoizedMapHashKey] = {
        [styleProp]: value,
      }
      return memoizedThemes.get(theme)[memoizedMapHashKey]
    }

    return {
      [styleProp]: value,
    } as { [key in S | P]?: typeof value }
  }

  return {
    property,
    themeKey,
    variant: false,
    func,
  }
}

function isResponsiveTheme<TTheme extends RootTheme>(theme: TTheme): theme is TTheme {
  if (theme.breakpoints !== undefined) {
    return true
  }
  return false
}

export { createStyleFunction }
