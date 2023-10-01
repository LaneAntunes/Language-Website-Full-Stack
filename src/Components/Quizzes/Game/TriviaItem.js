import React from 'react'
import shuffle from './Shuffle'
import { useState } from 'react'
import "./QuizGame.scss"

function TriviaItem({ question, correctAnswer, incorrectAnswers, onNextClick, onAnswerSelected, explanation, answerWasCorrect }) {

    const allAnswers = [correctAnswer, ...incorrectAnswers]
    const [shuffledAnswers, setShuffledAnswers] = useState(() => shuffle(allAnswers));

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const hasPickedAnswer = selectedAnswer !== null;


    const onAnswerClick = (event) => {

        const playerAnswer = event.target.innerHTML;
        setSelectedAnswer(playerAnswer)
        const wasPlayerCorrect = playerAnswer === correctAnswer;
        onAnswerSelected(wasPlayerCorrect)
    }

    // console.log(onAnswerSelected)
    let nextButtonClassName = 'trivia-item__button trivia-item__next-button ';
    if (!hasPickedAnswer) nextButtonClassName += " trivia-item__button--disabled"


    return (
        <>
            <div className='quiz-game-questions   '>
                <div className=' relative justify-center  p-5 flex items-center flex-col gap-4  bg-white shadow-md rounded-9 sm:justify-start sm:min-h-[50vh] sm:p-8 w-[95vw] sm:w-[50vw]'>
                    <button className={`${nextButtonClassName} absolute left-26 top-0 m-4`} onClick={onNextClick} disabled={!hasPickedAnswer}>Next</button>
                    <div className='h-[30px]'></div>
                    {explanation && <div className='sm:hidden flex flex-col items-center  text-center bg-white  bg-gradient-to-b w-full    from-white to-[#F4F7FF] shadow-2xl  rounded-lg p-3  border border-lt-green'>
                        <p className='text-dk-green pb-2 font-bold p-0 m-0 text-sm'>Correct: {correctAnswer}</p>
                        <p className='text-dk-green p-0 m-0  text-sm '>{explanation}</p>
                    </div>}

                    <div className='sm:flex sm:flex-col sm:justify-start'>
                        <h2 className='.trivia-item__question text-base sm:text-lg pt-2 pb-5 sm:pt-8 sm:pb-6 font-[500]'>{question}</h2>

                        <ul className='trivia-item__answers text-sm sm:text-base flex flex-wrap sm:grid sm:grid-cols-2  p-0 m-0   '>
                            {shuffledAnswers.map((answer, i) => {
                                let className = "trivia-item__button text-sm sm:text-base"
                                const isThisCorrect = answer === correctAnswer
                                if (hasPickedAnswer) {
                                    const pickedThisAnswer = answer === selectedAnswer;
                                    if (pickedThisAnswer && isThisCorrect) {
                                        className += " trivia-item__button--correct"
                                    } else if (pickedThisAnswer && !isThisCorrect) {
                                        className += " trivia-item__button--incorrect"

                                    } else {
                                        className += " trivia-item__button--disabled"
                                    }
                                }
                                return <li className='w-full' key={answer}>
                                    <button className={className} onClick={onAnswerClick} disabled={hasPickedAnswer}>{answer}</button>
                                </li>
                            }
                            )}
                        </ul>
                        {explanation && <div className=' hidden sm:flex sm:flex-col items-center  text-center bg-white  bg-gradient-to-b w-full    from-white to-[#F4F7FF] shadow-2xl  rounded-lg p-3 mt-5  border border-lt-green'>
                            <p className='text-dk-green pb-2 font-bold p-0 m-0 text-sm'>Resposta Correta: {correctAnswer}</p>
                            <p className='text-dk-green p-0 m-0  text-sm '>{explanation}</p>
                        </div>}
                    </div>
                </div>


            </div>

        </>
    )
}

export default TriviaItem