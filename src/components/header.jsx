import { useEffect, useState, useRef } from "react";
import { Search, Menu } from "lucide-react";

export default function Header({ setSearch }) {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const sidebarRef = useRef();


  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        handleCloseMenu();
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);


  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      handleCloseMenu(); 
    }
  };

  useEffect(() => {
    function onScroll() {
      if (window.innerWidth >= 640) {
        setShow(true);
        return;
      }
      const currentScroll = window.pageYOffset;
      setShow(currentScroll < lastScroll);
      setLastScroll(currentScroll);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);


  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setMenuOpen(false);
    }, 300);
  };

  return (
    <>

      <header
        className={`bg-zinc-900 fixed top-0 left-0 w-full z-50 shadow-lg  transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-4 sm:gap-0">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="sm:hidden text-zinc-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-quadranta text-2xl sm:text-3xl font-extrabold text-yellow-300 tracking-wide max-w-[150px] truncate">
              Cineza
            </h1>
          </div>


          <div className="hidden sm:block relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar filme..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full bg-zinc-800 text-white border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <Search className="absolute top-2.5 left-3 w-5 h-5 text-zinc-400" />
          </div>

          <nav className="hidden sm:flex gap-4 text-lg text-zinc-300 ">
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("inicio")}
            >
              Início
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("top")}
            >
              Top
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("lancamentos")}
            >
              Lançamentos
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("acao")}
            >
              Ação
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("comedia")}
            >
              Comédia
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("romance")}
            >
              Romance
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("animacao")}
            >
              Animação
            </span>
            <span
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => scrollToSection("familia")}
            >
              Família
            </span>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 sm:hidden flex">
          <div
            ref={sidebarRef}
            className={`w-64 bg-zinc-900 h-full px-4 py-3 flex flex-col space-y-6 shadow-xl ${
              closing ? "animate-slide-out" : "animate-slide-in"
            }`}
          >
            <div className="flex justify-between items-center">
              <button onClick={handleCloseMenu} className="text-zinc-300">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col text-lg text-zinc-300 space-y-4">
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("inicio")}
              >
                Início
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("top")}
              >
                Top
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("lancamentos")}
              >
                Lançamentos
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("acao")}
              >
                Ação
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("comedia")}
              >
                Comédia
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("romance")}
              >
                Romance
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("animacao")}
              >
                Animação
              </span>
              <span
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => scrollToSection("familia")}
              >
                Família
              </span>
            </nav>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Buscar filme..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full bg-zinc-800 text-white border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
