import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Script from 'next/script'
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../src/firebaseConfig'
import { useEffect, useState } from "react";
import { collection, 
  CollectionReference, 
  query, 
  onSnapshot ,
  getFirestore,
  addDoc, deleteDoc, doc, QueryDocumentSnapshot,DocumentData,where,limit,getDocs, orderBy
} from 'firebase/firestore'


const gestao_clientes = () => {

  const [cliente, setCliente] = useState([]);
  

  useEffect(() => {
    const colRef = collection(db, 'clientes')
    
    const q = query(colRef, orderBy("nome_cliente","desc"));

    const inscritos = onSnapshot(q, (querySnapshot) => {
      setCliente(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      });
      return inscritos;
  }, [])


  return ( 
        <>
            <Head>
                <title>BRH Admin | Gestão  Clientes</title>
            </Head>
          
            
            <div className={styles.title}>
                    <h1>Gestão de Clientes</h1>
                    <h2>Lista de todos os clientes</h2>

                    
            </div>
            
            <div className={styles.filtro}>
                     
                    <div >
                        <button className={`btn btn-light btn-sm dropdown-toggle ${styles.toggle}`}  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Filtrar por cliente
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
                      <input type="text" placeholder=" Pesquisar cliente" className={styles.busca}/>
                      <a><i className={`bi bi-search ${styles.icon_search}`}></i></a>
                  </form>
              </div>
              
              <div className={styles.tbl}>
                <table className={`table ${styles.tabela}`}>
                  <thead>
                    <tr>
                      <th> Código do cliente</th>
                        <th>Nome do cliente</th>
                        <th>Plano</th>
                        <th>Período</th>
                        <th>Valor do Plano</th>
                        <th >Data de Cadastro</th>
                        <th >Data expiração</th>
                        <th >Estado</th>
                        <th >Acções</th>
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
                              
                              <td>{client.hora}</td>
                              <td><button type="button" className={`btn btn-success ${styles.btn_info}`}>Activado</button></td>
                              <td>
                                <IconButton>
                                  <DeleteIcon/>
                              </IconButton>
                              <IconButton>
                                  <EditIcon/>
                              </IconButton></td>
                          </tr>
                        ))
                      }

                    <tr>
                       <td> BF001</td>
                        <td>BF Marketing</td>
                        <td>Básico</td>
                        <td>Trimestral</td>
                        <td>1.500.000,00</td>
                        <td>08/09/2022</td>
                        <td>10/10/2022</td>
                        <td><button type="button" className={`btn btn-success ${styles.btn_info}`}>Activado</button></td>
                        <td><IconButton>
                                  <DeleteIcon/>
                              </IconButton>
                              <IconButton>
                                  <EditIcon/>
                              </IconButton></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
        </>
     );
  }
 
export default gestao_clientes;