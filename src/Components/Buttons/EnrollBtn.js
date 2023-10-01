import React from 'react'

function EnrollBtn() {

    const scrollToPriceSection = (event) => {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        const priceSection = document.getElementById('price-section');

        if (priceSection) {
            priceSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <a
            href="#"
            onClick={scrollToPriceSection}
            className="w-full transition-all duration-150 hover:scale-105 cursor-pointer mb-10 md:mt-16 md:mb-24 md:px-8 md:py-4 px-4 py-4 text-sm md:text-base rounded-[36px] text-white hover:text-lg text-center bg-gradient-to-r from-orange-500 to-orange-600 "
        >
            Mais infomações!
        </a>
    )
}

export default EnrollBtn