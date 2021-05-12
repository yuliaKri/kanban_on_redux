import './App.css';
import {connect} from "react-redux";
import {cardGetAll, columnsGetAll} from "./redux/actions";
import Column from "./Column";
import React, {useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {Card, CardTitle} from "reactstrap";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
//import {Button} from "reactstrap";

function App(props) {

    const columns = props.columns || [];
    const cards = props.cards || [];
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    console.log("isAuthenticated",isAuthenticated,"/","routes",routes)
    const currentUser = localStorage.getItem('userData')
    
    useEffect(()=>{
        props.columnsGetAll();
        props.cardGetAll();
    },[])

    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
            <Router>
                <div className="themed-container">
                    <div className="row align-items-start">
                        <div className="card" style={{ width: '42rem', height:'11rem'}}>
                            {routes}
                        </div>
                        <div className="card" style={{ width: '42rem', height:'11rem'}}>
                            <Card body inverse color="primary">
                                <CardTitle tag="h5">Kanban based on react-redux on own server (mongoDB)</CardTitle><p>{''}</p>
                                <ModalWindow toggle={toggle} buttonLabel="Trash" /><p>{''}</p>
                                <ModalWindow toggle={toggle} buttonLabel="Create a new card" />
                            </Card>
                        </div>
                    </div>
                </div>
            </Router>
                <div className="App">
                    <div className="container-sm">
                        <div className="row align-items-start">
                            {columns.map(el=><Column column={el} key={el._id} cards={cards} currentUser={currentUser}/>)}
                        </div>
                    </div>
                </div>
        </AuthContext.Provider>
  );
}

const mapStateToProps = state => ({
    cards: state.cards,
    columns: state.columns,
})

const mapDispatchToProps = dispatch => ({
     cardGetAll: () => dispatch(cardGetAll()),
     columnsGetAll: () => dispatch(columnsGetAll()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
