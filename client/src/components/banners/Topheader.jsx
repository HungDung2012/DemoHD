import React from 'react'
import { CiMail } from 'react-icons/ci'
import { FaPhone } from 'react-icons/fa'

const Topheader = () => {
  return (
  <div className="h-[85px] text-white border-b border-main-400 w-full bg-transparent fixed z-50 top-0 items-center justify-between px-[100px] py-[26px]">
    <span className="flex items-center gap-2">
      <CiMail />
      <span>
        <span>Email us at: </span>
        <span className="text-gray-300">dungchuhung@gmail.com</span>
      </span>
    </span>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <span>
          <GrFacebookOption />
        </span>
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

export default Topheader