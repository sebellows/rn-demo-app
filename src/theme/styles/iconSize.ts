import { Dimensions } from '@shopify/restyle'
export const IconSize = Object.freeze({
  small: 24,
  large: 48,
  xlarge: 64,
})

export type IconSizeKey = keyof typeof IconSize

export const parseIconSize = (size: IconSizeKey | number): number =>
  typeof size === 'number' ? size : size in IconSize ? IconSize[size] : IconSize.small

export const iconSizeProps = (size: IconSizeKey | number) => {
  const value = parseIconSize(size)

  return {
    width: value,
    height: value,
  }
}
