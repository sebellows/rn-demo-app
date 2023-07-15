import React, { ComponentPropsWithoutRef } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { useStyle } from '../hooks/useStyle'
import { position, PositionProps } from '../styleFunctions'
import { createVariant, VariantProps } from '../createVariant'
import { createTheme } from '../../theme'
import { composeStyleFunctions } from '../composeStyleFunctions'

const theme = createTheme('light', {
  colors: {},
  spacing: {},
  buttonVariants: {
    defaults: {},
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
  zIndices: {
    phone: 5,
  },
})

type Theme = typeof theme

type Props = VariantProps<Theme, 'buttonVariants'> &
  PositionProps<Theme> &
  ComponentPropsWithoutRef<typeof TouchableOpacity>

const styleFunctions = [position, createVariant<Theme>({ themeKey: 'buttonVariants' })]

const composedStyleFunction = composeStyleFunctions<Theme, Props>(styleFunctions)

export function Button({ title, ...rest }: Props & { title: string }) {
  const props = useStyle(composedStyleFunction, rest)
  return (
    <TouchableOpacity {...props}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}
