import React from 'react'

function FormSubmitBtn({ type, btnSendText, onClick }) {
    return (
        <button onClick={onClick} className="bg-lt-blue text-white rounded-md py-3 px-4 text-base cursor-pointer transition-all duration-150 hover:scale-105" type={type}>{btnSendText}</button>
    )
}

export default FormSubmitBtn