import PropTypes from 'prop-types';

import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, ...otherProps }) {
  return (
    <ul className={s.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} {...otherProps} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
