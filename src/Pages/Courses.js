import React from 'react';
import useCourses from '../Components/Hooks/useCourses';
import CourseCard from '../Components/CourseCard';
import CourseSnippet from '../Components/CourseSnippet';
import LoadingSnipper from '../Components/Common/LoadingSnipper';


const Courses = () => {
    const { loading, courses } = useCourses();
    if (loading) {
        return <><LoadingSnipper /></>;
    }


    return (

        <div className=" mt-3 w-full flex bg-custom-gray flex-col items-center bg-opacity-50">
            <div className='flex flex-col justify-center items-center mt-16 mb-10'>
                <div className='text-[#112f54] w-4/5 text-base italic p-2 text-center mb-5'>
                    <h2> Confira os meus mini cursos de inglês! São cursos super acessíveis e muito bem estruturados com Exercícios de ÁUDIO, SPEAKING, FLASHCARDS, TEXTOS e muito mais!
                    </h2>
                    {/* <button>Básico </button>
                    <button>Intermediário 1</button>
                    <button>Intermediário 2 1</button> */}
                </div>
                {/* <div className='flex justify-center items-center w-1/2 p-4 gap-4'>
                    {courses.map((course) => (
                        <CourseSnippet courses={course} />
                    ))}
                </div> */}
            </div>
            <div>
                {courses.map((course) => (
                    <CourseCard courses={course} />
                ))}
            </div>
        </div>





    );
};

export default Courses;
