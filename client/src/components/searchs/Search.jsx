import React from 'react'
import SearchItem from './SearchItem'
import { Button, InputForm, InputSelect } from '..'
import { useForm } from 'react-hook-form'

const Search = () => {
    const { register, formState: {errors} } = useForm()
  return (
    <div className='bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto relative h-[8em] mt-[-4em] z-20 ' >
        <SearchItem title='Locations' >
            <InputSelect 
                id='address'
                register={register}
                errors = {errors}
                placeholder='Type your required location'
                containerClassname='w-[14em]'
                inputClassname="rounded-md border border-gray-200"
            />
        </SearchItem>
        <SearchItem title='Property Type'>
            <InputSelect 
                id='propertyType'
                register={register}
                errors = {errors}
                placeholder='Select property type'
                containerClassname='w-[14em]'
                inputClassname="rounded-md border border-gray-200"

            />
        </SearchItem>
        <SearchItem title='Rent range'>
            <InputSelect 
                    id='price'
                    register={register}
                    errors = {errors}
                    placeholder='Select price range'
                    containerClassname='w-[14em]'
                    inputClassname="rounded-md border border-gray-200"
            />
        </SearchItem>
        <div className='flex items-center justify-center'>
            <Button className='px-8' >Search</Button>
        </div>
    </div>
  )
}

export default Search