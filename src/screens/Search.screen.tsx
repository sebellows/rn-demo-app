import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'

import { ResultsList, SearchBar } from '../modules/Search'
import { useApi } from '../api'
import { Card, Text } from '../components'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useApi()

  const filterResultsByPrice = useCallback(
    (price: string) => {
      // price === '$' || '$$' || '$$$'
      return results.filter(result => {
        return result.price === price
      })
    },
    [results],
  )

  return (
    <Card>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
      {errorMessage && (
        <Text variant="body" color="danger">
          {errorMessage}
        </Text>
      )}
      <ScrollView>
        <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
        <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
        <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
      </ScrollView>
    </Card>
  )
}

export default SearchScreen
