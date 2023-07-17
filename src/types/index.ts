export const Type = Function

export function isType(v: any): v is Type<any> {
  return typeof v === 'function'
}

export interface Type<T = any> extends Function {
  [x: string]: any
  new (...args: any[]): T
}

export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | `${K}.${DeepKeys<T[K]>}` : never
    }[keyof T]
  : never

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type AnyObj = { [key: string]: any }

export type RecordType = Record<PropertyKey, unknown>

export type AsyncFunction = (...arguments_: any[]) => Promise<unknown>

export type Callback<T extends any = void, TArgs extends unknown[] = any[]> = (...args: TArgs) => T

export type AsyncCallback<T extends any = void, Args extends unknown[] = any[]> = (
  ...args: Args
) => Promise<T | never>
