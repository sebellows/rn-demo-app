import { ColorMode, ColorModes } from './color.types'

const colorModeStrings = JSON.parse(JSON.stringify(ColorModes)) as string[]

export const getValidColorMode = (mode: string | ColorMode): ColorMode => {
  let colorMode: ColorMode = 'light'

  if (colorModeStrings.includes(mode)) {
    colorMode = mode as ColorMode
  }

  return colorMode
}
