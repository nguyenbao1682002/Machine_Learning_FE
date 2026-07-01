import dayjs from 'dayjs'
import React from 'react'
import * as FiIcons from 'react-icons/fi'
import { useQueryParams } from '~shared/hooks/useQueryParams'
import { useDurationSelection } from './components/DurationSelection'
import { Duration } from './components/DurationSelection/types'
import { PlanDetail } from './components/PlanDetail'
import { annuallyPlans, monthlyPlans } from './data'
import { StyledPageContainer, StyledPlansContainer } from './styles'

export function PricingPage() {
  const { DurationSelectionElement } = useDurationSelection()
  const queryParams = useQueryParams()

  const plans = queryParams.get('duration') === Duration.Monthly ? monthlyPlans : annuallyPlans
  const selectedPlan: React.ComponentProps<typeof PlanDetail> | undefined = React.useMemo(() => {
    return [...monthlyPlans, ...annuallyPlans].find((plan) => plan.id === queryParams.get('selectedPlan'))
  }, [queryParams.get('selectedPlan')])

  const renderContent = () => {
    if (selectedPlan) {
      return (
        <div className='flex grow justify-center'>
          <div className='flex max-w-[76rem] grow flex-col gap-4'>
            <div className='flex'>
              <div
                onClick={() => queryParams.remove('selectedPlan')}
                className='flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9eafdaa] px-3 py-2 font-normal text-kc-highlight hover:alpha-5 active:alpha-10'
              >
                <FiIcons.FiArrowLeft />
                <div>Plans selection</div>
              </div>
            </div>

            <div className='grid h-full grid-cols-12 gap-4'>
              <div className='col-span-4'>
                <div className='flex flex-col gap-6 rounded-md border border-solid border-kc-primary p-4 px-6'>
                  <div className='text-lg font-medium'>Order Summary</div>
                  <div className='flex flex-col gap-4 text-sm'>
                    <div className='flex items-center'>
                      <div className='w-12 font-medium'>Date:</div>
                      <div>{dayjs().format('DD MMMM YYYY HH:mm')}</div>
                    </div>
                    <div className='flex items-center'>
                      <div className='w-12 font-medium'>Plan:</div>
                      <div>
                        {selectedPlan.name} ({selectedPlan.duration})
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <div className='w-12 font-medium'>VAT:</div>
                      <div>10%</div>
                    </div>
                    <div className='w-full border-t border-solid border-kc-primary'></div>
                    <div className='flex items-center'>
                      <div className='w-12 font-medium'>Total</div>
                      <div className='text-kc-highlight'>{selectedPlan.price}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-8 flex flex-col gap-5 rounded-md border border-solid border-kc-primary p-4 px-6'>
                <div className='text-lg font-medium'>Contact information</div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-1 text-sm'>
                    <div>Company name</div>
                    <input type='text' className='rounded-md border border-solid border-kc-primary p-2' />
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <div>Contact person name</div>
                    <input type='text' className='rounded-md border border-solid border-kc-primary p-2' />
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <div>Contact person phone</div>
                    <input type='text' className='rounded-md border border-solid border-kc-primary p-2' />
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <div>Contact person email</div>
                    <input type='email' className='rounded-md border border-solid border-kc-primary p-2' />
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <div>Additional information</div>
                    <textarea className='rounded-md border border-solid border-kc-primary p-2' rows={3} />
                  </div>

                  <div className='flex justify-center py-2'>
                    <div className='flex cursor-pointer items-center gap-4 rounded-lg bg-[#d9eafdaa] px-6 py-2.5 font-normal text-kc-highlight hover:alpha-5 active:alpha-10'>
                      Submit order
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='flex grow flex-col gap-6'>
          <div className='flex justify-center'>{DurationSelectionElement}</div>
          <div className='flex grow justify-center'>
            <StyledPlansContainer className='grid max-w-[76rem] grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
              {plans.map((plan, idx) => (
                <PlanDetail key={idx} {...plan} />
              ))}
            </StyledPlansContainer>
          </div>
        </div>
      )
    }
  }

  return (
    <StyledPageContainer>
      <div className='flex h-full w-full grow flex-col overflow-x-hidden overflow-y-scroll p-16'>
        <div className='flex w-full grow flex-col gap-8 rounded-lg bg-[#ffffffcc] p-8'>
          <div className='flex flex-col gap-6'>
            <div className='flex justify-center text-base font-medium uppercase text-kc-highlight'>Subscription plans</div>
            <div className='flex justify-center text-4xl'>Transform your teams, drive change</div>
          </div>
          {renderContent()}
        </div>
      </div>
    </StyledPageContainer>
  )
}
