import { Skeleton } from '@mui/material'

interface KCSkeletonProps {
  isRenderingSkeleton?: boolean
  width: number | string
  height: number | string
  children?: React.ReactNode
}

export default function KCSkeleton(props: KCSkeletonProps) {
  if (props.isRenderingSkeleton) {
    return <Skeleton style={{ width: props.width, height: props.height, transform: 'none' }} />
  } else {
    return <>{props.children}</>
  }
}
