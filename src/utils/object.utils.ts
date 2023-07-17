import { Constructor } from 'type-fest'
import { Type } from '../types'

type ConstructorFunction = Function
export const getConstructor = <O extends Type | object>(obj: O): ConstructorFunction | false =>
  obj?.constructor ?? false

export const getConstructorPrototype = <O = unknown>(
  obj: O,
): O extends Type ? Constructor<O>['prototype'] : false => obj?.constructor?.prototype ?? false

export const getOwnSymbols = <O extends Type | object>(o: O, strict = false) => {
  const symbols = Object.getOwnPropertySymbols(o)

  if (strict) {
    return symbols.filter(sym => sym.valueOf() !== undefined)
  }

  return symbols
}

/**
 * Does the given object have the given property.
 *
 * @param obj - The object to inspect.
 * @param prop - The property to lookup.
 * @returns TRUE if the object has the enumerable property, else FALSE.
 */
export const hasEnumerableProp = (obj: object, prop: PropertyKey): boolean => {
  return typeof obj === 'object' && Object.prototype.propertyIsEnumerable.call(obj, prop)
}

/**
 * Get an iterable object that iterates over the given iterables.
 */
export function getIterableOfIterables<T>(
  iterables: ReadonlyArray<Readonly<Iterable<T>>>,
): Iterable<T> {
  return {
    *[Symbol.iterator]() {
      for (const iterable of iterables) {
        for (const value of iterable) {
          yield value
        }
      }
    },
  }
}
