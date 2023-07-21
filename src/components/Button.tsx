import { Pressable, PressableProps } from 'react-native'
import { forwardRef } from 'react'
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  AllProps,
  all,
} from '@shopify/restyle'

import { Theme } from '../theme'

export const ButtonSizes = ['xs', 'xsmall', 'sm', 'small', 'md', 'medium', 'lg', 'large'] as const
export type ButtonSize = (typeof ButtonSizes)[number]

export const ButtonModes = ['text', 'elevated'] as const
export type ButtonMode = (typeof ButtonModes)[number]

export type ButtonProps = PressableProps &
  VariantProps<Theme, 'buttonVariants'> &
  AllProps<Theme> & {
    size?: ButtonSize
    mode?: ButtonMode
    block?: boolean
  }

const ButtonBase = createRestyleComponent<ButtonProps, Theme>(
  [...all, createVariant({ themeKey: 'buttonVariants' })],
  Pressable,
)

export type ButtonBase = typeof ButtonBase

const isTextButton = (mode?: ButtonMode) => mode === 'text'

export const getButtonSize = (size?: ButtonSize | string, ...additionalSizes: string[]) => {
  if (size === 'xs' || size === 'xsmall') return 'xsmall'
  if (size === 'sm' || size === 'small') return 'small'
  if (size === 'md' || size === 'medium') return 'medium'
  if (size === 'lg' || size === 'large') return 'large'

  if (additionalSizes.length) {
    if (additionalSizes.includes(size as string)) {
      return size
    }
  }

  return undefined
}

const resolveButtonSizeStyles = (size?: ButtonSize) => {
  const trueSize = getButtonSize(size)

  if (!trueSize) return undefined

  let sizeStyles: Record<string, ButtonProps> = {
    xsmall: { minWidth: 'auto', px: '1', py: '0.5' },
    small: { px: '2', py: '1' },
    medium: { px: '3', py: '1.5' },
    large: { px: '4', py: '2' },
  }

  return sizeStyles[trueSize]
}

export const Button = forwardRef<typeof ButtonBase, ButtonProps>(
  ({ children, size, mode, block, ...props }, ref) => {
    const sizeStyles = resolveButtonSizeStyles(size)
    const borderWidth = isTextButton(mode) ? 0 : 1
    const width = block ? '100%' : undefined

    return (
      <ButtonBase ref={ref} {...sizeStyles} borderWidth={borderWidth} width={width} {...props}>
        {children}
      </ButtonBase>
    )
  },
)
