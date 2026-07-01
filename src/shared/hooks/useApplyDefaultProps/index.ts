'use client'

import lodash from 'lodash'
import React from 'react'

export function useApplyDefaultProps<T extends Record<string, any>>(props: T, defaultProps: Partial<T>): T {
  return React.useMemo(() => {
    const newProps: T = { ...props }
    for (const [key, value] of Object.entries(lodash.clone(defaultProps))) {
      if (props[key] === undefined) {
        lodash.set(newProps, key, value)
      }
    }
    return newProps
  }, [props, defaultProps])
}
