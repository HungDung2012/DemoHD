import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '..'
import { navigations } from '~/utils/constants'
import clsx from 'clsx'
import withRouter from '~/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useAppStore } from '~/store/useAppStore'
import { useUserStore } from '~/store/useUserStore'
import Login from '~/components/login/Login'


const Navigation = ({ location, navigate }) => {
  const { setModal } = useAppStore()
  const { token } = useUserStore()
  return (
    <div 
      className={twMerge(
        clsx(
          "w-full bg-transparent flex items-center justify-between fixed z-50 top-[85px] px-[100px] py-[0px]",
          location.pathname !== '/' && 'bg-white'
          )
        )}
    >
      <Link to="/">
        <img src="/logo1.png" alt="logo" className="w-[200px] object-contain" />
      </Link>
      <div className={clsx(
        "flex text-lg items-center gap-6", 
        location.pathname === '/' ? 'text-main-100' : 'text-gray-700' 
        )} 
      >
        {navigations.map((el) => (
          <NavLink 
            className={({ isActive }) => 
              clsx(
                isActive && 'font-medium', 
                location.pathname === '/' ? 'text-white' : 'text-gray-900'
              )
            } 
            key={el.id} 
            to={el.path}
          >
            {el.text}
          </NavLink>
        ))}
        {!token ? ( 
          <Button 
            className={twMerge(
              clsx(
                location.pathname === '/' && 
                  'bg-transparent border-main-100 border'
              )
            )}
            handleOnClick={() => setModal(true, <Login /> )}
          >
            Sign in
          </Button> 
          ) : ( 
            <Button 
              className={twMerge(
                clsx(
                  location.pathname === '/' && 
                    'bg-transparent border-main-100 border'
                )
              )}
            >
              Add Listing
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default withRouter(Navigation)