import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 


const firebaseConfig = {
  apiKey: "AIzaSyAP7_xZdC9Mw77XCkt0CdhUvMZqogQIa0s",
  authDomain: "netflix-clone-d4b05.firebaseapp.com",
  projectId: "netflix-clone-d4b05",
  storageBucket: "netflix-clone-d4b05.firebasestorage.app",
  messagingSenderId: "863636363711",
  appId: "1:863636363711:web:caaee9cc92c82a6184a90a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};