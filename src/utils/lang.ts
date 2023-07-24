import { Constructor, ValueOf } from 'type-fest'

import { AnyObj, AsyncFunction } from '../types'

import { hasOwn } from './common'

/**
 * @internal
 *
 * Reference to the Object prototype's built-in `toString` method.
 * @example
 * ```
 * _protoToString === {}.toString // TRUE
 *
 * const fn = () => 'hello'
 * _protoToString === fn.toString // FALSE
 * _protoToString === fn.__proto__.toString // FALSE
 *
 * console.log(fn.toString())
 * => "() => 'hello'"
 *
 * console.log(fn.__proto__.toString())
 * => 'function () { [native code] }'
 *
 * console.log(fn.constructor.prototype.toString())
 * => 'function () { [native code] }'
 *
 * console.log(fn.constructor.toString())
 * => 'function Function() { [native code] }'
 * ```
 */
export const _protoToString = Object.prototype.toString

export function getType(value: unknown): string {
  if (value === null) {
    return 'Null'
  }

  return _protoToString.call(value).slice(8, -1)
}

/**
 * Get the type of a value as a lowercased string.
 *
 * @param {*} value
 * @returns {string} - The lowercased name of the value's type
 */
export function typeOf(value: unknown): string {
  return getType(value).toLowerCase()
}

const ConstructorMap = {
  array: Array,
  arraybuffer: ArrayBuffer,
  asyncfunction: Function,
  boolean: Boolean,
  // buffer: Buffer,
  date: Date,
  function: Function,
  map: Map,
  // node: Node,
  null: null,
  number: Number,
  object: Object,
  regexp: RegExp,
  set: Set,
  string: String,
  symbol: Symbol,
  uint8array: Uint8Array,
  uint16array: Uint16Array,
  uint32array: Uint32Array,
  undefined: undefined,
}
type TypeConstructorMap = typeof ConstructorMap

/**
 * Check if a value is of a certain type.
 *
 * @param {*} value - Any type of value
 * @param {string} type - The type to check the value against
 * @returns {boolean}
 */
// export function is<T extends keyof typeof TypeMap = keyof typeof TypeMap>(
export function is<T extends keyof TypeConstructorMap>(
  value: unknown,
  type: T,
): value is ValueOf<TypeConstructorMap, T> {
  return typeOf(value) === type.toLowerCase()
}

/**
 * Check if a value is a primitive type.
 *
 * @param {*} value - Any type of value
 * @returns {boolean}
 */
export function isPrimitive<T>(value: T): value is T {
  const type = typeOf(value)
  return ['boolean', 'null', 'number', 'string', 'symbol', 'undefined'].includes(type)
}

/**
 * Check if a value is a primitive type.
 *
 * @param {*} value - Any type of value
 * @returns {boolean}
 */
export function isNonPrimitive<T>(value: T): value is T {
  return !isPrimitive(value) && !isFunction(value) && !isConstructor(value)
}

export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return typeOf(value) === 'arraybuffer'
}

/** Verify if a value is null or undefined. */
export function isNil(value: unknown): value is null | undefined
export function isNil(value: unknown): boolean {
  return value == null
}

export function isUndefined(value: unknown): value is undefined {
  return typeOf(value) === 'undefined'
}

export function isDefined(value: unknown): boolean {
  return !isNil(value)
}

/**
 * Verify if a value is of the common type 'Object'.
 * i.e., a plain object, Array, Date, Map, Set, or 'null'.
 */
export function isObject<T extends object = object>(value: unknown): value is T {
  return typeof value === 'object'
}

export function isError(value: unknown): value is Error {
  if (!isObject(value)) {
    return false
  }
  const type = getType(value)
  return (
    type === 'Error' ||
    type === 'DOMException' ||
    (hasOwn(value, 'message') && hasOwn(value, 'name') && !isPlainObject(value))
  )
}

/**
 * Verify that the value is a built-in, native JS or Browser object.
 */
export function isNativeObject(value: unknown) {
  return !Object.is(_protoToString, value?.toString)
}

type ImportModule = { default: unknown } & AnyObj
export function isModule(value: unknown): value is ImportModule {
  return isPlainObject(value) && typeOf(value) === 'module' && value?.default
}

/**
 * Verify that a value extends/conforms to a TS Record type of `Record<PropertyKey, unknown>`.
 */
export function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
  return (
    (isPlainObject(value) || isModule(value)) &&
    hasOwn(value?.constructor?.prototype, 'isPrototypeOf')
  )
}

/**
 * Verify that a value is a plain object created either by the Object constructor
 * or using `Object.create(null)`.
 */
export function isPlainObject<T extends object = Record<string, any>>(value: unknown): value is T {
  return is(value, 'object')
}

export function isArray(value: unknown) {
  return Array.isArray(value)
}

export function isDate(value: unknown) {
  return is(value, 'date')
}

export function isFunction(value: unknown): value is Function {
  return is(value, 'function')
}

export function isAsync(value: unknown): value is AsyncFunction {
  return is(value, 'asyncfunction')
}

export function isPromiseLike<T, Casts = unknown>(value: T): value is T & PromiseLike<Casts> {
  return !isNil(value) && isObject(value) && isFunction((value as T & Promise<any>).then)
}

export function isIterator<T>(value: unknown): value is Iterator<T> {
  return isObject(value) && !isNil(value) && isFunction((value as Iterator<T>).next)
}

export function isIterable<T>(value: unknown): value is Iterable<T> {
  return isObject(value) && !isNil(value) && isFunction((value as Iterable<any>)[Symbol.iterator])
}

export function isAsyncIterator<T>(value: unknown): value is AsyncIterator<T> {
  return isObject(value) && !isNil(value) && isFunction((value as AsyncIterator<any>).next())
}

export function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
  return (
    isObject(value) &&
    !isNil(value) &&
    isFunction((value as AsyncIterable<any>)[Symbol.asyncIterator])
  )
}

export function isEmpty<T>(value: T) {
  if (isNil(value)) return true

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0
  } else if (hasOwn(value, 'length')) {
    return (value as { length: number }).length === 0
  } else if (isMap(value) || isSet(value)) {
    return value.size === 0
  }

  return false
}

export function isClass<T, TArgs extends unknown[] = any>(
  value: unknown,
): value is Constructor<T, TArgs> {
  let _isClass = false

  if (isFunction(value)) {
    try {
      _isClass = Boolean(value.arguments && value.caller)
    } catch (e) {
      return value.name.length > 0
    }
  }

  return _isClass
}

export function isMap<K = any, V = any>(value: unknown): value is Map<K, V> {
  return is(value, 'map')
}

export function isSet<V = any>(value: unknown): value is Set<V> {
  return is(value, 'set')
}

export function isRegExp(value: unknown): value is RegExp {
  return is(value, 'regexp')
}

export function isNumber(value: unknown): value is number {
  // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
  // and other non-number values as NaN, where Number just uses 0) but it considers the string
  // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
  if (isNaN(parseFloat(value as any)) && isNaN(Number(value))) {
    return false
  }

  return is(value, 'number')
}

export function isBoolean(value: unknown): value is boolean {
  return is(value, 'boolean')
}

export function isString(value: unknown): value is string {
  return is(value, 'string')
}

export function isSymbol(value: unknown): value is symbol {
  return is(value, 'symbol')
}

export function isConstructor<T = any>(value: unknown): value is Constructor<T> {
  return isFunction(value) && hasOwn(value, 'name') && /[A-Z]/.test(value.name.charAt(0))
}

/**
 * Coerce a value to a boolean as a form of type enforcement.
 */
function coerceBoolean(value: unknown): boolean {
  return `${value}` === 'true'
}

/**
 * Check if value is a boolean and is TRUE.
 */
export function isTrue(value: unknown): boolean {
  return coerceBoolean(value)
}

/**
 * Check if value is a boolean and is FALSE.
 */
export function isFalse(value: unknown): boolean {
  return !coerceBoolean(value)
}
