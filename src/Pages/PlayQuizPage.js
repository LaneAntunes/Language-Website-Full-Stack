import React from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../Components/Common/ErrorMessage';
import LoadingSnipper from '../Components/Common/LoadingSnipper';
import useQuizOnce from '../Components/Hooks/useQuizOnce';
import QuizGame from '../Components/Quizzes/Game/QuizGame';
import useScores from '../Components/Hooks/useScores';
import Layout from '../Components/MainPageComponents/Layout';
// import useScores from '../Hooks/useScores';
function PlayQuizPage({ userId }) {
    const { id } = useParams();

    const quiz = useQuizOnce(id)


    //might need Id as parameter//


    let content;
    if (quiz.status === "loading") {
        content = <LoadingSnipper />
    } else if (quiz.status === "error") {
        content = <ErrorMessage />
    } else if (quiz.exists === "error") {
        content = <ErrorMessage> No quiz found</ErrorMessage>
    } else {
        content = <QuizGame quizData={quiz.data} quizId={id} userId={userId} />
    }

    return (
        <>
            {content}
        </>


    )
}

export default PlayQuizPage