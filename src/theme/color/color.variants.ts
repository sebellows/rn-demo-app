import { ColorAccents, ColorSchemes, ColorVariants } from './color.types'
import { palette } from './palette'

const neutral = palette.gray
const inverted: ColorAccents = {
  '950': '#f2f3f5',
  '900': '#e6e8ec',
  '800': '#ced2d9',
  '700': '#b6bcc6',
  '600': '#9ea6b3',
  '500': '#8690a0',
  '400': '#6e7683',
  '300': '#565d67',
  '200': '#3f434a',
  '100': '#272a2e',
  '50': '#1b1d20',
}

const colorVariants: ColorVariants = {
  primary: palette.purple,
  secondary: palette.orange,
  success: palette.green,
  danger: palette.red,
  warning: palette.yellow,
  neutral,
  inverted,
}

const invertedSchema = {
  neutral: inverted,
  inverted: neutral,
} as Pick<ColorVariants, 'neutral' | 'inverted'>
export const colorModes: ColorSchemes = {
  light: colorVariants,
  dark: {
    ...colorVariants,
    ...invertedSchema,
  },
}
