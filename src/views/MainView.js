import styles from './views.module.scss';
import { CustomLink } from '../components/CustomLink/CustomLink';

export default function MainView() {
  return (
    <>
      <h1 className={styles.title}>Wellcome on oue site!</h1>
      <p className={styles.title}>
        Please <CustomLink to="/register">register</CustomLink> or{' '}
        <CustomLink to="/login">login</CustomLink>
      </p>
      ;
    </>
  );
}
