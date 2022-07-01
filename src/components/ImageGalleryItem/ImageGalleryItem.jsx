import PropTypes from 'prop-types';
import { Component } from 'react';

import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onImageClick = () => {
    const { image, onClick } = this.props;
    onClick(image);
  };

  render() {
    const { image } = this.props;
    const { webformatURL } = image;
    return (
      <li className={s.item} onClick={this.onImageClick}>
        <img className={s.image} src={webformatURL} alt={webformatURL} />
      </li>
    );
  }
}

export default ImageGalleryItem;
