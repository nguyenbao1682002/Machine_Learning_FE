import * as FiIcons from 'react-icons/fi'
import { useQueryParams } from '~shared/hooks/useQueryParams'
import { Duration } from '../DurationSelection/types'

interface PlanDetailProps {
  id: string
  icon: React.ReactNode
  name: string
  price: string
  description: string
  features: string[]
  duration: Duration
}

export function PlanDetail(props: PlanDetailProps) {
  const queryParams = useQueryParams()

  return (
    <div className='p-6'>
      <div className='text-kc-highlight'>{props.icon}</div>
      <div className='mt-3 text-xl'>{props.name}</div>
      <div className='mt-1 text-xl text-kc-secondary'>{props.price}</div>
      <div className='mt-3 h-24 text-sm text-kc-secondary'>{props.description}</div>

      <div
        onClick={() => queryParams.set('selectedPlan', props.id)}
        className='mt-2 cursor-pointer rounded-lg border border-solid border-kc-primary px-4 py-2.5 text-center text-[0.9375rem] hover:alpha-5 active:alpha-10'
      >
        Select this plan
      </div>

      <div className='mt-8 flex flex-col gap-1'>
        {props.features.map((feature, idx) => (
          <div key={idx} className='flex items-center gap-2 text-sm'>
            <FiIcons.FiCheck className='shrink-0 text-kc-highlight' size={16} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
