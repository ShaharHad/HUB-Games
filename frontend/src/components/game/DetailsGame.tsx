import React from "react";

interface MinimumSystemRequirementsType {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface Screenshot {
  id: number;
  image: string;
}

export interface DetailsGameType {
  id: string;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: MinimumSystemRequirementsType;
  screenshots: Screenshot[];
}

interface IProps {
  game: DetailsGameType | null;
}

const DetailsGame = ({ game }: IProps) => {
  return (
    <div className="container">
      {game !== null ? (
        <>
          <div className="row">
            <div className="col col-lg-6 text-lg-end">
              <div className="card">
                <img
                  className="img-thumbnail"
                  src={game.thumbnail}
                  alt={game.title}
                />
              </div>
            </div>
            <div className="col col-lg-6 text-lg-start">
              <p>Name: {game.title}</p>
              <p>Genre: {game.genre}</p>
              <p>Platform: {game.platform}</p>
              <p>Developer: {game.developer}</p>
              <p>Publisher: {game.publisher}</p>
              <p>Release Date: {game.release_date}</p>
            </div>
          </div>
          <div className="row row-cols-lg-3">
            {game.screenshots.map((screenshot, index) => (
              <div className="col" key={index}>
                <img
                  className="img-thumbnail "
                  src={screenshot.image}
                  alt={screenshot.id.toString()}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsGame;
