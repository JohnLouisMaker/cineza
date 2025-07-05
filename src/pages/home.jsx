import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getMoviesByGenre,
  searchMovies,
} from "../services/datamovie";
import Header from "../components/header";
import Section from "../components/section";
import Footer from "../components/footer";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pop = await getPopularMovies();
      const top = await getTopRatedMovies();
      const now = await getNowPlayingMovies();

      const action = await getMoviesByGenre(28);
      const comedy = await getMoviesByGenre(35);
      const animation = await getMoviesByGenre(16);
      const romance = await getMoviesByGenre(10749);
      const family = await getMoviesByGenre(10751);

      setPopular(pop);
      setTopRated(top);
      setNowPlaying(now);

      setActionMovies(action);
      setComedyMovies(comedy);
      setAnimationMovies(animation);
      setRomanceMovies(romance);
      setFamilyMovies(family);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSearch() {
      if (search.trim().length > 0) {
        const results = await searchMovies(search);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }

    fetchSearch();
  }, [search]);

  return (
    <div className="bg-zinc-950 min-h-screen max-w-full">
      <Header setSearch={setSearch} />

      <main className="max-w-7xl mt-7 sm:mt-14 mx-auto px-6 py-10 space-y-12 animate-fade-in">
        {searchResults.length > 0 ? (
          <Section
            title={`Resultados para "${search}"`}
            movies={searchResults}
          />
        ) : (
          <>
            <Section title="Filmes Populares" movies={popular} />
            <Section title="Mais bem avaliados" movies={topRated} />
            <Section
              title="Lançamentos recentes"
              movies={nowPlaying}
       
            />

            <Section
              id="inicio"
              title="Filmes Populares"
              movies={popular}
    
            />
            <Section
              id="top"
              title="Mais bem avaliados"
              movies={topRated}
          
            />
            <Section
              id="lancamentos"
              title="Lançamentos recentes"
              movies={nowPlaying}
         
            />

            <Section id="acao" title="Ação" movies={actionMovies} />
            <Section
              id="comedia"
              title="Comédia"
              movies={comedyMovies}
            />
            <Section
              id="animacao"
              title="Animação"
              movies={animationMovies}
            />
            <Section
              id="romance"
              title="Romance"
              movies={romanceMovies}
            />
            <Section
              id="familia"
              title="Família"
              movies={familyMovies}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
