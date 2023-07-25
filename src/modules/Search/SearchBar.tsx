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
    <Card variant="formControl" mt="4" height={50} flexDirection="row" borderRadius="md">
      <Icon name="search" size={28} color="mutedFg" alignSelf="center" ml="2" mr="4" />
      <TextField
        color="neutralDark"
        fontSize={14}
        placeholderTextColor="mutedFg"
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
