import React from 'react'
import { StyleSheet } from 'react-native'

import {
  AppTheme,
  ColorMode,
  ColorVariables,
  CustomTheme,
  RootTheme,
  ThemeColors,
  baseColors,
} from '../style-utils'
import { palette } from '../style-utils/color/palette'
import { colorModes } from '../style-utils/color/color.variants'
import { getValidColorMode } from '../style-utils/color/color.validators'
import { isPlainObject } from '../utils'
import { SetOptional } from 'type-fest'

const colorVariables = (colorMode: ColorMode, variables: ColorVariables = {}): ColorVariables => {
  const mode = getValidColorMode(colorMode)
  const scheme = colorModes[mode]
  const bodyColors = scheme.neutral
  const bg = bodyColors['50']
  const fg = bodyColors['950']

  return {
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

    cardText: fg,
    cardBackground: bg,
    cardTextPrimary: palette.gray['950'],
    cardBackgroundPrimary: scheme.primary['200'],
    cardTextSecondary: palette.gray['950'],
    cardBackgroundSecondary: scheme.secondary['200'],

    ...variables,
  }
}

const resolveColorScheme = (mode: ColorMode, colors: CustomTheme['colors']): ThemeColors => {
  let colorVars: ColorVariables = {}

  if (colors && isPlainObject(colors?.variables)) {
    colorVars = colorVariables(mode, colors.variables)
  }

  return {
    ...colorVars,
    ...palette,
    ...colorModes.light,
  } as ThemeColors
}

const customThemeDefault = (customTheme: SetOptional<CustomTheme, 'colors'> = {}): CustomTheme => ({
  breakpoints: {},
  colors: { variables: {} },
  spacing: {},
  ...customTheme,
  // textVariants: { defaults: {}, title: { fontSize: 35 } },
}) // as unknown as CustomTheme

// Enforces proper shape for theme without throwing away the user specific values
export const createTheme = (mode: ColorMode = 'light', customTheme = {}) => {
  const {
    breakpoints = {},
    colors: customColors,
    cardVariants = {},
    layoutVariants = {},
    spacing = {},
    textVariants = {},
    ..._customTheme
  } = customThemeDefault(customTheme)
  const colors = resolveColorScheme(mode, customColors)

  const baseTheme: RootTheme = {
    mode,
    breakpoints: {
      phone: 0,
      tablet: 768,
      ...breakpoints,
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
      ...spacing,
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
      ...textVariants,
    },
    cardVariants: {
      defaults: {
        borderWidth: 1,
        borderColor: colors.baseBorderColor,
        borderRadius: 6,
        padding: {
          phone: '2',
          tablet: '4',
        },
      },
      base: {
        backgroundColor: colors.bodyBg,
        color: colors.bodyFg,
        shadowOpacity: 0.3,
      },
      primary: {
        backgroundColor: colors.cardBackgroundPrimary,
        color: colors.cardTextPrimary,
        shadowOpacity: 0.3,
      },
      secondary: {
        backgroundColor: colors.cardBackgroundSecondary,
        color: colors.cardTextSecondary,
        shadowOpacity: 0.1,
      },
      elevated: {
        shadowColor: colors.black,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        elevation: 5,
      },
      ...cardVariants,
    },
    layoutVariants: {
      defaults: {},
      centerAll: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      absoluteFill: StyleSheet.absoluteFillObject,
      ...layoutVariants,
    },
  }

  const theme = { ...baseTheme, ..._customTheme } as AppTheme

  return theme
}
