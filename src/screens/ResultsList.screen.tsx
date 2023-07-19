import { useEffect, useState } from 'react'
import { Card, Text } from '../components'
import { RouteProp } from '@react-navigation/native'
import { FlatList, Image, StyleSheet } from 'react-native'
// import { useTheme } from '../theme'

const ResultsListScreen = ({ route }: RouteProp) => {
  // const theme = useTheme()
  const [result, setResult] = useState(null)
  const id = route.params.id

  const getResult = async id => {
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
    <Card variant="base">
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

export default ResultsListScreen
