import React from 'react'
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import useScores from '../Hooks/useScores';
import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
function QuizzesTaken({ quizzesByLevel, deleteDocument }) {

    // const [reload, setReload] = useState(false); // Add this line



    // const handleDeleteDocument = async (docId) => { // Add this function
    //     await deleteDocument(docId);
    //     setReload((prev) => !prev); // Flip the reload state to trigger a re-render
    // };

    // useEffect(() => {
    //     // If you need to perform any action on re-render, you can do that here
    // }, [reload]);

    return (
        <div className='user-progress-tables mt-9 sm:mt-0 '>
            {Object.keys(quizzesByLevel).map((level) => (
                <div className='progress-table p-1 border bg-py-blue' key={level}>
                    <h2 className='progress-level text-dk-blue'>{level}</h2>
                    <div className='inside-table scrollbar-thin'>
                        <table className='quiz-info mt-5'>
                            <thead >
                                <tr className='progress-info-titles'>
                                    {/* <th>Quiz ID</th> */}
                                    <th>Quiz</th>
                                    <th>Melhor nota</th>
                                    {/* <th> Total de Realizações</th> */}
                                    {/* <th>Nota média</th> */}
                                    <th>Refazer</th>
                                    <th>Apagar dados</th>
                                </tr>
                            </thead>
                            <tbody >
                                {quizzesByLevel[level].map((quiz) => (
                                    <tr key={quiz.id}>
                                        {/* <td>{quiz.id}</td> */}
                                        <td>{quiz.data.title}</td>
                                        <td>{`${quiz.data.bestScore}%`}</td>
                                        {/* <td>{quiz.data.quizAttemps}</td> */}
                                        {/* <td><ProgressBar percentage={quiz.data.percentage} /></td> */}
                                        <td><button className='redo-btn'><Link to={`/quiz/${quiz.data.id}`}>Quiz</Link></button></td>
                                        <td><button onClick={() => deleteDocument(quiz.id)}><FiTrash2 className='erase-data-btn' /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuizzesTaken