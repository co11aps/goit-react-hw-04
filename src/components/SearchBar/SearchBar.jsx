import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value.trim();
    if (!topic) {
      toast.error("Please enter something to search for!");
      return;
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
