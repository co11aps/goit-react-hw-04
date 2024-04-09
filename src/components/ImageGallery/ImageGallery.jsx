import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, handleImgClick }) => {
  return (
    <ul className={css.imgList}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard data={image} handleImgClick={handleImgClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
