import React, { Fragment, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { CiMail } from 'react-icons/ci'
import { FaPhone, FaInstagram, FaYoutube } from 'react-icons/fa'
import { GrFacebookOption } from 'react-icons/gr'
import { twMerge } from 'tailwind-merge'
import withRouter from '~/hocs/withRouter'
import { useUserStore } from '~/store/useUserStore'
import { ShowOptions } from '~/utils/constants'
import { Link } from 'react-router-dom'


const Topheader = ({ location }) => {
  const { current, Logout } = useUserStore()
  const optionBox = useRef()
  const [isShowOptions, setIsShowOptions] = useState(false)
  useEffect(() => {
    const handleOnclick = (e) => { 
      console.log(optionBox.current.contains(e.target))
      if(optionBox.current.contains(e.target)){
        setIsShowOptions(true)
      }else setIsShowOptions(false)
    }
    window.addEventListener('click', handleOnclick)
    
    return () => {
      window.removeEventListener('click', handleOnclick)
    }
  },[])

  return (
    <div className={twMerge(
      clsx(
        'h-[85px] text-white border-b border-main-400 w-full bg-transparent fixed z-50 top-0 flex items-center justify-between px-[100px] py-[26px]',
        location.pathname !== '/' && 'bg-main-700'
        )
      )}
    >
      <span className="flex items-center gap-2">
        <CiMail />
        <span>
          <span>Email us at: </span>
          <span className="text-gray-300">dungchuhung@gmail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center text-gray-300 gap-6">
            <GrFacebookOption />
            <FaInstagram size={18}/>
            <FaYoutube size={20}/>
        </div>
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <FaPhone />
            <span className="text-gray-300">012-345 6789</span>
          </span>
        </div>  
       {current && (
          <div 
           ref={optionBox} 
           onClick={() => setIsShowOptions(!isShowOptions)} 
           className="flex items-center relative cursor-pointer hover:bg-overlay-30 p-2 rounded-md gap-4 pl-8 border-l border-main-400"
          >
            <div className='flex flex-col gap-2'>
              <span>{current?.name}</span>
              <span> ID: #<span> {current?.id?.slice(0, 6)} </span> </span>
            </div>
            <img 
              src={current?.avatar || '/user.svg'} 
              alt="avatar" 
              className='w-12 h-12 object-cover rounded-full'
            />
            {isShowOptions && (
              <div 
                className='absolute z-[1000] right-0 top-full rounded-md bg-white text-black drop-shadow-sm flex flex-col py-2 border'>
                {ShowOptions.map(el => 
                  <Fragment key={el.id}>
                    {current?.userRoles?.some(
                        role => role.roleCode === el.code
                      ) && 
                        <Link className='px-6 py-2 hover:bg-gray-100' to={el.path}> {el.name} </Link> 
                    } 
                  </Fragment>
                )}
                <span onClick={() => Logout()} className='px-6 py-2 hover:bg-gray-100 cursor-pointer '>
                  Logout
                  </span>
              </div>
            )}
          </div>  
       )}
      </div>
    </div>
  )
  
}

export default withRouter(Topheader)