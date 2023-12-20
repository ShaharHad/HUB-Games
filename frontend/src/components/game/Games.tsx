import Game, { GameType } from "./Game";

interface Props {
  games_list: Array<GameType>;
  size: number;
}

const Games = ({ games_list, size }: Props) => {
  return (
    <div className="container">
      <div className={`row row-cols-1 row-cols-lg-${size} g-4 py-3`}>
        {games_list.map((game, index) => (
          <div className="col" key={index}>
            <Game game={game}></Game>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
