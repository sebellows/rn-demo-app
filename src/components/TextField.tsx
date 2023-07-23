import { TextInput as RNTextInput } from 'react-native'
import { ComponentProps, PropsWithChildren } from 'react'
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  AllProps,
  all,
} from '@shopify/restyle'

import { Theme } from '../theme'

type RestyleProps = AllProps<Theme> & VariantProps<Theme, 'textInputVariants'>

type TextFieldProps = RestyleProps & Omit<ComponentProps<typeof RNTextInput>, keyof RestyleProps>

const TextField = createRestyleComponent<PropsWithChildren<TextFieldProps>, Theme>(
  [...all, createVariant({ themeKey: 'textInputVariants' })],
  RNTextInput,
)

TextField.displayName = 'TextField'

export { TextField }
