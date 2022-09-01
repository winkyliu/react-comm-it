import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "2519ce603e3f4448fb8a41a64ecd74dc",
        language: "en",
        include_adult: false,
    },
});

export default api;