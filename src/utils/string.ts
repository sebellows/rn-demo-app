import { Primitive } from 'type-fest'
import { _protoToString } from './lang'

function cached<T>(fn: (str: string) => T) {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Convert a hyphen-delimited string to camelcase.
 * @example
 * "my-app" => "myApp"
 */
const camelCaseRE = /-(\w)/g
export const camelCase = cached((str: string): string =>
  str.replace(camelCaseRE, (_, c) => (c ? c.toUpperCase() : '')),
)

export const capitalize = cached(
  (str: string): string => str.charAt(0).toUpperCase() + str.slice(1),
)

/**
 * Convert a string to kebab-case.
 * @example
 * "myApp" => "my-app"
 */
const kebabCaseRE = /\B([A-Z])/g
export const kebabCase = cached((str: string): string =>
  str.replace(kebabCaseRE, '-$1').toLowerCase(),
)

// const primitives = ['string', 'number', 'boolean', 'bigint', 'symbol']
// type PrimitiveType = typeof primitives[number]
// type Coercer = { [key: PrimitiveType]: {
//   to: Record<string, any>
// }}
// type CoercionMethod = () => any
// const allButOne = (type: PrimitiveType) => primitives.filter(pred => pred !== type)

// const coerceFn = (value: any) => {
//   if (!isPrimitive(value)) return
//   return primitives.reduce((types, type) => {
//     let rem = allButOne(type)
//     let to = rem.reduce((acc, m) => {
//       let meth: CoercionMethod | undefined
//       switch (m) {
//         case 'string':
//           meth = () => value.toString()
//           break
//         case 'number':
//           meth = () => parseFloat(value)
//           break
//         case 'boolean':
//           meth = () => {
//             if (isBoolean(value) || value === 'true' || value === 'false') {
//               return `${value}` === 'true'
//             }
//             return !!value
//           }
//           break
//         case 'bigint':
//           meth = () => {
//             if (isNaN(value)) {
//               return parseFloat(value)
//             }
//             return BigInt(value)
//           }
//           break
//         case 'symbol':
//           meth = () => {
//             if (isSymbol(value)) {
//               return value
//             }
//             return Symbol.for(value)
//           }
//           break
//         default:
//       }
//       if (meth) {
//         acc[m] = meth
//       }
//       return acc
//     }, {} as Record<string, CoercionMethod>)
//     types[type] = { to }
//     return types
//   }, {} as Partial<Coercer>)
// }
