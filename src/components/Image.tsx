import { createBox } from '@shopify/restyle'
import { Theme } from '../theme'
import { Image as RNImage, ImageProps } from 'react-native'

const Image = createBox<Theme, ImageProps>(RNImage)

Image.displayName = 'MediaImage'

export { Image }
