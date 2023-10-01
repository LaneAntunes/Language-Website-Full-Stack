import React, { useState } from 'react';
import useUser from '../../Hooks/useUser';
import { Link } from 'react-router-dom';

import InputBox from '../../Forms/InputBox';
import FormSubmitBtn from '../../Buttons/FormSubmitBtn';
import FormBox from '../../Forms/FormBox';

function ForgotPassword() {
    const { email, setEmail, resetPassword } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword();
    };


    return (
        <div className=" w-full h-screen flex justify-center bg-lt-gray items-center mt-5">
            <FormBox
                onSubmit={handleSubmit}
                formTitle="Redefina sua senha"
                formDescription="Informe o e-mail associado à sua conta para receber um link de redefinição de senha."
            >

                {/* <Link to="/forgot-password" className="forgot-link">Esqueceu sua senha?</Link> */}

                <InputBox
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                    placeholder="Email"
                />
                <FormSubmitBtn
                    type="submit"
                    btnSendText="Continuar"
                />
                <p className='italic pt-4 text-sm text-center underline'><Link to="/login" >Voltar para Login</Link></p>

            </FormBox>
        </div>
    );
}

export default ForgotPassword;
