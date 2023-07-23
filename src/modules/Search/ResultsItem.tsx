import { PixelRatio, Platform } from 'react-native'
import { Asset } from 'expo-asset'

import { Box, Card, Text } from '../../components'
import { Image } from '../../components/Image'
import { YelpDto } from '../../types/YelpDto'

import { get } from '../../utils'
import { yelpStars } from '../../static/yelp-stars'
import { useEffect, useRef, useState } from 'react'

const resolveDpiNameByPixelRatio = (ratio: number, isAndroid?: boolean) => {
  switch (ratio) {
    case 1.5:
      // hdpi Android devices (240 dpi)
      return isAndroid ? 'hdpi' : ''
    case 2:
      // iPhone 4, 4S, 5, 5c, 5s, 6 / xhdpi Android devices (320 dpi)
      return isAndroid ? 'xhdpi' : '@2x'
    // iPhone 6+ / xxhdpi Android devices (480 dpi)
    case 3:
    // xxxhdpi Android devices (i.e., Nexus 6) - NOTE: there are no xxxhdpi images for Yelp ratings
    case 3.5:
      return isAndroid ? 'xxhdpi' : '@3x'
    default:
      return isAndroid ? 'hdpi' : ''
  }
}

const RATING_STAR_SIZE_H = 12
const RATING_STAR_SIZE_W = 66

const resolveRatingImagePath = (rating: number) => {
  const isAndroid = Platform.OS === 'android'
  const ratio = PixelRatio.get()
  const dpi = resolveDpiNameByPixelRatio(ratio, isAndroid)

  const os = isAndroid ? 'android' : 'ios'

  // @ts-ignore
  let imagePath: string = yelpStars[os][dpi][`${rating}`] // get(ratings, `${os}.${dpi}.${rating}`, '')
  // console.log(`\n***** IMAGE PATH *****\n`, os, dpi, rating)

  // if (!imagePath.length) {
  //   console.warn('Could not resolve imagePath for Yelp rating icon')
  // } else {
  //   console.log(`Resolved rating icon path: ${imagePath}`)
  // }

  return imagePath
}

const ResultsItem = ({ result }: { result: YelpDto.Business }) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  const asset = useRef<Asset | null>(null)

  const starsIconWidth = PixelRatio.getPixelSizeForLayoutSize(RATING_STAR_SIZE_W)
  const starsIconHeight = PixelRatio.getPixelSizeForLayoutSize(RATING_STAR_SIZE_H)

  useEffect(() => {
    async function loadResourcesAsync() {
      const imgPath = resolveRatingImagePath(result.rating)
      const assets = await Asset.loadAsync([
        require('./assets/yelp_stars/web_and_ios/large/large_4@3x.png'),
      ])
      asset.current = assets[0]
    }

    async function loadResourcesAndDataAsync() {
      try {
        await loadResourcesAsync()
        setLoadingComplete(true)
      } catch (e) {
        console.warn(e)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

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
      <Box flexDirection="row">
        {asset.current && (
          <Image
            width={starsIconWidth}
            height={starsIconHeight}
            source={{ uri: asset.current.uri }}
          />
        )}
        <Text variant="small" color="mutedFg">
          , {result.review_count} Reviews
        </Text>
      </Box>
    </Card>
  )
}

ResultsItem.displayName = 'ResultsItem'

export { ResultsItem }
