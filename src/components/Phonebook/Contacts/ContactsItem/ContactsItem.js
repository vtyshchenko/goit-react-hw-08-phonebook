import styles from './ContactsItem.module.scss';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContacts, editContacts } from '../../../../redux/contacts/contactSlice';

const ContactsItem = ({ item }) => {
  const [namePeople, setNamePeople] = useState(item.name);
  const [number, setNumber] = useState(item.number);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onDeleteClick = event => {
    event.target.disabled = true;
    dispatch(deleteContacts({ id: item.id }));
  };

  const onEditClick = event => {
    event.target.disabled = true;
    setIsEdit(true);
  };

  const onOkClick = event => {
    event.target.disabled = true;
    dispatch(editContacts({ id: item.id, name: namePeople, number }));
    setIsEdit(false);
  };

  const onCancelClick = event => {
    event.target.disabled = true;
    setIsEdit(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'number':
        setNumber(value);
        break;
      case 'namePeople':
        setNamePeople(value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      {isEdit ? (
        <div className={styles.editContacts}>
          <input
            className={styles.input}
            type="text"
            name="namePeople"
            placeholder="John Jonson"
            value={namePeople}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="tel"
            name="number"
            placeholder="123-55-66"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
          <div>
            <button className={styles.button} id={`id${item.id}`} type="button" onClick={onOkClick}>
              Ok
            </button>
            <button
              className={styles.button}
              id={`id${item.id}`}
              type="button"
              onClick={onCancelClick}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span>
            {item.name}: {item.number}
          </span>

          <div>
            <button
              className={styles.button}
              id={`id${item.id}`}
              type="button"
              onClick={onEditClick}
            >
              Edit
            </button>
            <button
              className={styles.buttonDelete}
              id={`id${item.id}`}
              type="button"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

ContactsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactsItem;
