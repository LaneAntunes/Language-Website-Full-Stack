import { useState, useEffect } from 'react';
import { getDocs, doc, collection } from 'firebase/firestore';
import { db } from "../../firebase";

function useCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'myCourses');
            const snapshot = await getDocs(collectionRef)
            const eachCourse = snapshot.docs.map((course) => {
                return course.data();
            })
            setCourses(eachCourse);
            setLoading(false);

        };

        fetchData();
    }, []);

    useEffect(() => {

    }, [courses]);

    return { loading, courses };
}

export default useCourses;
