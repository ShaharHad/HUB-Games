import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../state/store";
import { setUser } from "../../state/user/user_slice";
import { SummeryGameType } from "../../components/game/SummeryGame/SummeryGame";
import Games from "../../components/game/Games";
// import NavigationBar from "../../components/navigation_bar/NavigationBar.tsx.old";
import { getAllGames } from "../../services/games/GameService";
import { getUser } from "../../services/user/UserService";

const Home = () => {
  const [games, setGames] = useState<Array<SummeryGameType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [gamesRes, gamesErr] = getAllGames();
  // TODO caught error
  useEffect(() => {
    setGames(gamesRes?.data ? gamesRes.data : []);
    setIsLoading(false);
  }, [gamesRes]);

  //get user and add it to state management
  const [userRes, userErr] = getUser();
  // TODO caught error
  useEffect(() => {
    dispatch(setUser(gamesRes?.data));
    setIsLoading(false);
  }, [userRes]);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="pt-5 mt-5">
          <Games games_list={games} size={3} />
        </div>
      )}
    </div>
  );
};

export default Home;
