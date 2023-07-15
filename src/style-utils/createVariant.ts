import { StyleSheet } from 'react-native'

import {
  ResponsiveValue,
  StyleFunctionContainer,
  StyleFunction,
  SafeVariantKey,
  RootTheme,
  SafeVariants,
} from './types'
import { createStyleFunction } from './createStyleFunction'
import { all, AllProps } from './styleFunctions'
import { composeStyleFunctions } from './composeStyleFunctions'

const allStyleFunctions = composeStyleFunctions(all)

// With Custom Prop Name
function createVariant<
  TTheme extends RootTheme,
  K extends SafeVariantKey<TTheme> = SafeVariantKey<TTheme>,
  P extends keyof any = keyof any,
>(params: {
  property: P
  themeKey: K
  defaults?: AllProps<TTheme>
}): StyleFunctionContainer<VariantProps<TTheme, K, P>, TTheme, P, K>
// Without Custom Prop Name
function createVariant<
  TTheme extends RootTheme,
  K extends SafeVariantKey<TTheme> = SafeVariantKey<TTheme>,
>(params: {
  themeKey: K
  defaults?: AllProps<TTheme>
}): StyleFunctionContainer<VariantProps<TTheme, K>, TTheme, 'variant', K>
function createVariant<
  TTheme extends RootTheme,
  K extends keyof SafeVariants<TTheme> = keyof SafeVariants<TTheme>,
  P extends keyof any = keyof any,
  TProps extends VariantProps<TTheme, K, P> = VariantProps<TTheme, K, P>,
>({
  property = 'variant' as P,
  themeKey,
  defaults,
}: {
  property?: P
  themeKey: K
  defaults?: AllProps<TTheme>
}) {
  const styleFunction = createStyleFunction<TTheme, TProps, P, K>({
    property,
    themeKey,
  })
  const func: StyleFunction<TProps, TTheme> = (props, { theme, dimensions }) => {
    const expandedProps = styleFunction.func(props, { theme, dimensions })[property]

    const themeVariant = theme[themeKey]
    const variantDefaults = themeVariant ? (themeVariant.defaults as Partial<AllProps<TTheme>>) : {}

    if (!expandedProps && !defaults && !variantDefaults) return {}

    return StyleSheet.flatten(
      allStyleFunctions.buildStyle(
        { ...defaults, ...variantDefaults, ...expandedProps },
        {
          theme,
          dimensions,
        },
      ),
    )
  }
  return {
    property,
    themeKey,
    variant: true,
    func,
  }
}

export type VariantProps<
  TTheme extends RootTheme,
  K extends SafeVariantKey<TTheme> = SafeVariantKey<TTheme>,
  Property extends keyof any = 'variant',
> = {
  [key in Property]?: ResponsiveValue<keyof Omit<TTheme[K], 'defaults'>, TTheme['breakpoints']>
}

export { createVariant }
