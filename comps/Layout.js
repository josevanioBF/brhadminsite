import Navbar from './Navbar'
import Aside from './Aside'
import { useRouter } from 'next/router'
import { NextResponse, NextRequest } from 'next/server'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Layout = ({ children }) => {
 
    return ( 
       <div className="wrapper">
                <Navbar/>
                    <section>
                        { children } 
                    </section>
                <Aside/>
        </div>
    );
}
 
export default Layout;