import { Type } from './type.utils'

export const hasOwn = <O extends Type | object, K extends keyof O | string = keyof O | string>(
  o: O,
  key: K,
  strict = false,
) => {
  const has = Object.prototype.hasOwnProperty.call(o, key)

  return strict ? has && key in o && !!o[key as keyof O] : has
}

/**
 * Ensure that params are either an array or contain an array.
 */
export function variadic<T extends unknown = any>(...args: any[]): T[] {
  return [...(Array.isArray(args[0]) ? args[0] : args)]
}

/**
 * `Object.keys()` defines all keys as strings which can lead to TS issues with
 * typed objects. This helper will coerce the type of the keys to avoid warnings.
 */
export const getKeys = <T extends { [key: string]: any }>(object: T) =>
  Object.keys(object) as (keyof T)[]

export const getValues = <T extends { [key: string]: any }, K extends keyof T = keyof T>(
  object: T,
) => Object.values(object) as T[K][]
