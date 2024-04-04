import axios from "axios";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "<http://hn.algolia.com/api/v1/search?tags=front_page>"
      );
      setArticles(response.data.hits);
      console.log(response.data);
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
