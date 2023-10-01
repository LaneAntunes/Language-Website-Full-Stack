import React from 'react'
import { Link } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent';
import MailchimpSubscriptionForm from '../auth/MailchimpSubscriptionForm';

function AllLinks({ link, path }) {
    return (
        <li className='text-sm'><Link to={path}>{link}</Link></li>
    )

}

function AllUrls({ urlName, path }) {
    return (
        <a className='text-sm' href={path} target='_blank'>{urlName}</a>
    )

}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

function Footer() {
    return (
        <footer>


            <div className='flex gap-6 py-16  flex-col items-center justify-center w-full border bg-custom-gray '>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='text-base font-bold '>Inscreva-se na nossa newsletter! </p>
                    <p className='text-sm  '>Você receberá dicas estratégicas para acelerar o seu aprendizado em inglês de maneira eficaz e sem perder tempo.</p>
                </div>

                <MailchimpSubscriptionForm />
            </div>


            <div className="bg-dk-gray text-white py-6 pt-16 pb-2" >
                <div className="flex flex-col justify-center items-center gap-10 sm:flex sm:flex-row sm:justify-around ">
                    <ul className="flex flex-col gap-3 text-center">
                        <h3 className="text-base font-semibold mb-2">Cursos Online</h3>
                        <AllUrls urlName="Plano Mensal" path="https://pay.hotmart.com/I85619011E?off=itvek971&checkoutMode=6&bid=1695683108125" />
                        <AllUrls urlName="Plano Semestral" path="https://www.udemy.com/course/curso-de-ingles-intermediario-90-em-ingles-com-legendas/?referralCode=CAADBF2564957289B935" />
                    </ul>
                    <ul className="flex flex-col gap-3 text-center">
                        <h3 className="text-base font-semibold mb-2">Quick Links</h3>

                        {/* <AllLinks link="Contato" path="/contact" /> */}
                        <Link to="/grammar"><li className='cursor-pointer text-sm' onClick={scrollToTop}>Quizzes</li></Link>
                        <Link to="/"><li className='cursor-pointer text-sm' onClick={scrollToTop}>Home</li></Link>
                        <Link to="/login"><li className='cursor-pointer text-sm' onClick={scrollToTop}>Criar conta</li></Link>
                    </ul>
                    <ul className="flex flex-col gap-3 text-center">
                        <h3 className="text-base font-semibold mb-2">Contact teacher</h3>
                        <AllUrls urlName="Linkedin" path="https://www.linkedin.com/in/lane-antunes-57a07690/" />
                        <AllUrls urlName="Youtube" path="https://www.youtube.com/channel/UCQEeN8e0GP1utzQi0luuJOw" />
                        <li className='text-sm'>Email: lanenglisht@gmail.com</li>

                    </ul>
                </div>
                <CookieConsent
                    location="bottom"
                    buttonText="Aceitar"
                    cookieName="myCookieConsent"
                    style={{ background: '#2B373B' }}
                    buttonStyle={{ background: '#3970b4', color: '#f5f5f5', fontSize: '13px' }}
                    expires={365}
                >
                    Este site utiliza cookies para melhorar a experiência do usuário. Ao usar este site, você concorda com o uso de cookies..
                </CookieConsent>
                <p className='text-center mt-12 text-sm'>&copy; 2023 TeacherLaneAntunes.com.br Todos os direitos reservados.</p>
            </div>
        </footer >
    )
}

export default Footer