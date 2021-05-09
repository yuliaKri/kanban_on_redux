import './App.css';
import {connect} from "react-redux";
import {cardGetAll, columnsGetAll} from "./redux/actions";
import Column from "./Column";
import {useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";
//import {Button} from "reactstrap";

function App(props) {

    const columns = props.columns || [];
    const cards = props.cards || [];
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(()=>{
        props.columnsGetAll();
        props.cardGetAll();
    },[])

    return (
    <div className="App">
        <ModalWindow toggle={toggle} buttonLabel="Delete all marked cards"/>
        <h4>Kanban based on react-redux with own server on mongoDB</h4>
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
