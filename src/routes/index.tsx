import { IRoute } from './types'
import { generateRouteElements } from './utils'

// Layouts
import { AuthLayout, DashboardLayout } from '~layouts/index'

// Pages
import { LoginPage } from '~pages/auth'
import { HomePage } from '~pages/common/Home'
import { PricingPage } from '~pages/common/Pricing'
import ModelTesting from '~pages/models-testing/pages/ModelTesting'
import ModelTestingDiary from '~pages/models-testing/pages/ModelTestingDiary'
import { DashboardPlayBack, NewDashboard } from '~pages/sensors'
import { SettingsPage } from '~pages/system'
import { OtherSettingsPage } from '~pages/system/OtherSettingsPage'

export const routes: IRoute[] = [
  {
    path: '/',
    element: <HomePage />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'Home',
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
    requiredLogin: false,
    Layout: AuthLayout,
  },
  {
    path: '/factory-sensors/new-realtime-dashboard',
    element: <NewDashboard />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'EsKilnMaster - AI Assistant for Kiln Operators',
    },
  },
  {
    path: '/factory-sensors/playback-dashboard',
    element: <DashboardPlayBack />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'Playback',
    },
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'Settings',
    },
  },
  {
    path: '/settings/other-settings',
    element: <OtherSettingsPage />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'Other Settings',
      back: {
        path: '/settings',
      },
    },
  },
  {
    path: '/pricing',
    element: <PricingPage />,
    requiredLogin: false,
  },
  {
    path: '/model-testing',
    element: <ModelTesting />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'ModelTesting',
    },
  },
  {
    path: '/model-testing-diary',
    element: <ModelTestingDiary />,
    requiredLogin: true,
    Layout: DashboardLayout,
    layoutProps: {
      headerTitle: 'Model Testing - Diary',
    },
  },
]

export const routesElm = generateRouteElements(routes)
