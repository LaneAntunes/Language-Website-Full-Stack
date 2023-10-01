function Shuffle(array) {
    const shuffleArray = [...array]
    for (let i = shuffleArray.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
        const temp = shuffleArray[1];
        shuffleArray[1] = shuffleArray[swapIndex];
        shuffleArray[swapIndex] = temp;
    }
    return shuffleArray
}

export default Shuffle