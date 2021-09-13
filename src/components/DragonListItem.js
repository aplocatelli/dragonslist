import { Link } from 'react-router-dom';
import '../styles/DragonListItem.css';

function DragonListItem( props ) {
    const handleDeleteDragon = async dragonId => {
        const requestUrl = props.apiUrl + `/${ dragonId }`;
        const requestOptions = {
            method: "DELETE"
        };

        try {
            let response = await fetch( requestUrl , requestOptions );

            if( response.ok ) {
                props.displayMessage( "Dragão excluído com sucesso", "success" );
                props.fetchDragons();
                
            } else {
                props.displayMessage( `Ocorreu um erro: ${ response.statusText }`, "error" );
            }
        
        } catch( e ) {
            props.displayMessage( `Ocorreu um erro: ${ e }`, "error" );
        }
    }

    return (
        <>
            {props.dragons.map( dragon => {
                return (
                    <div key={ dragon.id } className="dragon-list-item">
                        <Link to={ `/dragon/${dragon.id}` } className="dragon-list-item-view">{ dragon.name }</Link>

                        <div>
                            <Link to={ `/edit/${dragon.id}` } className="dragon-list-item-edit">Editar</Link>
                            <a className="dragon-list-item-delete" onClick={ () => handleDeleteDragon(dragon.id) }>Excluir</a>
                        </div>
                    </div>
                );
            } )}
        </>
    );
}

export default DragonListItem;