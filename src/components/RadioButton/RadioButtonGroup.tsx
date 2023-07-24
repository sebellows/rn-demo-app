import { PropsWithChildren, createContext, useContext } from 'react'
import { Box } from '../Box'
import { GestureResponderEvent } from 'react-native'

export type RadioButtonGroupProps = {
  /** Function to execute on selection change. */
  onValueChange?: (e: string | GestureResponderEvent) => void

  /** Value of the currently selected radio button. */
  value: string
}

export const RadioButtonGroupContext = createContext<RadioButtonGroupProps>({
  value: '',
})

export const RadioButtonGroup = ({
  value,
  onValueChange,
  children,
}: PropsWithChildren<RadioButtonGroupProps>) => {
  return (
    <RadioButtonGroupContext.Provider value={{ value, onValueChange }}>
      <Box accessibilityRole="radiogroup">{children}</Box>
    </RadioButtonGroupContext.Provider>
  )
}

RadioButtonGroup.displayName = 'RadioButton.Group'

export const useRadioButtonGroup = () => useContext(RadioButtonGroupContext)
