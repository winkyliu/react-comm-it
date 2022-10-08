import { initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { addDoc, 
    setDoc,
    getFirestore, 
    collection,
    getDocs,
    query,
    where,
    serverTimestamp,
    doc,
    getDoc,
    orderBy,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Auth related api
const auth = getAuth(app);

export const subscribeAuthStateChangeEvent = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("onAuthStateChanged");
            callback(user);
        } else {
            console.log("no user is online");
            callback(null);
        }
    });
}

export const signUp = (email, password, sucCallback, failCallback) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sucCallback(userCredential.user);
        })
        .catch((error) => {
            failCallback(error.code, error.message);
        });
};

export const signIn = (email, password, sucCallback, failCallback) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sucCallback(userCredential.user);
        })
        .catch((error) => {
            failCallback(error.code, error.message)
        });
};

export const offLine = (sucCallback, failCallback) => {
    signOut(auth).then(() => {
        sucCallback();
    }).catch((error) => {
        failCallback(error.code, error.message);
    });
}

// Firestore related api
const db = getFirestore(app);

export const createUser = (uid, n, em, h) => {
    const usersDocRef = doc(db, "users", uid);
    return setDoc(usersDocRef, {
            name: n,
            email: em,
            head: h,
            favM: -1,
            favMS: 0,
            favA: -1,
            favAS: 0,
            cts: serverTimestamp(),
        });
}

export const readUserData = (uid) => {
    const usersDocRef = doc(db, "users", uid);
    return getDoc(usersDocRef);
}

export const commentMovie = async(mId, id, cmt, sts) => {
    const movieCommentsColRef = collection(db, "movieComments");

    const docSnap = await readUserData(id);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        if (sts >= userData.favMS) {
            const usersDocRef = doc(db, "users", id);
            userData.favM = mId;
            userData.favMS = sts;
            await setDoc(usersDocRef, userData);
        }

        return addDoc(movieCommentsColRef, {
                movieId: mId,
                uid: id,
                uname: userData.name,
                comment: cmt,
                stars: sts,
                cts: serverTimestamp(),
            });
    } else {
        console.error("firebase: commentMovie read user data failed.");

        return null;
    }
}

export const loadMovieComments = (movieId) => {
    const movieCommentsColRef = collection(db, "movieComments");

    const q = query(movieCommentsColRef, where("movieId", "==", movieId), orderBy("cts"));

    return getDocs(q);
}

export const commentActor = async(aId, id, cmt, sts) => {
    const actorCommentsColRef = collection(db, "actorComments");

    const docSnap = await readUserData(id);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        if (sts >= userData.favAS) {
            const usersDocRef = doc(db, "users", id);
            userData.favA = aId;
            userData.favAS = sts;
            await setDoc(usersDocRef, userData);
        }

        return addDoc(actorCommentsColRef, {
                actorId: aId,
                uid: id,
                uname: userData.name,
                comment: cmt,
                stars: sts,
                cts: serverTimestamp(),
            });
    } else {
        console.error("firebase: commentActor read user data failed.");

        return null;
    }
}

export const loadActorComments = (actorId) => {
    const actorCommentsColRef = collection(db, "actorComments");

    const q = query(actorCommentsColRef, where("actorId", "==", actorId), orderBy("cts"));

    return getDocs(q);
}