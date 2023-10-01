import React from 'react'
import useUser from '../Hooks/useUser'
import { Link } from 'react-router-dom';


function AccoundDropdown() {

    const userState = useUser();

    return (
        <div className='cursor-pointer shadow-md p-3 text-sm border border-lt-gray py-15  bg-white '>
            <p className='pt-2 pb-2 hover:text-py-blue transition-all duration-150 hover:scale-105' onClick={userState.signOut}>Sair</p>
            <p className='pb-2 transition-all duration-150 hover:scale-105'><Link to="/deleteAccount">Conta</Link></p>
        </div>
    )
}

export default AccoundDropdown