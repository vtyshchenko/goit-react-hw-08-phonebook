import styles from './ContactsItem.module.scss';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { deleteContacts } from '../../../../redux/contacts/contactSlice';

const ContactsItem = ({ item }) => {
  const dispatch = useDispatch();

  const onClick = event => {
    event.target.disabled = true;
    dispatch(deleteContacts({ id: item.id }));
  };

  return (
    <>
      <span>
        {item.name}: {item.phone}
      </span>

      <button className={styles.button} id={`id${item.id}`} type="button" onClick={onClick}>
        Delete
      </button>
    </>
  );
};

ContactsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactsItem;
