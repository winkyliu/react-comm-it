import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_TMDB_BASE_URL,
    params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: process.env.REACT_APP_TMDB_LANGUAGE,
        include_adult: false,
    },
});

export default api;