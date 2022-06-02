import { useState } from 'react';

import './dashboard.css';
import Header from "../../components/Header";
import Title from '../../components/Title';

import { FcMoneyTransfer, FcPlus, FcSearch, FcSupport } from "react-icons/fc"
import { Link } from 'react-router-dom';


export default function Dashboard() {
    const [dividendos, setDividendos] = useState([1]);


    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Dividendos lançados">
                    <FcMoneyTransfer size={25} />
                </Title>

                {dividendos.length === 0 ? (
                    <div className="container dashboard">
                        <span>Nenhum dividendo registrado...</span>

                        <Link to="/dividendos" className="dividendos">
                            <FcPlus size={25} color="#FFF" />
                            Novo dividendo
                        </Link>
                    </div>                    

                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Ativo</th>
                                <th scope="col">Dividendo</th>
                                <th scope="col">Qtd</th>
                                <th scope="col">Status</th>
                                <th scope="col">Data Pag</th>
                                <th scope="col">Total</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td data-label="Cliente">BBAS3</td>
                                <td data-label="Dividendo">R$ 0,43</td>
                                <td data-label="Qtd">200</td>
                                <td data-label="Status">                                    
                                    <span className="badge" style={{backgroundColor: '#5cb85c'}}>Aprovado</span>
                                </td>
                                <td data-label="Data">14/05/2022</td>
                                <td data-label="Total">R$ 86,00</td>
                                <td>
                                    <button className="action" style={{backgroundColor: '#3583f6'}} >
                                        <FcSearch color='#FFF' size={17} />
                                    </button>
                                    <button className="action" style={{backgroundColor: '#F6a935'}} >
                                        <FcSupport color='#FFF' size={17} />
                                    </button>
                                </td>
                            </tr>                                      
                        </tbody>

                        <tbody>
                            <tr >
                                <td data-label="Cliente">EGIE3</td>
                                <td data-label="Dividendo">R$ 2,75</td>
                                <td data-label="Qtd">500</td>
                                <td data-label="Status">                                    
                                    <span className="badge" style={{backgroundColor: '#5cb85c'}}>Aprovado</span>
                                </td>
                                <td data-label="Data">15/04/2022</td>
                                <td data-label="Total">R$ 1.375,00</td>
                                <td>
                                    <button className="action" style={{backgroundColor: '#3583f6'}} >
                                        <FcSearch color='#FFF' size={17} />
                                    </button>
                                    <button className="action" style={{backgroundColor: '#F6a935'}} >
                                        <FcSupport color='#FFF' size={17} />
                                    </button>
                                </td>
                            </tr>                                      
                        </tbody>
                    </table>
                )}

                <div>
                    <label>Total geral: R$ 1.461,00</label>
                </div>



            </div>
        </div>
    )
}