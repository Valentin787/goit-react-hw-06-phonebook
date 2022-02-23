import PropTypes from 'prop-types';
import s from './ItemContact.module.css';
import { removeContacts } from 'redux/phoneBook/phoneBookActions'; 
import { useDispatch } from 'react-redux';

const ItemContact = ({ name, number,id, normalizeName }) => {

  const dispatch = useDispatch()
  return (
    <li className={s.item} id={id}>
      {normalizeName(name)}: {number}
      <button
        className={s.btnDel}
        onClick={()=>dispatch(removeContacts(id))
        }
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ItemContact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ItemContact;

