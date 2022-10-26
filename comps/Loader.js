import { useContext } from 'react';
import Image from 'next/image'
import { GlobalContext } from '../pages/_app';


export default function Loader() {
    const { loaderRef } = useContext(GlobalContext);

    return (
        <div ref={loaderRef} className="d-none justify-content-center align-items-center" id="modal_effect">
            <Image src="/loader.gif" width={100} height={100} alt="Loader gif" />
        </div>
    )
}