import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { registerUser } from '../redux/auth/authOperations';
import styles from './views.module.scss';

function RegisterView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'userName':
        return setUserName(value);
      default:
        return;
    }
  };

  function reset() {
    setEmail('');
    setPassword('');
    setUserName('');
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(registerUser({ email, password, name: userName }));

    console.log(email, password, userName);

    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          name="userName"
          placeholder="John Jonson"
          value={userName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        E-mail
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="john.jonson@gmail.com"
          value={email}
          //   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          //   title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Password
        <input
          className={styles.input}
          type="password"
          name="password"
          //   placeholder="123-55-66"
          value={password}
          //   pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          //   title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Register
      </button>
    </form>
  );
}

export default RegisterView;
