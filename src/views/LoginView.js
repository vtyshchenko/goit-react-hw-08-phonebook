import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { loginUser } from '../redux/auth/authOperations';
import styles from './views.module.scss';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  function reset() {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(loginUser({ email, password }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        E-mail
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="john.jonson@gmail.com"
          value={email}
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
          value={password}
          required
          onChange={handleChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginView;
