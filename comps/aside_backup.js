import Link from 'next/link'
import Script from 'next/script'
import $ from 'jquery'
import { useEffect } from "react";

const Aside = () => {
    useEffect(() => {

        $(document).ready(function(){

            $('.sub-btn').click(function(){
              $(this).next('.sub-menu').slideToggle();
              $(this).find('.dropdown').toggleClass('rotate');
            });
  
            $('.menu-btn').click(function(){
              $('.side-bar').addClass('active');
              $('.menu-btn').css("visibility", "hidden");
            });
  
            $('.close-btn').click(function(){
              $('.side-bar').removeClass('active');
              $('.menu-btn').css("visibility", "visible");
            });
  
          });
    })

    return ( 
        <>
            <main>
                <aside>
                    <nav>
                        <div className="side-bar active">
                            <div className="menu">
                                <div className="item">
                                    <Link href='/'>
                                    <a><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-columns-gap" viewBox="0 0 16 16">
                                         <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"/>
                                    </svg> Painel de Controlo</a>
                                    </Link>
                                    
                                </div>
                                <div className="item">
                                <a className="sub-btn"><i className="bi bi-people"></i> Clientes<i className="fas fa-angle-right dropdown"></i></a>
                                <div className="sub-menu">
                                <Link href="/adicionar_cliente">
                                    <a  className="sub-item"><i className="bi bi-record"></i>Adicionar cliente</a>
                                </Link>
                                <Link href="/gestao_clientes">
                                    <a className="sub-item"><i className="bi bi-record"></i>Gestão de clientes</a>
                                </Link>
    
                                </div>
                                </div>
                                <div className="item">
                                <a className="sub-btn"><i className="bi bi-list-check"></i> Meus Planos<i className="fas fa-angle-right dropdown"></i></a>
                                <div className="sub-menu">
                                    <Link href="/adicionar_plano">
                                            <a className="sub-item"><i className="bi bi-record"></i>Adicionar Plano</a>
                                    </Link>

                                    <Link href="/gestao_planos">
                                        <a  className="sub-item"><i className="bi bi-record"></i> Gestão de  planos</a>
                                    </Link>
                                </div>
                                </div>
                                <div className="item">
                                    <Link href="/gestao_facturas">
                                        <a><i className="fas fa-th"></i> Gestão de Facturas</a>
                                    </Link>
                                </div>   
                            </div>
                        </div>
                    </nav>
                </aside>
                
            </main>

            
        </>
     );
}
 
export default Aside;