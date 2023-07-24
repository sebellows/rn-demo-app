import { Dispatch, SetStateAction, useState } from 'react'
import { api } from '../api'
import { YelpDto } from '../../types/YelpDto'
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native'

type SearchApi = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => Promise<void>
type SearchResults = YelpDto.Business[]

export const useApi = (): {
  search: SearchApi
  results: SearchResults
  updateResults: Dispatch<SetStateAction<SearchResults>>
  errorMessage: string
} => {
  const [results, setResults] = useState<YelpDto.Business[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const searchApi = async (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ): Promise<void> => {
    const term = e.nativeEvent.text

    try {
      const response = await api.get('/search', {
        params: {
          limit: 50,
          term: term,
          location: 'ann arbor',
        },
      })

      const data = response.data as YelpDto.Query

      setResults(data.businesses)
    } catch (err) {
      setErrorMessage('Something went wrong')
    }
  }

  return { search: searchApi, results, updateResults: setResults, errorMessage }
}
