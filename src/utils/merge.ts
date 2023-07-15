import { Merge, MergeDeep, MergeDeepOptions } from 'type-fest'

import { cloneDeep } from './clone'
import { hasOwn } from './common'
import { isObject, isPlainObject } from './lang'
import { set } from './set'
import { getKeys } from './type.helpers'

function merge<Destination extends Record<string, unknown>, Source>(
  target: Destination,
  obj: Source,
) {
  if (!isPlainObject(target) || !isPlainObject(obj)) return target

  let map = new Map()

  for (const key in obj) {
    if (key === '__proto__' || !hasOwn(obj, key)) {
      continue
    }

    const oldVal = obj[key]
    const newVal = target[key]

    if (isPlainObject(newVal) && isPlainObject(oldVal)) {
      map.set(key, merge(newVal, oldVal))
      // set(newTarget, key, merge(newVal, oldVal))
    } else if (Array.isArray(newVal)) {
      map.set(key, Array.isArray(oldVal) ? oldVal : [oldVal])
      // newTarget[key] = Array.isArray(oldVal) ? oldVal : [oldVal]
      // const oldValArray = Array.isArray(oldVal) ? oldVal : [oldVal]
      // set(newTarget, key, [newVal, oldValArray].flat())
    } else {
      const init = Array.isArray(oldVal) ? [] : {}
      map.set(key, cloneDeep(oldVal, init))
      // newTarget[key] = cloneDeep(oldVal, init)
      // set(newTarget, key, cloneDeep(oldVal, init))
    }
  }

  const result = Object.fromEntries(map)

  return result
}

export function mergeDeep<
  Destination,
  Source,
  Options extends MergeDeepOptions = { recurseIntoArrays: true },
>(dest: Destination, source: Source): MergeDeep<Destination, Source, Options> {
  if (!isObject(dest)) {
    dest = {} as Destination
  }

  const target = cloneDeep(dest)

  if (isObject(source)) {
    merge(target, source)
  }

  return target
}
