
import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";

function useQuizzesOnce() {
    const [quizData, setQuizData] = useState({
        status: "loading",
        snapshot: null,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            setQuizData({ status: "loading", snapshot: null, error: null });

            try {
                const collectionRef = collection(db, 'quizzes');
                const snapshot = await getDocs(collectionRef);
                setQuizData({ status: "successful", snapshot, error: null });

            } catch (error) {
                console.error(error);

                setQuizData({ status: "error", snapshot: null, error: error });
            };
        }
        fetchData();
    }, []);
    const { status, snapshot, error } = quizData;
    let results = []
    if (snapshot) {
        results = snapshot.docs.map((docSnapshot) => {
            return {
                id: docSnapshot.id,
                data: docSnapshot.data(),
            }
        })
    }

    return {
        status,
        error,
        results,
        isEmpty: results.length === 0,
    }
}
export default useQuizzesOnce;