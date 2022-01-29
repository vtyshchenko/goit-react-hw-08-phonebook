import { CustomLink } from '../CustomLink/CustomLink';

export default function Navigation() {
  return (
    <nav>
      <CustomLink to="/contacts">Phonebook</CustomLink>
      <CustomLink to="/register">Register</CustomLink>
      <CustomLink to="/login">Login</CustomLink>
    </nav>
  );
}
