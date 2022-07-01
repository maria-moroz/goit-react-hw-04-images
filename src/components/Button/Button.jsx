import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ text = '', onClick }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
