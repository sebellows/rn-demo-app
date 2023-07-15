import {
  is,
  isDate,
  isError,
  isMap,
  isPlainObject,
  isRegExp,
  isSet,
  isSymbol,
  typeOf,
} from './lang'

type TypedArrayType =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array

type TypedArrayConstructor =
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor

const TypedArrayMap = Object.freeze({
  float32array: Float32Array,
  float64array: Float64Array,
  int16array: Int16Array,
  int32array: Int32Array,
  int8array: Int8Array,
  uint16array: Uint16Array,
  uint32array: Uint32Array,
  uint8clampedarray: Uint8ClampedArray,
  uint8array: Uint8Array,
})

const valueOf = Symbol.prototype.valueOf

/**
 * Make a shallow clone of an object, array or primitive.
 *
 * Adapted from <https://github.com/jonschlinkert/shallow-clone>
 *
 * @name shallow-clone
 * @function
 * @global
 *
 * @license
 * Copyright (c) 2018, Jon Schlinkert.
 * Licensed under the MIT License.
 *
 * @param {*} value  The value to be cloned.
 *
 * @example
 * ```
 * const arr = [{ a: 0 }, { b: 1 }];
 * const foo = clone(arr);
 * // foo =>  [{ 'a': 0 }, { 'b': 1 }]
 * ```
 */
export function clone<T = any>(value: T): T {
  const type = typeOf(value)

  if (isDate(value)) {
    return new Date(+value) as T
  }
  if (isError(value)) {
    return Object.create(value)
  }
  if (isMap(value)) {
    const map = new Map()
    const entries = Array.from((value as Map<any, any>).entries())

    for (const [key, item] of entries) {
      map.set(key, clone(item))
    }
    return map as T
  }
  if (isPlainObject(value)) {
    return Object.assign({}, value)
  }
  if (isRegExp(value)) {
    return cloneRegExp(value)
  }
  if (isSet(value)) {
    const entries = Array.from((value as Set<any>).entries())
    return new Set(entries) as T
  }
  if (isSymbol(value)) {
    return cloneSymbol(value)
  }
  if (is(value, 'arraybuffer')) {
    return cloneArrayBuffer(value) as T
  }
  if (type in TypedArrayMap) {
    const key = type as keyof typeof TypedArrayMap
    type TArrType = (typeof TypedArrayMap)[typeof key]
    return cloneTypedArray(value as unknown as TypedArrayType) as T
  }
  if (Array.isArray(value)) {
    return (value as any[]).slice() as T
  }

  return value
}

function cloneRegExp(value: any) {
  const re = new value.constructor(value.source, /\w+$/.exec(value))
  re.lastIndex = value.lastIndex
  return re
}

function cloneArrayBuffer<T extends unknown>(value: T): ArrayBuffer {
  if (!(value instanceof ArrayBuffer)) {
    throw new TypeError(`'cloneArrayBuffer' must be passed an instance of an ArrayBuffer.`)
  }

  const res = new ArrayBuffer(value.byteLength)
  new Uint8Array(res).set(new Uint8Array(value))
  return res
}

function cloneTypedArray<T extends TypedArrayType>(value: T) {
  return new (value.constructor as TypedArrayConstructor)(
    value.buffer,
    value.byteOffset,
    value.length,
  )
}

function cloneSymbol(value: symbol) {
  return valueOf ? Object(valueOf.call(value)) : {}
}

export function cloneDeep(value: unknown, instance?: unknown) {
  if (isPlainObject(value)) {
    return cloneObjectDeep(value, instance)
  }
  if (Array.isArray(value)) {
    return cloneArrayDeep(value, instance)
  }

  return clone(value)
}

function cloneObjectDeep<
  V extends Record<any, any>,
  I extends Function | Record<keyof V, any> | unknown = V,
>(value: V, instance: I = {} as Record<keyof V, any>) {
  if (typeof instance === 'function') {
    return instance(value)
  }
  if (instance || isPlainObject(value)) {
    const res = new (value as any).constructor()

    for (const key in value) {
      res[key] = cloneDeep(value[key], instance)
    }

    return res
  }
  return value
}

function cloneArrayDeep<V extends unknown[] = any>(value: V, instance: unknown = []) {
  const res = new Array(value.length)

  for (let i = 0; i < value.length; i++) {
    res[i] = cloneDeep(value[i], instance)
  }

  return res
}
