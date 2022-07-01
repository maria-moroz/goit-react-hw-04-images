import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../images/search_icon.svg';

class Searchbar extends Component {
  state = {
    filter: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    const { filter } = this.state;

    e.preventDefault();
    onSubmit(filter);
  };

  render() {
    const { filter } = this.state;
    return (
      <header className={s.container}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
