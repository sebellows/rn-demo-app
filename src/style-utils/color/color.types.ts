export const ColorAccents = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const

export type ColorAccent = (typeof ColorAccents)[number]

export type ColorValue = string

export type ColorAccents = Record<ColorAccent, ColorValue>

export const ColorsWithoutAccents = ['black', 'white'] as const
export type ColorWithoutAccents = (typeof ColorsWithoutAccents)[number]
export const NonColorValues = ['current', 'inherit', 'transparent'] as const
export type NonColorValue = (typeof NonColorValues)[number]

export const ColorsWithAccents = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'magenta',
] as const

export type ColorWithAccents = (typeof ColorsWithAccents)[number]

export type SimpleColorValues = Record<ColorWithoutAccents, ColorValue>
export type CssNonColorValues = Record<NonColorValue, NonColorValue>
export type ColorPaletteWithAccents = Record<ColorWithAccents, ColorAccents>
export type ColorPaletteWithoutAccents = SimpleColorValues & CssNonColorValues

export type ColorPalette = ColorPaletteWithAccents & ColorPaletteWithoutAccents

export const ColorVariantNames = [
  'neutral',
  'inverted',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
] as const

export type ColorVariant = (typeof ColorVariantNames)[number]

export type ColorVariants = Record<ColorVariant, ColorAccents>

// export type ColorVariables<
//   CVars extends { [key: string]: string } = { [key: string]: string },
//   CName extends keyof CVars = keyof CVars,
// > = Record<CName, CVars[CName]>
// export type ColorVariables = Record<string, string>
