import { Merge, MergeDeep, MergeDeepOptions } from 'type-fest'

import { AnyObj } from '../types'
import { isNil, isPlainObject } from './lang'
import { getKey, getKeys } from './type.helpers'
import { cloneDeep } from './clone'

const isProtoKey = (key: PropertyKey) =>
  (['__proto__', 'constructor', 'prototype'] as PropertyKey[]).includes(key)

const merge = <
  D extends AnyObj,
  S extends AnyObj,
  Options extends MergeDeepOptions = { recurseIntoArrays: true },
>(
  dest: D,
  source: S,
): MergeDeep<D, S, Options> => {
  const sourceKeys = getKeys(source)

  type Merged = Merge<D, S>

  const init = cloneDeep(dest) as Partial<Merged>

  const combined = sourceKeys.reduce((result, currentKey) => {
    const destKey = getKey<D>(dest, currentKey as keyof D)
    const sharedKey = currentKey as keyof Merged

    if (
      !isProtoKey(currentKey) &&
      ((destKey && !isNil(source[currentKey])) || !(currentKey in result))
    ) {
      let sourceValue = source[currentKey]
      if (isPlainObject(sourceValue)) {
        result[sharedKey] = merge(dest[destKey], sourceValue) as Merged[typeof sharedKey]
      } else if (destKey && Array.isArray(sourceValue) && Array.isArray(dest[destKey])) {
        result[sharedKey] = Array.from(
          new Set([...dest[destKey], ...sourceValue]),
        ).flat() as Merged[typeof sharedKey]
      } else {
        result[sharedKey] = sourceValue
      }
    }

    return result
  }, init)

  return combined as MergeDeep<D, S, Options>
}

export { merge }

// import { MergeDeep, MergeDeepOptions, ValueOf } from 'type-fest'

// import { cloneDeep } from './clone'
// import { hasOwn } from './common'
// import { isObject, isPlainObject } from './lang'
// import { getKeys } from './type.helpers'

// function merge<Destination extends Record<string, unknown>, Source>(
//   target: Destination,
//   obj: Source,
// ) {
//   if (!isPlainObject(target) || !isPlainObject(obj)) return target

//   let map = new Map()
//   const allKeys = [...getKeys(target), ...getKeys(obj)]

//   for (const key in obj) {
//     if (key === '__proto__' || !hasOwn(obj, key)) {
//       continue
//     }

//     const oldVal = obj[key]
//     const newVal = target[key]

//     if (isPlainObject(newVal) && isPlainObject(oldVal)) {
//       map.set(key, merge(newVal, oldVal))
//     } else if (Array.isArray(newVal)) {
//       map.set(key, Array.isArray(oldVal) ? oldVal : [oldVal])
//     } else {
//       const init = Array.isArray(oldVal) ? [] : {}
//       map.set(key, cloneDeep(oldVal, init))
//     }
//   }

//   type Key = (typeof allKeys)[number]
//   const newObj = Object.fromEntries(map.entries())

//   const result = newObj as Record<Key, ValueOf<typeof newObj, Key>>

//   return result
// }

// export function mergeDeep<
//   Destination,
//   Source,
//   Options extends MergeDeepOptions = { recurseIntoArrays: true },
// >(dest: Destination, source: Source): MergeDeep<Destination, Source, Options> {
//   if (!isObject(dest)) {
//     dest = {} as Destination
//   }

//   const target = cloneDeep(dest)

//   if (isObject(source)) {
//     merge(target, source)
//   }

//   return target
// }
