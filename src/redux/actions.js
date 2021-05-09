import axios from 'axios';

export function cardGetAll(){
    return dispatch => axios({
        method: 'GET',
        url: 'https://kanban-yulia.herokuapp.com/card'
    }).then(res => {
        dispatch({ type: 'CARDS_FILL', payload: res.data })
    });
}

export function columnsGetAll(){
    return dispatch => axios({
        method: 'GET',
        url: 'https://kanban-yulia.herokuapp.com/columns'//https://nazarov-kanban-server.herokuapp.com/column
    }).then(res => {
        dispatch({ type: 'COLUMNS_FILL', payload: res.data })
    });
}

export function cardDeleteById(cardId){
    return dispatch => axios({
        method: 'DELETE',
        url: `https://kanban-yulia.herokuapp.com/card/${cardId}`
    }).then(() => {
        dispatch(cardGetAll())
    });
}

export function MarkCardAsDeleted(cardId){
    return dispatch => axios({
        url: `https://kanban-yulia.herokuapp.com/card/${cardId}`,
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
            markedToDelete: Boolean(1)
        })
    })  .then(function(body) {
        console.log(body);
    })
        .catch(err => console.log(err))
        .then(() => {
            dispatch(cardGetAll())
        });
}

export function cardUpdateById(cardId,cardDescription){
    return dispatch => axios({
        url: `https://kanban-yulia.herokuapp.com/card/${cardId}`,
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
            //name: newName,
            description: cardDescription,
            //priority: Number(newPriority),
            //status: newStatus
        })
    })  .then(function(body) {
        console.log(body);
    })
        .catch(err => console.log(err))
        .then(() => {
            dispatch(cardGetAll())
        });
}

export function cardUpdateStatus(cardId,newStatus){
    return dispatch => axios({
        url: `https://kanban-yulia.herokuapp.com/card/${cardId}`,
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
            //name: newName,
            //description: cardDescription,
            //priority: Number(newPriority),
            status: newStatus
        })
    })  .then(function(body) {
        console.log(body);
    })
        .catch(err => console.log(err))
        .then(() => {
            dispatch(cardGetAll())
        });
}

export function cardUpdatePriority(cardId,newPriority){
    return dispatch => axios({
        url: `https://kanban-yulia.herokuapp.com/card/${cardId}`,
        method: 'PATCH',
       // headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
            //name: newName,
            //description: cardDescription,
            priority: Number(newPriority)
           // status: newStatus
        })
    })  .then(function(body) {
        console.log(body);
    })
        .catch(err => console.log(err))
        .then(() => {
            dispatch(cardGetAll())
        });
}

export function createNewCard(cardName,cardDescription,cardPriority,cardStatus){
    return dispatch => axios({
        url: `https://kanban-yulia.herokuapp.com/card/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
            name: cardName,
            description: cardDescription,
            priority: Number(cardPriority),
            status: cardStatus,
            markedToDelete: Boolean(0)
        })
    })  .then(function(body) {
        console.log(body);
    })
        .catch(err => console.log(err))
        .then(() => {
            dispatch(cardGetAll())
        });

    /*axios({
        method: 'POST',
        url: 'https://nazarov-kanban-server.herokuapp.com/card',
        headers: {'Content-Type':'application/json'},
        data: JSON.stringify({name: name,description: description, priority:Number(priority),status:status})
    })
        .then(function(){
            getCards();
            // props.cardAdd({name: name,description: description, priority:Number(priority),status:status});
        })
        .catch(error => console.log(error))*/
}