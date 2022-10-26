import Layout from '../comps/Layout'
import { useEffect, useRef, useState, createContext } from 'react';
import { useRouter } from "next/router";
import Head from 'next/head'
import '../styles/globals.css'
import Script from 'next/script'
import Link from 'next/link'
import Router from 'next/router'
import Loader from '../comps/Loader';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

/*import 'bootstrap/dist/js/bootstrap'*/

// Permite usar variaveis em qualquer pagina ou componente
export const GlobalContext = createContext();

function MyApp({ Component, pageProps }) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const router = useRouter();
    const loaderRef = useRef();  // Gif que mostra o loading...

    return (
        <GlobalContext.Provider value={{loaderRef}}>
            <>
            <Head>
                <title>BRH Admin | Home</title>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"></link> 
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Loader />
            {
                
                router.pathname === '/login' ? <Component {...pageProps} />
                : 
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            }
            
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            {/* <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
            <script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></script> */}
            </>
        </GlobalContext.Provider>
    )
}
export default MyApp
