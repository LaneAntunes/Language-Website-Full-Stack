import React from 'react'
import { doc, setDoc, updateDoc, getDoc, getDocs, query, where, orderBy, collection, collectionGroup, limit, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { useState, useEffect, useCallback } from 'react';
import useUser from './useUser';

function useScores(quizId) {

    const userState = useUser()



    const [refreshAllStatistics, setRefreshAllStatistics] = useState(0);
    const [searchResults, setSearchResults] = useState([]);

    //State that returns collection data for Progress page
    const [userProgressData, setUserProgressData] = useState({
        statisticsStatus: 'loading',
        quizzesTaken: null,
        statisticsError: null,
    });

    const [userScores, setUserScores] = useState({
        status: 'loading',
        allScores: null,
        error: null,
    })

    useEffect(() => {
        async function getQuizzesTaken() {
            setUserProgressData({ statisticsStatus: 'loading', quizzesTaken: null, statisticsError: null });
            try {
                const docRef = collection(db, userState.userId);
                const quizSnapshots = await getDocs(docRef);

                // Map over the quizSnapshots and calculate scores for each quiz
                const quizzesTaken = quizSnapshots.docs.map(docSnapshot => {
                    const quiz = docSnapshot.data();
                    // Ensure quiz.scores is an array and all elements are numbers
                    const scores = quiz.score
                    const maxScore = quiz.numbQuestions
                    const totalScore = scores.reduce((sum, score) => sum + score, 0);
                    const averageScore = totalScore / scores.length;
                    const highestScore = Math.max(...scores)
                    const bestScore = Math.round((highestScore / maxScore) * 100);
                    const quizAttemps = scores.length
                    // Ensure quiz.totalScore is a number and not zero
                    // If not available, use the maximum score in the 'scores' array as the totalQuizScore
                    const rawPercentage = (averageScore / maxScore) * 100;
                    const percentage = Math.round(rawPercentage);


                    return {
                        id: docSnapshot.id,
                        data: {
                            ...quiz,
                            percentage,
                            bestScore,
                            quizAttemps,
                        }
                    };
                });

                setUserProgressData({ statisticsStatus: 'success', quizzesTaken, statisticsError: null });
            } catch (error) {
                console.error(error);

                setUserProgressData({ statisticsStatus: 'error', quizzesTaken: null, statisticsError: error });
            }
        }
        getQuizzesTaken();
    }, [refreshAllStatistics]);

    //DELETE A DOCUMENT ON FIREBASE//

    const deleteDocument = useCallback(async (docId) => {
        const docRef = doc(db, userState.userId, docId);
        try {
            await deleteDoc(docRef); // Use deleteDoc function

            setRefreshAllStatistics(prevKey => prevKey + 1);

        } catch (error) {
            console.log("Error deleting document: ", error);

        }
    }, [db, userState.userId]);


    //useEffect to retreieve data in objects - Big snapshot of each document and the data inside it.
    // I can iterate over these objects inside userProgress page and display whatever i want.

    useEffect(() => {
        async function getScores() {
            setUserScores({ status: 'loading', allScores: null, error: null });
            try {
                const docRef = doc(db, userState.userId, quizId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const scores = data.score;
                    setUserScores({ status: 'success', allScores: scores, error: null });
                } else {
                    console.log("Document does not exist");
                }
            } catch (error) {
                console.error(error);

                setUserScores({ status: 'error', allScores: null, error });
            }
        }
        getScores();

    }, []);


    async function saveScore(quizId, scoreData) {
        if (userState.isSignedIn) {
            // setUserScore({ status: 'saving', error: null });
            try {
                const docRef = doc(db, userState.userId, quizId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const existingData = docSnap.data();
                    const existingScores = existingData.score || [];
                    const newScore = scoreData.score;
                    const updatedScores = [...existingScores, newScore];
                    const updatedData = { ...scoreData, score: updatedScores.flat() };
                    await updateDoc(docRef, updatedData);
                } else {
                    await setDoc(docRef, scoreData);
                }
            } catch (error) {
                console.error(error)

                // setUserScore({ status: 'error', error });
            }
        } else {
            console.log("you need to signin")
            //render register component//
        }
    }

    // console.log(userScores.snapshot)
    const { status, allScores, error } = userScores;

    let scoresArray = []
    if (allScores) {
        scoresArray = allScores
    } else {
        scoresArray = []
    }

    //THIS SHOULD BE FIXED
    //Maybe on endscreen - if scoresAww is an empty array, just resturn null
    const { statisticsStatus, quizzesTaken, statisticsError } = userProgressData;

    //**********************SEARCH************************* */
    const handleSearch = async (searchTerm) => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }
        const collectionRef = collection(db, 'quizzes');
        const q = query(collectionRef, orderBy('title'));
        try {
            const querySnapshot = await getDocs(q);
            const matchingQuizzes = querySnapshot.docs
                .map((doc) => ({ id: doc.id, data: doc.data() }))
                .filter((quiz) => {
                    const quizTitle = quiz.data.title.toLowerCase();

                    return quizTitle.includes(searchTerm.toLowerCase());
                });


            setSearchResults(matchingQuizzes.slice(0, 5));
        } catch (error) {
            console.log('Error getting documents: ', error);
        }
    };



    return {
        saveScore: saveScore,
        error,
        status,
        statisticsStatus,
        quizzesTaken,
        scoresArray,
        deleteDocument,
        userProgressData,
        searchResults,
        handleSearch,
    }
}

export default useScores