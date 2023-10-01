import React from 'react'
import './QuizGame.scss'
import { useState, useEffect } from 'react';
import Stats from './Stats';
import EndScreen from './EndScreen';
import TriviaItem from './TriviaItem';
import useScores from '../../Hooks/useScores';



function QuizGame({ quizData, quizId, userId }) {

    const [status, setStatus] = useState('loading');
    const [explanationPopup, setExplanationPopup] = useState("")
    const [answerWasCorrect, setAnswerWasCorrect] = useState("")
    // const { saveScore } = useScores(quizId);

    const [scoreData, setScoreData] = useState(null);
    const { saveScore, scoresArray } = useScores(quizId);

    useEffect(() => {
        if (scoreData) {
            saveScore(quizId, scoreData);
        }
    }, [scoreData]);


    const [gameState, setGameState] = useState({
        score: 0,
        triviaIndex: 0,
        isGameOver: false,

    });

    useEffect(() => {
        if (quizData) {
            setStatus('loaded');
        }
    }, [quizData]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }



    const { score, triviaIndex, isGameOver } = gameState;


    const questionNumber = triviaIndex + 1;
    const numbQuestions = quizData.questions.length


    const onRestartGame = () => {
        setGameState({
            score: 0,
            triviaIndex: 0,
            isGameOver: false,
        })
    }


    const onLoadNextQuestion = () => {
        setExplanationPopup("");
        setAnswerWasCorrect("");
        if (triviaIndex >= numbQuestions - 1) {

            setGameState({
                ...gameState,
                isGameOver: true
            })
            const dataToSend = {
                id: quizId,
                score: [score],
                title: quizData.title,
                level: quizData.level,
                numbQuestions: quizData.questions.length
            };
            setScoreData(dataToSend);

        } else {
            setGameState({
                //copy gamestate and overide triviaIndex//
                ...gameState,
                triviaIndex: triviaIndex + 1
            })
        }

    }


    const triviaQuestion = quizData.questions[triviaIndex]
    const { explanation } = triviaQuestion;

    const onAnswerSelected = (wasPlayerCorrect) => {
        setExplanationPopup(explanation);

        if (wasPlayerCorrect) {
            setAnswerWasCorrect(true)
            setGameState({
                ...gameState,
                score: score + 1,
            })
        }
    }





    let pageContent;

    if (isGameOver) {
        pageContent = < EndScreen score={score} onRetryClick={onRestartGame} quizId={quizId} userId={userId} quizData={quizData} totalQuestions={numbQuestions} />

    } else {
        const triviaQuestion = quizData.questions[triviaIndex]
        const { correctAnswer, incorrectAnswers, question, explanation } = triviaQuestion;
        pageContent = <TriviaItem
            key={triviaIndex}
            question={question}
            correctAnswer={correctAnswer}
            incorrectAnswers={incorrectAnswers}
            onNextClick={onLoadNextQuestion}
            onAnswerSelected={onAnswerSelected}
            explanation={explanationPopup}
            answerWasCorrect={answerWasCorrect}

        />
    }


    return (

        <>
            <h1 className='border-t  quizName pt-5 sm:pt-16 font-bold pb-5 text-base sm:text-lg'>{quizData.title}</h1>

            <div className='flex justify-center items-start w-full min-h-[90vh] bg-dk-blue'>
                < div className='quiz-game-questions pb-16 '>
                    <Stats score={score} questionNumber={questionNumber} totalQuestions={numbQuestions} />
                    {pageContent}
                </div >
            </div >
        </>

    );
}

export default QuizGame