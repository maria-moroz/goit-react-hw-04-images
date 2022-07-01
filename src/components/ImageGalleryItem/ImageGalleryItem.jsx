import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onClick }) {
  const { webformatURL } = image;
  return (
    <li className={s.item} onClick={() => onClick(image)}>
      <img className={s.image} src={webformatURL} alt={webformatURL} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
