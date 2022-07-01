import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../images/search_icon.svg';

export default function Searchbar({ onSubmit }) {
  const [filter, setFilter] = useState('');

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(filter);
  };

  return (
    <header className={s.container}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span>
            <SearchIcon width="28" height="28" />
          </span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={filter}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
