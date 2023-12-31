export const IconSize = {
  xs: 12,
  xsmall: 12,
  sm: 16,
  small: 16,
  md: 24,
  medium: 24,
  lg: 48,
  large: 48,
  xl: 64,
  xlarge: 64,
}

export type IconSizeKey = keyof typeof IconSize

export const parseIconSize = (size: IconSizeKey | number): number =>
  typeof size === 'number' ? size : size in IconSize ? IconSize[size] : IconSize.small

/**
 * Uncomment in the future if moving to SVG icons instead
 * of an icon font-family coming from @expo/vector-icons.
 */
export const iconDimensionsFromSize = (size: IconSizeKey | number) => {
  const value = parseIconSize(size)

  return {
    width: value,
    height: value,
  }
}
