import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { addNewContact } from '../../../redux/contacts/contactSlice';
import styles from './AddContact.module.scss';

function AddContact() {
  const [namePeople, setNamePeople] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'phone':
        setPhone(value);
        break;
      case 'namePeople':
        setNamePeople(value);
        break;
      default:
        break;
    }
  };

  function reset() {
    setNamePeople('');
    setPhone('');
  }

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(addNewContact({ name: namePeople, phone }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name
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
      </label>

      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          name="phone"
          placeholder="123-55-66"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default AddContact;
