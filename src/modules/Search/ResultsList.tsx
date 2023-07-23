import { FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { YelpDto } from '../../types/YelpDto'
import { Button, Card, Text } from '../../components'

import { ResultsItem } from './ResultsItem'

const ResultsList = ({ title, results }: { title: string; results: YelpDto.Business[] }) => {
  const navigation = useNavigation()

  if (!results.length) {
    return null
  }

  return (
    <Card mb="2.5">
      <Text variant="h4" ml="4" mb="1">
        {title}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={result => result.id}
        renderItem={({ item }) => {
          return (
            <Button onPress={() => navigation.navigate('Results', { id: item.id })}>
              <ResultsItem result={item} />
            </Button>
          )
        }}
      />
    </Card>
  )
}

export { ResultsList }
