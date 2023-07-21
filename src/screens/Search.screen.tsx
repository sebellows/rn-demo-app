import React, { useState } from 'react'

import { SearchBar } from '../components/SearchBar'
import yelp from '../api/yelp'
import { Card, Text } from '../components'

const SearchScreen = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const searchApi = async () => {
    const response = await yelp.get('/search', {
      params: {
        limit: 50,
        query,
        location: 'Ann Arbor',
      },
    })
    setResults(response.data.businesses)
  }

  return (
    <Card>
      <SearchBar query={query} onQueryChange={setQuery} onQuerySubmit={searchApi} />
      <Text variant="h1">Search Screen</Text>
      <Text variant="body">We have found {results.length} results</Text>
    </Card>
  )
}

export default SearchScreen
