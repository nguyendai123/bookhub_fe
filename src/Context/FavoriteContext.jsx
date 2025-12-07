import { createContext } from "react";

const FavoriteContext = createContext({
  favoriteList: [],
  onToggleFavorite: () => {},
});

export default FavoriteContext;
