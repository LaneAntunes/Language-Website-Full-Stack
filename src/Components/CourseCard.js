import React from 'react';
//DELETE THIS PACKAGE//
// import YouTube from 'react-youtube';
import { BsCheckLg } from 'react-icons/bs';



const CourseCard = ({ courses }) => {

    let eachHighlight;
    if (courses.highlights) {
        eachHighlight = courses.highlights.map((highlight, index) => {
            return (
                <p key={index} className='flex gap-4 items-center pb-3'><BsCheckLg color='green' />{highlight}</p>
            );
        });
    } else {
        eachHighlight = null
    }

    let enrollments;
    if (courses.enrollments) {
        enrollments = Object.entries(courses.enrollments).map(([key, value]) => (
            <div key={key} className='text-center p-1 shadow-md sm:p-3 rounded-9 bg-py-blue sm:w-[150px]' >
                <p className='italic'>{value}</p>
                <p className='italic'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
        ));
    } else {
        material = null
    }

    let offers;
    if (courses.offers) {
        offers = courses.offers.map((offer, index) => {
            return (
                <div key={index} className="flex  text-center items-center w-full justify-center  ">
                    <p className="text-sm">{offer}</p>
                    <div className="h-9 border border-py-orange mx-4"></div>
                </div>
            );
        });
    } else {
        offers = null
    }

    let material;
    if (courses.material) {
        material = Object.entries(courses.material).map(([key, value]) => (
            <div key={key}>
                <p className='font-medium'>{key}</p>
                <p className='pb-2'>{value}</p>
            </div>
        ));
    } else {
        material = null
    }

    return (
        <div className="shadow-md flex bg-dk-blue rounded-9  text-white flex-col justify-center gap-4 m-2  px-6 mb-8">
            <h2 className='text-white font-500 text-xl font-medium rounded-3xl text-center pt-10 pb-8 m-0' id={courses.pageId}>{courses.name}</h2>
            <div className='flex justify-center gap-4 sm:gap-20 text-sm '>
                {enrollments}
            </div>
            <div className="pt-4 flex items-center justify-center flex-col gap-8">
                <iframe className='w-full rounded-9 ' style={{ height: '400px' }} src={courses.videoId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className='flex gap-4 sm:flex-row flex-col pt-8 pb-8 items-center sm:justify-between w-full'>
                {offers}
            </div>
            <div className=' w-full gap-3 flex flex-wrap justify-center  '>
                <div className=' text-dk-blue  bg-white shadow-md w-80 p-4 rounded-9'>
                    <h3 className='text-center font-bold mb-6'>O que você aprenderá</h3>
                    {eachHighlight}
                </div>
                <div className=' shadow-md w-80 p-4  text-dk-blue bg-white rounded-9 '>
                    <h3 className=' text-center mb-6 font-bold'>Material</h3>
                    {material}
                </div>
            </div>
            <p className='italic text-sm  mt-8 text-center'>*Você será direcionado a outro site onde poderá ver o valor e mais informações sobre o curso!</p>
            <div className='flex items-center mb-8 justify-center '><a className='w-30 border-2 rounded-md cursor-pointer text-sm text-white py-2 mb-8 p-4 italic border-none bg-py-orange transition-all duration-300 hover:scale-110' href={courses.purchaseUrl} target='_blank'>Comprar</a></div>
        </div>
    );
};

export default CourseCard;
