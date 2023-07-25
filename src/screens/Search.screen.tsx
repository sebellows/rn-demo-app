import React, { useCallback, useMemo, useRef, useState } from 'react'
import { GestureResponderEvent, ScrollView } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import { ResultsList, SearchBar } from '../modules'
import { useApi } from '../api'
import {
  Box,
  Button,
  Card,
  Icon,
  RadioButton,
  RadioButtonGroup,
  SafeAreaBox,
  Text,
} from '../components'
import { YelpDto } from '../types/YelpDto'

const ResultFilters = {
  open: (result: YelpDto.Business) => result.is_closed !== true,
  $: (result: YelpDto.Business) => result.price === '$',
  $$: (result: YelpDto.Business) => result.price === '$$',
  $$$: (result: YelpDto.Business) => result.price === '$$$',
  delivery: (result: YelpDto.Business) =>
    result.transactions.includes(YelpDto.Transaction.Delivery),
}

const compare = (
  results: YelpDto.Business[],
  sortKey: keyof YelpDto.Business,
  dir: 'ASC' | 'DESC' = 'ASC',
) => {
  return results.sort((a, b) => {
    const aValue = a?.[sortKey] ?? -1
    const bValue = b?.[sortKey] ?? -1

    if (dir === 'ASC') {
      if (aValue < bValue) return -1
      if (aValue > bValue) return 1
    } else {
      if (aValue < bValue) return 1
      if (aValue > bValue) return -1
    }
    return 0
  })
}

const SortingFilters = {
  distance: (results: YelpDto.Business[]) => compare(results, 'distance'),
  rating: (results: YelpDto.Business[]) => compare(results, 'rating'),
}

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const { search, results, updateResults, errorMessage } = useApi()

  const [filters, setFilters] = useState<string[]>([])
  const [sortingFilter, setSortingFilter] = useState<keyof typeof SortingFilters | null>(null)

  const prevResults = useRef<YelpDto.Business[]>(results)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomSheetIsOpen = useRef<boolean>(false)

  const title = useMemo(() => {
    if (term && results?.length && results[0]?.location?.city) {
      return `All "${term}" results for ${results[0].location.city}`
    }
    return `All ${term} results`
  }, [term])

  const disabled = useMemo(() => !!results?.length === false, [results])

  const toggleBottomSheet = useCallback(() => {
    if (bottomSheetIsOpen.current === false) {
      bottomSheetIsOpen.current = true
      bottomSheetRef.current?.expand()
    } else if (bottomSheetIsOpen.current === true) {
      bottomSheetIsOpen.current = false
      bottomSheetRef.current?.close()
    }
  }, [])

  /** Callback when the sheet position changed to a provided point. */
  const handleBottomSheetChange = useCallback((index: number) => {
    // TODO: dismiss BottomSheet following sort-filter selection
    console.log('handleBottomSheetChange', index)
  }, [])

  const handleSortingChange = (e: string | GestureResponderEvent) => {
    let sortingFilterValue = typeof e === 'string' ? e : e.nativeEvent.target
    let filter: keyof typeof SortingFilters | undefined

    if (sortingFilterValue) {
      filter = sortingFilterValue as keyof typeof SortingFilters
    }

    if (filter && sortingFilter !== filter) {
      setSortingFilter(filter)
      updateResults(SortingFilters[filter](results))
    } else {
      setSortingFilter(null)
      updateResults(prevResults.current)
    }
  }

  const handleFilterChange = (filterType: string) => {
    if (filters.includes(filterType)) {
      const _filters = filters.slice()
      _filters.splice(filters.indexOf(filterType))
      setFilters(_filters)

      const filterFn = ResultFilters[filterType as keyof typeof ResultFilters]
      const _results = results.slice()
      updateResults(_results.filter(filterFn))
    }
  }

  return (
    <SafeAreaBox>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={search} />
      {errorMessage && (
        <Card variant="error" borderRadius="md">
          <Text variant="body" color="danger">
            {errorMessage}
          </Text>
        </Card>
      )}
      <ScrollView horizontal>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pt="4"
          pb="3"
          borderBottomWidth={1}
          borderColor="border"
          visible={!disabled}
        >
          <Button
            borderRadius="pill"
            onPress={toggleBottomSheet}
            flexDirection="row"
            minWidth={60}
            mr="1"
          >
            <Icon name="chevron-down" size={12} color="mutedFg" />
            <Text variant="small">Sort</Text>
          </Button>
          <Button borderRadius="pill" onPress={() => handleFilterChange('$')} mr="2" minWidth={50}>
            <Text variant="small" textAlign="center">
              $
            </Text>
          </Button>
          <Button borderRadius="pill" onPress={() => handleFilterChange('$$')} mr="2" minWidth={50}>
            <Text variant="small" textAlign="center">
              $$
            </Text>
          </Button>
          <Button
            borderRadius="pill"
            onPress={() => handleFilterChange('$$$')}
            mr="2"
            minWidth={50}
          >
            <Text variant="small" textAlign="center">
              $$$
            </Text>
          </Button>
          <Button borderRadius="pill" onPress={() => handleFilterChange('delivery')} mr="2">
            <Text variant="small">Delivery</Text>
          </Button>
          <Button borderRadius="pill" onPress={() => handleFilterChange('open')} mr="2">
            <Text variant="small">Currently Open</Text>
          </Button>
        </Box>
      </ScrollView>

      <ResultsList results={results} title={title} />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={['25%', '50%']}
        onChange={handleBottomSheetChange}
      >
        <RadioButtonGroup value={sortingFilter ?? ''} onValueChange={handleSortingChange}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb={'2'}>
            <Text variant="buttonLabel">Distance</Text>
            <RadioButton value="distance" />
          </Box>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text variant="buttonLabel">Ratings</Text>
            <RadioButton value="rating" />
          </Box>
        </RadioButtonGroup>
      </BottomSheet>
    </SafeAreaBox>
  )
}

export default SearchScreen
