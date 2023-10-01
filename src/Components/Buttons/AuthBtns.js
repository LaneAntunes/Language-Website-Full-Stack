import React from 'react'


export default function AuthBtns({ value, onClick, disabled, link, classname }) {
    return (
        <button onClick={onClick} disabled={disabled} className={`${classname} p-2 shadow-md font-body text-sm transition-all duration-150 hover:scale-105 hover:text-py-purple hover:border  hover:border-py-purple cursor-pointer rounded-9 flex items-center border border-py-blue border-py-blue-400`} >{value} {link}</button>

    )
}