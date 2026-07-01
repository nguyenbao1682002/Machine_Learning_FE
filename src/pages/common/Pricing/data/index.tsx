import React from 'react'
import * as FiIcons from 'react-icons/fi'
import { Duration } from '../components/DurationSelection/types'
import { PlanDetail } from '../components/PlanDetail'

export const monthlyPlans: React.ComponentProps<typeof PlanDetail>[] = [
  {
    id: 'MonthlyBasic',
    icon: <FiIcons.FiHexagon size={22} />,
    name: 'Basic',
    price: '$4.95/mo.',
    description: 'For small factory just getting started. Limited features and support.',
    features: [
      'Up to 2 users',
      'Basic dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 5 sensor metrics',
      'Technical support within 24 hours',
      //
    ],
    duration: Duration.Annually,
  },
  {
    id: 'MonthlyStandard',
    icon: <FiIcons.FiBox size={22} />,
    name: 'Standard',
    price: '$7.95/mo.',
    description: 'For medium factory looking to grow. Flexible features and support.',
    features: [
      'Up to 4 users',
      'Basic dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 10 sensor metrics',
      'Technical support within 12 hours',
      //
    ],
    duration: Duration.Annually,
  },
  {
    id: 'MonthlyPremium',
    icon: <FiIcons.FiCpu size={22} />,
    name: 'Premium',
    price: '$9.95/mo.',
    description: 'For large factory looking to scale and optimize. More features, support, performance and customization.',
    features: [
      'Up to 10 users',
      'Customizable dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 20 sensor metrics',
      'Technical support within 3 hours',
      'AI recommendation actions',
      'AI warning alerts',
      //
    ],
    duration: Duration.Annually,
  },
  {
    id: 'MonthlyUltraPremium',
    icon: <FiIcons.FiCodesandbox size={22} />,
    name: 'Ultra Premium',
    price: '$12.95/mo.',
    description: 'For enterprise factory looking to optimize and automate. Highest level of features, support, performance and customization.',
    features: [
      'Up to 20 users',
      'Customizable dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 50 sensor metrics',
      'Technical support within 30 mins',
      'AI recommendation actions',
      'AI warning alerts',
      'AI predictive maintenance',
      'AI predictive quality',
      'AI predictive production',
      //
    ],
    duration: Duration.Annually,
  },
]

export const annuallyPlans: React.ComponentProps<typeof PlanDetail>[] = [
  {
    id: 'YearlyBasic',
    icon: <FiIcons.FiHexagon size={22} />,
    name: 'Basic',
    price: '$39.95/yr.',
    description: 'For small factory just getting started. Limited features and support.',
    features: [
      'Up to 2 users',
      'Basic dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 5 sensor metrics',
      'Technical support within 24 hours',
      //
    ],
    duration: Duration.Annually,
  },
  {
    id: 'YearlyStandard',
    icon: <FiIcons.FiBox size={22} />,
    name: 'Standard',
    price: '$59.95/yr.',
    description: 'For medium factory looking to grow. Flexible features and support.',
    features: [
      'Up to 4 users',
      'Basic dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 10 sensor metrics',
      'Technical support within 12 hours',
      //
    ],
    duration: Duration.Annually,
  },
  {
    id: 'YearlyPremium',
    icon: <FiIcons.FiCpu size={22} />,
    name: 'Premium',
    price: '$79.95/yr.',
    description: 'For large factory looking to scale and optimize. More features, support, performance and customization.',
    features: [
      'Up to 10 users',
      'Customizable dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 20 sensor metrics',
      'Technical support within 3 hours',
      'AI recommendation actions',
      'AI warning alerts',
      //
    ],
    duration: Duration.Annually,
  },
  {
    id: 'YearlyUltraPremium',
    icon: <FiIcons.FiCodesandbox size={22} />,
    name: 'Ultra Premium',
    price: '$99.95/yr.',
    description: 'For enterprise factory looking to optimize and automate. Highest level of features, support, performance and customization.',
    features: [
      'Up to 20 users',
      'Customizable dashboard',
      'Real-time data analytics',
      'Real-time tracking maximum 50 sensor metrics',
      'Technical support within 30 mins',
      'AI recommendation actions',
      'AI warning alerts',
      'AI predictive maintenance',
      'AI predictive quality',
      'AI predictive production',
      //
    ],
    duration: Duration.Annually,
  },
]
