import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import { Button, InputForm } from '..'
import { useForm } from 'react-hook-form'

const Login = () => {
  const [variant, setVariant] = useState('LOGIN')
  const { 
    register, 
    formState: {errors}, 
    handleSubmit ,
    reset
  } = useForm()
  useEffect(() => {
    reset()
  },[variant])

  const onSubmit = (data) => {
    console.log(data)
  }

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
        New account
      </span>
    </div>
    <form className='flex w-full px-4 flex-col gap-4'>
      <InputForm 
        label='Phone Number' 
        inputClassname='rounded-md' 
        register={register} 
        id='phone'
        placeholder='Enter your phone number here'
        validate={{ required: "This field is required"}}
        errors={errors}
      />
      <InputForm 
        label='Password' 
        inputClassname='rounded-md' 
        register={register} 
        id='password'
        placeholder='Enter your password here'
        type='password'
        errors={errors}
        validate={{ required: "This field is required"}}

      />
      {variant === 'REGISTER' && (
        <InputForm 
          label='Your Fullname' 
          inputClassname='rounded-md' 
          register={register} 
          id='name'
          placeholder='Enter your Fullname here'
          errors={errors}
          validate={{ required: "This field is required"}}

        />
      )}
      <Button handleOnClick={handleSubmit(onSubmit)} className='py-2 my-6'> 
        {variant === 'LOGIN' ? 'Sign in' : 'Register'} 
      </Button>
      <span className='cursor-pointer text-main-500 hover:underline w-full text-center'>
        Forgot your password?
      </span>
    </form>
  </div>
  )
}

export default Login