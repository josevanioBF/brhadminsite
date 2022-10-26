import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { db } from '../src/firebaseConfig'
import { Alert } from '@mui/material';
import {  useState } from "react";
import Demo from '../comps/demo'
import { collection, 
  CollectionReference, 
  query, 
  onSnapshot ,
  getFirestore,
  addDoc, deleteDoc, doc, serverTimestamp
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

const adicionar_plano = () => {

    const [plano, setPlano] = useState({})
    const onSubmit = async () => {
        const colRef = collection(db, 'plano')
        const addPlanoForm = document.querySelector('.add')
        addPlanoForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addDoc(colRef, {
            nome: addPlanoForm.nome.value,
            valor: addPlanoForm.valor.value,
            periodo: addPlanoForm.periodo.value,
            timestamp: serverTimestamp()
            
        }).then(() => {
            addPlanoForm.reset()
        })
            
        })
    }

    return (  
        <>
            <Head>
                <title>BRH Admin | Adicionar Plano</title>
            </Head>

            <div className={styles.card_plano}>
                <h1 className={styles.text1}>Cadastrar plano novo</h1>
                <h2 className={styles.text2}>Cadastre o seu plano agora mesmo</h2>
                <ColoredLine color="black" />
                
                <form className='add'>
                
                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Nome do plano
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`} 
                        name='nome'
                        onChange={e => setPlano({ ...plano, nome: e.target.value } )}
                    />
                    
                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Valor do plano
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`}
                        name='valor'
                        onChange={e => setPlano({ ...plano, valor: e.target.value } )}
                    />

                    <label htmlFor="exampleFormControlInput1" className={`form-label ${styles.legendas}`}>Período do plano 
                    </label>
                    <input type="text" className={`form-control ${styles.frm}`}
                        name='periodo'
                        onChange={e => setPlano({ ...plano, periodo: e.target.value } )}
                    />
                    
                    <button onClick={onSubmit}  type="submit"  className={`btn btn-primary ${styles.btn}`}>Adicionar</button>
                    
                    
                </form>
                
            </div>
            
        </>
    );
}
 
export default adicionar_plano;