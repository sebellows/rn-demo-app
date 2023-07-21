import {
  AllProps,
  VariantProps,
  all,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle'
import { ComponentProps, PropsWithChildren } from 'react'
import { Theme } from '../theme'
import { View } from 'react-native'

type RestyleProps = AllProps<Theme> & VariantProps<Theme, 'cardVariants'>

type CardProps = PropsWithChildren<
  RestyleProps & Omit<ComponentProps<typeof View>, keyof RestyleProps>
>

export const Card = createRestyleComponent<CardProps, Theme>([
  ...all,
  createVariant({
    themeKey: 'cardVariants',
  }),
])
