import React from 'react'

function TextArea({ id, name, value, onChange, placeholder }) {
    return (
        <textarea
            rows={4}
            className='w-full border border-lt-gray p-3 text-base mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500  placeholder-py-gray'
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        ></textarea>
    )
}

export default TextArea