// import { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import s from './App.module.css';


const App = () => {

  const contactsBook = useSelector((state) => state.contacts.item)
  const filterBookContacts = useSelector((state) => state.contacts.filter)
 
  const normalizeName = name =>
    name
      .split(' ')
      .map(word => {
        const firstUpCaseLetter = word.charAt(0).toUpperCase();
        const anoterLetter = word.substring(1);
        return `${firstUpCaseLetter}${anoterLetter}`;
      })
      .join(' ');


  return (
    <div className={s.app}>
      <h1>Phonebook</h1>
      <ContactForm  normalizeName={normalizeName}/>
      <h2>Contacts</h2>

    {contactsBook.length > 1 && (
    <Filter
      value={contactsBook.length < 1 ? '' : filterBookContacts}
    />
  )}

      {!contactsBook.length && <p>Please, add contact!</p>}
        <ContactList
          normalizeName={normalizeName}
        />
      
    </div>
  );
};


export default App;
