import { useEffect, useMemo, useRef } from 'react'
import { Platform } from 'react-native'
import { Asset } from 'expo-asset'

import { Box, Card, Image, Text } from '../../components'
import { YelpDto } from '../../types/YelpDto'

const loadStarsByRating = async (rating: number): Promise<Asset[]> => {
  const isAndroid = Platform.OS === 'android'

  if (isAndroid) {
    switch (rating) {
      case 0:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_0.png'),
        ])
      case 1:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_1.png'),
        ])
      case 1.5:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_1_half.png'),
        ])
      case 2:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_2.png'),
        ])
      case 2.5:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_2_half.png'),
        ])
      case 3:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_3.png'),
        ])
      case 3.5:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_3_half.png'),
        ])
      case 4:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_4.png'),
        ])
      case 4.5:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_4_half.png'),
        ])
      case 5:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_5.png'),
        ])
      default:
        return await Asset.loadAsync([
          require('./assets/yelp_stars/android/drawable-xxhdpi/small/stars_small_0.png'),
        ])
    }
  }
  switch (rating) {
    case 0:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_0.png')])
    case 1:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_1.png')])
    case 1.5:
      return await Asset.loadAsync([
        require('./assets/yelp_stars/web_and_ios/small/small_1_half.png'),
      ])
    case 2:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_2.png')])
    case 2.5:
      return await Asset.loadAsync([
        require('./assets/yelp_stars/web_and_ios/small/small_2_half.png'),
      ])
    case 3:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_3.png')])
    case 3.5:
      return await Asset.loadAsync([
        require('./assets/yelp_stars/web_and_ios/small/small_3_half.png'),
      ])
    case 4:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_4.png')])
    case 4.5:
      return await Asset.loadAsync([
        require('./assets/yelp_stars/web_and_ios/small/small_4_half.png'),
      ])
    case 5:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_5.png')])
    default:
      return await Asset.loadAsync([require('./assets/yelp_stars/web_and_ios/small/small_0.png')])
  }
}

const RATING_STAR_SIZE_H = 14
const RATING_STAR_SIZE_W = 82

const ResultsItem = ({ result }: { result: YelpDto.Business }) => {
  const asset = useRef<Asset | null>(null)

  // const starsIconWidth = PixelRatio.getPixelSizeForLayoutSize(RATING_STAR_SIZE_W)
  // const starsIconHeight = PixelRatio.getPixelSizeForLayoutSize(RATING_STAR_SIZE_H)
  const distance = useMemo(() => Number((result.distance / 1609.34).toFixed(1)), [])

  useEffect(() => {
    async function loadRatingStars() {
      const assets = await loadStarsByRating(result.rating)
      if (assets.length) {
        asset.current = assets[0]
      }
    }

    loadRatingStars()
  }, [])

  return (
    <Card p="0">
      <Image
        width={250}
        height={120}
        borderRadius="md"
        mb="1.5"
        source={{ uri: result.image_url }}
      />
      <Box pt="2" pb="1" flexDirection="row" alignItems="flex-start" justifyContent="space-between">
        <Text variant="h5">{result.name}</Text>
        <Text variant="small" color="mutedFg">
          {distance} mi
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" mb="0.5">
        {asset.current?.localUri && (
          <Box pr="1">
            <Image
              source={{
                uri: asset.current.localUri,
                width: RATING_STAR_SIZE_W,
                height: RATING_STAR_SIZE_H,
              }}
            />
          </Box>
        )}
        <Box>
          <Text variant="small" color="mutedFg">
            {result.review_count} Reviews
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" mb="1">
        <Text variant="small" color="mutedFg">
          {result.location.city}
        </Text>
        <Text variant="small" color="mutedFg">
          {' • '}
        </Text>
        <Text variant="small" color="mutedFg">
          {result.price}
        </Text>
        <Text variant="small" color="mutedFg">
          {' • '}
        </Text>
        <Text variant="small" color={result.is_closed ? 'danger' : 'success'} fontWeight="500">
          {result.is_closed ? 'Closed' : 'Open'}
        </Text>
      </Box>
      <Box flexDirection="row" flexWrap="wrap">
        {result.categories.map((cat, i) => (
          <Card
            key={cat.title}
            borderRadius="pill"
            borderWidth={1}
            borderColor="border"
            py="0.5"
            px="2"
            ml={i === 0 ? '0' : '1'}
          >
            <Text variant="small">{cat.title}</Text>
          </Card>
        ))}
      </Box>
    </Card>
  )
}

ResultsItem.displayName = 'ResultsItem'

export { ResultsItem }
