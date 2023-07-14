import { Theme } from './types'

// Enforces proper shape for theme without throwing away the user specific values
const createTheme = (themeObject: Theme): Theme => themeObject

export { createTheme }
