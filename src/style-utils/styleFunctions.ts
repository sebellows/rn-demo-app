import { TextStyle, FlexStyle, ViewStyle } from 'react-native'

import { getKeys } from '@/utils'

import { createStyleFunction } from './createStyleFunction'
import { Breakpoints, ResponsiveValue, RNStyleProperty, RootTheme, ThemeColorKey } from './types'

const spacingProperties = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  marginHorizontal: true,
  marginVertical: true,
  marginStart: true,
  marginEnd: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingHorizontal: true,
  paddingVertical: true,
  paddingStart: true,
  paddingEnd: true,
  columnGap: true,
  rowGap: true,
  gap: true,
}

const spacingPropertiesShorthand = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  ms: 'marginStart',
  me: 'marginEnd',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  ps: 'paddingStart',
  pe: 'paddingEnd',
  g: 'gap',
  rg: 'rowGap',
  cg: 'columnGap',
}

const typographyProperties = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  includeFontPadding: true,
  fontVariant: true,
  letterSpacing: true,
  lineHeight: true,
  textAlign: true,
  textAlignVertical: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textTransform: true,
  verticalAlign: true,
  writingDirection: true,
}

const layoutProperties = {
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
  overflow: true,
  aspectRatio: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
}

const positionProperties = {
  position: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  start: true,
  end: true,
}

const borderProperties = {
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStyle: true,
  borderTopWidth: true,
  borderStartWidth: true,
  borderEndWidth: true,
  borderWidth: true,
}

const borderRadiusProperties = {
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomStartRadius: true,
  borderBottomEndRadius: true,
  borderTopStartRadius: true,
  borderTopEndRadius: true,
}

const borderColorProperties = {
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderLeftColor: true,
  borderBottomColor: true,
  borderStartColor: true,
  borderEndColor: true,
}

const shadowProperties = {
  shadowOpacity: true,
  shadowOffset: true,
  shadowRadius: true,
  elevation: true,
}

const textShadowProperties = {
  textShadowOffset: true,
  textShadowRadius: true,
}

export const backgroundColor = createStyleFunction({
  property: 'backgroundColor',
  themeKey: 'colors',
})

export const backgroundColorShorthand = createStyleFunction({
  property: 'bg',
  styleProperty: 'backgroundColor',
  themeKey: 'colors',
})

export const color = [
  createStyleFunction({
    property: 'color',
    themeKey: 'colors',
  }),
  createStyleFunction({
    property: 'textDecorationColor',
    themeKey: 'colors',
  }),
]

export const opacity = createStyleFunction({
  property: 'opacity',
})

export const visible = createStyleFunction({
  property: 'visible',
  styleProperty: 'display',
  transform: ({ value }) => (value === false ? 'none' : 'flex'),
})

export const spacing = getKeys(spacingProperties).map(property => {
  return createStyleFunction({
    property,
    themeKey: 'spacing',
  })
})

export const spacingShorthand = getKeys(spacingPropertiesShorthand).map(property => {
  const styleProperty = spacingPropertiesShorthand[property] as RNStyleProperty

  return createStyleFunction({
    property,
    styleProperty,
    themeKey: 'spacing',
  })
})

export const typography = getKeys(typographyProperties).map(property => {
  return createStyleFunction({
    property,
  })
})

export const layout = getKeys(layoutProperties).map(property => {
  return createStyleFunction({
    property,
  })
})

export const position = [
  ...getKeys(positionProperties).map(property => {
    return createStyleFunction({
      property,
    })
  }),
  createStyleFunction({
    property: 'zIndex',
    themeKey: 'zIndices',
  }),
]

export const border = [
  ...getKeys(borderProperties).map(property => {
    return createStyleFunction({
      property,
    })
  }),
  ...getKeys(borderColorProperties).map(property => {
    return createStyleFunction({
      property,
      themeKey: 'colors',
    })
  }),
  ...getKeys(borderRadiusProperties).map(property => {
    return createStyleFunction({
      property,
      themeKey: 'rounded',
    })
  }),
]

export const shadow = [
  ...getKeys(shadowProperties).map(property => {
    return createStyleFunction({
      property,
    })
  }),
  createStyleFunction({
    property: 'shadowColor',
    themeKey: 'colors',
  }),
]

export const textShadow = [
  ...getKeys(textShadowProperties).map(property => {
    return createStyleFunction({
      property,
    })
  }),
  createStyleFunction({
    property: 'textShadowColor',
    themeKey: 'colors',
  }),
]

export const all = [
  color,
  opacity,
  backgroundColor,
  backgroundColorShorthand,
  ...spacing,
  ...spacingShorthand,
  ...typography,
  ...layout,
  ...position,
  ...border,
  ...shadow,
  ...textShadow,
]

export interface ColorProps<TTheme extends RootTheme> {
  color?: ResponsiveValue<ThemeColorKey<TTheme>, Breakpoints<TTheme>>
  textDecorationColor?: ResponsiveValue<ThemeColorKey<TTheme>, Breakpoints<TTheme>>
}
export interface OpacityProps<TTheme extends RootTheme> {
  opacity?: ResponsiveValue<number, Breakpoints<TTheme>>
}

export interface VisibleProps<TTheme extends RootTheme> {
  visible?: ResponsiveValue<boolean, Breakpoints<TTheme>>
}

export interface BackgroundColorProps<TTheme extends RootTheme> {
  backgroundColor?: ResponsiveValue<ThemeColorKey<TTheme>, Breakpoints<TTheme>>
}

export interface BackgroundColorShorthandProps<TTheme extends RootTheme> {
  bg?: ResponsiveValue<ThemeColorKey<TTheme>, Breakpoints<TTheme>>
}

export type SpacingProps<TTheme extends RootTheme> = {
  [Key in keyof typeof spacingProperties]?: ResponsiveValue<
    keyof TTheme['spacing'],
    Breakpoints<TTheme>
  >
}

export type SpacingShorthandProps<TTheme extends RootTheme> = {
  [Key in keyof typeof spacingPropertiesShorthand]?: ResponsiveValue<
    keyof TTheme['spacing'],
    Breakpoints<TTheme>
  >
}

export type TypographyProps<TTheme extends RootTheme> = {
  [Key in keyof typeof typographyProperties]?: ResponsiveValue<TextStyle[Key], Breakpoints<TTheme>>
}

export type LayoutProps<TTheme extends RootTheme> = {
  [Key in keyof typeof layoutProperties]?: ResponsiveValue<FlexStyle[Key], Breakpoints<TTheme>>
}

export type PositionProps<TTheme extends RootTheme> = {
  [Key in keyof typeof positionProperties]?: ResponsiveValue<FlexStyle[Key], Breakpoints<TTheme>>
} & {
  zIndex?: ResponsiveValue<
    TTheme['zIndices'] extends object ? keyof TTheme['zIndices'] : number,
    Breakpoints<TTheme>
  >
}

export type BorderProps<TTheme extends RootTheme> = {
  [Key in keyof typeof borderProperties]?: ResponsiveValue<ViewStyle[Key], Breakpoints<TTheme>>
} & {
  [Key in keyof typeof borderColorProperties]?: ResponsiveValue<
    ThemeColorKey<TTheme>,
    Breakpoints<TTheme>
  >
} & {
  [Key in keyof typeof borderRadiusProperties]?: ResponsiveValue<
    TTheme['borderRadii'] extends object ? keyof TTheme['borderRadii'] : number,
    Breakpoints<TTheme>
  >
}

export type ShadowProps<TTheme extends RootTheme> = {
  [Key in keyof typeof shadowProperties]?: ResponsiveValue<ViewStyle[Key], Breakpoints<TTheme>>
} & {
  shadowColor?: ResponsiveValue<ThemeColorKey<TTheme>, Breakpoints<TTheme>>
}

export type TextShadowProps<TTheme extends RootTheme> = {
  [Key in keyof typeof textShadowProperties]?: ResponsiveValue<TextStyle[Key], Breakpoints<TTheme>>
} & {
  textShadowColor?: ResponsiveValue<ThemeColorKey<TTheme>, Breakpoints<TTheme>>
}

export type AllProps<TTheme extends RootTheme> = BackgroundColorProps<TTheme> &
  BackgroundColorShorthandProps<TTheme> &
  ColorProps<TTheme> &
  OpacityProps<TTheme> &
  SpacingProps<TTheme> &
  SpacingShorthandProps<TTheme> &
  TypographyProps<TTheme> &
  LayoutProps<TTheme> &
  PositionProps<TTheme> &
  BorderProps<TTheme> &
  ShadowProps<TTheme> &
  TextShadowProps<TTheme>
