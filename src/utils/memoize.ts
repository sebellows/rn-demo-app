import { isNumber } from './lang'

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500

type MemoizedFn<T, TArgs extends unknown[] = any[]> = {
  (...args: TArgs): T
  cache: Record<string, any>
}

/** Create a memoized version of a pure function. */
export const memoize = <T, TArgs extends unknown[] = any[]>(
  fn: (...args: TArgs) => T,
  cap: number | boolean = false,
): MemoizedFn<T, TArgs> => {
  const cacheSize = isNumber(cap) && Number.isInteger(cap) ? cap : MAX_MEMOIZE_SIZE
  // NOTE: Assignment here avoids type-juggling in other areas regarding (possibly) undefined values.
  let cache: Record<string, any> = {}

  function memoized(...args: TArgs): T {
    if (memoized.cache) {
      cache = memoized.cache
    }

    let key = args.map(toString).join(',')

    if (Object.keys(cache).length === cacheSize) {
      // clear the cache when it's maxed out
      cache = {}
    }

    if (cache[key]) {
      return cache[key]
    }

    const result = fn(...args)
    memoized.cache = cache
    memoized.cache[key] = result

    return result
  }

  memoized.cache = {} as Record<string, any>

  return memoized
}
