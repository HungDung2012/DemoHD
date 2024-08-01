import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import { Button, InputForm, InputRadio } from '..'
import { useForm } from 'react-hook-form'
import { apiRegister, apiSignIn } from '~/apis/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import withRouter from '~/hocs/withRouter'
import { useAppStore } from '~/store/useAppStore'
import { useUserStore } from '~/store/useUserStore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import auth from '~/utils/firebaseConfig'


const Login = () => {
  const [variant, setVariant] = useState('LOGIN')
  const [isloading, setIsLoading] = useState(false)
  const { setModal } = useAppStore()
  const { token, setToken, roles } = useUserStore()
  const { 
    register, 
    formState: {errors}, 
    handleSubmit ,
    reset,
  } = useForm()
  
  useEffect(() => { reset() },[variant])


  // const handleCaptchaVerify = () => {
  //   if(!window.recaptchaVerify) {
  //     window.recaptchaVerify = new RecaptchaVerifier(
  //       auth, 
  //       'recaptcha-verifier', 
  //       {
  //         size: 'invisible',
  //         callback: (response) => {
  //           // console.log({ callback: response })
  //           // handleSendOTP()
  //         },
  //         'expired-callback': () => {
  //           // console.log({expired: response})
  //         },
  //       }
  //     )
  //  }
  // }

  // const handleSendOTP = (phone) => {
  //   handleCaptchaVerify()
  //   const verifier = window.recaptchaVerify
  //   const formatPhone = `+84` + phone.slice(1)
  //   signInWithPhoneNumber(auth, formatPhone, verifier)
  //   .then((result) => { 
  //     toast.success('Sent OTP to your phone.')
  //    })
  //   .catch((error) => {
  //     toast.success('Something went wrong.')
  //   })
  // }

  const onSubmit = async (data) => {
    if (variant === 'REGISTER') {
      // if(data?.roleCode !== 'ROL7')  {
      //    Logic verify SĐT
      //   handleSendOTP(data.phone)
      // }
      setIsLoading(true)
      const response = await apiRegister(data)
      setIsLoading(false)
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Register success',
          text: response.mes,
          showConfirmButton: true,
          confirmButtonText: 'Go sign in',
        }).then(({ isConfirmed }) => {
          if (isConfirmed) {
            setVariant('LOGIN')
          }
        })
      }else toast.error(response.mes)
    }

    if (variant === 'LOGIN') {
      const { name, role, ...payload } = data
      const response = await apiSignIn(payload)
      if (response.success) {
        toast.success(response.mes)
        setToken(response.accessToken)
        setModal(false, null)
      }else toast.error(response.mes)
    }
    
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
      {/* <div id ='recaptcha-verifier'></div> */}
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
        validate={{ 
          required: "This field is required",
          pattern:{
            value: /(0[1|3|5|7|8|9])+([0-9]{8})\b/,
            message: 'Invalid phone number.',
          }
        }}
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
      {variant === 'REGISTER' && (
        <InputRadio 
          label='Type account' 
          register={register} 
          id='roleCode'
          errors={errors}
          validate={{ required: "This field is required"}}
          optionsClassname= 'grid grid-cols-3 gap-4'
          options= { roles
            ?.filter( el => el.code !== 'ROL1' )
            ?.map(el => ({ label: el.value, value: el.code }))
          }  
        />
      )}

      <Button 
        disabled={isloading}
        handleOnClick={handleSubmit(onSubmit)} 
        className='py-2 my-6'
      > 
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