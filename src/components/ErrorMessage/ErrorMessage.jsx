import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.text}>
      Something went wrong. Please try to reload the page.
    </p>
  );
};

export default ErrorMessage;
