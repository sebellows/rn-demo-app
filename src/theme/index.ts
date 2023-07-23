import { BaseTheme, createTheme } from '@shopify/restyle'

import { baseColors, colorModes } from './color'
import { buttonVariants, IconSize } from './styles'

let scheme = colorModes.light
const bodyColors = scheme.neutral
let bg = bodyColors['50']
let fg = bodyColors['950']
let borderColor = 'rgba(0, 0, 0, 0.125)'

const colors: BaseTheme['colors'] = {
  // 'white', 'black', 'current', 'inherit', 'transparent'
  ...baseColors,

  bodyBg: bg,
  bodyFg: fg,
  baseBorderColor: borderColor,

  // For ReactNavigation theme configuration
  background: bg,
  card: bg,
  text: fg,
  border: borderColor,
  notification: scheme.secondary['200'],

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
  borderRadii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    pill: 24,
    circle: 9999,
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
      color: 'bodyFg',
    },
    h1: {
      fontSize: 36,
      fontWeight: 800,
      lineHeight: 40,
      color: 'bodyFg',
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
  textInputVariants: {
    defaults: {
      flex: 1,
      fontSize: 18,
    },
  },
  iconVariants: {
    defaults: {
      color: 'mutedFg',
      fontSize: IconSize.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      color: 'primary',
    },
    secondary: {
      color: 'secondary',
    },
    neutral: {
      color: 'neutral',
    },
    inverted: {
      color: 'inverted',
    },
    success: {
      color: 'success',
    },
    warning: {
      color: 'warning',
    },
    danger: {
      color: 'danger',
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
    formControl: {
      backgroundColor: 'white',
      borderColor: 'baseBorderColor',
      borderRadius: 'sm',
    },
    elevated: {
      backgroundColor: 'bodyBg',
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
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

export * from './styles'
