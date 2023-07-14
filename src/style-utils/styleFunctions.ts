import { TextStyle, FlexStyle, ViewStyle } from 'react-native'

import { getKeys } from '@/utils'

import { createStyleFunction } from './createStyleFunction'
import { Breakpoints, ResponsiveValue, RNStyleProperty, Theme, ThemeColorKey } from './types'

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

export interface ColorProps {
  color?: ResponsiveValue<ThemeColorKey, Breakpoints>
  textDecorationColor?: ResponsiveValue<ThemeColorKey, Breakpoints>
}
export interface OpacityProps {
  opacity?: ResponsiveValue<number, Breakpoints>
}

export interface VisibleProps {
  visible?: ResponsiveValue<boolean, Breakpoints>
}

export interface BackgroundColorProps {
  backgroundColor?: ResponsiveValue<ThemeColorKey, Breakpoints>
}

export interface BackgroundColorShorthandProps {
  bg?: ResponsiveValue<ThemeColorKey, Breakpoints>
}

export type SpacingProps = {
  [Key in keyof typeof spacingProperties]?: ResponsiveValue<keyof Theme['spacing'], Breakpoints>
}

export type SpacingShorthandProps = {
  [Key in keyof typeof spacingPropertiesShorthand]?: ResponsiveValue<
    keyof Theme['spacing'],
    Breakpoints
  >
}

export type TypographyProps = {
  [Key in keyof typeof typographyProperties]?: ResponsiveValue<TextStyle[Key], Breakpoints>
}

export type LayoutProps = {
  [Key in keyof typeof layoutProperties]?: ResponsiveValue<FlexStyle[Key], Breakpoints>
}

export type PositionProps = {
  [Key in keyof typeof positionProperties]?: ResponsiveValue<FlexStyle[Key], Breakpoints>
} & {
  zIndex?: ResponsiveValue<
    Theme['zIndices'] extends object ? keyof Theme['zIndices'] : number,
    Breakpoints
  >
}

export type BorderProps = {
  [Key in keyof typeof borderProperties]?: ResponsiveValue<ViewStyle[Key], Breakpoints>
} & {
  [Key in keyof typeof borderColorProperties]?: ResponsiveValue<ThemeColorKey, Breakpoints>
} & {
  [Key in keyof typeof borderRadiusProperties]?: ResponsiveValue<
    Theme['rounded'] extends object ? keyof Theme['rounded'] : number,
    Breakpoints
  >
}

export type ShadowProps = {
  [Key in keyof typeof shadowProperties]?: ResponsiveValue<ViewStyle[Key], Breakpoints>
} & {
  shadowColor?: ResponsiveValue<ThemeColorKey, Breakpoints>
}

export type TextShadowProps = {
  [Key in keyof typeof textShadowProperties]?: ResponsiveValue<TextStyle[Key], Breakpoints>
} & {
  textShadowColor?: ResponsiveValue<ThemeColorKey, Breakpoints>
}

export type AllProps = BackgroundColorProps &
  BackgroundColorShorthandProps &
  ColorProps &
  OpacityProps &
  SpacingProps &
  SpacingShorthandProps &
  TypographyProps &
  LayoutProps &
  PositionProps &
  BorderProps &
  ShadowProps &
  TextShadowProps
