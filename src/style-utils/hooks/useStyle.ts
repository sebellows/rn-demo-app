import { useMemo } from 'react'
import { StyleProp, useWindowDimensions } from 'react-native'

import { Theme, RNStyle, Dimensions, AnyProps } from '../types'

import { useTheme } from './useTheme'

const filterStyleProps = <TStyleProps, TProps extends { [key: string]: unknown } & TStyleProps>(
  componentProps: TProps,
  omitPropertiesMap: { [key in keyof TProps]: boolean },
) => {
  const cleanProps: TProps = {} as TProps
  const styleProps: TProps & { variant?: unknown } = {} as TProps
  let serializedStyleProps = ''
  if (omitPropertiesMap.variant) {
    styleProps.variant = componentProps.variant ?? 'defaults'
  }
  for (const key in componentProps) {
    if (omitPropertiesMap[key as keyof TProps]) {
      styleProps[key] = componentProps[key]
      serializedStyleProps += `${String(key)}:${componentProps[key]};`
    } else {
      cleanProps[key] = componentProps[key]
    }
  }

  const keys = { cleanProps, styleProps, serializedStyleProps }
  return keys
}

const useStyle = <
  TStyleProps extends AnyProps,
  TProps extends TStyleProps & { style?: StyleProp<RNStyle> },
>(
  composedStyleFunction: {
    buildStyle: <TInputProps extends TProps>(
      props: TInputProps,
      {
        theme,
        dimensions,
      }: {
        theme: Theme
        dimensions: Dimensions | null
      },
    ) => RNStyle
    properties: (keyof TProps)[]
    propertiesMap: { [key in keyof TProps]: boolean }
  },
  props: TProps,
) => {
  const theme = useTheme()

  // Theme should not change between renders, so we can disable rules-of-hooks
  // We want to avoid calling useWindowDimensions if breakpoints are not defined
  // as this hook is called extremely often and incurs some performance hit.
  const dimensions = theme.breakpoints
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useWindowDimensions()
    : null

  const { cleanProps, styleProps, serializedStyleProps } = filterStyleProps(
    props,
    composedStyleFunction.propertiesMap,
  )

  const calculatedStyle: StyleProp<RNStyle> = useMemo(() => {
    const style = composedStyleFunction.buildStyle(styleProps as TProps, {
      theme,
      dimensions,
    })

    const styleProp: StyleProp<RNStyle> = props.style
    if (typeof styleProp === 'function') {
      return ((...args: any[]) => [style, styleProp(...args)].filter(Boolean)) as StyleProp<RNStyle>
    }
    return [style, styleProp].filter(Boolean)

    // We disable the exhaustive deps rule here in order to trigger the useMemo
    // when the serialized string of styleProps changes instead of the object
    // reference which will change on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, dimensions, props.style, serializedStyleProps, composedStyleFunction])

  cleanProps.style = calculatedStyle

  return cleanProps
}

export { useStyle }
