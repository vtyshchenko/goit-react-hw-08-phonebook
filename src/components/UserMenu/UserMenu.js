import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/authSelectors';
import { logoutUser } from '../../redux/auth/authOperations';
import defaultAvatar from '../../images/no-foto-male.jpg';

import styles from './UserMenu.module.scss';

function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;
  console.log('UserMenu');

  return (
    <div>
      <img src={avatar} alt="" width={'32'} style={styles.avatar} />
      <p style={styles.name}>Wellcome, {name}</p>
      <button type="button" onClick={() => dispatch(logoutUser())}>
        Exit
      </button>
    </div>
  );
}

export default UserMenu;
