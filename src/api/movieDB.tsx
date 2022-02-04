import axios from "axios";

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: "7f97a1252e0a5aa04f4ec1ee455e1cc6",
    language: "es-ES"
  }
});

export default movieDB;