import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { nanoid } from 'nanoid';
import { actionAddContacts } from 'redux/phoneBook/phoneBookActions';
import Input from '../../common/Input';
import s from './ContactForm.module.css';

const ContactForm = ({normalizeName}) => {
   const contactsBook = useSelector((state) => state.contacts.item)
  const dispatch = useDispatch()
  const [dataForm, setdataForm] = useState({
    name: '',
    number: '',
   
  });

  const resetForm = () =>
    setdataForm({
      name: '',
      number: '',
    });

  const addDataForm = e => {
    return setdataForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubFormData = e => {
    e.preventDefault();

    const objData = {
      id: nanoid(),
      ...dataForm
    };
    const isHaveName = contactsBook.some(({ name }) => name === objData.name);

    if (isHaveName) {
      return alert(`${normalizeName(objData.name)} is alredy in contacts.`);
    };
   
    dispatch(actionAddContacts(objData))
    resetForm();
  };

  const { name, number } = dataForm;
  return (
    <form onSubmit={onSubFormData} className={s.form}>
      <Input
        label="Name"
        type="text"
        name="name"
        onChange={addDataForm}
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <Input
        label="Number"
        type="tel"
        name="number"
        onChange={addDataForm}
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={s.btnAdd}>
        {' '}
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

