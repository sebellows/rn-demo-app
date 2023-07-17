import { AnyObj } from '../types'

function yesItCanBeUsedToIndexTypeAndYouKnowItTypescript<T extends AnyObj>(
  obj: T,
  key: string | keyof T,
) {
  return obj[key]
}
/** Alias to the statement masquerading as a function name above. */
export const getKey = yesItCanBeUsedToIndexTypeAndYouKnowItTypescript

/**
 * `Object.keys()` defines all keys as strings which can lead to TS issues with
 * typed objects. This helper will coerce the type of the keys to avoid warnings.
 */
export const getKeys = <T extends AnyObj>(object: T) => Object.keys(object) as (keyof T)[]

/**
 * Same as `getKeys` but for values.
 */
export const getValues = <T extends AnyObj, K extends keyof T = keyof T>(object: T) =>
  Object.values(object) as T[K][]
