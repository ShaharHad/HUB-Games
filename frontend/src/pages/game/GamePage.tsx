import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailsGame, {
  DetailsGameType,
} from "../../components/game/DetailsGame";
import { getGameDetails } from "../../services/games/GameService";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const game_id = location.state;
  const [loading, setLoading] = useState(true);
  const [detailsGame, setDetailsGame] = useState<DetailsGameType | null>(null);
  const [gameDetailsRes, gameDetailsErr] = getGameDetails(game_id);
  let game: DetailsGameType | null = null;
  // TODO caught error
  useEffect(() => {
    setDetailsGame(gameDetailsRes?.data ? gameDetailsRes?.data : null);
    setLoading(false);
  }, [gameDetailsRes]);

  return (
    <div className="container mt-5 p-5">
      {loading ? (
        <div>
          <div>loading</div>
        </div>
      ) : (
        <>
          <button className="btn btn-success mb-3" onClick={() => navigate(-1)}>
            Previos
          </button>
          <DetailsGame game={detailsGame}></DetailsGame>
        </>
      )}
    </div>
  );
};

export default GamePage;
