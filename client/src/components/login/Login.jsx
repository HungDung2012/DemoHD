import React, {useState} from 'react'
import clsx from 'clsx'

const Login = () => {
  const [variant, setVariant] = useState('login')
  return (
  <div 
    onClick={(e) => e.stopPropagation()} 
    className="bg-white text-lg rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-6"
  >
    <h1 className='text-5xl font-dance font-semibold tracking-tight'>
      Welcome to DemoHD
    </h1>
    <div className='flex border-b justify-start w-full gap-6'>
      <span 
        onClick={() => setVariant('LOGIN')}
        className={clsx(variant === 'LOGIN' && 'border-b-4 border-main-700',
          'cursor-pointer'
        )}
      >
        Login
      </span>
      <span
        onClick={() => setVariant('REGISTER')}
        className={clsx(
          variant === 'REGISTER' && 
            'border-b-4 border-main-700',
          'cursor-pointer'
        )}

      >
        Neu account
      </span>
    </div>
  </div>
  )
}

export default Login