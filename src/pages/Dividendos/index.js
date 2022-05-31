import './dividendos.css';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FcMoneyTransfer } from "react-icons/fc";

export default function Dividendos() {



    function handleRegister(e) {
        e.preventDefault();
        alert('lancado');
    }


    return(
        <div>
            <Header />

            <div className='content'>
                <Title name="Lançamento de dividendos">
                    <FcMoneyTransfer size={25} />
                </Title>

                <div className='container'>
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Ativos</label>
                        <select>
                            <option value="">Selecione</option>
                            <option value="BBAS3">BBAS3</option>
                            <option value="EGIE3">EGIE3</option>
                            <option value="MXRF11">MXRF11</option>
                        </select>

                        <label>Quantidade</label>
                        <input type="text" placeholder="Quantidade de ativos" />

                        <label>Data pagamento</label>
                        <input type="date" name="data" />

                        <label>Valor</label>
                        <input type="text" placeholder="R$ valor" />

                        <button type="submit">Lançar</button>
                    </form>

                </div>
            </div>

        </div>
    )

}