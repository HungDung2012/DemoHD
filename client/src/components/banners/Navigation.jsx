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
  const { current } = useUserStore()
  return (
    <div className='w-main'>
      <div
        className={twMerge(
          clsx(
            "fixed top-[75px] bg-transparent flex items-center w-full z-10 mx-auto justify-between px-[100px] h-[105px]",
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
          {!current ? ( 
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
    </div>
  )
}

export default withRouter(Navigation)