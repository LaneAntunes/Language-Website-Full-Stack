import React from 'react'

function InputBox({ type, placeholder, value, onChange, id, name }) {
    return (
        <input
            className='border border-lt-gray p-3 text-base w-full mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-py-gray text-black'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={id}
            name={name}
        ></input>
    )
}

export default InputBox


