import { useState, useEffect } from 'react';
import DragonListItem from './DragonListItem';
import '../styles/DragonList.css';

function DragonList( props ) {
    const [ dragons, setDragons ] = useState( [] );

    useEffect( () => {
        fetchDragons();
    }, [] );

    const fetchDragons = async () => {
        const response    = await fetch( props.apiUrl );
        let dragonList  = await response.json();
        dragonList = dragonList.sort((a, b) => a.name.localeCompare(b.name));
        setDragons( dragonList );
    }

    return (
        <nav className="dragons-list">
            <DragonListItem dragons={ dragons } apiUrl={ props.apiUrl } fetchDragons={ fetchDragons } displayMessage={ props.displayMessage }/>
        </nav>
    );
}

export default DragonList;