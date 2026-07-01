import * as lodash from 'lodash'
import React from 'react'
import { DefaultValues, FieldValues, FormProvider, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'

type TKCFormProps<IKCFormInputs extends FieldValues> = Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | ''> & {
  onSubmit?: SubmitHandler<IKCFormInputs>
  defaultValues?: DefaultValues<IKCFormInputs>
  onValuesChange?: {
    listen: Path<IKCFormInputs>[]
    callback: (values: IKCFormInputs) => void
  }
  children?: React.ReactNode
  form?: UseFormReturn<IKCFormInputs, any>
}

function KCFormComponent<IKCFormInputs extends FieldValues>(props: TKCFormProps<IKCFormInputs>, ref: React.ForwardedRef<UseFormReturn<IKCFormInputs, any>>) {
  const { form, onSubmit, defaultValues, children, onValuesChange, ...otherFormProps } = props
  const formMethods = form ?? useForm<IKCFormInputs>({ defaultValues })
  const values = formMethods.watch()

  const onValuesChangeDeps = React.useMemo(() => {
    if (onValuesChange) {
      const result = []
      for (const name of onValuesChange.listen) {
        const value = lodash.get(values, name)
        if (value !== undefined) {
          result.push(value)
        }
      }
      return result
    } else {
      return []
    }
  }, [onValuesChange, values])

  React.useEffect(() => {
    if (onValuesChangeDeps && onValuesChange && typeof onValuesChange.callback === 'function') {
      onValuesChange.callback(values)
    }
  }, onValuesChangeDeps)

  React.useEffect(() => {
    formMethods.reset(defaultValues)
  }, [defaultValues])

  React.useImperativeHandle(ref, () => formMethods)

  const submit = formMethods.handleSubmit(onSubmit!)

  return (
    <FormProvider
      {...{
        ...formMethods,
        // @ts-ignore
        submit,
      }}
    >
      <form {...otherFormProps} onSubmit={submit}>
        {children}
      </form>
    </FormProvider>
  )
}

export const KCForm = React.forwardRef(KCFormComponent) as <IKCFormInputs extends FieldValues>(
  props: TKCFormProps<IKCFormInputs> & { ref?: React.ForwardedRef<UseFormReturn<IKCFormInputs, any>> },
) => ReturnType<typeof KCFormComponent>
