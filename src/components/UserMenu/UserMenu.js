import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/authSelectors';
import { logoutUser } from '../../redux/auth/authOperations';
import defaultAvatar from '../../images/no-foto-male.jpg';

import styles from './UserMenu.module.scss';

function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;

  return (
    <div className={styles.info}>
      <img className={styles.avatar} src={avatar} alt="" width={'32'} />
      <p>
        Wellcome, <span className={styles.name}>{name}</span>
      </p>
      <button className={styles.button} type="button" onClick={() => dispatch(logoutUser())}>
        Exit
      </button>
    </div>
  );
}

export default UserMenu;
