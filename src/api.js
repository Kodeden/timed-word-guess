import ky from "ky";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export default {
  show(query) {
    return ky
      .get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`)
      .json();
  },
};
