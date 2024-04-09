const ImageCard = ({
  data: { urls, alt_description, likes, description, links },
  handleImgClick,
}) => {
  function handleClick() {
    const content = {
      src: urls.regular,
      alt_description,
      likes,
      description,
      downloadSrc: links.download,
    };

    handleImgClick(content);
  }

  return (
    <div>
      <img
        src={urls.small}
        alt={alt_description}
        width={400}
        height={270}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;
