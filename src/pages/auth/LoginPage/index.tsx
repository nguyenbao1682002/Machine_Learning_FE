import React from 'react'
import { toast } from 'react-toastify'
import ESTECLogo from '~assets/images/logo.png'
import { KCButton, KCFormManager } from '~components'
import AuthContext from '~contexts/AuthContext'
import { ILogin } from '~shared/types/functions/auth'
import { useLogin } from './apis'

const formManager = new KCFormManager<ILogin>()

export default function LoginPage() {
  const authContext = React.useContext(AuthContext)
  const login = useLogin()

  const handleLogin = React.useCallback((data: ILogin) => {
    login.sendRequest(data, {
      onSuccess: ({ data }) => {
        toast.success(data.message)
        authContext.login(data)
      },
      onError: (error) => toast.error(error.response?.data.message ?? error.message),
    })
  }, [])

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-kc-primary'>
      <formManager.Form className='flex max-w-[40rem] grow flex-col gap-4 rounded-kc-primary bg-kc-card p-6 shadow-md' onSubmit={handleLogin}>
        <div className='flex justify-center'>
          <img alt='estec-logo' src={ESTECLogo} className='h-14' />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-kc-highlight'>Username</span>
          <formManager.TextField name='username' placeholder='Username' size='small' />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-kc-highlight'>Password</span>
          <formManager.TextField name='password' placeholder='Password' type={'password'} size='small' />
        </div>

        <div className='mt-1 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <input type={'checkbox'} className='h-4 w-4 cursor-pointer rounded-kc-primary accent-kc-highlight' />
            <span>Remember</span>
          </div>
          <span className='cursor-pointer font-semibold text-kc-highlight hover:underline'>Forgot password?</span>
        </div>
        <KCButton type='submit' className='mt-8' isLoading={login.isLoading}>
          Login
        </KCButton>
      </formManager.Form>
    </div>
  )
}
