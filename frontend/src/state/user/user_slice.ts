import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameType } from "../../components/game/SummeryGame/SummeryGame";

export interface User {
  first_name: string;
  last_name: string;
  _id: string;
  active: Boolean;
  verification_token: string;
  favorites_games: Array<GameType>;
  events: Array<any>;
}

const initial_state: User = {
  first_name: "",
  last_name: "",
  _id: "",
  active: false,
  verification_token: "",
  favorites_games: [],
  events: [],
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
    setFavoritesGames: (state, action: PayloadAction<Array<GameType>>) => {
      state.favorites_games = action.payload;
    },
  },
});

export const { setUser, setFavoritesGames } = user_slice.actions;
export default user_slice.reducer;
