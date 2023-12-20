import React from "react";
import "./game_style.css";
import "../../resize_style.css";

export interface GameType {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

interface Props {
  game: GameType;
}

const Game = ({ game }: Props) => {
  return (
    <div className="card">
      <img src={game.thumbnail} alt={game.title} />
      <div className="card-img-overlay image_overlay">
        <h4 className="card-title">{game.title}</h4>
        <p className="card-text">{game.short_description}</p>
        <p className="card-text">Genre: {game.genre}</p>
      </div>
    </div>
  );
};

export default Game;
