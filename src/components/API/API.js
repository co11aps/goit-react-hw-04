import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const fetchImages = async (query, page = 1) => {
  const params = {
    query,
    page,
    per_page: 9,
    orientation: "landscape",
    client_id: import.meta.env.VITE_ACCESS_KEY,
  };

  const res = await axios.get("/search/photos", { params });
  return res.data;
};

export { fetchImages };
