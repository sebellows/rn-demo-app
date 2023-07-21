import { TextProps } from '@shopify/restyle'

import { Theme } from '../theme'

import { Text } from './Text'
import { PropsWithChildren } from 'react'

type HeadingProps = TextProps<Theme> & { level: 1 | 2 | 3 | 4 | 5 | 6 }

export const Heading = ({ level = 1, ...props }: PropsWithChildren<HeadingProps>) => {
  return <Text variant={`h${level}`} {...props} />
}
