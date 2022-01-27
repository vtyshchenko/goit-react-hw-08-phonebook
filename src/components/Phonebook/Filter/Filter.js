import { useDispatch, useSelector } from 'react-redux';

import { changeFilter } from '../../../redux/contacts/contactSlice';

import styles from './Filter.module.scss';

function Filter() {
  const dispatch = useDispatch();
  const filterText = useSelector(state => state.contacts.filterText);

  return (
    <>
      <label className={styles.label}>
        Find contscts by name
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="John Jonson"
          value={filterText}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => {
            dispatch(changeFilter({ filterText: e.target.value }));
          }}
        />
      </label>
    </>
  );
}

export default Filter;
