import React from 'react'
import { Link } from 'react-router-dom';



function QuizPreview({ id, data, scrollToTop }) {
    let { title, description, type } = data;


    return (
        <article className='pr-4 pl-4 pt-2 pb-2 flex items-center justify-center  '>
            < Link to={`/quiz/${id} `} className=" m-0 cursor-pointer " onClick={scrollToTop}>
                <div className='m-0 p-0 flex flex-col flex-1 itmes-center justify-center'>
                    <h4 className='text-sm sm:text-xs font-medium m-0 p-0'>{title}</h4>
                    <p className='text-xs m-0 p-0'>{description}</p>
                    <p className='text-xs m-0 p-0 italic'>{type}</p>
                </div>
            </Link >
        </article >
    )
}

export default QuizPreview