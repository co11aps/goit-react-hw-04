import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { FaHeart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const ImageModal = ({
  isOpen,
  onRequestClose,
  content: { src, alt_description, likes, description },
}) => {
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
        <div className={css.bottom}>
          <div className={css.descr}>{description}</div>
          <p className={css.likes}>
            <FaHeart />
            <br />
            {likes}
          </p>
        </div>

        <button className={css.close} onClick={() => onRequestClose()}>
          <AiOutlineClose />
        </button>
      </Modal>
    </div>
  );
};

export default ImageModal;
