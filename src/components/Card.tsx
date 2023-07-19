import { createStyleComponent, createVariant } from '../style-utils'

const variant = createVariant({
  themeKey: 'cardVariants',
})

export const Card = createStyleComponent([variant])
