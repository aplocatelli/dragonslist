import { useState } from "react";

function Login( props ) {
    const [ user, setUser ] = useState( {
        username: "",
        password: ""
    } );
    
    const handleUsernameChange = ( e ) => {
        setUser( prevState => {
            return { ...prevState, username: e.target.value };
        } );
    }

    const handlePasswordChange = ( e ) => {
        setUser( prevState => {
            return { ...prevState, password: e.target.value };
        } );
    }

    const handleLogin = ( e ) => {
        e.preventDefault();

        if(user.username === "convidado" && user.password === "123456") {
            props.setLoggedIn( true );

        } else {
            props.displayMessage( "Usuário e senha inválidos", "error" );
        }
    }

    return (
        <div className="form">
            <h2>Login</h2>

            <form onSubmit={ handleLogin }>
                <input type="text" id="user" name="user" placeholder="Usuário" value={ user.username } onChange={ handleUsernameChange }></input>
                <input type="password" id="pw" name="pw" placeholder="Senha" value={ user.password } onChange={ handlePasswordChange }></input>
                <button type="submit">Acessar</button>
            </form>
        </div>
    );
}

export default Login;