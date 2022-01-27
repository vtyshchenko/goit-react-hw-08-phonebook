import { useSelector } from 'react-redux';

import { getFilteredContacts } from '../../../redux/contacts/contactSelectors';
import ContactsItem from './ContactsItem';
import styles from './Contacts.module.scss';

function Contacts() {
  let state = useSelector(st => st);

  const contactsList = getFilteredContacts(state);

  return contactsList && contactsList.length > 0 ? (
    <ul>
      {contactsList.map(contactsItem => (
        <li key={contactsItem.id} className={styles.item}>
          <ContactsItem item={contactsItem} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No contacts here</p>
  );
}

export default Contacts;
