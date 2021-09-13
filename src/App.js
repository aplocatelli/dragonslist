import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from  './components/Login';
import DragonEdit from './components/DragonEdit';
import DragonList from './components/DragonList';
import Dragon from './components/Dragon';
import './App.css';

function App() {
    const apiUrl = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";
    const [ loggedIn, setLoggedIn ] = useState( false );
    const [ message, setMessage ] = useState( {
        text: "",
        type: ""
    } );

    const displayMessage = ( messageText, messageType ) => {
        setMessage( {
            text: messageText,
            type: messageType
        } );
    }

    useEffect( () => {
        if( message.text ) {
            setTimeout( () => setMessage( "", "" ), 4000 );
        }
    }, [ message ] );

    if ( loggedIn ) {
        return (        
            <>  
                <Router>  
                    <Header />

                    <main className="main-app">
                        <div className={`display-message display-message-${message.type}`}><p>{ message.text }</p></div>

                        <div className="App">
                            <Switch>
                                <Route exact path={["/", "/dragon", "/edit"]}>
                                    <DragonList apiUrl={ apiUrl } displayMessage={ displayMessage }/>
                                </Route>

                                <Route path="/dragon/:id" render={ ({ match }) => <Dragon apiUrl={ apiUrl } match={ match } /> } />

                                <Route exact path={["/create"]}>
                                    <DragonEdit apiUrl={ apiUrl } displayMessage={ displayMessage } />
                                </Route>

                                <Route path="/edit/:id" render={ ({ match }) => <DragonEdit apiUrl={ apiUrl } match={ match } displayMessage={ displayMessage } /> } />
                            </Switch>
                        </div>
                    </main>

                    <Footer />
                </Router>   
            </>
        );

    } else {
        return (
            <>
                <Router>  
                    <Header />

                    <main className="main-app">
                        <div className={`display-message display-message-${message.type}`}><p>{ message.text }</p></div>

                        <div className="App">
                            <Login displayMessage={ displayMessage } setLoggedIn={ setLoggedIn } />
                        </div>
                    </main>
                
                    <Footer />
                </Router>
            </>
        );
    }
}

export default App;
