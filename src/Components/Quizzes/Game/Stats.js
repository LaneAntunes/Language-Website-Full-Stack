import React from 'react'


function Stat({ label, value }) {
    return (
        <ul>
            <li>
                <div>{label}</div>
                <div>{value}</div>
            </li>
        </ul>
    )
}


function Stats({ score, questionNumber, totalQuestions }) {

    return (
        <ul className='stats'>
            <Stat label="Score" value={score} />
            <Stat label="Questions" value={`${questionNumber} / ${totalQuestions}`} />
        </ul>
    )
}

export default Stats