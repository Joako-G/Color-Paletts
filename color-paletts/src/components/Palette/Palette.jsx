import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FavoriteContext } from '../../context/FavoriteContext'
import { useContext, useState } from 'react'
import './Palette.css'

const Palette = ({ palette }) => {
    const { id, name, colors, liked } = palette;
    const { favorites, setFavorites } = useContext(FavoriteContext)
    const [ isFavorite, setIsFavorite ] = useState(liked)

    const handleFavorite = () => {
        setIsFavorite( (isFavorite) => !isFavorite);

        //BUSCA SI AL PALETA ESTA EN LA SECCION DE FAVORITOS
        const foundIndex = favorites.findIndex(fav => fav.id === id);

        //AGREGAR FAVORITOS
        if( foundIndex === -1) {
            setFavorites([ ...favorites, palette])
            return
        }

        //QUITAR DE FAVORITOS
        setFavorites(
            favorites.filter( (fav) => fav.id !== id)
        );
    } 

    return (
        <div className='palette-container'>
            <div className='palette'>
                <h3>{name}</h3>
                {colors.map((color) => {
                return (
                    <div
                    key={color}
                    className='color'
                    style={{ backgroundColor: color }}
                    >
                    <span>{color}</span>
                    </div>
                );
                })}
            </div>
            <div className='fav'>
                { isFavorite ? (
                <FaHeart className='fav heart' onClick={handleFavorite} />
                ) : (
                <FaRegHeart className='fav' onClick={handleFavorite} />
                )}
            </div>
        </div>
    )    
}

export default Palette;