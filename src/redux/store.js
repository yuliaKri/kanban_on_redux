import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
//import taskList from "./reducers"
import thunk from "redux-thunk";

const reducers = (state,action) => {
    console.log(state, action);

    if (action.type === "CARDS_FILL") {
        return {...state, cards: action.payload}
    }
    if (action.type === "COLUMNS_FILL") {
        return {...state, columns: action.payload}
    }
    return {cards: [],columns: []}
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;