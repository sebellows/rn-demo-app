import React from 'react'
import { StyleSheet, TextInputEndEditingEventData, NativeSyntheticEvent } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Card } from './Card'
import { TextField } from './TextInput'

const SearchBar = ({
  query,
  onQueryChange,
  onQuerySubmit,
}: {
  query: string
  onQueryChange: (text: string) => void
  onQuerySubmit: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void
}) => {
  return (
    <Card variant="formControl" mt="10" height={50} flexDirection="row" borderRadius="md">
      <Feather name="search" style={styles.iconStyle} />
      <TextField
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        value={query}
        onChangeText={onQueryChange}
        onEndEditing={onQuerySubmit}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
})

SearchBar.displayName = 'SearchBar'

export { SearchBar }
