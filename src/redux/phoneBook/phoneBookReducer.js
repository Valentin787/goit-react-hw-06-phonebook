import {combineReducers,createReducer } from "@reduxjs/toolkit";
import {actionAddContacts,removeContacts,filterContacts} from './phoneBookActions'

const initialItems = [];
const contactsItemReducer = createReducer(initialItems, {
    [actionAddContacts]: (state, { payload }) => [...state, payload],
    [removeContacts]:(state, {payload}) => state.filter(item => item.id !== payload)
})

const filterContactsReducer = createReducer("", {
    [filterContacts]: (_, { payload }) => payload.toLowerCase()
})

const phoneBookReducer = combineReducers({
    item: contactsItemReducer,
    filter: filterContactsReducer  
})

export default phoneBookReducer