import { AnyObj } from '../types'
import {
  _protoToString,
  isNil,
  isNumber,
  isObject,
  isPlainObject,
  isPrimitive,
  isString,
  isSymbol,
} from './lang'
import { memoize } from './memoize'

/** Convert a value to a string that is actually rendered. */
export const renderToString = (val: unknown): string => {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _protoToString)
    ? JSON.stringify(val, null, 2)
    : String(val)
}

/** Used to match backslashes in property paths. */
const escapeCharRE = /\\(\\)?/g

/** Used to match property names within property paths. */
const deepPropRE = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const plainPropRE = /^\w*$/
const propNameRE =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

/** Converts `value` to a string key if it's not a string or number. */
function toKey(value: string | number): string | number {
  if (isString(value) || isNumber(value)) {
    return value
  }
  // eslint-disable-next-line eqeqeq
  return `${value}` == '0' && 1 / Number(value) == -Infinity ? '-0' : `${value}`
}

/** Checks if `value` is a property name and not a property path. */
function isKey<T extends Object>(value: any, object: T): boolean {
  if (Array.isArray(value)) return false

  if (isPrimitive(value)) {
    return true
  }

  return (
    plainPropRE.test(value) ||
    !deepPropRE.test(value) ||
    (object != null && value in Object(object))
  )
}

/** Converts `string` to a property path array. */
const stringToPath = memoize((str: string): string[] => {
  const result: string[] = []
  if (str.charCodeAt(0) === 46 /* '.' */) {
    result.push('')
  }
  str.replace(propNameRE, (match: string, num: number, quote: string, substr: string): string => {
    const replacement = quote ? substr.replace(escapeCharRE, '$1') : num || match
    result.push(replacement as string)
    return String(replacement)
  })
  return result
}, true)

/**
 * Converts `value` to a property path array.
 *
 * @example
 * ```
 * toPath('a[0].b.c'); // => ['a', '0', 'b', 'c']
 * ```
 */
export function toPath(value: string | number | (string | number)[]): (string | number)[] {
  if (Array.isArray(value)) {
    return value.map(toKey)
  }
  return isSymbol(value) ? [value] : stringToPath(String(value))
}

/** Casts `value` to a path array if it's not one. */
function castPath<T extends Object>(value: any, obj: T): string[] {
  if (Array.isArray(value)) return value

  if (isKey(value, obj)) return [value]

  return stringToPath(renderToString(value))
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties.
 */
export function set<T>(
  obj: T,
  path: string | number | (string | number)[],
  value: any,
  customizer?: Function,
): T {
  if (!isObject(obj) || isNil(obj)) return obj

  const paths = castPath(path, obj)

  let i = -1
  let nested: AnyObj = obj

  while (!isNil(nested) && ++i < paths.length) {
    let key = toKey(String(paths[i])) as keyof typeof nested
    let newValue = value

    if (i !== paths.length - 1) {
      const objValue = nested[key]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (isNil(newValue)) {
        newValue = isObject(objValue) ? objValue : isNumber(paths[i + 1]) ? [] : {}
      }
    }

    nested[key] = newValue
    nested = nested[key]
  }

  return obj
}
