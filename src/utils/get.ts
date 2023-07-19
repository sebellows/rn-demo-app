import { isEmpty, isNil, isNumber, isPlainObject, isPrimitive, isString, isUndefined } from './lang'
import { cloneDeep } from './clone'
import { NumericRecord, PropertyPath } from '../types'
import { hasOwn } from './common'

/**
 * NOTE:
 * The below is taken from `@types/lodash` because the `Get` type in type-fest could
 * not account for the setting of default value.
 */

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? 'length' extends keyof T
    ? number extends T['length']
      ? number extends keyof T
        ? T[number]
        : undefined
      : undefined
    : undefined
  : undefined

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | GetIndexedField<Exclude<T, undefined>, Key>
  | Extract<T, undefined>

type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof Exclude<T, undefined>
    ? FieldWithPossiblyUndefined<Exclude<T, undefined>[Left], Right> | Extract<T, undefined>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? FieldWithPossiblyUndefined<IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>, Right>
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
    : undefined
  : IndexedFieldWithPossiblyUndefined<T, P>

function get<TObject extends object, TKey extends keyof TObject>(
  obj: TObject,
  path: TKey | [TKey],
): TObject[TKey]
function get<TObject extends object, TKey extends keyof TObject>(
  obj: TObject | null | undefined,
  path: TKey | [TKey],
): TObject[TKey] | undefined
function get<TObject extends object, TKey extends keyof TObject, TDefault>(
  obj: TObject | null | undefined,
  path: TKey | [TKey],
  defaultValue: TDefault,
): Exclude<TObject[TKey], undefined> | TDefault
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
>(obj: TObject, path: [TKey1, TKey2]): TObject[TKey1][TKey2]
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
>(obj: TObject | null | undefined, path: [TKey1, TKey2]): TObject[TKey1][TKey2] | undefined
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TDefault,
>(
  obj: TObject | null | undefined,
  path: [TKey1, TKey2],
  defaultValue: TDefault,
): Exclude<TObject[TKey1][TKey2], undefined> | TDefault
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
>(obj: TObject, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3]
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
>(
  obj: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3],
): TObject[TKey1][TKey2][TKey3] | undefined
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TDefault,
>(
  obj: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3],
  defaultValue: TDefault,
): Exclude<TObject[TKey1][TKey2][TKey3], undefined> | TDefault
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TKey4 extends keyof TObject[TKey1][TKey2][TKey3],
>(obj: TObject, path: [TKey1, TKey2, TKey3, TKey4]): TObject[TKey1][TKey2][TKey3][TKey4]
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TKey4 extends keyof TObject[TKey1][TKey2][TKey3],
>(
  obj: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3, TKey4],
): TObject[TKey1][TKey2][TKey3][TKey4] | undefined
function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TKey4 extends keyof TObject[TKey1][TKey2][TKey3],
  TDefault,
>(
  obj: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3, TKey4],
  defaultValue: TDefault,
): Exclude<TObject[TKey1][TKey2][TKey3][TKey4], undefined> | TDefault
function get<T>(obj: NumericRecord<T>, path: number): T
function get<T>(obj: NumericRecord<T> | null | undefined, path: number): T | undefined
function get<T, TDefault>(
  obj: NumericRecord<T> | null | undefined,
  path: number,
  defaultValue: TDefault,
): T | TDefault
function get<TDefault>(obj: null | undefined, path: PropertyPath, defaultValue: TDefault): TDefault
function get(obj: null | undefined, path: PropertyPath): undefined
function get<TObject, TPath extends string>(
  data: TObject,
  path: TPath,
): string extends TPath ? any : GetFieldType<TObject, TPath>
function get<TObject, TPath extends string, TDefault = GetFieldType<TObject, TPath>>(
  data: TObject,
  path: TPath,
  defaultValue: TDefault,
): Exclude<GetFieldType<TObject, TPath>, null | undefined> | TDefault
function get(obj: any, path: PropertyPath, defaultValue?: any): any {
  if (isNil(obj) || isPrimitive(obj)) return obj ?? defaultValue

  if (!isEmpty(path)) return defaultValue

  let i = 0
  let currObj = cloneDeep(obj)
  let paths: string[] = []

  if (hasOwn(path, 'length')) {
    if (isString(path)) paths = path.split('.')
    else if (Array.isArray(path)) paths = path.slice()
  }

  if (!paths.length) return defaultValue

  for (let p of paths) {
    if (isPlainObject(currObj) && currObj[p]) {
      currObj = currObj[p]
    } else if (Array.isArray(currObj)) {
      let index = p.match(/(?<=\[)\d+(?=\])/)?.[0]
      if (index) {
        currObj = currObj[+index]
      } else if (isNumber(p)) {
        currObj = currObj[+p]
      }
    }

    if (isPlainObject(currObj)) {
      const dotPath = paths.slice(i).join('.')
      return get(currObj, dotPath, defaultValue)
    }

    i++
  }

  return isUndefined(currObj) ? currObj : defaultValue
}

export { get }
