import { get } from './get'

describe('get', () => {
  it('gets a nested value', () => {
    const foo = get({ a: { b: { c: 'foo' } } }, 'a.b.c')
    expect(foo).toStrictEqual('foo')
  })

  it('gets a nested value from a path with an array index', () => {
    const bar = get({ a: { b: [{ id: 'foo' }, { id: 'bar' }] } }, 'a.b.[1].id')
    expect(bar).toStrictEqual('bar')
  })

  it('if passed a default value, it will return it if the nested path cannot be resolved or is undefined', () => {
    const result = get({ a: { b: [{ name: 'foo' }, { name: 'bar' }] } }, 'a.b.[1].id', 'bez')
    expect(result).toStrictEqual('bez')
  })

  it('will return undefined if the path cannot be resolved and no default value is passed', () => {
    const result = get({ a: { b: [{ name: 'foo' }, { name: 'bar' }] } }, 'a.b.[1].id')
    expect(result).toBeUndefined()
  })
})
