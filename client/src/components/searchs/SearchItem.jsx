import React from 'react'

const SearchItem = ({title, children}) => {
  return (
    <div className='flex flex-col gap-2 border-r justify-center items-center' >
        <h3 className='font-bold text-main-700 ' >{title}</h3>
        {children}
    </div>
  )
}

export default SearchItem