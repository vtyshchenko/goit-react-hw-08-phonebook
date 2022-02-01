import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import Container from '../Container';
import { CustomLink } from '../CustomLink/CustomLink';
import authSelectors from '../../redux/auth/authSelectors';
import styles from './Header.module.scss';

export default function Header() {
  const loggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      <Container>
        <header className={styles.header}>
          <CustomLink to="/">
            <h2>Phonebook</h2>
          </CustomLink>

          <CustomLink to="/contacts">Contacts</CustomLink>
          {loggedIn ? <UserMenu /> : <Navigation />}
        </header>

        <Outlet />
      </Container>
    </>
  );
}
