import styles from './views.module.scss';
import { CustomLink } from '../components/CustomLink/CustomLink';
import { useSelector } from 'react-redux';

import authSelectors from '../redux/auth/authSelectors';

export default function MainView() {
  const notLoggedIn = !useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      <h1 className={styles.title}>Wellcome on our site!</h1>
      {notLoggedIn && (
        <p className={styles.title}>
          Please <CustomLink to="/register">register</CustomLink> or{' '}
          <CustomLink to="/login">login</CustomLink>
        </p>
      )}
      ;
    </>
  );
}
