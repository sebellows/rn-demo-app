import { Type } from '@/types'

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
