
import './App.css';

import {connect} from "react-redux";
import Card from "./Card";
import {cardGetAll, columnsGetAll} from "./redux/actions";
import Column from "./Column";
import {useEffect, useState} from "react";
import axios from "axios";
import ModalWindow from "./ModalWindow";
import {Button} from "reactstrap";

function App(props) {

    const columns = props.columns || [];
    const cards = props.cards || [];
   // const [columns,setColumns] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    /*const getColumns = () => {
        /!*axios.get('https://nazarov-kanban-server.herokuapp.com/column')
            .then((response)=> setColumns(response.data))
            .catch((error)=> console.log(error));*!/

        getCards();
    }

    const getCards = () =>{
        props.cardGetAll()
    }*/

    useEffect(()=>{

        props.columnsGetAll();
        props.cardGetAll()
        //getColumns();
    },[])


    return (
    <div className="App">
        <h4>Kanban based on react-redux</h4>
        <ModalWindow toggle={toggle} buttonLabel="Create a new card"/>
        <div className="container-sm">
            <div className="row align-items-start">
                {columns.map(el=><Column column={el} key={el._id} cards={cards}/>)}
            </div>
        </div>
    </div>
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
