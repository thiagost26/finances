import './dashboard.css';
import { useState } from 'react';

import Header from "../../components/Header";
import Title from '../../components/Title';

import { FcMoneyTransfer, FcPlus } from "react-icons/fc"
import { Link } from 'react-router-dom';


export default function Dashboard() {
    const [dividendos, setDividendos] = useState([]);


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
                    <div className="container dashboard">
                        <span>Buscando dividendos...</span>
                    </div>
                )}



            </div>
        </div>
    )
}