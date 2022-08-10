import {useSelector } from 'react-redux';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { actionAddContacts,removeContacts,filterContacts } from 'redux/phoneBook/phoneBookActions';
import { ToastContainer,toast } from 'react-toastify/dist/react-toastify';
import "react-toastify/dist/ReactToastify.css";
import s from './App.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';


const App = () => {
   const contactsBook = useSelector((state) => state.contacts.item);
  const filterValueName = useSelector((state) => state.contacts.filter);

  const dispatch = useDispatch()

  const [newContact, setNewContact] = useState(null);
  const [deleteContactId, setDeleteContactId] = useState(null);

  
  //ADD_CONTACT
  const confirmContact = (contact) => setNewContact(contact);

  useEffect(() => {
    if (!newContact) return;
    const isHaveName = contactsBook.some(({ name }) => name === newContact.name);

    if (isHaveName) {
      toast.error(`Контакт з ${newContact.name} вже існує :((`, { icon: `❌` });
      setNewContact(null);
    }
    if (!isHaveName) {
      dispatch(actionAddContacts(newContact));
      toast.success(`Контакт  ${newContact.name} добавлено до списку контактів :))`, {
        icon: `✅`
      });
      setNewContact(null);
    }
  }, [contactsBook, dispatch, newContact]);

  // FILTER CONTACTS

  const filterChangeInput = (value) => dispatch(filterContacts(value))
  
  //Варіант з хуком USE MEMO
  const filterContactsName = useMemo(() => {
    const normalizedFilter = filterValueName.toLowerCase();

    const finalArray = contactsBook && contactsBook.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));

    if (finalArray.length === 0 && filterValueName !== "") {
      toast.info(`Усі контакти по запиту "${filterValueName.toUpperCase()}" були видалені ...✋!!`)
      toast.warning(`Очистіть поле для запиту, щоб побачити усі контакти :)))`)
    }
    return finalArray;
  }, [contactsBook, filterValueName]);
  
  //DELETE_CONTACT 

  const onDeleteContact = useCallback((id) => setDeleteContactId(id),[]);

  useEffect(() => {
    if (!deleteContactId) return;
    dispatch(removeContacts(deleteContactId));
    toast.success(`Контакт видалений зі списку контактів :))`, {
        icon: `❎`
      });
    setDeleteContactId(null);

  }, [deleteContactId, dispatch])
  
  return (


     <div className={s.app}>
      
      {<ContactForm
        confirmContact={confirmContact}
      />}
    {contactsBook.length > 0 && (
        <Filter
          filterChangeInput={filterChangeInput}
          value={filterValueName}
      />
  )}
    {!contactsBook.length  && <p>Please, add contact!</p>}
      <ContactList
        filterContactsName={filterContactsName}
        onDeleteContact={onDeleteContact}
      />
      <ToastContainer theme="dark"/>
    </div>

  );
};


export default App;
