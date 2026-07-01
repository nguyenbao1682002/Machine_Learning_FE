import React from 'react'

interface IAuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
  return <div className='h-full w-full'>{props.children}</div>
}
