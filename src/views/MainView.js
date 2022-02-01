import { useSelector } from 'react-redux';

import { CustomLink } from '../components/CustomLink/CustomLink';
import authSelectors from '../redux/auth/authSelectors';
import styles from './views.module.scss';

export default function MainView() {
  const notLoggedIn = !useSelector(authSelectors.getIsLoggedIn);
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>Wellcome to my site!</h1>
      {notLoggedIn && (
        <p className={styles.text}>
          This website is made for people to save contacts in the personal account. To save them,
          you should<CustomLink to="/register">register</CustomLink>or
          <CustomLink to="/login">login</CustomLink>.
        </p>
      )}
      ;
    </div>
  );
}
