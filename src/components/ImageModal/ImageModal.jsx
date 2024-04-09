import Modal from "react-modal";

const ImageModal = ({
  onRequestOpen,
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
        className="Modal"
        overlayClassName="Overlay"
      >
        <img src={src} alt={alt_description} />
        <p>{likes}</p>
        <p>{description}</p>
        <a href={downloadSrc}>Download full size image</a>
        <button onClick={() => onRequestClose()}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default ImageModal;
