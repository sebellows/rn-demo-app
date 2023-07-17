import { isDefined, isUndefined } from './lang'

export function get<
  BaseType,
  Path extends string | readonly string[],
  TDefault extends unknown = any,
>(obj: BaseType, path: Path, defaultValue?: TDefault): any {
  let i = 0,
    key: PropertyKey,
    value = undefined,
    currObj: any = obj,
    paths: string[] = []

  if (Array.isArray(path)) {
    paths = path
  } else if (typeof path === 'string') {
    paths = (path as string).split('.')
  }

  paths = paths.reduce((acc, p) => {
    if (/\[(\d+)\]/.test(p)) {
      let [p1, p2] = p.split('[')
      p2 = p2.slice(0, -1)
      acc.push(p1, p2)
    } else {
      acc.push(p)
    }
    return acc
  }, [] as string[])

  if (!paths.length) return defaultValue

  const len = paths.length

  for (let p of paths) {
    ++i
    key = isNaN(+p) ? p : +p

    if (currObj[key]) {
      currObj = currObj[key]

      value = currObj
    } else if (i == len) {
      value = currObj
    }
  }

  if (isUndefined(value) && isDefined(defaultValue)) {
    return defaultValue
  }

  return value
}
