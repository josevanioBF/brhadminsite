import { useEffect, useState, useContext, createContext } from 'react';
import nookies from 'nookies';
import { useRouter } from "next/router";
import { firebaseClient } from './firebaseConfig';
import { getAuth, onIdTokenChanged } from "firebase/auth";


const AuthContext = createContext({});

// Checks whether user is logged in or not -- 
export default function AuthProvider({ children }){
    firebaseClient();
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        return onIdTokenChanged(getAuth(), async (user) => {            
            if(!user){
                setUser(null);
                nookies.set(undefined, "token", {});
                router.pathname !== '/login' ? router.push('/login') : null;
                return;
            }
            
            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, "token", token, {});
        })
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);