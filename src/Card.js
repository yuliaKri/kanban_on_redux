import React, {useState} from "react";
import {cardDeleteById, cardUpdateById, cardUpdatePriority, cardUpdateStatus} from "./redux/actions";
import {connect} from "react-redux";
import ModalWindow from "./ModalWindow";

function Card (props) {
    const [newDescription,setNewDescription] = useState('')
    const [disable,setDisableBar]=useState(false)

    const changeStatus = (val) => {
        let newStatus=''
        if (val==='left') {
            if (props.card.status === 'done')
                newStatus = 'review'
            if (props.card.status === 'review')
                newStatus = 'progress'
            if (props.card.status === 'progress')
                newStatus = 'to do'
        }
        if (val==='right'){
            if (props.card.status === 'to do')
                newStatus = 'progress'
            if (props.card.status === 'progress')
                newStatus = 'review'
            if (props.card.status === 'review')
                newStatus = 'done'
        }
        props.cardUpdateStatus(props.card._id, newStatus);
    }

    const changePriority = (oldPriority,value) => {
        let newPriority;
        if (value==='up') newPriority = oldPriority - 1;
        if (value==='down') newPriority = oldPriority + 1;
        props.cardUpdatePriority(props.card._id, newPriority);
    }

    /*const deleteCard = (id) => {
        props.cardDeleteById(id);
    } /*moved to ModalWindow component*/

    const updateCard = (cardID,newDescription)  => {
        props.cardUpdateById(cardID, newDescription);
    }
    const {
        //  buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.card.name}</h5>
                    <p className="card-text">{props.card.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">status: {props.card.status}</li>
                    <li className="list-group-item">priority: {props.card.priority}
                        <button type="button" className="btn btn-outline-primary" onClick={()=>{changePriority(props.card.priority,'up', props.card._id)}}>↑</button>
                        <button type="button" className="btn btn-outline-primary" onClick={()=>{changePriority(props.card.priority,'down', props.card._id)}}>↓</button>
                    </li>
                </ul>
                <div className="card-body">
                    <button disabled={props.card.status==='to do'} type="button" className="btn btn-outline-primary" onClick={()=>{changeStatus('left')}}>←</button>
                    <button disabled={props.card.status==='done'} type="button" className="btn btn-outline-primary" onClick={()=>{changeStatus('right')}}>→</button>
                    {disable && <input type="text"  placeholder={props.card.description} value={newDescription} onChange={(event)=>setNewDescription(event.target.value)}/>}
                    {disable && <button type="button" className="btn btn-outline-primary" onClick={()=>{setDisableBar(false);updateCard(props.card._id,newDescription)}}>Save</button>}
                    {disable && <button type="button" className="btn btn-outline-primary" onClick={()=>{setDisableBar(false);setNewDescription('')}}>Cancel</button>}
                    <p>{''}</p>
                    <ModalWindow isOpen={modal} toggle={toggle} className={className} buttonLabel="Update card" description={newDescription} id={props.card._id}/>
                    <p>{''}</p>
                    <ModalWindow isOpen={modal} toggle={toggle} className={className} buttonLabel="Mark card as deleted" id={props.card._id}/>
                    <p>{''}</p>
                    <ModalWindow isOpen={modal} toggle={toggle} className={className} buttonLabel="Delete card" id={props.card._id}/>
                </div>
                <div>
                 {/*  <ModalWindow isOpen={modal} toggle={toggle} className={className} currentColumn={props.card.status} buttonLabel="Create a new card"/>*/}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    cards: state.cards,
})

const mapDispatchToProps = dispatch => ({
    cardDeleteById: (id) => dispatch(cardDeleteById(id)),
    cardUpdateById: (cardID,cardDescription) => dispatch(cardUpdateById(cardID,cardDescription)),
    cardUpdateStatus: (cardID,newStatus) => dispatch(cardUpdateStatus(cardID,newStatus)),
    cardUpdatePriority: (cardID,newStatus) => dispatch(cardUpdatePriority(cardID,newStatus)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Card);