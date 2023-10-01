import React from 'react'

function IconH1P({ pic, title, description }) {
    return (
        <div className='flex gap-2 items-start  md:w-[150px] md:justify-start '>
            <img src={pic} className='w-[15px] md:w-[25px] ' />
            <div className=' flex flex-col text-start '>
                <h2 className='font-bold text-white md:text-base text-sm'>{title}</h2>
                <p className='text-xs text-dk-white'>{description}</p>
            </div>
        </div>
    )
}

export default IconH1P