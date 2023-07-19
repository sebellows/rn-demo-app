import { createRestyleComponent, createVariant } from '@shopify/restyle'

const variant = createVariant({
  themeKey: 'cardVariants',
})

export const Card = createRestyleComponent([variant])
