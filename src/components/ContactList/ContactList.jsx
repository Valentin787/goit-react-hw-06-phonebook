import PropTypes from 'prop-types';
import ItemContact from './ItemContact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';

const ContactList = props => {
  const { normalizeName } = props;
  const contactsBook = useSelector((state) => state.contacts.item)
  const filterBookContacts = useSelector((state) => state.contacts.filter)


  const filterContacts = word => {
    const arrayFilter = contactsBook.filter(({ name }) =>
      name.toLowerCase().includes(word),
    );
    return arrayFilter;
  };
  

  return (
    <ul className={s.list}>
      {filterContacts(filterBookContacts).map(({ id, name, number }) => {
        return (
          <ItemContact
            id={id}
            key={id}
            name={name}
            number={number}
            normalizeName={normalizeName}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  filterName: PropTypes.string,
  filterContacts: PropTypes.func,
  onClickBtnDel: PropTypes.func,
  normalizeName: PropTypes.func,
};

export default ContactList;
