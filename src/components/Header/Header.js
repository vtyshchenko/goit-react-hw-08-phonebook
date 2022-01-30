import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import authSelectors from '../../redux/auth/authSelectors';
import styles from './Header.module.scss';

import Container from '../Container';
import { CustomLink } from '../CustomLink/CustomLink';

export default function Header() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  console.log('isLoggedIn', isLoggedIn);
  return (
    <>
      <Container>
        <header className={styles.header}>
          <CustomLink to="/">
            <h2>Phonebook</h2>
          </CustomLink>
          {isLoggedIn ? <UserMenu /> : <Navigation />}
        </header>

        <Outlet />
      </Container>
    </>
  );
}
