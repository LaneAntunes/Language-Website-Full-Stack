import React from 'react'



function FormBox({ formTitle, formDescription, onSubmit, children }) {
    return (
        <form className="flex flex-col  bg-py-blue sm:bg-white p-10 shadow-sm sm:border  " onSubmit={onSubmit}>
            <div className='flex flex-col w-80 justify-center'>
                <h1 className='text-center text-white sm:text-dk-blue text-base mb-4'>{formTitle}</h1>
                <p className='pb-8 italic text-center  sm:text-dk-blue text-sm'>{formDescription}</p>
            </div>

            {children}
        </form>

    )
}

export default FormBox