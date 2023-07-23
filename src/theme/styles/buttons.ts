import { AllProps, BaseTheme } from '@shopify/restyle'

import { ColorVariant, ColorVariantNames } from '../color'

type ButtonVariants = Record<ColorVariant | `${ColorVariant}Outline`, Partial<AllProps<BaseTheme>>>

export const buttonVariants = ColorVariantNames.reduce((acc, variant) => {
  acc[variant] = {
    backgroundColor: variant,
    color: `${variant}Fg`,
  }
  acc[`${variant}Outline`] = {
    backgroundColor: 'bodyBg',
    borderColor: variant,
    // borderWidth: 1,
    color: variant,
  }

  return acc
}, {} as Partial<ButtonVariants>) as ButtonVariants
