import { Link, useMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './CustomLink.module.scss';

export const CustomLink = ({ to, children, ...props }) => {
  const match = useMatch({ path: to, end: true });
  const location = useLocation();

  const isActive = match || location.pathname.split('/').pop() === to;

  const styleLink = `${styles.link} ${isActive ? styles.colorActive : styles.colorDisabled}`;
  return (
    <Link to={to} className={`${styleLink}`} {...props}>
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  props: PropTypes.array,
};
