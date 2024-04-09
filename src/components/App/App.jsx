import { useEffect, useRef, useState } from "react";
import { fetchImages } from "../API/API";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";

Modal.setAppElement("#root");

const App = () => {
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [nothingFoundError, setNothingFoundError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQ] = useState("");
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [totalPages, settotalPages] = useState(1);

  function resetPage() {
    setError(false);
    setLoader(true);
    setImages([]);
    setNothingFoundError(false);
    setPage(1);
  }

  useEffect(() => {
    setIsMoreBtn(totalPages && totalPages > page);
  }, [totalPages, page]);

  async function loadImages(query) {
    try {
      resetPage();
      setSearchQ(query);
      const imgs = await fetchImages(query);
      if (imgs.results.length === 0) {
        setNothingFoundError(true);
        return;
      }
      settotalPages(imgs.total_pages);
      setImages(imgs.results);
    } catch (error) {
      setError(true);
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  }

  async function loadMoreImages() {
    try {
      setPage((prevPage) => prevPage + 1);
      const newImgs = await fetchImages(searchQuery, page + 1);
      setImages((prevImgs) => [...prevImgs, ...newImgs.results]);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleOpenModal(content) {
    setModalContent(content);
    openModal();
  }

  return (
    <>
      <SearchBar onSearch={loadImages} />
      {images.length > 0 && (
        <ImageGallery images={images} handleImgClick={handleOpenModal} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        content={modalContent}
      />
      {error && <ErrorMessage />}
      {nothingFoundError && <p>Nothing found. Try something else</p>}
      {loader && <Loader />}
      {isMoreBtn && <LoadMoreBtn onLoadMore={loadMoreImages} />}
    </>
  );
};

export default App;
