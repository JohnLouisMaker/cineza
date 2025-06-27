import axios from "axios";


const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjc4OWMyNzdjZjA5N2EyMzhmZTA0MWY3NzlhNjJkZCIsIm5iZiI6MTc1MDQ0NTEyMy43ODcwMDAyLCJzdWIiOiI2ODU1YWM0M2FiOThjN2RhNTdhZTE2M2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_c-rBfCh_-_2zkT4KXyRddbH_GNr7DGrGVOTUbQwcU`,
    "Content-Type": "application/json;charset=utf-8",
  },
});


export const getPopularMovies = async () => {
  const res = await api.get("/movie/popular?language=pt-BR");
  return res.data.results;
};


export const getNowPlayingMovies = async () => {
  const res = await api.get("/movie/now_playing?language=pt-BR");
  return res.data.results;
};


export const getTopRatedMovies = async () => {
  const res = await api.get("/movie/top_rated?language=pt-BR");
  return res.data.results;
};


export const getMoviesByGenre = async (genreId) => {
  const res = await api.get(
    `/discover/movie?language=pt-BR&with_genres=${genreId}`
  );
  return res.data.results;
};


export const searchMovies = async (query) => {
  const res = await api.get(
    `/search/movie?language=pt-BR&query=${encodeURIComponent(query)}`
  );
  return res.data.results;
};
