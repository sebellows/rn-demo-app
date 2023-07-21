import { PixelRatio, Platform, PlatformOSType } from 'react-native'
import { Box, Card, Text } from '../../components'
import { Image } from '../../components/Image'
import { YelpDto } from '../../types/YelpDto'

const resolveImagePathByPixelDensity = (ratio: number, isAndroid?: boolean) => {
  switch (ratio) {
    case 1:
      // mdpi Android devices (160 dpi)
      return isAndroid ? 'mdpi' : ''
    case 1.5:
      // hdpi Android devices (240 dpi)
      return isAndroid ? 'hdpi' : ''
    case 2:
      // iPhone 4, 4S, 5, 5c, 5s, 6 / xhdpi Android devices (320 dpi)
      return isAndroid ? 'xhdpi' : '@2x'
    case 3:
      // iPhone 6+ / xxhdpi Android devices (480 dpi)
      return isAndroid ? 'xxhdpi' : '@3x'
    case 3.5:
      // xxxhdpi Android devices (i.e., Nexus 6)
      return isAndroid ? 'xxxhdpi' : '@3x'
    default:
      return isAndroid ? 'hdpi' : ''
  }
}

const isInt = (n: number) => n % 1 === 0

const RATING_STAR_SIZE_H = 12
const RATING_STAR_SIZE_W = 66

const resolveRating = (rating: number) => {
  const isAndroid = Platform.OS === 'android'
  const ratio = PixelRatio.get()
  const dpi = resolveImagePathByPixelDensity(ratio, isAndroid)
  const ratingPath = isInt(rating) ? rating : `${rating}_half`

  const uri = isAndroid
    ? `/android/drawable-${dpi}/large/stars_large_${ratingPath}.png`
    : `/web_and_ios/large/large_${ratingPath}${dpi}.png`

  return {
    source: { uri: require(`../../../assets/yelp_stars/${uri}`) },
    width: PixelRatio.getPixelSizeForLayoutSize(RATING_STAR_SIZE_W),
    height: PixelRatio.getPixelSizeForLayoutSize(RATING_STAR_SIZE_H),
  }
}

const ResultsItem = ({ result }: { result: YelpDto.Business }) => {
  const ratingImgProps = resolveRating(result.rating)

  return (
    <Card ml="4">
      <Image
        width={250}
        height={120}
        borderRadius="md"
        mb="1.5"
        source={{ uri: result.image_url }}
      />
      <Text fontWeight="bold">{result.name}</Text>
      <Box>
        <Image {...ratingImgProps} />
        <Text>
          {result.rating} Stars, {result.review_count} Reviews
        </Text>
      </Box>
    </Card>
  )
}

ResultsItem.displayName = 'ResultsItem'

export { ResultsItem }
