import React from 'react'
import clsx from 'clsx'
import { Outlet } from 'react-router-dom'
import { Navigation, Topheader } from '~/components'
import withRouter from '~/hocs/withRouter'
import { useAppStore } from '~/store/useAppStore'


const PublicLayout = ({ location }) => {
  const { isShowModal } = useAppStore()
  return (
    <main className={clsx(isShowModal ? "overflow-hidden h-screen" : "overflow-auto max-h-full" ) }>
      <Topheader />
      <Navigation/>
      <div className={clsx(location.pathname === '/' ? 'pt-0' : 'pt-[185px]' )}>
        <Outlet />
      </div>
    </main>
  )
}

export default withRouter(PublicLayout)