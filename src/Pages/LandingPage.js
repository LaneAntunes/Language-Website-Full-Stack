import React from 'react'
import './home.scss'
import VideoIntro from '../Components/LandingPageComponents/VideoIntro';
import selfi from '../images/selfi.jpg';
import Brain from '../images/brain.jpg';
import { Link } from 'react-router-dom';
import Nav from '../Components/MainPageComponents/Nav';
import Layout from '../Components/MainPageComponents/Layout';
import MailchimpSubscriptionForm from '../Components/auth/MailchimpSubscriptionForm';
import { BsLinkedin } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { BsCheck } from "react-icons/bs";

import Testemonials from '../Components/LandingPageComponents/Testemonials'
import CourseLeadFluency from '../Components/LandingPageComponents/CourseLeadFluency'
import Price from '../Components/LandingPageComponents/Price'
import VideoTestemonies from '../Components/LandingPageComponents/VideoTestemonies'
import LandingFooter from '../Components/LandingPageComponents/LandingFooter'
import EnrollBtn from '../Components/Buttons/EnrollBtn';
import CourseModules from '../Components/LandingPageComponents/CourseModules';
import { FaRegHandPointRight } from "react-icons/fa"
import BeforePrice from '../Components/LandingPageComponents/BeforePrice';
import CourseTools from '../Components/LandingPageComponents/CourseTools';
import MyProfile from '../Components/LandingPageComponents/MyProfile';



function LandingPage() {
    return (
        <div className=' justify-center items-center flex flex-col w-full lg:min-w-[1000px]   sm:gap-0  bg-white'>
            <div className='flex flex-col md:flex-row sm:flex-row  z-8 w-full '>
                <div className=' bg-gradient-to-r from-violet-600 to-indigo-600 text-dk-purple pt-8 pb-16 px-2 flex lg:flex-row flex-col md:items-center center lg:items-center lg:justify-between border w-full' >
                    <div className='  lg:hidden w-full  border-3 justify-center items-center border-py-purple flex flex-col self-center rounded-3xl lg:p-1 py-8'>
                        <div className='border border-py-purple rounded-9 overflow-hidden   '>
                            <VideoIntro />
                        </div>
                        <div className=' mt-12'>
                            <EnrollBtn />
                        </div>
                    </div>

                    <div className='  lg:w-[50%] flex flex-col  text-white gap-6 py-4 md:pl-6 lf:pr-0 m md:pr-6 rounded-9 '>
                        <h1 className='text-xl md:text-3xl font-bold'>Aprenda inglês do zero! Explicações em português e em inglês!</h1>
                        <h2 className='text-xl'>Professora experiente e atividades práticas. Exercícios de ÁUDIO, SPEAKING, FLASHCARDS, TEXTOS e muito mais!</h2>
                        <div className='gap-1'>
                            <div className='flex text-start gap-2'>
                                <FaRegHandPointRight size={20} />
                                <p className='text-sm'>Suporte total da professora</p>
                            </div>
                            <div className='flex text-start gap-2'>
                                <FaRegHandPointRight size={20} />
                                <p className='text-sm'>Certificado de conclusão</p>
                            </div>
                        </div>
                        <MyProfile />
                    </div>
                    <div className=' hidden lg:visible w-full lg:w-[500px] border-3 justify-end items-center border-[6041e8] lg:flex flex-col self-center rounded-3xl pt-4 pb-8'>
                        <div className='  md:py-0  '>
                            <VideoIntro />
                        </div>
                        <div className='  flex-col pt-12 pb-2'>
                            <div><EnrollBtn /></div>
                        </div>
                    </div>
                </div>
            </div>
            <Testemonials />
            <CourseLeadFluency />
            < CourseModules />
            <CourseTools />
            {/* <BeforePrice /> */}

            <Price />
            <div className='lg:h-[15vh] md:pt-8'>
            </div>
            <VideoTestemonies />
            <div className='md:h-[20vh] h-[12vh]'></div>
            <LandingFooter />
        </div >

    )
}

export default LandingPage

