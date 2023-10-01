import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

// import ErrorMessage from "../Components/Common/ErrorMessage";

import FormBox from "../Components/Forms/FormBox";
import FormSubmitBtn from "../Components/Buttons/FormSubmitBtn";
import InputBox from "../Components/Forms/InputBox";
import { Link } from "react-router-dom";
import UsersProgress from "./UsersProgress";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState("")

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {


            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error);
                setSuccessMessage(false);
            });

        setSuccessMessage(true);
    };
    console.log(errorMessage)

    function AccountLinks({ loginLink }) {
        return (
            <div className="text-sm italic text-blue mb-3">{loginLink}</div>
        )
    }
    return (
        <>
            {!successMessage ? (<div className=" w-full sm:h-screen flex justify-center text-lt-gray sm:text-black bg-dk-blue sm:bg-lt-gray items-center sm:mt-5">
                <FormBox
                    onSubmit={signUp}
                    formTitle={"Crie uma conta"}
                    formDescription={"Assim você poderá acompanhar seu progresso!"}
                >
                    {errorMessage && (<p className="error-message">Email ou senha inválida. Tente novamente!</p>)}
                    <InputBox
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputBox
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormSubmitBtn
                        type="submit"
                        btnSendText="Criar Conta"
                    />
                    <p className="p-7 text-center italic underline text-sm"><Link to="/login">Já tem conta?</Link></p>

                </FormBox >

            </div>)
                :
                <UsersProgress />

            }

        </>
    );
};

export default RegisterPage




{/* <div className="sign-in-container">
                <form className="register-form" onSubmit={signUp}>
                    <h1>Crie uma conta</h1>
                    <p className="contact-description">Assim você poderá ver seu progresso em cada quiz e nível.</p>
                    {errorMessage && (<p className="error-message">Email ou senha inválida. Tente novamente!</p>)}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit">Sign Up</button>
                </form> */}