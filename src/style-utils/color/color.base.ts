import {
  ColorPaletteWithoutAccents,
  CssNonColorValues,
  NonColorValue,
  SimpleColorValues,
} from './color.types'

const blackAndWhite: SimpleColorValues = {
  white: '#ffffff',
  black: '#000000',
}
const nonColorValues: CssNonColorValues = {
  current: 'current' as NonColorValue,
  inherit: 'inherit' as NonColorValue,
  transparent: 'transparent' as NonColorValue,
}

export const baseColors: ColorPaletteWithoutAccents = {
  ...blackAndWhite,
  ...nonColorValues,
}
