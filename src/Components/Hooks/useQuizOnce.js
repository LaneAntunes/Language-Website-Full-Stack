import React from 'react'
import { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDoc, doc } from 'firebase/firestore';


function useQuizOnce(quizId) {
    const [quizState, setQuizState] = useState({
        status: 'loading',
        snapshot: null,
        error: null,
    });


    useEffect(() => {
        async function getDocuments() {
            setQuizState({ status: 'loading', snapshot: null, error: null, })
            try {
                const docRef = doc(db, "quizzes", quizId);
                const snapshot = await getDoc(docRef);
                setQuizState({ status: 'success', snapshot, error: null, })
            } catch (error) {
                console.log(error);

                setQuizState({ status: 'error', snapshot: null, error: error, })
            }
        }
        getDocuments();
    }, [quizId]);


    const { status, snapshot, error } = quizState;
    let id;
    let exists;
    let data;
    if (snapshot) {
        id = snapshot.id;
        exists = snapshot.exists;
        data = snapshot.data();
    }


    return {
        id,
        exists,
        data,
        error,
        status,

    };

}

export default useQuizOnce