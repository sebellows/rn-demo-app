import { isFunction, isNumber } from './lang'

type RangeMapFn<T> = (v: T, k: number) => T

function rangeFromTo<T>(
  from: number,
  to?: number,
  step = 1,
  initialValue: T | number | undefined = undefined,
) {
  let length = from

  if (!to) {
    // If there's no `to` argument, then `from` sets the length of the array
    to = from - 1
    from = 0
  } else if (from === 0) {
    // If `to` is set and `from` is 0, we want to ensure the result's last item is `to`
    length = to + 1
  } else {
    const diff = to - from
    if (diff % step !== 0) {
      // if step doesn't divide evenly into the difference of `to` and `from`, we want to
      // add an extra slot to the length so we get as close to `to` as we can.
      length = diff + 1
    } else {
      // Otherwise add step value to the difference to ensure `to` is last index value
      length = diff + step
    }
  }

  length = Math.ceil(length / step)

  return Array.from({ length }, (_, i) => {
    if (initialValue) return initialValue

    return from + i * step
  })
}

function range<T extends any = unknown>(
  start: number,
  stop: number,
  step: number,
  initialValue: T,
): T[]
function range<T extends unknown>(start: number, stop: number, step: number): number[]
function range<T extends unknown>(start: number, stop: number): number[]
function range(start: number): number[]
function range<T>(
  start: number,
  stop: number,
  step: number,
  initialValue: T | undefined,
): T[] | number[]
function range<T>(start: number, mapFn: RangeMapFn<T>, thisArg: T): T[]
function range<T extends any = unknown>(
  start: number,
  mapFn: RangeMapFn<T>,
  thisArg?: T | undefined,
): T[] | number[]
function range(start: number, mapFn: RangeMapFn<any>, thisArg?: any): any[]
function range(start: number, ...args: any[]) {
  if (!args.length) {
    return rangeFromTo(start)
  }

  if (!isNumber(args[0]) && !isFunction(args[0])) {
    throw new Error(`Second argument in range function should be either a number or a callback.`)
  }

  if (isNumber(args[0])) {
    let [stop, ...rest] = args

    return rangeFromTo(start, stop, ...rest)
  }

  const [mapFn, thisArg] = args

  return Array.from({ length: start }, mapFn, thisArg)
}

export { range }
