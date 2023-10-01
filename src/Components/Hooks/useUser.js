import React, { createContext, useEffect, useContext } from 'react'
import { useState } from 'react'

import { auth } from "../../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";



function useUserInternal() {


    const [userState, setUserState] = useState({
        user: auth.currentUser,
        isLoading: auth.currentUser === null ? true : false,
        error: null,
    })

    //***RESET PASSWORD */
    const [email, setEmail] = useState("");
    //**********/

    const { user, isLoading, error } = userState;

    const isSignedIn = user !== null;
    const userId = isSignedIn ? user.uid : undefined;



    useEffect(() => {

        const onChange = (currentUser) => {
            setUserState({ user: currentUser, isLoading: false, error: null });

        }
        const onError = (error) => {
            console.error(error);
            setUserState({ user: null, isLoading: false, error });
        }
        const unsubscribe = auth.onAuthStateChanged(onChange, onError)


        return unsubscribe
    }, [])


    const signIn = async (e, email, password) => {
        e.preventDefault();
        setUserState({ user: null, isLoading: true, error: null })
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const { uid } = userCredential.user

            if (userCredential) {
                setUserState({ user: userCredential.user, isLoading: false, error: null })

            } else {
            };
        } catch (error) {
            console.error(error);
            setUserState({ user: null, isLoading: null, error })
        }
    }

    const signOut = async (e) => {
        setUserState({ user: userState.user, isLoading: true, error: null })
        try {
            await auth.signOut();

            setUserState({ user: null, isLoading: false, error: null })

        } catch (error) {
            console.error(error);
            setUserState({ user: userState.user, isLoading: false, error })
        }
    }



    //******FORGOT PASSWORD******* */


    const resetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent!");
        } catch (error) {
            alert(error.message);
        }
    };

    return {
        user,
        userId,
        isLoading,
        isSignedIn,
        error,
        signIn,
        signOut,
        email,
        setEmail,
        resetPassword,


    }
}
const UserContext = createContext(null);

function UserProvider({ children }) {
    const userState = useUserInternal();
    return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
}

function useUser() {
    const userState = useContext(UserContext);
    if (userState === null) {
        throw new Error(
            "useUser needs to have a UserProvider component as a parent in the React tree."
        );
    }
    return userState;
}

export default useUser;
export { UserContext, UserProvider };