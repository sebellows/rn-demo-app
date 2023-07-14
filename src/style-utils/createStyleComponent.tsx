import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { composeStyleFunctions } from './composeStyleFunctions'
import { AnyProps, StyleFunctionContainer } from './types'
import { useStyle } from './hooks/useStyle'

export type StyledComponentProps<
  C extends React.ComponentType<any> = typeof View,
  Props extends AnyProps = AnyProps,
> = React.ComponentProps<C> & PropsWithChildren<Props>

const createStyleComponent = <Props extends StyledComponentProps>(
  styleFunctions: (StyleFunctionContainer<Props> | StyleFunctionContainer<Props>[])[],
  BaseComponent: React.ComponentType<any> = View,
) => {
  const composedStyleFunction = composeStyleFunctions(styleFunctions)

  const StyleComponent = React.forwardRef((props: Props, ref) => {
    const passedProps = useStyle(composedStyleFunction, props)
    return <BaseComponent ref={ref} {...passedProps} />
  })

  type StyleComponentType = typeof StyleComponent

  return StyleComponent as StyleComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyleComponentType>>
  }
}

export { createStyleComponent }
