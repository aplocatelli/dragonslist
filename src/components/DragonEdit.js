import { useEffect, useState } from "react";
import '../styles/DragonEdit.css';

function DragonEdit( props ) {
    const [dragon, setDragon] = useState({
        name: "",
        type: ""
    });

    useEffect( () => {
        if( props.match ) {
            fetchDragon();
        }
    }, [] );

    const fetchDragon = async () => {
        try {
            let response = await fetch( props.apiUrl + `/${ props.match.params.id }` );

            if( response.ok ) {
                let dragonDetails   = await response.json();

                let formattedDragonDetails = {
                    name: dragonDetails.name,
                    type: dragonDetails.type
                }

                setDragon( formattedDragonDetails );      
                
            } else {
                props.displayMessage( `Ocorreu um erro: ${ response.statusText }`, "error" );
            }

        } catch( e ) {
            props.displayMessage( `Ocorreu um erro: ${ e }`, "error" );
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if( dragon.name && dragon.type ) {
                const requestMethod = props.match ? "PUT" : "POST";
                const requestUrl    = props.match ? props.apiUrl + `/${ props.match.params.id }` : props.apiUrl;
        
                const requestOptions = {
                    method: requestMethod,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dragon)
                };

                let response = await fetch( requestUrl , requestOptions );

                if( response.ok ) {
                    props.match ? props.displayMessage( "Dragão editado com sucesso", "success" ) : props.displayMessage( "Dragão criado com sucesso", "success" );
                    
                } else {
                    props.displayMessage( `Ocorreu um erro: ${ response.statusText }`, "error" );
                }

            } else {
                let isEditOrCreate = props.match ? "editar" : "criar";
                throw `Preencha os campos Nome e Tipo para ${isEditOrCreate} um dragão`;
            }

        } catch( e ) {
            props.displayMessage( `Ocorreu um erro: ${ e }`, "error" );
        }
    }

    const handleNameChange = (e) => {
        setDragon( prevState => {
            return { ...prevState, name: e.target.value };
        } );
    }

    const handleTypeChange = (e) => {
        setDragon( prevState => {
            return { ...prevState, type: e.target.value };
        } );
    }

    return (
        <div className="form">
            <h2>{ props.match ? "Editar" : "Novo" } Dragão</h2>

            <form onSubmit={ handleSubmit }>
                <input type="text" id="name" name="name" placeholder="Nome" value={dragon.name} onInput={ handleNameChange }></input>
                <input type="text" id="type" name="type" placeholder="Tipo" value={dragon.type} onInput={ handleTypeChange } ></input>
                <button type="submit">{ props.match ? "Editar" : "Criar" }</button>
            </form>
        </div>
    )
}

export default DragonEdit;