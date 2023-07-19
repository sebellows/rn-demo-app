import type { GestureResponderEvent } from 'react-native'

const touchableEvents = ['onPress', 'onLongPress', 'onPressIn', 'onPressOut'] as const

type TouchableEventObject = Partial<
  Record<(typeof touchableEvents)[number], (event: GestureResponderEvent) => void>
>

export function hasTouchHandler(touchableEventObject: TouchableEventObject) {
  return touchableEvents.some(event => Boolean(touchableEventObject[event]))
}
