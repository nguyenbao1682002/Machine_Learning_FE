import React from 'react'
import { DashboardLayout } from '~layouts/DashboardLayout'

export interface IRoute {
  path: string
  element: React.ReactNode
  requiredLogin: boolean
  Layout?: React.FC<any> | React.FunctionComponent<any>
  layoutProps?: {
    headerTitle?: React.ReactNode
    back?: React.ComponentProps<typeof DashboardLayout>['back']
  }
}
