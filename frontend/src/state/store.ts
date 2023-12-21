import { configureStore } from "@reduxjs/toolkit";
import game_reducer from "./games/games_slice";
import user_reducer from "./user/user_slice";

export const store = configureStore({
  reducer: {
    games: game_reducer,
    user: user_reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
