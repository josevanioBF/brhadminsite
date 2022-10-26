import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@mui/material/Badge';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';


const Navbar = () => {
    const router = useRouter();


    // Logs a user out
    function logout(){
        signOut(getAuth()).then(() => {
            router.push('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    return ( 
        <>
            <div className="wrapper">
                <header>
                    <div className="logo">
                        <Image src="/LOGO ADMIN_Prancheta 1.png"  width={190} height={190} />
                    </div>
                    <div className="comp">
                        <ul className='right-side'>
                            <li>
                                <Link href="/">
                                    <a>
                                        <Badge color="error" badgeContent={5}>
                                            <i className="bi bi-bell icon" > </i>
                                        </Badge>
                                    </a>
                                </Link>   
                            </li>
                            <li>
                                <Link href="/">
                                    <a>
                                        <Badge color="error" badgeContent={3}>
                                        <i className="bi bi-envelope icon" > </i>
                                        </Badge>
                                        
                                    </a>
                               </Link> 
                            </li>
                            <li>
                                <Link href="/">
                                    <a>
                                        <div className='profile-pic'> 
                                            <Image src="/etty-fidele-VNYCIbZju0o-unsplash.png" width={40} height={40} className='profilepic'/> 
                                        </div> 
                                        <div className='profile-name'>
                                            <p>Ricardo Dos Santos</p>  
                                        </div> 
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <button className='btn btn-danger px-3 py-2' onClick={logout}>Sair</button>
                            </li>

                        </ul>        
                    </div>

                    
                </header>
            </div> 
        </>
        
     );
}
 
export default Navbar;
