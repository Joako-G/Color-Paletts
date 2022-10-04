import { createContext } from "react"

export const FavoriteContext = createContext({
    favorites: [],
    setFavorites: () => {}
})