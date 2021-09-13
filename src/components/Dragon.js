import { useEffect, useState } from "react";

function Dragon( props ) {
    const [ dragon, setDragon ] = useState( {
        name: "",
        type: "",
        createdAt: ""
    } );

    useEffect( () => {
        fetchDragon();
    }, [] );

    const getFormattedDate = createdAt => {
        let creationDate = new Date( createdAt );

        const day = () => {
            let tempDay = creationDate.getDate();
            if( tempDay <= 9 ) 
                return "0" + tempDay;
            return tempDay;
        } 
        
        const month = () => {
            let tempMonth = creationDate.getMonth() + 1;
            if( tempMonth <= 9 ) 
                return "0" + tempMonth;
            return tempMonth;
        }
        let year = creationDate.getFullYear();

        return `${ day() }/${ month() }/${ year }`;
    }

    const fetchDragon = async () => {
        let response        = await fetch( props.apiUrl + `/${ props.match.params.id }` );
        let dragonDetails   = await response.json();

        let formattedDragonDetails = {
            name: dragonDetails.name,
            type: dragonDetails.type,
            createdAt: getFormattedDate( dragonDetails.createdAt )
        }

        setDragon( formattedDragonDetails );
    }

    if( dragon.name ) {
        return (
            <div className="dragon-details">
                <h2>{ dragon.name }</h2>
                <p>
                    <b>Tipo:</b> { dragon.type } <br />
                    <b>Data de criação:</b> { dragon.createdAt }
                </p>
            </div>
        )

    } else {
        return null;
    }
}

export default Dragon;