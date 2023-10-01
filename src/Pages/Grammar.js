import React from 'react'
import { useState } from 'react'

import LoadingSnipper from '../Components/Common/LoadingSnipper';
import ErrorMessage from '../Components/Common/ErrorMessage';
import useQuizzesOnce from '../Components/Hooks/useQuizzesOnce';
import QuizPreview from '../Components/Quizzes/QuizPreview';
import useUserHook, { UserContext } from '../Components/Hooks/useUser';
import SearchTool from '../Components/SearchTool';
import Layout from '../Components/MainPageComponents/Layout';
import Nav from '../Components/MainPageComponents/Nav';
import NavBtns from '../Components/Buttons/NavBtns';



function SellectBtn({ title, onClick, className, value }) {

    return (
        <div onClick={onClick} value={value} className=' text-white cursor-pointer bg-py-purple px-5 p-2 rounded-9'> {title} </div>

    )

}

function ExerciseColumns({ title, quizzes, className, className2, onClick }) {
    const initialLimit = 20;
    const [limit, setLimit] = useState(initialLimit);
    const displayedQuizzes = quizzes.slice(0, limit);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <ul className='flex-1 flex flex-col items-center gap-5'>
            <h2 className={`font-medium rounded-9 w-full text-white text-2 text-center box-shadow-md ${className} pt-8 pb-8`}>{title}</h2>
            <div className='flex flex-wrap gap-2 '>
                {displayedQuizzes.map((quiz) => (
                    <li className={` sm:min-w-[150px] sm:max-w-[200px] flex-1 flex itmes-center justify-center text-center text-sm rounded-lg shadow-lg hover:text-white transition-all duration-300 hover:scale-105 ${className2}`}
                        key={quiz.id}>
                        <QuizPreview id={quiz.id} data={quiz.data} scrollToTop={scrollToTop} />
                    </li>
                ))}
            </div >
            <div className='flex  gap-8 text-xs'>
                {limit < quizzes.length &&
                    <button className='pb-2 italic text-black underline' onClick={() => setLimit(limit + 10)}> Ver Mais</button>
                }
                {limit > initialLimit &&
                    <button className='pb-2 italic text-black underline' onClick={() => setLimit(initialLimit)}> Ver Menos</button>
                }
            </div>

        </ul>
    )
};


function Grammar() {
    const [categoryClicked, setCategoryClicked] = useState('introQuizzes')

    const quizData = useQuizzesOnce();
    const user = useUserHook();

    if (quizData.status === "loading") return <LoadingSnipper />
    if (quizData.status === "error") return <ErrorMessage> Something went wrong</ErrorMessage>
    if (quizData.isEmpty) return (<p>No quizzes found!</p>)

    const introQuizzes = quizData.results.filter((quiz) => quiz.data.level === "Intro");
    const nível1Quizzes = quizData.results.filter((quiz) => quiz.data.level === "Nível 1");
    const nível2Quizzes = quizData.results.filter((quiz) => quiz.data.level === "Nível 2");
    const nível3Quizzes = quizData.results.filter((quiz) => quiz.data.level === "Nível 3");



    function chooseYourQuizzes(element) {
        setCategoryClicked(element.target.value)


    }


    let pageContent;
    if (categoryClicked === 'introQuizzes') {
        pageContent = <ExerciseColumns title={"Introdução"} quizzes={introQuizzes} className={'bg-py-purple'} className2={'border border-py-blue hover:bg-py-blue text-py-blue'} />
    } else if (categoryClicked === 'nível1Quizzes') {
        pageContent = <ExerciseColumns title={"Nível 1 - PRESENTE"} quizzes={nível1Quizzes} className={'bg-py-green'} className2={'border border-py-green hover:bg-py-green text-dk-green'} />

    } else if (categoryClicked === 'nível2Quizzes') {
        pageContent = <ExerciseColumns title={"Nível 2 - FUTURO"} quizzes={nível2Quizzes} className={'bg-py-orange'} className2={'border border-py-orange hover:bg-py-orange text-dk-orange'} />

    } else if (categoryClicked === 'nível3Quizzes') {
        pageContent = <ExerciseColumns title={"Nível 2 - PASSADO"} quizzes={nível3Quizzes} className={'bg-py-blue'} className2={'border border-py-blue hover:bg-py-blue text-dk-blue'} />

    }

    return (
        <div className='border border-lt-gray shadow-md flex flex-col pt-16  gap-4 bg-white w-full'>
            <div className=" w-full flex items-start justify-center h-[10vh]">
                <SearchTool />
            </div>
            <div className='flex flex-col items-center justify-center'>

                <div className=' sm:w-full flex flex-wrap sm:flex-row  shadow-md bg-custom-gray p-3 justify-center gap-3 sm:gap-6 items-center '>
                    <button onClick={chooseYourQuizzes} value='introQuizzes' className={`${(categoryClicked === 'introQuizzes') ? "bg-py-purple text-white " : ""} text-sm sm:text-base hover:bg-py-purple transition duration-300 ease-in-out  cursor-pointer px-5 p-2 rounded-9 hover:scale-110 hover:text-white whitespace-nowrap `}>Intro</button>
                    <button onClick={chooseYourQuizzes} value='nível1Quizzes' className={`${(categoryClicked === 'nível1Quizzes') ? "bg-py-green text-white" : ""} text-sm sm:text-base hover:bg-py-green transition duration-300 ease-in-out  cursor-pointer px-5 p-2 rounded-9 hover:scale-110  hover:text-white whitespace-nowrap `} > Nível 1 - Presente</button>
                    <button onClick={chooseYourQuizzes} value='nível2Quizzes' className={`${(categoryClicked === 'nível2Quizzes') ? "bg-py-orange text-white " : ""} text-sm sm:text-base hover:bg-py-orange transition duration-300 ease-in-out  cursor-pointer px-5 p-2 rounded-9 hover:scale-110  hover:text-white whitespace-nowrap `}> Nível 2 - Futuro</button>
                    <button onClick={chooseYourQuizzes} value='nível3Quizzes' className={`${(categoryClicked === 'nível3Quizzes') ? "bg-py-blue text-white " : ""}text-sm sm:text-base hover:bg-py-blue transition duration-300 ease-in-out  cursor-pointer px-5 p-2 rounded-9 hover:scale-110  hover:text-white whitespace-nowrap `}> Nível 3 - Passado</button>
                </div >

                <div className=' mb-9 mt-16 flex flex-col gap-2 sm:flex-row sm:flex-wrap justify-center pr-10 pl-10 sm:w-[60vw]'>
                    {pageContent}
                    {/* <ExerciseColumns title={"Nível 2 - FUTURO"} quizzes={nível2Quizzes} className={'bg-py-green'} className2={'border border-py-green hover:bg-py-green text-dk-green'} />
                <ExerciseColumns title={"Nível 3 - PASSADO"} quizzes={nível3Quizzes} className={'bg-py-purple'} className2={'border border-py-purple hover:bg-py-purple text-dk-purple'} />
            */}
                </div>
            </div>
        </div >
    );
}

export default Grammar
