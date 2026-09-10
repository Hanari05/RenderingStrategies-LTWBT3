import Image from "next/image";

export type Game = {
  id: number;
  title: string;
  genre: string;
  platform: string;
  year: number;
  rating: number;
  status: string;
  image: string;
};

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <article className="game-card">
      <div className="game-cover">
        <Image
          src={game.image}
          alt={`Ảnh bìa game ${game.title}`}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 940px) 50vw, 25vw"
          unoptimized
        />
        <small className="game-year">{game.year}</small>
      </div>

      <div className="game-info">
        <div>
          <p className="game-genre">{game.genre}</p>
          <h2>{game.title}</h2>
        </div>

        <p className="game-platform">{game.platform}</p>

        <div className="game-meta">
          <span className="status">{game.status}</span>
          <span className="rating" aria-label={`Điểm số ${game.rating} trên 10`}>
            ★ {game.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
