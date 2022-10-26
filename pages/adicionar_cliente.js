import Head from 'next/head'
import Navbar from '../comps/Navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { db } from '../src/firebaseConfig'
import { useEffect, useState } from "react";
import { collection, 
  CollectionReference, 
  query, 
  onSnapshot ,
  getFirestore,
  addDoc, deleteDoc, doc, serverTimestamp,
 QueryDocumentSnapshot,DocumentData,where,limit,getDocs, orderBy
} from 'firebase/firestore'
import { async } from '@firebase/util'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            border:1
        }}
    />
);

export default function Form() {

    const [client, setCliente] = useState({})
    const [planos, setPlano] = useState([]);
    const onSubmit = async () => {
        const colRef = collection(db, 'clientes')
        const addClientForm = document.querySelector('.add')
        addClientForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addDoc(colRef, {
            nome_cliente: addClientForm.nome_cliente.value,
            contacto: addClientForm.contacto.value,
            empresa: addClientForm.empresa.value,
            localizacao: addClientForm.localizacao.value,
            email: addClientForm.email.value,
            plano: addClientForm.plano.value,
            periodo: addClientForm.periodo.value,
            timestamp: serverTimestamp()

        }).then(() => {
            addClientForm.reset()
        })
        })
    }

    useEffect(() => {
        const colRef = collection(db, 'plano')
    
        const q = query(colRef, orderBy("nome","desc"));
    
        const inscritos = onSnapshot(q, (querySnapshot) => {
            const result = [];
            querySnapshot.docs.map(doc => 
                {
                    result.push({ ...doc.data(), id: doc.id })
                }
                
            )
            setPlano(result)
            //setPlano(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
          });
        
      }, [])


   
    return (
        <>
             <Head>
                <title>BRH Admin | Adicionar Cliente</title>
             </Head>
             

            <div className={styles.card}>
                <h1 className={styles.text1}>Cadastrar cliente novo</h1>
                <h2 className={styles.text2}>Cadastre seu cliente agora mesmo</h2>
                <ColoredLine color="black" />

                <form className='add'>
                
                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Nome do Cliente<label className={styles.star}> * </label>
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`} 
                     name='nome_cliente'
                     onChange={e => setCliente({ ...client, nome_cliente: e.target.value } )} />
                    
                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Contacto<label className={styles.star}> * </label>
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`} 
                    name='contacto'
                    onChange={e => setCliente({ ...client, contacto: e.target.value})}
                    />

                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Plano <label className={styles.star}> * </label>
                    </label>
                    <select name='plano' className={`dropdown ${styles.caixa_selecao}`}  onChange={e => setCliente({ ...client, plano: e.target.value})}>
                        
                        <optgroup label='planos'>
                         <option  className={styles.op} >selecione</option>
                            {
                                planos && planos.map(each => (
                                    
                                    <option key={each.id} value={`${each.nome}`} className={styles.op}>{each.nome}</option>

                                ))
                            }
                        </optgroup>
                       
                    </select>
                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`} onChange={e => setCliente({ ...client, periodo: e.target.value})}> Período<label className={styles.star}> * </label>
                            </label>
                        <select  name='periodo' className={`dropdown ${styles.caixa_selecao}`}>
                            <option className={styles.op} >selecione</option>
                            <option value="Trimestral" className={styles.op}>Trimestral</option>
                            <option value="Semestral" className={styles.op}>Semestral</option>
                            <option value="Anual" className={styles.op}>Anual</option>
                        </select>

                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}> Tamanho da Empresa <label className={styles.star}> * </label>
                    </label>
                    <select name='empresa' className={`dropdown ${styles.caixa_selecao}`} onChange={e => setCliente({ ...client, empresa: e.target.value})}>
                
                        <option  className={styles.op} >selecione</option>
                        <option value="pequena" className={styles.op}>pequena</option>
                        <option value="Média" className={styles.op}>Média</option>
                        <option value="Grande" className={styles.op}>Grande</option>
                    </select>  
            
                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Localização
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`}
                     name='localizacao'
                    onChange={e => setCliente({ ...client, localizacao: e.target.value})}
                    />

                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`} >Email 
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`}
                    name='email'
                    onChange={e => setCliente({ ...client, email: e.target.value})}
                    />
                    
                    <button onClick={onSubmit} type="submit" className={`btn btn-primary ${styles.btn}`}>Adicionar</button>
                </form>

            </div>
            
        </>
    )
}
 
