import { StyleSheet } from 'react-native'
import { createTheme } from '@shopify/restyle'

import { baseColors, colorModes, palette } from './color'

let scheme = colorModes.light
const bodyColors = scheme.neutral
let bg = bodyColors['50']
let fg = bodyColors['950']

const colors = {
  bodyBg: bg,
  bodyFg: fg,
  baseBorderColor: 'rgba(0, 0, 0, 0.125)',

  mutedBg: bodyColors['300'],
  mutedFg: bodyColors['700'],

  primaryText: scheme.primary['500'],
  primaryFg: baseColors.white,
  primaryBg: scheme.primary['500'],
  primaryBgMuted: scheme.primary['200'],

  secondaryText: scheme.secondary['500'],
  secondaryFg: baseColors.white,
  secondaryBg: scheme.secondary['500'],
  secondaryBgMuted: scheme.secondary['200'],

  successText: scheme.success['500'],
  successFg: baseColors.white,
  successBg: scheme.success['500'],
  successBgMuted: scheme.success['200'],

  warningText: scheme.warning['500'],
  warningFg: baseColors.white,
  warningBg: scheme.warning['500'],
  warningBgMuted: scheme.warning['200'],

  dangerText: scheme.danger['500'],
  dangerFg: baseColors.white,
  dangerBg: scheme.danger['500'],
  dangerBgMuted: scheme.danger['200'],
}

const themeConfig = {
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  colors,
  spacing: {
    '0': 0,
    px: 1,
    '0.5': 2,
    '1': 4,
    '1.5': 6,
    '2': 8,
    '2.5': 10,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 28,
    '8': 32,
    '9': 36,
    '10': 40,
    '11': 44,
    '12': 48,
    '13': 56,
    '14': 64,
  },
  textVariants: {
    defaults: {
      color: colors.bodyFg,
    },
    h1: {
      fontSize: 36,
      fontWeight: 800,
      lineHeight: 40,
      color: colors.bodyFg,
    },
    h2: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 27,
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 24,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 24,
      textTransform: 'uppercase',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    small: {
      fontSize: 12,
      lineHeight: 18,
      color: colors.mutedFg,
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: colors.bodyBg,
      color: colors.bodyFg,
      shadowOpacity: 0.3,
      borderWidth: 1,
      borderColor: colors.baseBorderColor,
      padding: {
        phone: '2',
        tablet: '4',
      },
    },
    primary: {
      backgroundColor: scheme.primary['200'],
      color: palette.gray['950'],
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: scheme.secondary['200'],
      color: palette.gray['950'],
      shadowOpacity: 0.1,
    },
    elevated: {
      shadowColor: baseColors.black,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
  layoutVariants: {
    defaults: {},
    centerAll: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    absoluteFill: StyleSheet.absoluteFillObject,
  },
}

const theme = createTheme(themeConfig)

export type Theme = typeof theme

export const resolveThemeColorMode = (isDark?: boolean): Theme => {
  if (isDark && scheme === colorModes.light) {
    scheme = colorModes.dark
  } else if (!isDark && scheme === colorModes.dark) {
    scheme = colorModes.light
  }

  return theme
}
