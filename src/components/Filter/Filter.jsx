import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { filterContacts } from 'redux/phoneBook/phoneBookActions';

import Input from '../../common/Input';

function Filter() {
  const valueFilterContacts = useSelector((state) => state.contacts.filter)
  const dispatch = useDispatch()
  

  return (
    <Input
      label="Find contacts by name"
      type="text"
      onChange={(event)=>dispatch(filterContacts(event))}
      name="filter"
      value={valueFilterContacts}
    />
  );
}

Filter.propTypes = {
  onChangeDate: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;

