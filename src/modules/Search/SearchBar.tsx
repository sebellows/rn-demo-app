import React from 'react'
import { TextInputEndEditingEventData, NativeSyntheticEvent } from 'react-native'

import { Card, Icon, TextField } from '../../components'

const SearchBar = ({
  term,
  onTermChange,
  onTermSubmit,
}: {
  term: string
  onTermChange: (text: string) => void
  onTermSubmit: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void
}) => {
  return (
    <Card variant="formControl" mt="10" height={50} flexDirection="row" borderRadius="md">
      <Icon name="search" fontSize={35} alignSelf="center" mx="4" />
      <TextField
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </Card>
  )
}

SearchBar.displayName = 'SearchBar'

export { SearchBar }
