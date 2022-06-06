import { useState, useEffect, useContext } from 'react';

import firebase from "../../services/firebaseConnection";
import { useParams, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import { toast } from "react-toastify";

import './dividendos.css';
import { FcMoneyTransfer } from "react-icons/fc";

export default function Dividendos() {

    const { id } = useParams();
    const history = useHistory();
    const [loadAtivos, setLoadAtivos] = useState(true);
    const [ativos, setAtivos] = useState([]);
    const [ativoSelected, setAtivoSelected] = useState(0);

    const [status, setStatus] = useState('Em aberto');
    const [valor, setValor] = useState('');
    const [qtd, setQtd] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');

    const [idAtivo, setIdAtivo] = useState(false);

    const { user } = useContext(AuthContext);


    useEffect(() => {
        async function loadAtivos() {
            await firebase.firestore().collection('ativos')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        ativo: doc.data().ativo
                    })
                })

                if(lista.length === 0) {
                    console.log('NENHUMA EMPRESA ENCONTRADA');
                    setAtivos([ {id: 1, ativo: 'ATIVO'} ]);
                    setLoadAtivos(false);
                    return;
                }

                
                setAtivos(lista);
                setLoadAtivos(false);
                
                if(id) {
                    console.log(id);
                    loadId(lista);
                }

            })
            .catch((error) => {
                console.log('DEU ALGUM ERRO', error);
                setLoadAtivos(false);
                setAtivos([ {id: 1, ativo: ''} ]);
            })
        }

        loadAtivos();

    }, [])



    async function loadId(lista) {
        await firebase.firestore().collection('dividendos').doc(id)
        .get()
        .then((snapshot) => {
            console.log(snapshot);
            setQtd(snapshot.data().qtd);
            setDataPagamento(snapshot.data().dataPagamento);
            setValor(snapshot.data().valor);
            setStatus(snapshot.data().status);

            let index = lista.findIndex(item => item.id === snapshot.data().ativoId)
            setAtivoSelected(index);
            setIdAtivo(true);
            
        })
        .catch((error) => {
            console.log('Erro ao passar ID: ', error);
            setIdAtivo(false);
        })
    }


    async function handleRegister(e) {
        e.preventDefault();   
        
        if(idAtivo) {
            await firebase.firestore().collection('dividendos')
            .doc(id)
            .update({
                ativo: ativos[ativoSelected].ativo,
                ativoId: ativos[ativoSelected].id,
                status: status,            
                valor: valor,
                qtd: qtd,
                dataPagamento: dataPagamento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Dividendo atualizado com sucesso!');
                setAtivoSelected(0);
                history.push('/dashboard');
            })
            .catch((error) => {
                toast.error('Ops erro a registrar, tente mais tarde');
                console.log(error);
            })

            return;
        }
        

        await firebase.firestore().collection('dividendos')
        .add({
            created: new Date(),
            ativo: ativos[ativoSelected].ativo,
            ativoId: ativos[ativoSelected].id,
            status: status,            
            valor: valor,
            qtd: qtd,
            dataPagamento: dataPagamento,
            userId: user.uid
        })        
        .then(() => {
            toast.success('Chamado criado com sucesso!');
            setQtd('');
            setValor('');
            setAtivoSelected(0);
            setDataPagamento('');
        })
        .catch((error) => {
            toast.error('Ops, erro ao registrar, tente mais tarde!');
            console.log('Erro: ', error);
        })
    }


    function handleOptionChange(e) {
        setStatus(e.target.value);
        console.log(e.target.value);
    }


    function handleChangeSelect(e) {
        // console.log('INDEX DO CLIENTE SELECTIONADO: ', e.target.value);
        // console.log('Cliente selecionado: ', ativos[e.target.value]);
        setAtivoSelected(e.target.value);
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

                        {loadAtivos ? (
                            <input type="text" disabled={true} value="Carregando ativos..." />
                        ) : (

                            <select value={ativoSelected} onChange={handleChangeSelect}>
                                {ativos.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.ativo}
                                        </option>
                                    )
                                })}
                            </select>

                        )}


                        <label>Quantidade</label>
                        <input type="text" placeholder="Quantidade de ativos" value={qtd} onChange={(e) => setQtd(e.target.value)} />

                        <label>Data pagamento</label>
                        <input type="date" name="data" value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)} />

                        <label>Valor</label>
                        <input type="text" placeholder="R$ valor" value={valor} onChange={(e) => setValor(e.target.value)} />
                        

                        <label>Status</label>
                        <div className="status">
                            <input 
                            type="radio"
                            name="radio"
                            value="Aprovado"
                            onChange={handleOptionChange}
                            checked={status === 'Aprovado'}
                            />
                            <span>Aprovado</span>
                            
                            <input 
                            type="radio"
                            name="radio"
                            value="Negado"
                            onChange={handleOptionChange}
                            checked={status === 'Negado'}
                            />
                            <span>Negado</span>
                        </div>

                        {idAtivo ? (
                            <button type="submit">Atualizar</button>    
                        ) : (
                            <button type="submit">Lançar</button>                            
                        )}
                    </form>

                </div>
            </div>

        </div>
    )

}