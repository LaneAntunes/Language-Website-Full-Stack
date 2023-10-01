import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AccountConfig from '../auth/AccountConfig';
import NavBtns from '../Buttons/NavBtns';
import useUser from '../Hooks/useUser';
import AuthBtns from '../Buttons/AuthBtns';
import Logo from '../logo';
import { GiHamburgerMenu } from 'react-icons/gi';

function Nav() {
    const userState = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);




    return (
        <>

            <p className='px-3 gap-2 text-xs md:text-sm py-2 w-full bg-dk-gray text-white text-center ' >OFERTA: Aprenda inglês por menos de 29,90 reais/<scan className="text-[11px]">mês!</scan>  <scan className="font-semibold">15 dias de garantia!</scan></p>
            {/* <a className='py-2 px-2 md:px-4 rounded-[36px] text-center'> 15 dias de garantia!</a> */}

            <nav className={` ${isOpen ? "flex-col  min-w-full" : "justify-between "}  z-9 flex pt-5 pb-5 items-center md:gap-55 md:px-8 md:pb-4 md:pt-6 md:flex md:flex-row md:justify-between bg-[url("./images/vector1.png")]  `} >
                <Logo isShow={isOpen} className={'text-dk-blue'} />
                <button onClick={toggleMenu} className={`md:hidden p-5 ${isOpen && "hidden"}`}>
                    <GiHamburgerMenu size={32} />
                </button>
                <div className={` ${!isOpen ? "hidden" : "flex flex-wrap w-full justify-center"} md:flex md:flex-row `}>
                    <ul className={`flex flex-wrap gap-2 list-none px-2 ${isOpen ? "" : "hidden"} md:flex md:flex-row justify-center whitespace-nowrap md:flex-nowrap sm:max-w-[500px]`}>
                        <NavBtns className="bg-py-purple" title="Home" link="/" />
                        <NavBtns className="bg-py-orange" title="Exercícios" link="/grammar" />
                        {/* <NavBtns className="bg-py-orange" title="Cursos Online" link="/courses" /> */}
                        <NavBtns className="bg-py-green" title="Meu Progresso" link={`/my-progress/${userState.userId}`} />


                        {userState.userId ? (
                            <div className='flex gap-2'>
                                <AuthBtns onClick={userState.signOut} value={'Sair'} classname={"md:hidden"} />
                                <AuthBtns link={<Link to="/deleteAccount">Conta</Link>} classname={"md:hidden"} />
                            </div>
                        ) : (
                            <AuthBtns link={<Link to="/login">Entrar </Link>} classname={"md:hidden"} />

                        )}

                    </ul>
                </div>

                <div className='hidden md:flex'>
                    {userState.userId && <AccountConfig /> || <div className='flex gap-1 ml-1 mr-5 '>
                        <AuthBtns link={<Link to="/login">Entrar</Link>} />
                        <AuthBtns link={<Link to="/signup">Criar</Link>} />
                    </div>}
                </div>
                <button onClick={toggleMenu} className={`pt-4 md:hidden ${!isOpen && "hidden"}`}>
                    <GiHamburgerMenu size={32} />
                </button>

            </nav >
        </>
    )
}

export default Nav;
