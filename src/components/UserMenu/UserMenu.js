import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/authSelectors';
import { logout } from '../../redux/auth/authOperations';
import defaultAvatar from '../../images/no-foto-male.jpg';

import styles from './UserMenu.module.scss';

function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;

  return (
    <div>
      <img src={avatar} alt="" width={'32'} style={styles.avatar} />
      <p style={styles.name}>Wellcome, {name}</p>
      <button type="button" onClick={() => dispatch(logout())}>
        Exit
      </button>
    </div>
  );
}

export default UserMenu;
