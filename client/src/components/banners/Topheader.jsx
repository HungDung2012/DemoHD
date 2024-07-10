import React from 'react'
import clsx from 'clsx'
import { CiMail } from 'react-icons/ci'
import { FaPhone, FaInstagram, FaYoutube } from 'react-icons/fa'
import { GrFacebookOption } from 'react-icons/gr'
import { twMerge } from 'tailwind-merge'
import withRouter from '~/hocs/withRouter'


const Topheader = ({ location }) => {
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
            <span className="text-gray-300">123-456 7890</span>
          </span>
        </div>  
      </div>
    </div>
  )
  
}

export default withRouter(Topheader)