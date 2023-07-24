import { isNil } from '../../utils'

export const getCheckedStatus = ({
  childValue,
  checkedStatus,
  parentValue,
}: {
  childValue: string
  checkedStatus?: 'checked' | 'unchecked'
  parentValue?: string
}) => {
  if (isNil(parentValue)) {
    return parentValue === childValue ? 'checked' : 'unchecked'
  } else {
    return checkedStatus
  }
}
