import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameType } from "../../components/game/SummeryGame/SummeryGame";

interface Games {
  games_list: Array<GameType>;
}

const initial_state: Games = {
  games_list: [],
};

const games_slice = createSlice({
  name: "games",
  initialState: initial_state,
  reducers: {
    setGames: (state, action) => {
      state.games_list = action.payload;
    },
  },
});

export const { setGames } = games_slice.actions;
export default games_slice.reducer;
