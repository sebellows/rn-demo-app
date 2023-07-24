import { isMap, isPlainObject, isUndefined, typeOf } from './lang'

describe('typeOf', () => {
  it('returns the type of a plain object as a lowercase string of "object"', () => {
    const result = typeOf({ foo: 'bar' })
    expect(result).toStrictEqual('object')
  })
  it('returns the type of a Symbol as a lowercase string of "symbol"', () => {
    const result = typeOf(Symbol.for('Bob'))
    expect(result).toStrictEqual('symbol')
  })
  it('returns the type of a Function as a lowercase string of "function"', () => {
    const result = typeOf(() => 2)
    expect(result).toStrictEqual('function')
  })
})

describe('isPlainObject', () => {
  it('returns true if the type of argument is a plain object', () => {
    const result = isPlainObject({ foo: 'bar' })
    expect(result).toStrictEqual(true)
  })
})

describe('isMap', () => {
  it('returns true if the type of argument is a Map object', () => {
    const result = isMap(new Map())
    expect(result).toStrictEqual(true)
  })
})

describe('isUndefined', () => {
  it('returns true if the type of argument is strictly undefined', () => {
    const result = isUndefined(undefined)
    expect(result).toStrictEqual(true)
  })
  it('returns false if the type of argument is defined', () => {
    const result = isUndefined('WooHoo!')
    expect(result).toStrictEqual(false)
  })
})
