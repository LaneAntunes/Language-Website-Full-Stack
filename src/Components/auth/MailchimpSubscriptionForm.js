import React, { useState } from "react";

const MailChimpSubscriptionForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Use the local Firebase Cloud Function URL for testing
        // const url = "http://localhost:5001/inglesautodidata-5b0b9/us-central1/addUserToMailchimp";

        //http://localhost:5001/inglesautodidata-5b0b9/us-central1/addUserToMailchimp
        // Use this URL for production
        const url = "https://us-central1-inglesautodidata-5b0b9.cloudfunctions.net/addUserToMailchimp";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: name,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    console.log('Response status: ', response.status);  // Log the status code

                    throw new Error('Network response was not ok');

                }
                return response.json();
            })
            .then(responseData => {
                setMessage("You have subscribed successfully!");
            })
            .catch((err) => {
                console.error('There has been a problem with your fetch operation:', err);
                setError(err.message);
            });
    };

    return (
        <div >
            <form onSubmit={handleSubmit} className=" flex md:flex-row flex-col items-center justify-center gap-2">
                <input
                    className="block p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 placeholder:text-center"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className="block p-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-center"
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button className='bg-py-orange px-4 p-2 rounded-9 text-white' type="submit">Inscreva-se</button>
            </form>

            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default MailChimpSubscriptionForm;

