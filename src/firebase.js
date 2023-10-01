import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

//***** STORAGE********** */
// Get a reference to the storage service
const storage = getStorage(app);

// Function to create a reference
function createRef(path) {
    return ref(storage, path);
}

// Function to upload a file
function uploadFile(ref, file) {
    return uploadBytesResumable(ref, file);
}

// Function to get download URL
// function getURL(ref) {
//     return getDownloadURL(ref);
// }

async function getDownloadUrl() {
    // TODO: Replace the following with your file path in Firebase Storage
    const filePath = 'coursesImages/Udemy thumbnail 18_5.2.4.jpg';

    // Create a reference to the file
    const fileRef = ref(storage, filePath);

    try {
        // Get the download URL
        const url = await getDownloadURL(fileRef);

        // This will print the download URL to the console
    } catch (error) {
        console.error(error);
    }
}

// Call the function to get the download URL
getDownloadUrl();
const videoVitor = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/studentsTestemonies/vitorTestemony.mp4');
const videoRaissa = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/studentsTestemonies/raissaTestemony.mp4');
const videoIntroKids = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/full-kids-intro-ad2.mp4');
const videoShortFlashcards = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/flashcards-short-vid.mp4');
const videoShortReading = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/reading-short-vid.mp4');
const videoShortSpeaking = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/speakingPractice-short-vid.mp4');
const videoShortPtExplanation = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/grammar-explanation-portuguese.mp4');
const videoShortEnExplanation = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/explanation-english-short.mp4');
const videoShortExercises = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/exercises-short-vid.mp4');
const videoShortPronunciation = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/pronunciation-short.mp4');
const videoShortListening = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/listening-short-vid.mp4');
const landscapeMethodologyContact = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/landscape-methodology-contact.mp4');
const landingPageAd = ref(storage, 'gs://inglesautodidata-5b0b9.appspot.com/introductionVideos/landingPageAd.mp4');



export { db, auth, app, storage, createRef, uploadFile, videoVitor, videoRaissa, videoIntroKids, landingPageAd, videoShortFlashcards, videoShortReading, videoShortListening, videoShortExercises, videoShortPronunciation, videoShortSpeaking, videoShortPtExplanation, videoShortEnExplanation };



// apiKey: process.env.REACT_APP_FIREBASE_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// appId: process.env.REACT_APP_FIREBASE_APP_ID,