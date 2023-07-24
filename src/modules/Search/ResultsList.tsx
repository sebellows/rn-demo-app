import { Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { YelpDto } from '../../types/YelpDto'
import { Box, Card, Text } from '../../components'

import { ResultsItem } from './ResultsItem'

const ResultsList = ({ title, results }: { title: string; results: YelpDto.Business[] }) => {
  const navigation = useNavigation()

  if (!results.length) {
    return null
  }

  return (
    <Card pl="0" mb="2.5">
      <Text variant="h4" mb="1.5">
        {title}
      </Text>
      <FlatList
        // horizontal
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={result => result.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Results', { id: item.id })}>
                <ResultsItem result={item} />
              </TouchableOpacity>
              <Box
                backgroundColor="baseBorderColor"
                height={1}
                my="4"
                width="100%"
                visible={index !== results.length - 1}
              />
            </>
          )
        }}
      />
    </Card>
  )
}

export { ResultsList }
