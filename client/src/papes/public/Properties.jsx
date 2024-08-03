import React, { useEffect, useState } from 'react'
import { apiGetProperties } from '~/apis/properties'
import { BreadCrumb, PropertyCard } from '~/components'

const Properties = () => {
  const [properties, setProperties] = useState()

  useEffect(() => {
    const fetchProperties = async () => {
      const reponse = await apiGetProperties({
        limit: import.meta.env.VITE_LIMITS
      })
      if(reponse.success) setProperties(reponse.properties)
    }
    fetchProperties()
  }, [])

  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <img src='/properties.png' alt='' className='w-full object-contain' />
        <div className='absolute flex-col inset-0 text-white flex justify-center items-center '>
          <h1 className='text-[48px] font-medium'>Properties</h1>
          <div>
            <BreadCrumb/>
          </div>
        </div>
      </div>
      <div className='w-main mx-auto my-20'> 
        <div>
          sortby
        </div>
        <div className='w-full grid grid-cols-3 gap-4'>
          {properties?.rows?.map((el) => (
            <PropertyCard />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Properties