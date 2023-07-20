import { StyleSheet } from 'react-native'
import { BaseTheme, createTheme } from '@shopify/restyle'

import { baseColors, colorModes } from './color'
import { IconSize } from './styles'
import { buttonVariants } from './buttonStyles'

let scheme = colorModes.light
const bodyColors = scheme.neutral
let bg = bodyColors['50']
let fg = bodyColors['950']

const colors: BaseTheme['colors'] = {
  bodyBg: bg,
  bodyFg: fg,
  baseBorderColor: 'rgba(0, 0, 0, 0.125)',

  mutedBg: bodyColors['300'],
  mutedFg: bodyColors['700'],

  neutral: scheme.neutral['500'],
  neutralLight: scheme.neutral['300'],
  neutralDark: scheme.neutral['700'],
  neutralMuted: scheme.neutral['200'],
  neutralFg: baseColors.white,

  primary: scheme.primary['500'],
  primaryLight: scheme.primary['300'],
  primaryDark: scheme.primary['700'],
  primaryMuted: scheme.primary['200'],
  primaryFg: baseColors.white,

  secondary: scheme.secondary['500'],
  secondaryLight: scheme.secondary['300'],
  secondaryDark: scheme.secondary['700'],
  secondaryFg: baseColors.white,
  secondaryMuted: scheme.secondary['200'],

  success: scheme.success['500'],
  successLight: scheme.success['300'],
  successDark: scheme.success['700'],
  successFg: baseColors.white,
  successMuted: scheme.success['200'],

  warning: scheme.warning['500'],
  warningLight: scheme.warning['300'],
  warningDark: scheme.warning['700'],
  warningFg: baseColors.white,
  warningMuted: scheme.warning['200'],

  danger: scheme.danger['500'],
  dangerLight: scheme.danger['300'],
  dangerDark: scheme.danger['700'],
  dangerFg: baseColors.white,
  dangerMuted: scheme.danger['200'],
}

const themeConfig = {
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  border: {
    thin: 0.5,
    base: 1,
    thick: 2,
    chunky: 5,
    default: 'baseBorderColor',
    primary: scheme.primary['500'],
    secondary: scheme.secondary['500'],
    neutral: scheme.neutral['500'],
    success: scheme.success['500'],
    danger: scheme.danger['500'],
    warning: scheme.warning['500'],
    muted: scheme.neutral['300'],
  },
  borderRadii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    iconSmall: IconSize.small / 2,
    iconLarge: IconSize.large / 2,
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
  zIndices: {
    elevated: 1,
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
      color: 'mutedFg',
    },
    buttonLabel: {
      fontWeight: 700,
    },
  },
  buttonVariants: {
    defaults: {
      backgroundColor: 'bodyBg',
      color: 'bodyFg',
      shadowOpacity: 0.2,
      borderWidth: 1,
      borderColor: 'baseBorderColor',
      padding: {
        phone: '2',
        tablet: '4',
      },
    },
    ...buttonVariants,
  },
  cardVariants: {
    defaults: {
      backgroundColor: 'bodyBg',
      color: 'bodyFg',
      shadowOpacity: 0.3,
      borderWidth: 1,
      borderColor: 'baseBorderColor',
      padding: {
        phone: '2',
        tablet: '4',
      },
    },
    primary: {
      backgroundColor: 'primaryMuted',
      color: 'bodyFg',
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: 'secondaryMuted',
      color: 'bodyFg',
      shadowOpacity: 0.1,
    },
    elevated: {
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
  iconVariants: {
    defaults: {},
    small: {
      width: IconSize.small,
      height: IconSize.small,
    },
    large: {
      width: IconSize.large,
      height: IconSize.large,
    },
  },
}

const theme = createTheme(themeConfig)

export type Theme = typeof theme

export const updateTheme = (isDark?: boolean): Theme => {
  if (isDark && scheme === colorModes.light) {
    scheme = colorModes.dark
  } else if (!isDark && scheme === colorModes.dark) {
    scheme = colorModes.light
  }

  return theme
}
