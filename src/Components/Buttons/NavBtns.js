import React from 'react'
import { Link } from 'react-router-dom'

function NavBtns({ className, title, link, ...props }) {
    return (
        <button ><Link to={link} style={{ boxShadow: '0px 3px 5px rgb(142, 133, 133)' }} className={`p-3 shadow-md flex items-center font-body text-sm transition-all duration-150 hover:scale-105 cursor-pointer rounded-9 text-white ${className}`} >{title}</Link></button>
    )
}

export default NavBtns