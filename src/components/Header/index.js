import {  useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {
    const { user } = useContext(AuthContext);


    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
            </div>

            <Link to="/">
                <FiHome color='#FFF' size={25} />
                Dashboard
            </Link>
            <Link to="/despesas">
                <FiUser color='#FFF' size={25} />
                Despesas
            </Link>
            <Link to="/profile">                
                <FiSettings color='#FFF' size={25} />
                Configurações
            </Link>
        </div>
    )
}