import { ImageStyle, TextStyle, ViewStyle, StyleProp } from 'react-native'
import { Except, Get, StringKeyOf, ValueOf } from 'type-fest'

// import { TTheme as AppTheme } from '../theme'

import { ColorAccents, ColorPalette, ColorVariants } from './color/color.types'

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type AnyProps = { [key: string]: any }

export type Breakpoint = number | Dimensions

type VariantsWithDefaults = { defaults: AnyProps } & AnyProps

export interface Dimensions {
  width: number
  height: number
}

export type RNStyle =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | ((...args: any[]) => StyleProp<ViewStyle>)

export type RNStyleProperty = keyof ViewStyle | keyof TextStyle | keyof ImageStyle

export type PropValue = string | number | undefined | null

export interface ThemeColors extends ColorPalette, ColorVariants {
  [key: string]: string | Record<string, string>
}

interface KnownBaseTheme {
  breakpoints: Record<string, Breakpoint>
  spacing: Record<string, number | string>
  zIndices?: Record<string, number>
  rounded?: Record<string, number>
}

export interface BaseTheme extends KnownBaseTheme {
  [key: string]: any
}

export interface ResponsiveBaseTheme extends BaseTheme {
  breakpoints: Record<string, Breakpoint>
}

export interface Theme extends ResponsiveBaseTheme {
  colors: ThemeColors
  // textVariants: VariantsWithDefaults
  // cardVariants: VariantsWithDefaults
  // inputVariants?: VariantsWithDefaults
  // buttonVariants?: VariantsWithDefaults
  // layoutVariants: VariantsWithDefaults
  variant?: VariantsWithDefaults
  [key: `${string}Variants`]: VariantsWithDefaults
  [key: string]: any
}

/** @deprecated */
export type ThemeKeyOrPath = NestedKeyOf<Theme>
export type ThemeKey = StringKeyOf<Theme> | NestedKeyOf<Theme>
export type ThemeValue<K extends ThemeKey> = Get<Theme, K>

export type Breakpoints = ValueOf<Theme, 'breakpoints'>
export type ThemeColorKey = NestedKeyOf<Theme['colors']>

export type StyleTransformer<K extends ThemeKey, TVal> = (params: {
  value?: TVal | undefined | null
  theme: Theme
  themeKey?: K
}) => TVal | undefined | null

export type AtLeastOneResponsiveValue<
  Value,
  B extends Breakpoints,
  R = { [Key in keyof B]: { [key in Key]: Value } },
> = Partial<{
  [K in keyof B]: Value
}> &
  R[keyof R]

export type ResponsiveValue<Value, B extends Breakpoints> =
  | Value
  | AtLeastOneResponsiveValue<Value, B>

type PickEndsWith<T extends object, S extends string> = {
  [K in keyof T as K extends `${S}${infer R}` ? K : never]: T[K]
}
// type BaseThemeKeys = Except<Theme, keyof KnownBaseTheme>
export type SafeVariants = Except<Theme, keyof KnownBaseTheme> // PickEndsWith<Theme, `${string}Variants`>
export type SafeVariantKey = StringKeyOf<SafeVariants>
export type SafeVariant = ValueOf<Theme, SafeVariantKey>

export interface StyleFunctionContainer<
  TProps extends AnyProps,
  P extends keyof TProps = keyof TProps,
  K extends ThemeKey | SafeVariantKey = ThemeKey | SafeVariantKey,
> {
  property: P
  themeKey: K | undefined
  variant: boolean
  func: StyleFunction<TProps>
}

export type StyleFunction<TProps extends AnyProps = AnyProps, S extends keyof any = string> = (
  props: TProps,
  context: { theme: Theme; dimensions: Dimensions | null },
) => {
  [key in S]?: any
}
