import { CustomLink } from '../CustomLink/CustomLink';
import styles from './Navigation.module.scss';

export default function Navigation({ linksData, styleNav }) {
  let styleList = styleNav ? `${styles.linkList} ${styleNav}` : styles.linkList;

  return (
    linksData && (
      <nav>
        <ul className={styleList}>
          {linksData.map(({ path, name }) => {
            return (
              <li key={name}>
                <CustomLink to={path}>{name}</CustomLink>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
}
