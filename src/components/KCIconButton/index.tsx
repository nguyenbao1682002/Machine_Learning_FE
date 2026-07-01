import { Box, BoxProps } from '@mui/material'
import classNames from 'classnames'
import { ROUNDED_CLASSES, TRoundedOption } from '~shared/types/tailwind'
import { KCTooltip } from '..'

interface IKCIconButtonProps {
  children?: React.ReactNode
  size: number
  rounded: TRoundedOption
  tooltipTitle?: React.ReactNode
}

KCIconButton.defaultProps = {
  children: <></>,
  size: 10,
  rounded: 'default',
}

export function KCIconButton(props: IKCIconButtonProps & BoxProps) {
  const { tooltipTitle, rounded, children, ...remainingProps } = props
  return (
    <KCTooltip title={tooltipTitle}>
      <Box
        className={classNames('flex cursor-pointer items-center justify-center overflow-hidden bg-kc-alpha-10 hover:bg-kc-alpha-20', ROUNDED_CLASSES[rounded])}
        sx={{
          width: props.size / 4 + 'rem',
          height: props.size / 4 + 'rem',
        }}
        {...remainingProps}
      >
        {children}
      </Box>
    </KCTooltip>
  )
}
