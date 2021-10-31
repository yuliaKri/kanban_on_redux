/*https://cdnjs.cloudflare.com/ajax/libs/reactstrap/4.8.0/reactstrap.min.js*/

import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import {cardDeleteById, cardUpdateById, createNewCard, MarkCardAsDeleted,DeleteSeveralCards} from "./redux/actions";
import {connect} from "react-redux";

const ModalWindow = (props) => {
   // console.log(props.description);
    const [description,setDescription]=useState('');
    const [name,setName]=useState('');
    const [status,setStatus]=useState('');
    const [priority,setPriority]=useState('');
    const currentUser = localStorage.getItem('userData')
    const [fileURL,setFileURL]=useState(null)

    const [newDescription,setNewDescription]=useState('');

    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const postRequest = () => {
        props.createNewCard(name,description,priority,status,currentUser,fileURL);

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

    const handleFileInputChange = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFileURL(reader.result);
        }
    }

    return (
        <div>
            {buttonLabel==='Delete card' && <Button color="danger" onClick={toggle} style={{ width: '11rem'}}>{buttonLabel}</Button>}
            {buttonLabel==='Trash' && <Button color="warning" onClick={toggle} style={{ width: '11rem'}}>{buttonLabel}</Button>}
            {buttonLabel==='Create a new card' && <Button color="success" onClick={toggle} style={{ width: '11rem'}}>+ new card</Button>}
            {buttonLabel==='Update card' && <Button color="primary" onClick={toggle} style={{ width: '11rem'}}>{buttonLabel}</Button>}
            {buttonLabel==='Mark card as deleted' && <Button color="warning" onClick={toggle} style={{ width: '11rem'}}>{buttonLabel}</Button>}
            <Modal isOpen={modal} toggle={toggle} className={className}>
                {/*<ModalHeader toggle={toggle}>header here</ModalHeader>*/}
                <ModalBody>
                    {buttonLabel==='Create a new card' && <input type="text" placeholder="DESCRIPTION" value={description}
                            onChange={(event) => setDescription(event.target.value)}/>}
                    {buttonLabel==='Update card' && <input type="text" placeholder={props.description} value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}/>}

                    {buttonLabel==='Create a new card' && <input type="text"  placeholder="NAME"  value={name}
                            onChange={(event)=>setName(event.target.value)}/>}

                    {buttonLabel==='Create a new card' &&<select className="form-select-sm" value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option selected>STATUS</option>
                        <option value="to do">to do</option>
                        <option value="progress">progress</option>
                        <option value="review">review</option>
                        <option value="done">done</option>
                    </select>}
                    {buttonLabel==='Create a new card' &&<select className="form-select-sm" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                        <option selected>PRIORITY</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>}

                    {buttonLabel==='Trash' && props.cards.filter(el => el.markedToDelete===Boolean(1)).map(el => <p>{el._id}</p>)}
                    <input type='file' name='fileURL' onChange={(event)=>handleFileInputChange(event)}/>
                    {fileURL && (
                        <img src={fileURL} alt="chosen" className="previewImg"/>
                    )}

                </ModalBody>
                <ModalFooter>
                    {buttonLabel==='Create a new card' && <Button color="primary" onClick={postRequest}>Post the card</Button>}{' '}
                    {buttonLabel==='Update card' && <Button color="primary" onClick={()=>{updateCard(props.id,newDescription);setModal(!modal)}} >Update card</Button>}{' '}

                    {buttonLabel==='Delete card' && <p> Deleted this card?</p>}
                    {buttonLabel==='Delete card' && <Button color="danger" onClick={()=>{deleteCard(props.id);setModal(!modal)}} >Yes</Button>}{' '}

                    {buttonLabel==='Mark card as deleted' && <p> Mark this card as deleted?</p>}
                    {buttonLabel==='Mark card as deleted' && <Button color="primary" onClick={()=>{props.MarkCardAsDeleted(props.id);setModal(!modal)}} >Yes</Button>}{' '}

                    {buttonLabel==='Trash' && <p> Delete all this cards?</p>}
                    {buttonLabel==='Trash' && <Button color="danger" onClick={()=>{props.DeleteSeveralCards(props.cards.filter(el => el.markedToDelete===Boolean(1)));setModal(!modal)}} >Yes</Button>}{' '}

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
    createNewCard: (name,description,priority,status,user,fileURL) => dispatch(createNewCard(name,description,priority,status,user,fileURL)),
    cardUpdateById: (cardID,cardDescription) => dispatch(cardUpdateById(cardID,cardDescription)),
    cardDeleteById: (id) => dispatch(cardDeleteById(id)),
    MarkCardAsDeleted: (id) => dispatch(MarkCardAsDeleted(id)),
    DeleteSeveralCards: (cardsArrayToDelete) => dispatch(DeleteSeveralCards(cardsArrayToDelete)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);