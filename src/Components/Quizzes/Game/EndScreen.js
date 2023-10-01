import React, { useEffect, useState } from 'react'
import useScores from '../../Hooks/useScores';
import { doc, getDoc, query, where, collection } from 'firebase/firestore';
import { db } from "../../../firebase";
import useScore from '../../Hooks/useUser';
import FormSubmitBtn from '../../Buttons/FormSubmitBtn';
import { Link } from 'react-router-dom';

function EndStat({ label, value }) {
    return (
        <div>
            <div>{label}</div>
            <div>{value}</div>
        </div>
    )
}


function EndScreen({ score, onRetryClick, quizId, userId, quizData, totalQuestions }) {



    //to delete saveScore//
    const { scoresArray } = useScores(quizId);
    const updatedScores = [...scoresArray, score];
    const bestScore = Math.max(...updatedScores);


    return (
        <div className='end-screen'>
            <h1>Quiz Complete!</h1>
            <div className='troffe-icon mb-6'>🏆</div>
            <h4>Você acertou</h4>
            <p className='percentage-score'>{`${Math.round((score / totalQuestions) * 100)}`}%</p>
            {userId ? (
                <>
                    <h4>Sua melhor nota</h4>
                    {updatedScores ? (
                        <>

                            <p className='percentage-score'>{`${Math.round((bestScore / totalQuestions) * 100)}`}%</p>

                        </>
                    ) : (
                        <>
                            <p className='percentage-score'>{`${Math.round((score / totalQuestions) * 100)}`}%</p>
                        </>
                    )}
                    <button className='try-again-btn' onClick={onRetryClick} > Refazer Teste</button >

                </>
            ) : (
                <>
                    <div className='flex flex-col items-center mt-2'>
                        <FormSubmitBtn onClick={onRetryClick} btnSendText={'Try Again'} />
                        <p className='mt-7 text-sm italic'>Crie uma conta para ver seu progresso!</p>
                        <Link className='underline mt-1' to="/signup">Criar Conta</Link>
                    </div>
                </>
            )}



        </div >
    )
}

export default EndScreen