
import React, { useState } from "react";
import useUser, { UserContext } from "../Components/Hooks/useUser"
import { Link } from "react-router-dom";
import ErrorMessage from "../Components/Common/ErrorMessage.js"
// import ForgotPassword from "../Components/auth/ResetPassword/ForgotPassword";
import UsersProgress from "./UsersProgress";
import FormBox from "../Components/Forms/FormBox";
import InputBox from "../Components/Forms/InputBox";
import FormSubmitBtn from "../Components/Buttons/FormSubmitBtn";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userState = useUser();


    let content;
    if (userState.isSignedIn) {
        content = (<>
            <UsersProgress />
        </>)
    } else {
        content = (<>
            <div className=" w-full sm:h-screen flex justify-center text-lt-gray sm:text-black bg-py-blue sm:bg-lt-gray items-center mt-5">
                <FormBox
                    onSubmit={(e) => userState.signIn(e, email, password)}
                    formTitle="Bem-vindo de volta!"
                    formDescription="Entre na sua conta para acompanhar o seu progresso!"
                >
                    {userState.error && <ErrorMessage />}

                    <InputBox
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="pb-3 italic underline text-sm"><Link to="/forgot-password">Esqueceu sua senha?</Link></p>
                    <InputBox
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormSubmitBtn
                        type="submit"
                        btnSendText="Entrar"
                    />
                    <p className="text-center p-7 italic underline text-sm"><Link to="/signup">Criar conta</Link></p>

                </FormBox>
            </div>
        </>)
    }

    return (
        <>
            {content}
        </>

    );
}

export default LoginPage













