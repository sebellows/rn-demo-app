export const Type = Function

export function isType(v: any): v is Type<any> {
  return typeof v === 'function'
}

export interface Type<T = any> extends Function {
  [x: string]: any
  new (...args: any[]): T
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type AnyObj = { [key: string]: any }

export type AsyncFunction = (...arguments_: any[]) => Promise<unknown>

export type PartialRecord<T, K extends PropertyKey = string> = Partial<Record<K, T>>
