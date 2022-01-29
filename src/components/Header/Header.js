import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

import Container from '../Container';
import { CustomLink } from '../CustomLink/CustomLink';

export default function Header() {
  return (
    <>
      <Container>
        <header className={styles.header}>
          <CustomLink to="/">
            <h2>Phonebook</h2>
          </CustomLink>

          <Navigation />
        </header>

        <Outlet />
      </Container>
    </>
  );
}
