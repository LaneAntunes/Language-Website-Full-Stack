import React from 'react'

function CourseSnippet({ courses }) {



    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <h3 className='text-sm text-center bg-blue-500 w-full p-2 text-white'>{courses.level}</h3>
            <img className='w-full' src={courses.url} alt="Image" />
            <a className="pt-4 underline italic text-lt-blue text-sm" href={`#${courses.pageId}`}>Mais informações</a>
        </div>
    )
}

export default CourseSnippet