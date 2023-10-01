import { useState, useEffect } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, deleteUser, onAuthStateChanged } from 'firebase/auth';


function WasDeleted() {
    return (
        <h1> Sua conta foi deletada com sucesso!</h1>
    )
}

const DeleteAccount = () => {
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [incorrectPassword, setIncorrectPassword] = useState(false)

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });

        return unsubscribe; // Clean up subscription on unmount
    }, []);

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user) {
            const credential = EmailAuthProvider.credential(user.email, password);

            try {
                // Re-authenticate the user.
                await reauthenticateWithCredential(user, credential);

                // Delete the user.
                await deleteUser(user);
                alert('Account deleted successfully');
                // Here you should navigate user to the login page or whatever you prefer
                setIncorrectPassword(false)
            } catch (error) {
                console.error('Error in account deletion: ', error);
                setIncorrectPassword(true)
                setPassword("")
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full pt-5 h-[50vh] sm:h-70screen bg-gray-100">
            <h1 className="text-3xl font-semibold mb-4">Deletar Conta</h1>
            {incorrectPassword ? <p className='pb-2 text-red-500 text-sm'>Senha inválida! Tente novamente.</p> : ''}
            <form onSubmit={handleSubmit} className="w-1/3 ">
                <label className="block mb-2">
                    <span className="text-gray-700">Senha:</span>
                    <input type="password" value={password} onChange={handleChange} className="mt-1 block w-full rounded-md border border-dk-gray shadow-sm p-2" />
                </label>
                <input type="submit" value="Deletar Conta" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded mt-4 cursor-pointer" />
            </form>

        </div>
    );
};

export default DeleteAccount;
