import { StyleSheet, ViewStyle } from 'react-native'

import { StyleFunctionContainer, Dimensions, RNStyle, StyleFunction, Theme } from './types'
import { AllProps } from './styleFunctions'

const composeStyleFunctions = <TProps extends AllProps = AllProps>(
  styleFunctions: (StyleFunctionContainer<TProps> | StyleFunctionContainer<TProps>[])[],
) => {
  const flattenedStyleFunctions = styleFunctions.reduce(
    (acc: StyleFunctionContainer<TProps>[], item) => {
      return acc.concat(item)
    },
    [],
  )

  const properties = flattenedStyleFunctions.map(styleFunc => {
    return styleFunc.property
  })
  const propertiesMap = properties.reduce(
    (acc, prop) => ({ ...acc, [prop]: true }),
    {} as { [key in keyof TProps]: true },
  )

  const funcsMap = flattenedStyleFunctions.reduce(
    (acc, each) => ({ [each.property]: each.func, ...acc }),
    {} as { [key in keyof TProps]: StyleFunction<TProps, string> },
  )

  // TInputProps is a superset of TProps since TProps are only the Style Props
  const buildStyle = (
    props: TProps,
    {
      theme,
      dimensions,
    }: {
      theme: Theme
      dimensions: Dimensions | null
    },
  ): RNStyle => {
    const styles: ViewStyle = {}
    const options = { theme, dimensions }
    // We make the assumption that the props object won't have extra prototype keys.
    // eslint-disable-next-line guard-for-in
    for (const key in props) {
      const mappedProps = funcsMap[key](props, options)
      // eslint-disable-next-line guard-for-in
      for (const mappedKey in mappedProps) {
        styles[mappedKey as keyof ViewStyle] = mappedProps[mappedKey]
      }
    }

    const { stylesheet } = StyleSheet.create({ stylesheet: styles })

    return stylesheet
  }

  return {
    buildStyle,
    properties,
    propertiesMap,
  }
}

export { composeStyleFunctions }
