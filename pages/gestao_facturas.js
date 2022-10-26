import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Script from 'next/script'
import { db } from '../src/firebaseConfig'
import { useEffect, useState } from "react";
import { collection, 
  CollectionReference, 
  query, 
  onSnapshot ,
  getFirestore,
  addDoc, deleteDoc, doc, QueryDocumentSnapshot,DocumentData,where,limit,getDocs, orderBy
} from 'firebase/firestore'




const gestao_facturas = () => {

  const [cliente, setCliente] = useState([]);
  

  useEffect(() => {
    const colRef = collection(db, 'admin_cliente')

    const q = query(colRef, orderBy("nome_cliente","desc"));

    const inscritos = onSnapshot(q, (querySnapshot) => {
      setCliente(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      });
      return inscritos;
  }, [])


    return ( 
        <>
            <Head>
                <title>BRH Admin | Gestão  Facturas</title>
            </Head>
             <div className={styles.title}>
                    <h1>Gestão de Facturas</h1>
                    <h2>Lista com todas as facturas dos clientes</h2>
            </div>

            <div className={styles.filtro}>
                    <div >
                        <button className={`btn btn-light btn-sm dropdown-toggle ${styles.toggle}`}  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Filtrar por facturas
                        </button>
                        <ul className="dropdown-menu">
                          ...
                        </ul>
                      </div>
                      <div>
                        <button className={`btn btn-light btn-sm dropdown-toggle ${styles.toggle}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filtrar por perfil
                          </button>
                          <ul className="dropdown-menu">
                            ...
                          </ul>
                    </div>
              </div>
              <div className={styles.search}>
                  <form action="#">
                      <input type="text" placeholder=" Pesquisar Facturas" className={styles.busca}/>
                      <a><i className={`bi bi-search ${styles.icon_search}`}></i></a>
                  </form>
              </div>
              <div className={styles.tbl}>
                <table className={`table ${styles.tabela}`}>
                  <thead>
                    <tr>
                        <th>Referência</th>
                        <th>Nome do cliente</th>
                        <th>Período</th>
                        <th>Plano</th>
                        <th>Comprovativo</th>
                        <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        cliente.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.nome_cliente}</td>
                            <td>{client.plano}</td>
                            <td>{client.periodo}</td>
                            <td><button type="button" className={`btn btn-success ${styles.btn_info}`}>138490598473</button></td>
                            <td>{client.estado_pagamento}</td>
                        </tr>
                      ))      
                    }
                  </tbody>
                </table>
              </div>


        </>
     );
}
 
export default gestao_facturas;