import { Feather } from '@expo/vector-icons'
import { PropsWithChildren, forwardRef } from 'react'
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  AllProps,
  all,
} from '@shopify/restyle'
import { IconProps as ExpoIconProps } from '@expo/vector-icons/build/createIconSet'

import { Theme } from '../theme'
import { IconSizeKey, parseIconSize } from '../theme/styles'

export type IconProps = ExpoIconProps<string> &
  AllProps<Theme> &
  VariantProps<Theme, 'iconVariants'>

const IconBase = createRestyleComponent<PropsWithChildren<IconProps>, Theme>(
  [...all, createVariant({ themeKey: 'iconVariants' })],
  Feather,
)

const Icon = forwardRef<typeof IconBase, Omit<IconProps, 'size'> & { size?: IconSizeKey | number }>(
  ({ name, size: currentSize = 'small', ...props }, ref) => {
    const size = parseIconSize(currentSize)

    return <IconBase ref={ref} name={name} fontSize={size} {...props} />
  },
)

Icon.displayName = 'Icon'

export { Icon }
