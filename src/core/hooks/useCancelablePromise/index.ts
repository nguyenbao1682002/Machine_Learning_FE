import { AxiosResponse } from 'axios'
import { useEffect, useRef } from 'react'

/**
 * Default action to be executed
 */
export function makeCancelable(promise: Promise<AxiosResponse> | Promise<boolean>) {
  let isCanceled = false

  const wrappedPromise: Promise<AxiosResponse> = new Promise((resolve, reject) => {
    promise.then((val: any) => (isCanceled ? reject({ isCanceled }) : resolve(val))).catch((error: any) => (isCanceled ? reject({ isCanceled }) : reject(error)))
  })

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true
    },
  }
}

/**
 * This hook is used to cancel a promise that has already been canceled
 */
export function useCancellablePromise(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true)

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error('promise wrapper argument must provide a cancel() function')
  }

  const promises: any = useRef()

  useEffect(() => {
    promises.current = promises.current || []
    return function cancel() {
      promises.current.forEach((p: { cancel: () => any }) => p.cancel())
      promises.current = []
    }
  }, [])

  function cancellablePromise(p: Promise<AxiosResponse>): Promise<AxiosResponse> {
    const cPromise = cancelable(p)
    promises.current.push(cPromise)
    return cPromise.promise
  }

  return { cancellablePromise }
}
