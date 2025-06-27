import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function MovieCard({ movie }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 50); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={() =>
        window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank")
      }
      className={`bg-zinc-900 rounded-lg overflow-hidden shadow-md transition-all duration-500 ease-in-out 
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
        hover:scale-[1.03] hover:shadow-yellow-500/45`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />

      <div className="p-3">
        <h2 className="text-sm font-semibold text-white truncate">
          {movie.title}
        </h2>

        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-zinc-300 flex items-center gap-2">
            <FaStar className="text-yellow-200" /> {movie.vote_average}
          </span>
        </div>
      </div>
    </div>
  );
}
