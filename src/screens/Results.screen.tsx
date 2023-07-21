import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { FlatList, Image, StyleSheet } from 'react-native'

import yelp from '../api/yelp'
import { Card, Text } from '../components'
import { BusinessDetails } from '../types/business-details.types'
import { StackRouteProp } from '../screens'

const ResultsScreen = () => {
  const {
    params: { id },
  } = useRoute<StackRouteProp<'Results'>>()
  const [result, setResult] = useState<BusinessDetails | null>(null)

  const getResult = async (id: string) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return null
  }

  return (
    <Card width="100%">
      <Text variant="h1">Search Results Listing</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
})

export default ResultsScreen
