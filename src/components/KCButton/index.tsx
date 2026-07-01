import { Button, ButtonProps } from '@mui/material'
import { TLoadingStyle } from '~components/KCLoading/types'
import { KCLoading } from '..'

type TKCButtonProps = ButtonProps & {
  isLoading: boolean
  loadingStyle: TLoadingStyle
  btnTransparentWhenLoading: boolean
  icon?: React.ReactNode
}

KCButton.defaultProps = {
  isLoading: false,
  loadingStyle: 'rounded-spinner',
  btnTransparentWhenLoading: false,
}

export function KCButton(props: TKCButtonProps) {
  const { isLoading, loadingStyle, btnTransparentWhenLoading, children, disabled, ...restProps } = props
  return (
    <Button
      {...restProps}
      disabled={isLoading || disabled}
      sx={{
        '&:disabled': {
          ...(btnTransparentWhenLoading ? { backgroundColor: btnTransparentWhenLoading && 'transparent' } : {}),
        },
        padding: '6px 14px',
      }}
    >
      {isLoading === false && (
        <div className='flex h-full w-full items-center justify-center gap-2'>
          {props.icon}
          {children}
        </div>
      )}
      {isLoading === true && <KCLoading loadingStyle={loadingStyle} size={24} />}
    </Button>
  )
}
