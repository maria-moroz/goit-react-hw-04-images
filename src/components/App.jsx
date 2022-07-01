import { Component } from 'react';
import s from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorView from './ErrorView/ErrorView';

import * as API from '../services/api';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  ERROR: 'error',
  MODAL: 'modal',
};

class App extends Component {
  state = {
    filter: null,
    images: [],
    page: 1,
    total: 0,
    status: '',
    currentImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { filter, page } = this.state;

    if (prevState.filter !== filter || prevState.page !== page) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { filter, page } = this.state;
    if (filter === '') {
      this.setState({ status: Status.ERROR });
      return;
    }

    this.setState({ status: Status.PENDING });

    try {
      const { hits, total } = await API.getImages(filter, page);

      this.setState(prev => ({ images: [...prev.images, ...hits] }));
      this.setState({ status: Status.RESOLVED, total: total });

      if (hits.length === 0) {
        this.setState({ status: Status.ERROR });
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: Status.ERROR });
    }
  };

  handleSearchbarSubmit = filter => {
    this.setState({ images: [], filter, page: 1 });
  };

  handleLoadMoreButtonClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleImageClick = image => {
    this.setState({ currentImage: image, status: 'modal' });
  };

  handleModalClose = () => {
    this.setState({ status: 'resolved' });
  };

  render() {
    const { images, status, currentImage, total } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />

        {images.length !== 0 && (
          <>
            <ImageGallery images={images} onClick={this.handleImageClick} />
            {status === 'resolved' && images.length !== total && (
              <Button
                text="Load more"
                onClick={this.handleLoadMoreButtonClick}
              />
            )}
          </>
        )}

        {status === Status.PENDING && <Loader />}

        {status === Status.ERROR && <ErrorView />}

        {status === Status.MODAL && (
          <Modal image={currentImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default App;
