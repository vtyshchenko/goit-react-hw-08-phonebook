import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Phonebook.module.scss';
import Contacts from './Contacts';
import AddContact from './AddContact';
import Filter from './Filter';
import { fetchContacts } from '../../redux/contacts/contactSlice';

function Phonebook() {
  const { items: contacts, status, error } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const isShowFilter = contacts && contacts.length > 1;

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <div className={styles.componenet}>
      <h1 className={styles.title}>Phonebook</h1>
      <AddContact />
      <h2 className={styles.title}>Contacts</h2>
      {isShowFilter && <Filter />}

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Server error: {error}</h2>}
      {status === 'resolved' && <Contacts />}
    </div>
  );
}

export default Phonebook;
