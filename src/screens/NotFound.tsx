import { useNavigation, useRoute } from '@react-navigation/native'

import type { StackNavProp, StackRouteProp } from '../routes'
import { Button, Card, Heading } from '../components'

export const NotFound = () => {
  const route = useRoute<StackRouteProp<'NotFound'>>()
  const { navigate } = useNavigation<StackNavProp<'NotFound'>>()
  return (
    <Card flex={1} justifyContent="center" alignItems="center" p="8">
      <Heading level={1}>404 Not Found ({route.path})</Heading>
      <Button variant="primary" mb="10" onPress={() => navigate('Search')}>
        Go to home
      </Button>
    </Card>
  )
}
