import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <nav className="header-nav">
                <Link to="/" className="header-title">
                    <h1>Inventário de Dragões</h1>
                </Link>

                <div className="header-actions">
                    <Link to="/">Listagem</Link>
                    <Link to="/create">Criar Novo</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;