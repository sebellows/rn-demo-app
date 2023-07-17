import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { AnyObj } from '../types'

import { composeStyleFunctions } from './composeStyleFunctions'
import { RootTheme, StyleFunctionContainer } from './types'
import { useStyle } from './hooks/useStyle'

export type StyledComponentProps<
  C extends React.ComponentType<any> = typeof View,
  Props extends AnyObj = AnyObj,
> = React.ComponentPropsWithRef<C> &
  Omit<PropsWithChildren<Props>, keyof React.ComponentPropsWithRef<C>>

const createStyleComponent = <Props extends StyledComponentProps, TTheme extends RootTheme>(
  styleFunctions: (
    | StyleFunctionContainer<Props, TTheme>
    | StyleFunctionContainer<Props, TTheme>[]
  )[],
  BaseComponent: React.ComponentType<any> = View,
) => {
  const composedStyleFunction = composeStyleFunctions(styleFunctions)

  const StyleComponent = React.forwardRef<typeof BaseComponent, Props>((props, ref) => {
    const passedProps = useStyle(composedStyleFunction, props)
    return <BaseComponent ref={ref} {...passedProps} />
  })

  type StyleComponentType = typeof StyleComponent

  return StyleComponent as StyleComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyleComponentType>>
  }
}

export { createStyleComponent }
