import { StyleSheet } from 'react-native'

import {
  ResponsiveValue,
  StyleFunctionContainer,
  StyleFunction,
  Theme,
  ThemeKey,
  SafeVariantKey,
} from './types'
import { createStyleFunction } from './createStyleFunction'
import { all, AllProps } from './styleFunctions'
import { composeStyleFunctions } from './composeStyleFunctions'

const allStyleFunctions = composeStyleFunctions(all)

// With Custom Prop Name
function createVariant<
  K extends SafeVariantKey = SafeVariantKey,
  P extends keyof any = keyof any,
>(params: {
  property: P
  themeKey: K
  defaults?: AllProps
}): StyleFunctionContainer<VariantProps<K, P>, P, K>
// Without Custom Prop Name
function createVariant<K extends SafeVariantKey = SafeVariantKey>(params: {
  themeKey: K
  defaults?: AllProps
}): StyleFunctionContainer<VariantProps<K>, 'variant', K>
function createVariant<
  K extends SafeVariantKey = SafeVariantKey,
  P extends keyof any = keyof any,
  TProps extends VariantProps<K, P> = VariantProps<K, P>,
>({
  property = 'variant' as P,
  themeKey,
  defaults,
}: {
  property?: P
  themeKey: K
  defaults?: AllProps
}) {
  const styleFunction = createStyleFunction<TProps, P, K>({
    property,
    themeKey,
  })
  const func: StyleFunction<TProps> = (props, { theme, dimensions }) => {
    const expandedProps = styleFunction.func(props, { theme, dimensions })[property]

    const themeVariant = theme[themeKey]
    const variantDefaults = themeVariant ? (themeVariant.defaults as Partial<AllProps>) : {}

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
  K extends SafeVariantKey = SafeVariantKey,
  Property extends keyof any = 'variant',
> = {
  [key in Property]?: ResponsiveValue<keyof Omit<Theme[K], 'defaults'>, Theme['breakpoints']>
}

export { createVariant }
