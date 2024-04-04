import axios from "axios";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "<https://hn.algolia.com/api/v1/search?query=react>"
      );
      setArticles(response.data.hits);
      console.log(response.statusText);
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>

      <ul></ul>
    </div>
  );
};

export default App;
