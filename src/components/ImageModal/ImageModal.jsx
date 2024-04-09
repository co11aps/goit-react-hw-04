import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({
  isOpen,
  onRequestClose,
  content: { src, alt_description, likes, description, downloadSrc },
}) => {
  // function handleOpenModal() {
  //   onRequestOpen();
  // }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={() => onRequestClose()}
        shouldCloseOnOverlayClick={true}
        className={css.Modal}
        overlayClassName={css.Overlay}
      >
        <img src={src} alt={alt_description} />
        <p>{description}</p>
        <p>{likes}</p>
        <a href={downloadSrc}>Download full size image</a>
        <button className={css.close} onClick={() => onRequestClose()}>
          x
        </button>
      </Modal>
    </div>
  );
};

export default ImageModal;
