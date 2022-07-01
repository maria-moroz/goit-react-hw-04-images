import { useState, useEffect } from 'react';
import s from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorView from './ErrorView/ErrorView';

import * as API from '../services/api';
import { useRef } from 'react';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  ERROR: 'error',
  MODAL: 'modal',
};

export default function App() {
  const [filter, setFilter] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  let prevFilter = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      if (filter === '') {
        setStatus(Status.ERROR);
        return;
      }

      setStatus(Status.PENDING);

      try {
        const { hits, total } = await API.getImages(filter, page);

        setImages(prev => [...prev, ...hits]);
        setStatus(Status.RESOLVED);
        setTotal(total);

        if (hits.length === 0) {
          setStatus(Status.ERROR);
        }
      } catch (error) {
        console.log(error);
        setStatus(Status.ERROR);
      }
    };

    if (filter !== null) {
      fetchImages();
    }

    prevFilter.current = filter;
  }, [filter, page]);

  const handleSearchbarSubmit = filter => {
    if (prevFilter.current !== filter) {
      setImages([]);
      setPage(1);
    }

    setFilter(filter);
  };

  const handleLoadMoreButtonClick = () => {
    setPage(page => page + 1);
  };

  const handleImageClick = image => {
    setCurrentImage(image);
    setStatus(Status.MODAL);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSearchbarSubmit} />

      {images.length !== 0 && (
        <>
          <ImageGallery images={images} onClick={handleImageClick} />
          {status === Status.RESOLVED && images.length !== total && (
            <Button text="Load more" onClick={handleLoadMoreButtonClick} />
          )}
        </>
      )}

      {status === Status.PENDING && <Loader />}

      {status === Status.ERROR && <ErrorView />}

      {status === Status.MODAL && (
        <Modal
          image={currentImage}
          onClose={() => setStatus(Status.RESOLVED)}
        />
      )}
    </div>
  );
}
