import React from 'react'

export type ElementTagNameMap = HTMLElementTagNameMap &
  Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>

export type ReplaceProps<
  Inner extends React.ElementType,
  P extends PropertyKey | Record<string, any> = {},
> = P extends PropertyKey
  ? Omit<React.ComponentPropsWithRef<Inner>, P> & P
  : Omit<React.ComponentPropsWithRef<Inner>, keyof P> & P

export interface AsProp<As extends React.ElementType = React.ElementType> {
  as?: As
}

export type IntrinsicElement<As> = As extends RefForwardingComponentAs<infer T, any> ? T : As

/** @see {React.ForwardRefRenderFunction} */
export type RefForwardingComponentAs<TInitial extends React.ElementType, P = {}> = {
  <As extends React.ElementType = TInitial>(
    props: React.PropsWithChildren<ReplaceProps<As, AsProp<As> & P>>,
    ref: React.ForwardedRef<any>, // React.ForwardedRef<React.ElementRef<IntrinsicElement<As>>>
  ): React.ReactElement | null
  /** required here to improve debugging in React devtools. */
  displayName?: string | undefined
  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /** defaultProps are not supported on render functions */
  defaultProps?: never | undefined
  /** propTypes are not supported on render functions */
  propTypes?: never | undefined
}

export const forwardRefAs = <As extends React.ElementType = React.ElementType, P = unknown>(
  render: RefForwardingComponentAs<IntrinsicElement<As>, P>,
) => {
  return React.forwardRef(render) as any
}
