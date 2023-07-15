import { ImageStyle, TextStyle, ViewStyle, StyleProp } from 'react-native'
import { Except, StringKeyOf, ValueOf } from 'type-fest'

import { ColorMode, ColorVariables } from './color/color.types'

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type AnyProps = { [key: string]: any }

export type Breakpoint = number | Dimensions

// interface VariantsWithDefaults {
//   [key: `${string}Variants`]: {
//     defaults: AnyProps
//     [key: string]: any
//   }
// }

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

type ThemeColorVariables = {
  variables?: ColorVariables
}
type ThemeColorConfig = {
  [key: string]: string | Record<string, string>
}
export type ThemeColorsCustomConfig = ThemeColorVariables & ThemeColorConfig
export type ThemeColors<TColors extends ThemeColorConfig = ThemeColorConfig> = TColors &
  Omit<ThemeColorConfig, keyof TColors>

interface KnownBaseTheme {
  breakpoints: Record<string, Breakpoint>
  spacing: Record<string, number | string>
  zIndices?: Record<string, number>
  rounded?: Record<string, number>
}

export interface BaseTheme extends KnownBaseTheme {
  mode?: ColorMode
  [key: string]: any
}

type RNStyleBlock = Record<RNStyleProperty, PropValue>
export interface WithVariants {
  // breakpoints: Record<string, Breakpoint>
  // [key: `${string}Variants`]: VariantsWithDefaults
  [key: `${string}Variants`]: {
    defaults: RNStyleBlock
    [key: string]: RNStyleBlock
  }
}

export interface RootTheme extends BaseTheme, WithVariants {
  colors: ThemeColors
  // textVariants: VariantsWithDefaults
  // cardVariants: VariantsWithDefaults
  // inputVariants?: VariantsWithDefaults
  // buttonVariants?: VariantsWithDefaults
  // layoutVariants: VariantsWithDefaults
  // [key: `${string}Variants`]: VariantsWithDefaults
  // [key: string]: any
}

export interface CustomTheme extends Omit<Partial<RootTheme>, 'colors'> {
  colors?: ThemeColorsCustomConfig
}

export type Breakpoints<TTheme extends RootTheme = RootTheme> = ValueOf<TTheme, 'breakpoints'>
export type ThemeColorKey<TTheme extends RootTheme = RootTheme> = NestedKeyOf<TTheme['colors']>

export type StyleTransformer<TTheme extends RootTheme, K extends keyof TTheme, TVal> = (params: {
  value: TVal | undefined | null
  theme: TTheme
  themeKey?: K
}) => TVal | undefined | null

export type AtLeastOneResponsiveValue<
  Value,
  B extends Breakpoints<RootTheme>,
  R = { [Key in keyof B]: { [key in Key]: Value } },
> = Partial<{
  [K in keyof B]: Value
}> &
  R[keyof R]

export type ResponsiveValue<Value, B extends Breakpoints> =
  | Value
  | AtLeastOneResponsiveValue<Value, B>

export type SafeVariants<TTheme extends RootTheme> = Except<TTheme, keyof KnownBaseTheme>
export type SafeVariantKey<TTheme extends RootTheme> =
  | keyof SafeVariants<TTheme>
  | StringKeyOf<SafeVariants<TTheme>>
export type SafeVariant<TTheme extends RootTheme> = ValueOf<TTheme, SafeVariantKey<TTheme>>

export interface StyleFunctionContainer<
  TProps extends AnyProps,
  TTheme extends RootTheme = RootTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof TTheme | SafeVariantKey<TTheme> = keyof TTheme | SafeVariantKey<TTheme>,
> {
  property: P
  themeKey: K | undefined
  variant: boolean
  func: StyleFunction<TProps>
}

export type StyleFunction<
  TProps extends AnyProps = AnyProps,
  TTheme extends RootTheme = RootTheme,
  S extends keyof any = string,
> = (
  props: TProps,
  context: { theme: TTheme; dimensions: Dimensions | null },
) => {
  [key in S]?: any
}
