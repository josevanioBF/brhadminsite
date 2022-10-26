const { getApps, initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require('./scrt.json');

export default function verifyUserIdToken(token){
    // makes sure firebase is not re-inicialized by next js hot reload feature
    if(!getApps().length) initializeApp({credential: cert(serviceAccount)});

    return getAuth()
    .verifyIdToken(token)  // if token is verified, do nothing
    .catch(error => {
        console.log(error);
    })
}