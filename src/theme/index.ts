import React from 'react'
import { StyleSheet } from 'react-native'

import { ThemeColors, baseColors, createTheme } from '../style-utils'
import { palette } from '../style-utils/color/palette'
import { colorModes } from '../style-utils/color/color.variants'

const colorVariables = (dark?: boolean): Record<string, string> => {
  const mode = dark ? colorModes.light : colorModes.dark
  const bodyColors = mode.neutral
  const bg = bodyColors['50']
  const fg = bodyColors['950']

  return {
    bodyBg: bg,
    bodyFg: fg,
    baseBorderColor: 'rgba(0, 0, 0, 0.125)',

    mutedBg: bodyColors['300'],
    mutedFg: bodyColors['700'],

    primaryFg: mode.primary['500'],
    primaryBgAccent: mode.primary['200'],
    secondaryFg: mode.secondary['500'],
    secondaryBgAccent: mode.secondary['200'],

    cardText: fg,
    cardBackground: bg,
    cardTextPrimary: baseColors.white,
    cardBackgroundPrimary: palette.purple['500'],
    cardTextSecondary: baseColors.white,
    cardBackgroundSecondary: palette.orange['500'],
  }
}

const themeColors = (dark?: boolean): ThemeColors => {
  const colorVars = colorVariables(dark)

  return {
    ...colorVars,
    ...palette,
    ...colorModes.light,
  } as ThemeColors
}

const spacing = {
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
}

export const resolveTheme = (dark?: boolean) => {
  const colors = dark ? themeColors(true) : themeColors()

  return createTheme({
    breakpoints: {
      phone: 0,
      tablet: 768,
    },
    spacing,
    colors,
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
    },
    layoutVariants: {
      defaults: {},
      centerAll: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      absoluteFill: StyleSheet.absoluteFillObject,
    },
  })
}

export type AppTheme = ReturnType<typeof resolveTheme>
