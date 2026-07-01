import { Tooltip, TooltipProps } from '@mui/material'

KCTooltip.defaultProps = {
  children: <></>,
}

export function KCTooltip({ children, ...props }: TooltipProps) {
  const { title, ...otherProps } = props
  return (
    <Tooltip {...otherProps} title={title ?? ''}>
      <span className='flex items-center'>{children}</span>
    </Tooltip>
  )
}
