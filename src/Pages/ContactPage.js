import React, { useState } from 'react';
import axios from 'axios';

import InputBox from '../Components/Forms/InputBox';
import FormBox from '../Components/Forms/FormBox';
import FormSubmitBtn from '../Components/Buttons/FormSubmitBtn';
import TextArea from '../Components/Forms/TextArea';

const ContactPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        sent: false,
    });

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };
    const cloudFunctionURL = 'https://us-central1-inglesautodidata-5b0b9.cloudfunctions.net/sendEmail';

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(cloudFunctionURL, {
                to: formState.email,
                subject: 'Contact Form Submission',
                text: `Name: ${formState.name}\nEmail: ${formState.email}\nMessage: ${formState.message}`,
            });

            if (response.status === 200) {
                console.log('Email sent successfully:', response.data);
                setFormState({
                    name: '',
                    email: '',
                    message: '',
                    sent: true,
                });
            } else {
                console.log('Email sending failed:', response.data);
            }
        } catch (error) {

            console.error('Error sending email:', error);
        }
    };

    console.log(formState.sent, formState.name, formState.email, formState.message)

    return (
        <div className="w-full sm:h-screen flex justify-center bg-dk-blue sm:bg-lt-gray items-center text-lt-gray sm:text-black sm:mt-2">
            <FormBox
                onSubmit={handleSubmit}
                formTitle={!formState.sent ? 'Entre em contato!' : 'Obrigada por entrar em contato!'}
                formDescription={!formState.sent ? 'Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato comigo.' : 'Te retornarei o mais breve possível!'}
            >
                <InputBox
                    placeholder="Nome"
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                />
                <InputBox
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextArea
                    placeholder="Escreva sua mensagem"
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                />
                <FormSubmitBtn
                    type="submit"
                    btnSendText="Enviar"
                />
            </FormBox>
        </div>
    );
};

export default ContactPage;
