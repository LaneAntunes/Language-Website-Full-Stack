import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import useUser from '../Components/Hooks/useUser';
import useQuizOnce from '../Components/Hooks/useQuizOnce';
import useScores from '../Components/Hooks/useScores';
import LoadingSnipper from '../Components/Common/LoadingSnipper';
import ErrorMessage from '../Components/Common/ErrorMessage';
import QuizzesTaken from '../Components/Progress/QuizzesTaken';
import './userProgress.scss'
import Layout from '../Components/MainPageComponents/Layout';



function WelcomeUser() {
    return (
        <div className='flex flex-col gap-6 items-center'>
            <h2 className='text-lg'>Você ainda não fez nenhum teste. Gostaria de começar?</h2>

            <button  ><Link style={{ boxShadow: '0px 3px 5px rgb(142, 133, 133)' }} className={`p-4 shadow-md flex items-center justify-center font-body text-sm cursor-pointer transition-all duration-150 hover:scale-105 rounded-9 text-white bg-py-purple `} to='/grammar'>Exercícios</Link></button>

        </div>
    )
}

function UsersProgress({ userId }) {

    const { id } = useParams();
    // const userState = useUser();
    const quiz = useQuizOnce(id);



    const { quizzesTaken, deleteDocument } = useScores();

    let quizzesByLevel = quizzesTaken
        ? quizzesTaken.reduce((result, quiz) => {
            let level = quiz.data.level;
            if (!result[level]) {
                result[level] = []; // If this level doesn't exist yet, create it with an empty array
            }
            result[level].push(quiz); // Add the current quiz to the correct level
            return result;
        }, {})
        : {};


    // Conditional render ---> If !quizzten render compontebt -- take your first quiz and return to 
    //this page to see your progress...//

    return (

        <div className='user-progress-page min-h-[70vh]   bg-[url("./images/vector1.png")] pb-11'>
            <h1 className=' text-dk-blue text-2xl font-bold py-16'>Meu Progresso!</h1>
            {quizzesTaken && quizzesTaken.length > 0 ? <QuizzesTaken quizzesByLevel={quizzesByLevel} deleteDocument={deleteDocument} /> : <WelcomeUser />}
        </div>
    );
}

export default UsersProgress