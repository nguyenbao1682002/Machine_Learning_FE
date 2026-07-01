import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'
import { KCButton, KCContainer } from '~components'
import { KCFormManager } from '~components/KCForm'
import { IUpdateThreshold } from '~shared/types/functions/data'
import { useGetThreshold } from './apis/useGetThreshold'
import { useUpdateThreshold } from './apis/useUpdateThreshold'
import { FormGroups } from './form'

const formManager = new KCFormManager<IUpdateThreshold>()

export function OtherSettingsPage() {
  const getThreshold = useGetThreshold()
  const updateThreshold = useUpdateThreshold()
  const formRef = React.useRef<UseFormReturn<IUpdateThreshold, any>>(null)

  React.useEffect(() => {
    getThreshold.sendRequest({})
  }, [])

  const handleSubmit = (data: IUpdateThreshold) => {
    updateThreshold.sendRequest(data, { onSuccess: ({ data }) => toast.success(data.message), onError: (error) => toast.error(error.response?.data.message ?? 'Unknown error') })
  }

  return (
    <div className='p-6'>
      <KCContainer isLoading={getThreshold.isLoading} className='rounded-kc-primary bg-kc-card p-6 shadow-md' renderContentBelowWhenLoading>
        <formManager.Form ref={formRef} defaultValues={getThreshold.responseBody} onSubmit={handleSubmit}>
          <div className='grid grid-cols-12 gap-6'>
            {FormGroups.map((group, groupIdx) => (
              <div className='col-span-12 flex flex-col gap-4 md:col-span-6 xl:col-span-3' key={groupIdx}>
                <div className='text-2xl font-semibold text-kc-highlight'>{group.groupName}</div>
                <div className='flex gap-4 md:flex-col'>
                  {group.items.map((item, itemIdx) => {
                    return (
                      <div key={itemIdx} className='flex grow flex-col gap-4'>
                        <span className='font-medium'>{item.label}</span>
                        <formManager.TextField name={item.key} placeholder={item.label} size='small' />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className='mt-12 flex justify-end'>
            <KCButton type='submit' className='w-48' isLoading={updateThreshold.isLoading}>
              Save
            </KCButton>
          </div>
        </formManager.Form>
      </KCContainer>
    </div>
  )
}
