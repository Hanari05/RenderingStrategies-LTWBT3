"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GameCard, { Game } from "@/components/GameCard";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const response = await fetch("/games.json");

        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu game.");
        }

        const data: Game[] = await response.json();
        setGames(data);
      } catch {
        setError("Đã xảy ra lỗi khi tải thư viện.");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  const genres = useMemo(() => {
    return ["Tất cả", ...Array.from(new Set(games.map((game) => game.genre)))];
  }, [games]);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre = genre === "Tất cả" || game.genre === genre;

    return matchesSearch && matchesGenre;
  });

  const updateScrollButtons = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 4);
    setCanScrollRight(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 4,
    );
  }, []);

  function scrollGames(direction: -1 | 1) {
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.scrollBy({
      left: direction * Math.max(carousel.clientWidth * 0.85, 280),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const frame = requestAnimationFrame(updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [filteredGames.length, updateScrollButtons]);

  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#">GAME<span>LIB</span></a>
        <div className="render-badge">
          <span />
          Client-Side Rendering
        </div>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow">Thư viện cá nhân · Hana Rin</p>
          <h1>Khám phá thế giới game của Hana</h1>
        </div>
        <p className="description">
          Tìm kiếm và lọc những tựa game yêu thích. Dữ liệu được tải trên
          trình duyệt bằng CSR.
        </p>
      </section>

      <section className="library" aria-labelledby="library-title">
        <div className="library-heading">
          <div>
            <p className="section-number">01</p>
            <h2 id="library-title">Game Library</h2>
          </div>
          <div className="library-tools">
            {!loading && !error && (
              <p className="result-count">{filteredGames.length} trò chơi · Vuốt để xem thêm</p>
            )}
            <div className="slider-actions" aria-label="Điều khiển danh sách game">
              <button
                type="button"
                aria-label="Xem các game phía trước"
                onClick={() => scrollGames(-1)}
                disabled={!canScrollLeft}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Xem các game tiếp theo"
                onClick={() => scrollGames(1)}
                disabled={!canScrollRight}
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="controls">
          <label className="search-box">
            <span className="sr-only">Tìm kiếm game</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Tìm theo tên game..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="select-box">
            <span className="sr-only">Lọc theo thể loại</span>
            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              {genres.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        {loading && <p className="message">Đang tải thư viện game...</p>}
        {error && <p className="message error">{error}</p>}
        {!loading && !error && filteredGames.length === 0 && (
          <p className="message">Không tìm thấy trò chơi phù hợp.</p>
        )}

        {!loading && !error && (
          <div
            className="game-grid"
            ref={carouselRef}
            onScroll={updateScrollButtons}
            tabIndex={0}
            aria-label="Danh sách game có thể cuộn ngang"
          >
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>Game Library · Next.js 14</p>
        <p>Dữ liệu: public/games.json</p>
      </footer>
    </main>
  );
}
