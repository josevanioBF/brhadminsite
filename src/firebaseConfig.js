import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot,addDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

const app = initializeApp(firebaseConfig); 

export function firebaseClient(){
    // makes sure firebase is not re-inicialized by next js hot reload feature
    if(!getApps().length) initializeApp(firebaseConfig);
}

// init services
export const db = getFirestore(app);

