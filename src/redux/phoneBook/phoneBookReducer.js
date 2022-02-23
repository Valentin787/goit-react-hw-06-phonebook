import {combineReducers,createReducer } from "@reduxjs/toolkit";
import {actionAddContacts,removeContacts,filterContacts} from './phoneBookActions'

const initialItems = [];
const contactsItemReducer = createReducer(initialItems, {
    [actionAddContacts]: (state, { payload }) => {
        const contact = [...state, payload];
        return contact
    },
    [removeContacts]:(state, {payload}) => state.filter(item => item.id !== payload)
})

const filterContactsReducer = createReducer("", {
    [filterContacts]:(_,{payload}) => payload
})

const phoneBookReducer = combineReducers({
    item: contactsItemReducer,
    filter: filterContactsReducer  
})

export default phoneBookReducer