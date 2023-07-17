import { ImageStyle, TextStyle, ViewStyle, StyleProp } from 'react-native'
import {
  ConditionalExcept,
  Except,
  MergeDeep,
  OmitIndexSignature,
  PickIndexSignature,
  StringKeyOf,
  ValueOf,
} from 'type-fest'

import { ColorMode, ColorPalette, ColorVariants } from './color/color.types'
import { AnyObj } from '../types'

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type Breakpoint = number | Dimensions

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

export type ColorVariables = Record<string, PropValue>

/**
 * For addition of a custom theme, individual color definitions can be set
 * in a key-value map and assigned to the `variables` field.
 */
// type CustomColorVariables = {
//   variables?: ColorVariables
// }
// export type AllColors = ColorVariables & ColorPalette & ColorVariants
// type ThemeColorConfig = Partial<AllColors>
// {
//   [key: string]: string | Record<string, string>
// }
// export type ThemeColorsCustomConfig = CustomColorVariables & ThemeColorConfig
type GetConcrete<T extends AnyObj> = Record<keyof T, ValueOf<T, keyof T>>
type TestObj = {
  red: string
  blue: string
  [key: string]: string
}
export type TestObjWithoutIndexSigs = OmitIndexSignature<TestObj>

export type ThemeColors = GetConcrete<ColorVariables> & ColorPalette & ColorVariants
// export type ThemeColors<TColors extends ThemeColorConfig = ThemeColorConfig> = TColors &
//   Omit<ThemeColorConfig, keyof TColors>

/**
 * This is the shape of the field key for any component variant styles.
 */
type ThemeVariantsTypeKey = `${string}Variants`

type ThemeVariantsRecordKey = Exclude<string, 'defaults'>
type ThemeVariantsRecord = { [key: ThemeVariantsRecordKey]: RNStyleBlock }

type ThemeVariants = {
  defaults: RNStyleBlock
} & ThemeVariantsRecord

/**
 * i.e., `textVariants`, `cardVariants`, etc.
 * @example
 * textVariants: {
 *   bodyText: {
 *     fontSize: 15,
 *     lineHeight: 21
 *   }
 * }
 */
export interface WithVariants {
  [key: ThemeVariantsTypeKey]: ThemeVariants
}

interface KnownBaseTheme {
  mode?: ColorMode
  breakpoints: Record<string, Breakpoint>
  spacing: Record<string, number | string>
  zIndices?: Record<string, number>
  rounded?: Record<string, number>
}

export interface BaseTheme extends KnownBaseTheme {
  [key: string]: any
}

export type RNStyleBlock = Partial<
  Record<RNStyleProperty, PropValue | ResponsiveValue<PropValue, Breakpoints>>
>

// export interface RootTheme<TColors extends ThemeColorConfig = ThemeColorConfig>
//   extends BaseTheme,
//     WithVariants {
//   colors: TColors & Omit<ThemeColorConfig, keyof TColors>
// }
export interface RootTheme extends BaseTheme, WithVariants {
  colors: ThemeColors
}

export interface CustomTheme extends Except<Partial<RootTheme>, 'colors'> {
  colors: Partial<ColorPalette> & Partial<ColorVariants> & { variables: ColorVariables } //ThemeColorsCustomConfig
}

type OnlyColorVariables = PickIndexSignature<ThemeColors>
type ExceptColorVariables = OmitIndexSignature<ThemeColors>
type MergedColors = CustomTheme['variables'] &
  Except<OnlyColorVariables, StringKeyOf<CustomTheme['variables']>> &
  ExceptColorVariables

export interface AppTheme
  extends MergeDeep<
    Except<RootTheme, 'colors'>,
    ConditionalExcept<Except<CustomTheme, 'colors'>, undefined>
  > {
  colors: MergedColors
}

export type Breakpoints<TTheme extends RootTheme = RootTheme> = ValueOf<TTheme, 'breakpoints'>

/**
 * We can use dot-notation to access the nested values for colors defined within our palette
 * and color variants.
 * @example
 * const theme = useTheme()
 * const mediumRed = theme.colors.red['500']
 *
 * OR, for easier access, use the `get` utility function:
 * const mediumRed = get(theme, 'colors.red.500')
 */
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
  TProps extends AnyObj,
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
  TProps extends AnyObj = AnyObj,
  TTheme extends RootTheme = RootTheme,
  S extends keyof any = string,
> = (
  props: TProps,
  context: { theme: TTheme; dimensions: Dimensions | null },
) => {
  [key in S]?: any
}
