import {
  AllProps,
  VariantProps,
  all,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle'
import { ComponentProps, ComponentType, PropsWithChildren } from 'react'
import { Theme } from '../theme'
import { View } from 'react-native'

type RestyleProps = AllProps<Theme> & VariantProps<Theme, 'cardVariants'>

export type CardProps<C extends ComponentType<any>> = PropsWithChildren<
  RestyleProps & Omit<ComponentProps<C>, keyof RestyleProps>
>

export const Card = createRestyleComponent<CardProps<typeof View>, Theme>([
  ...all,
  createVariant({
    themeKey: 'cardVariants',
  }),
])
