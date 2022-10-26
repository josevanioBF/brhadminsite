import Head from 'next/head'
import Navbar from '../comps/Navbar'
import styles from '../styles/dashboard.module.css'
import Link from 'next/link'
import React, { useState, Component } from 'react'
import nookies from 'nookies';
import { db, firebaseClient } from '../src/firebaseConfig';
import verifyUserIdToken from '../src/firebase_admin';
import { useContext, useEffect } from "react";
import { GlobalContext } from './_app';
import { collection, 
  CollectionReference, 
  query, 
  onSnapshot ,
  getFirestore,
  addDoc, deleteDoc, doc,updateDoc, QueryDocumentSnapshot,DocumentData,where,limit,getDocs, orderBy, serverTimestamp
} from 'firebase/firestore'
import { async } from '@firebase/util';



export default function Home(){
    // Inicializes firebase on client side
    firebaseClient();
    
    const [cliente, setCliente, ] = useState([]);
    const { loaderRef } = useContext(GlobalContext);

    useEffect(() => {
        loaderRef.current.classList.replace('d-flex', 'd-none');
        const colRef = collection(db, 'clientes')
        
        const q = query(colRef, orderBy("nome_cliente","desc"));

        const inscritos = onSnapshot(q, (querySnapshot) => {
        setCliente(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        });        
    }, [])
    
    return (
        <>
            <Head>
            <title>BRH Admin | Home</title>
            </Head>

            <div className={styles.bem}>
                <h1>Bom dia, Ricardo dos Santos!</h1>
                <h2 >Bem-vindo de volta</h2>
            </div>
            <div className={styles.dash_principal}>
                <ul className={styles.title}>  
                    <li>
                        <div className={styles.dash1}>
                            <label>Clientes Activos</label>{'\n'}
                            <h3>30</h3>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dash2}>
                            <label>Clientes Inactivos </label>{'\n'}
                            <h3>16</h3>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dash3}>
                            <label>Saldo de 2022</label>{'\n'}
                            <h3>10.250.000,00 kzs</h3>
                        </div>
                    </li>
                    <li>
                    <div className={styles.dash4}>
                        <label>Clientes em fase de teste</label>{'\n'}
                        <h3>10</h3>
                    </div>
                    </li>
                </ul>
            </div>

            <div className={styles.grafico}></div>

            <div className={styles.dash_bottom}>
                <h1>Facturamento por Planos</h1>
                <div className={styles.dash_bottom_iten}>
                    <label>Básico</label>
                    <label className={styles.valor}>AO 2.900.000,00</label>
                    {'\n'}
                    <label>Standard</label>
                    <label className={styles.valor}>AO 2.900.000,00</label>
                    {'\n'}
                    <label>Platina</label>
                    <label className={styles.valor}>AO 2.900.000,00</label>
                </div>
            </div>    
        </>
    )
}

export async function getServerSideProps(context){
    try{
        // Verifies token to check if user logged in
        const cookies = nookies.get(context);
        const token = await verifyUserIdToken(cookies.token); // verify user through the token
        const { uid, email } = token;

        // Gets data from each company administered by the admin 
        const [admin_db, empresas_db] = await read_Admin_Empresa_Firestore(uid, getFirestore, collection, getDocs);

        // If user is logged in, goes straight to this page's content
        return { props: JSON.parse(JSON.stringify({ admin_db, empresas_db })) }
    }
    catch(error){
        console.log(error.code);
        console.log(error.msg)
        if(error.code === 'auth/id-token-expired'){
            context.res.writeHead(302, {location: '/'})
        }
        else{
            context.res.writeHead(302, {location: '/login'})
        }
        context.res.end();
        return{
            props: {}
        }
    }
}