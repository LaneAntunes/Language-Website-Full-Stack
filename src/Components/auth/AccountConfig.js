import React from 'react'
import { useState } from 'react'
import AccoundDropdown from './AccoundDropdown'
import { FaUserCog } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';


function AccountConfig() {

    const [settings, setSettings] = useState(false)

    function settingOptions() {
        setSettings((prev) => !prev)
    }

    return (
        <div className=' relative  w-[150px] ' onClick={settingOptions}>
            <div className=' flex text-3xl cursor-pointer  items-center hover:text-blue-600 text-py-blue'>
                <div><FaUserCog /></div>
                <div className='text-lg'><TiArrowSortedDown /></div>
            </div>
            {settings && <div className='absolute z-50 left-10 sm:left-0 sm:top-10 lg:left-10 '><AccoundDropdown /></div>}

        </div>
    )
}

export default AccountConfig