/*https://cdnjs.cloudflare.com/ajax/libs/reactstrap/4.8.0/reactstrap.min.js*/

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {cardDeleteById, cardUpdateById, createNewCard, MarkCardAsDeleted} from "./redux/actions";
import {connect} from "react-redux";

const ModalWindow = (props) => {
   // console.log(props.description);
    const [description,setDescription]=useState('');
    const [name,setName]=useState('');
    const [status,setStatus]=useState('');
    const [priority,setPriority]=useState(1);

    const [newDescription,setNewDescription]=useState('');

    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const postRequest = () => {
        props.createNewCard(name,description,priority,status);

        setDescription('');
        setName('');
        setStatus('');
        setPriority('');
        setModal(!modal);
    }

    const updateCard = (cardID,newDescription)  =>{
        props.cardUpdateById(cardID,newDescription);
    }

    const deleteCard = (cardID)  =>{
        props.cardDeleteById(cardID);
    }

    return (
        <div>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                {/*<ModalHeader toggle={toggle}>FILL OUT: <p>DESCRIPTION, NAME</p><p> STATUS, PRIORITY</p></ModalHeader>*/}
                <ModalBody>
                    {buttonLabel==='Create a new card' && <input type="text" placeholder="DESCRIPTION" value={description}
                            onChange={(event) => setDescription(event.target.value)}/>}
                    {buttonLabel==='Update card' && <input type="text" placeholder={props.description} value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}/>}

                    {buttonLabel==='Create a new card' && <input type="text"  placeholder="NAME"  value={name}
                            onChange={(event)=>setName(event.target.value)}/>}

                    {buttonLabel==='Create a new card' &&<select className="form-select-sm" value={props.currentColumn} onChange={(event)=>setStatus(event.target.value)}>
                        <option selected>STATUS</option>
                        <option value="to do">to do</option>
                        <option value="progress">progress</option>
                        <option value="review">review</option>
                        <option value="done">done</option>
                    </select>}
                    {buttonLabel==='Create a new card' &&<select className="form-select-sm" value={priority} onChange={(event)=>setPriority(event.target.value)}>
                        <option selected>PRIORITY</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>}
                </ModalBody>
                <ModalFooter>
                    {buttonLabel==='Create a new card' && <Button color="primary" onClick={postRequest}>Post the card</Button>}{' '}
                    {buttonLabel==='Update card' && <Button color="primary" onClick={()=>{updateCard(props.id,newDescription);setModal(!modal)}} >Update card</Button>}{' '}

                    {buttonLabel==='Delete card' && <p> Deleted this card?</p>}
                    {buttonLabel==='Delete card' && <Button color="primary" onClick={()=>{deleteCard(props.id);setModal(!modal)}} >Yes</Button>}{' '}

                    {buttonLabel==='Mark card as deleted' && <p> Mark this card as deleted?</p>}
                    {buttonLabel==='Mark card as deleted' && <Button color="primary" onClick={()=>{props.MarkCardAsDeleted(props.id);setModal(!modal)}} >Yes</Button>}{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = state => ({
    cards: state.cards,
})

const mapDispatchToProps = dispatch => ({
    createNewCard: (name,description,priority,status) => dispatch(createNewCard(name,description,priority,status)),
    cardUpdateById: (cardID,cardDescription) => dispatch(cardUpdateById(cardID,cardDescription)),
    cardDeleteById: (id) => dispatch(cardDeleteById(id)),
    MarkCardAsDeleted: (id) => dispatch(MarkCardAsDeleted(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);