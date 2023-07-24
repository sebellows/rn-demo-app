import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native'

import { Card, Image, Text } from '../components'
import { YelpDto } from '../types/YelpDto'
import { StackRouteProp } from '../routes'
import { api } from '../api'

const ResultsScreen = () => {
  const {
    params: { id },
  } = useRoute<StackRouteProp<'Results'>>()
  const [result, setResult] = useState<YelpDto.BusinessDetails | null>(null)

  const getResult = async (id: string) => {
    const response = await api.get(`/${id}`)
    setResult(response.data)
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return null
  }

  return (
    <Card>
      <Text variant="h1">Search Results Listing</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image width={300} height={200} source={{ uri: item }} />
        }}
      />
    </Card>
  )
}

export default ResultsScreen
