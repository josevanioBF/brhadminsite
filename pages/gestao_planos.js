import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Script from 'next/script'
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../src/firebaseConfig'
import { useContext, useEffect, useState } from "react";
import { collection, 
  CollectionReference, 
  query, 
  onSnapshot ,
  getFirestore,
  addDoc, deleteDoc, doc,updateDoc, QueryDocumentSnapshot,DocumentData,where,limit,getDocs, orderBy, serverTimestamp
} from 'firebase/firestore'
import { async } from '@firebase/util';


const gestao_planos = () => {
  const [plano, setPlano] = useState([]);
  const colRef = collection(db, 'plano')
  
  useEffect(() => {
    const q = query(colRef, orderBy("nome","desc"));
    const cadastrados = onSnapshot(q, (querySnapshot) => {
      setPlano(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      });
      return cadastrados;
     
  }, [])
  

  const deletePlano = async (id, e) => {
    e.stopPropagation();
    await deleteDoc(doc(db, "plano", id));
  }

  const updatePlano = async () =>{
    if(plano?.hasOwnProperty('timestamp')){
      const docRef = doc(db, "plano", id);
      const planoUpdated = { ...plano, timestamp:serverTimestamp() }
      updateDoc(docRef,planoUpdated)
      setPlano({nome: '', valor: '', periodo: '' })
      
    }
    else{
      console.log('sem dados')
    }
   }
  
  return ( 
        <>
            <Head>
                <title>BRH Admin | Gestão  Planos</title>
            </Head>
             <div className={styles.title}>
                    <h1>Gestão de Planos</h1>
                    <h2>Lista de todos os planos</h2>
            </div>

            <div className={styles.filtro}>
                    <div >
                        <button className={`btn btn-light btn-sm dropdown-toggle ${styles.toggle}`}  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Filtrar por plano
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
                      <input type="text" placeholder=" Pesquisar Planos" className={styles.busca}/>
                      <a><i className={`bi bi-search ${styles.icon_search}`}></i></a>
                  </form>
              </div>
              <div className={styles.tbl}>
                <table className={`table ${styles.tabela}`}>
                  <thead>
                    <tr>
                        <th>Nome Plano </th>
                        <th>Valor Plano </th>
                        <th>Período</th>
                        <th>Estado</th>
                        <th>Acções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      plano.map(planos => (
                        <tr key={planos.id}>
                             <td>{planos.nome}</td>
                             <td>{planos.valor}</td>
                             <td>{planos.periodo}</td>
                             <td>
                              <button type="button" className={`btn btn-success ${styles.btn_info}`}>Activado</button></td>
                            <td>
                              <IconButton onClick={e => deletePlano(planos.id, e)}>
                                  <DeleteIcon/>
                              </IconButton>
                              <IconButton>
                                  <EditIcon/>
                              </IconButton>
                            </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
             
        </>
     );
}
 
export default gestao_planos;