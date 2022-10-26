import styles from '../styles/login.module.css'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useContext } from 'react';
import nookies from 'nookies';
import { useRouter } from 'next/router'
import { db, firebaseClient } from '../src/firebaseConfig';
import verifyUserIdToken from '../src/firebase_admin';
import { GlobalContext } from './_app';
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail  } from "firebase/auth";


export default function Login() {
    const emailInput = useRef();
    const passwrdInput = useRef();
    const passwordEye = useRef();
    const validationMsg = useRef();
    const router = useRouter();
    const { loaderRef } = useContext(GlobalContext);

    // Inicializes firebase on client side
    firebaseClient();

    // Validate user input before login
    // Function used in both scenario - login and password reset
    function loginValidation(email, passwrd, loaderRef, validationMsg, action='login'){
        let errorFound;
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(email === '' || passwrd === ''){
            errorFound = true;
            validationMsg.current.textContent = action === 'reset' && !email ? 'Insira o email para repôr a senha' : 'Campo(s) vazios';
        }
        else if(!email.match(pattern)) { // checks if email is valid
            errorFound = true;
            validationMsg.current.textContent = 'Email inválido';
        }

        if(errorFound){
            setTimeout(() => validationMsg.current.textContent = '', 3000);
            loaderRef.current.classList.replace('d-flex', 'd-none');
        }
        
        return errorFound;
    }

    // Logs user in
    function handleLogin(e){
        e.preventDefault();
        loaderRef.current.classList.replace('d-none', 'd-flex');
        const email = emailInput.current.defaultValue.trim();
        const passwrd = passwrdInput.current.defaultValue.trim();
        
        // If no errors were found
        if(!loginValidation(email, passwrd, loaderRef, validationMsg)){
            signInWithEmailAndPassword(getAuth(), email, passwrd).then(userCredential => {
                router.push('/');
            })
            .catch(error => {
                console.log(error.code, error.message);
                loaderRef.current.classList.replace('d-flex', 'd-none');
                if('auth/user-not-found'){
                    validationMsg.current.classList.replace('sucess_msg', 'error_msg');
                    validationMsg.current.textContent = 'Não existe usuário com este email';
                    setTimeout(() => validationMsg.current.textContent = '', 3000);
                }
                else{
                    validationMsg.current.classList.replace('sucess_msg', 'error_msg');
                    validationMsg.current.textContent = 'Erro: tente novamente';
                    setTimeout(() => validationMsg.current.textContent = '', 3000);
                }
            });
        }
    }

    // Shows or hides the password eye as user types
    function show_hide_eye(e){
        e.target.value ? passwordEye.current.classList.remove('invisible') : passwordEye.current.classList.add('invisible');
    }

    // Shows or hides the password and alternates between open and closed eye 
    function show_hide_password(){
        if(passwordEye.current.classList.contains('bi-eye-slash-fill')) {
            passwordEye.current.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
            passwordEye.current.previousElementSibling.type = 'text';
        }
        else{
            passwordEye.current.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
            passwordEye.current.previousElementSibling.type = 'password';
        }
    }

    // Handles password reset
    function handlePasswrdReset(){
        loaderRef.current.classList.replace('d-none', 'd-flex');
        const email = emailInput.current.defaultValue.trim();
        const passwrd = passwrdInput.current.defaultValue.trim();

        // If no errors were found
        if(!loginValidation(email, passwrd, loaderRef, validationMsg, 'reset')){
            sendPasswordResetEmail(getAuth(), email).then(() => {
                loaderRef.current.classList.replace('d-flex', 'd-none');

                validationMsg.current.classList.replace('error_msg', 'sucess_msg');
                validationMsg.current.textContent = 'Foi enviado um link para repôr a senha ao seu email!';
                setTimeout(() => {
                    validationMsg.current.textContent = '';
                    validationMsg.current.classList.replace('sucess_msg', 'error_msg');
                }, 6000);
            })
            .catch((error) => {
                console.log(error.code, error.message);
                loaderRef.current.classList.replace('d-flex', 'd-none');
                if('auth/user-not-found'){
                    validationMsg.current.classList.replace('sucess_msg', 'error_msg');
                    validationMsg.current.textContent = 'Não existe usuário com este email';
                    setTimeout(() => validationMsg.current.textContent = '', 3000);
                }
                else{
                    validationMsg.current.classList.replace('sucess_msg', 'error_msg');
                    validationMsg.current.textContent = 'Erro: tente novamente';
                    setTimeout(() => validationMsg.current.textContent = '', 3000);
                }
            });
        }        
    }

    useEffect(() => {
        loaderRef.current.classList.replace('d-flex', 'd-none');
    }, []) 

    return ( 
        <>
            <div className={styles.login}>
                <div className={styles.colum1}>
                    <Image src="/LOGO ADMIN_Prancheta 1 (1).png"  width={300} height={300} />
                    <h1 className={styles.titulo1}>A gestão dos nossos clientes {'\n'}</h1>
                    <h1 className={styles.titulo2}>em um só lugar</h1>
                </div>
            </div>

            <div className={styles.card}>
                <h1 className={styles.texto}>Login</h1>
                <div className="card-body">
                    <div className="mb-3">
                        <input defaultValue="antoniojmddois@gmail.com" type="email" ref={emailInput} className={`form-control ${styles.formulario}`} placeholder="E-mail" />
                    </div>
                    <div className="mb-3">
                        <input ref={passwrdInput} onChange={(e) => show_hide_eye(e, passwordEye)} defaultValue="123456"  type="password" id="password"  className={`form-control ${styles.formulario}`} placeholder="Palavra-Passe" />
                    </div>
                    <div className={`col-auto ${styles.button}`}>
                        <button onClick={handleLogin} type="submit" className={`${styles.btn}`} >Iniciar Sessão</button>{"\n"}
                        {'\n'}
                            
                            <a className={`card-link ${styles.link}`}>Esqueceu a sua palavra-passe?
                            </a>
                    </div>         
                </div>
            </div>
        </>
    );
}



export async function getServerSideProps(context){
    try{
        // Verifies token to check if user logged in
        const cookies = nookies.get(context);
        const token = await verifyUserIdToken(cookies.token);

        // If user is logged in, then redirects to inicial page
        if(token && token.uid) {
            return{
                redirect: {
                    destination: '/',
                    permanent: false
                },
            }
        }

        // If user is not logged in, then goes straight to this page's content
        return {
            props: {}
        }
    }
    catch(error){
        console.log(error);
        return{
            props: {}
        }
    }
} 