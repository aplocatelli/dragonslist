import '../styles/Footer.css';

function Footer() {
    return (
        <div className="footer">
            Copyright &copy; {new Date().getFullYear()} Dragon Inc. Todos os direitos reservados.
        </div>
    );
}

export default Footer;