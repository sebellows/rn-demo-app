import { Type } from '@/types'

function hasOwn<TObject extends Type, Key extends keyof TObject>(
  o: TObject,
  key: Key,
  strict?: boolean,
): boolean
function hasOwn<TObject extends object, Key extends string>(
  o: TObject,
  key: Key,
  strict?: boolean,
): boolean
function hasOwn<TObject>(o: TObject, key: PropertyKey, strict?: boolean): boolean
function hasOwn<TObject extends Type | object>(o: TObject, key: string, strict?: boolean): boolean
function hasOwn(o: any, key: PropertyKey, strict?: any): boolean {
  const has = Object.prototype.hasOwnProperty.call(o, key)

  return Boolean(strict) ? has && key in o && !!o[key] : has
}
export { hasOwn }

/**
 * Ensure that params are either an array or contain an array.
 */
export function variadic<T extends unknown = any>(...args: any[]): T[] {
  return [...(Array.isArray(args[0]) ? args[0] : args)]
}
