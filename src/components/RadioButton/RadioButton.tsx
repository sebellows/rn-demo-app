import { GestureResponderEvent } from 'react-native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { useRadioButtonGroup } from './RadioButtonGroup'
import { useMemo } from 'react'
import { getCheckedStatus } from './RadioButton.utils'
import { Button } from '../Button'

export type RadioButtonProps = {
  /** Value of the radio button */
  value: string

  /** Status of radio button. */
  status?: 'checked' | 'unchecked'

  /** Whether radio is disabled. */
  disabled?: boolean

  /** Function to execute on press. */
  onPress?: (e: GestureResponderEvent) => void
}

const RadioButton = ({ disabled, onPress, status, value, ...props }: RadioButtonProps) => {
  const { value: parentValue, onValueChange } = useRadioButtonGroup()

  const checked = useMemo(
    () => getCheckedStatus({ parentValue, checkedStatus: status, childValue: value }) === 'checked',
    [parentValue, status, value],
  )

  const handleOnPress = (e: GestureResponderEvent) => {
    if (onPress && onValueChange) {
      console.warn(
        `The passed onPress callback will not be run because the RadioButton instance it is applied to is within the scope of a RadioButtonGroup. Use onValueChange instead.`,
      )
    }

    onValueChange?.(value) ?? onPress?.(e)
  }

  return (
    <Button
      {...props}
      borderless
      onPress={disabled ? undefined : handleOnPress}
      accessibilityRole="radio"
      accessibilityState={{ disabled, checked: !!checked }}
      accessibilityLiveRegion="polite"
      borderRadius="circle"
      backgroundColor="transparent"
      p="1.5"
    >
      <Box alignItems="center" justifyContent="center">
        <Icon
          allowFontScaling={false}
          name={checked ? 'disc' : 'circle'}
          size="small"
          color={checked ? 'primary' : 'mutedFg'}
        />
      </Box>
    </Button>
  )
}

RadioButton.displayName = 'RadioButton'

export { RadioButton }
