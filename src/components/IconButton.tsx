import { forwardRef } from 'react'
import { Button, ButtonBase, ButtonProps } from './Button'
import { Icon, IconProps } from './Icon'
import { parseIconSize } from '../theme'
import { ColorVariant } from '../theme/color'

type IconButtonProps = ButtonProps &
  Omit<IconProps, keyof ButtonProps> & {
    iconVariant?: ColorVariant
  }

const IconButton = forwardRef<ButtonBase, IconButtonProps>(
  ({ iconVariant, mode, name, ...props }, ref) => {
    const iconSize = parseIconSize(props?.size || 'medium')

    let color = 'bodyFg'
    if (mode === 'text' && iconVariant) {
      color = iconVariant
    } else if (props?.variant) {
      color = `${props.variant}Fg`
    }

    return (
      <Button ref={ref} {...props}>
        <Icon name={name} color={color} fontSize={iconSize} />
      </Button>
    )
  },
)

IconButton.displayName = 'IconButton'

export { IconButton }
