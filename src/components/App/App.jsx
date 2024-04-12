import { useEffect, useRef, useState } from "react";
import { fetchImages } from "../API/API";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";
import css from "./App.module.css";

Modal.setAppElement("#root");

const App = () => {
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [nothingFoundError, setNothingFoundError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [totalPages, setTotalPages] = useState(null);
  const loadMoreBtnRef = useRef(null);

  const onSubmit = (searchQuery) => {
    setImages([]);
    setPage(1);
    setTotalPages(null);
    setNothingFoundError(false);
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    setIsMoreBtn(totalPages && totalPages !== page);
  }, [totalPages, page]);

  useEffect(() => {
    if (loadMoreBtnRef.current) {
      loadMoreBtnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [images]);

  useEffect(() => {
    if (!searchQuery) return;

    async function loadImages() {
      try {
        setError(false);
        setLoader(true);
        const imgs = await fetchImages(searchQuery, page);
        if (imgs.results.length === 0) {
          setNothingFoundError(true);
          return;
        }
        setTotalPages(imgs.total_pages);
        setImages((prevImgs) => [...prevImgs, ...imgs.results]);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoader(false);
      }
    }

    loadImages();
  }, [searchQuery, page]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  function openModal() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setIsOpen(false);
    setModalContent({});
    document.body.style.overflow = "";
  }

  function handleOpenModal(content) {
    setModalContent(content);
    openModal();
  }

  return (
    <div className={css.wrapper}>
      <SearchBar onSearch={onSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handleImgClick={handleOpenModal} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        content={modalContent}
      />
      {error && <ErrorMessage />}
      {nothingFoundError && (
        <p className={css.text}>Nothing found. Try something else</p>
      )}
      {loader && <Loader />}
      {isMoreBtn && <LoadMoreBtn onLoadMore={loadMoreImages} />}
      <div ref={loadMoreBtnRef} />
    </div>
  );
};

export default App;
