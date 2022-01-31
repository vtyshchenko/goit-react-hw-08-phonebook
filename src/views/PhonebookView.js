import styles from './views.module.scss';
import { CustomLink } from '../components/CustomLink/CustomLink';
import { useSelector } from 'react-redux';

import authSelectors from '../redux/auth/authSelectors';
import Phonebook from '../components/Phonebook';

export default function PhonebookView() {
  const loggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      {loggedIn ? (
        <Phonebook />
      ) : (
        <p className={styles.title}>
          Please <CustomLink to="/register">register</CustomLink> or
          <CustomLink to="/login">login</CustomLink>
        </p>
      )}
      ;
    </>
  );
}
