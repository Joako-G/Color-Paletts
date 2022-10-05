import { useContext, useEffect, useState  } from 'react';
import './Home.css';
import Palettes from '../../components/Palette/Palettes';
import Tags from '../../components/Tag/Tags';
import Favorites from '../../components/Favorite/Favorites';
import { getTags } from '../../services/service';
import { FavoritesContext } from '../../context/FavoriteContext';
import { FiltersContext } from '../../context/FilterContext';
import { ColorPalettesContext } from '../../context/ColorPalettesContext';

const Home = () => {
    const [ tags, setTags ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const [ filters, setFilters] = useState({
        searchFilde: '',
        tagFilter: []
    })

    const { colorPalettes } = useContext(ColorPalettesContext);

    useEffect(() => {
        getTags()
            .then((data) => setTags(data))
            .catch((error) => console.log(error))
    }, [])

    const filteredColorPalettes = colorPalettes.filter(colorPalette => {

        if( filters.tagFilter.length === 0){
            return true;
        }

        const verifiedTags = colorPalette.tags.filter( tag => filters.tagFilter.includes(tag))
        return verifiedTags.length === filters.tagFilter.length;
    })

    const colorPaletteWithLikes = filteredColorPalettes.map( palette => {
        const foundIndex = favorites.findIndex(fav => fav.id === palette.id);

        if(foundIndex === -1){
            return palette;
        }

        return { ...palette, liked: true}
    })


    return(
        <FavoritesContext.Provider value={{favorites, setFavorites}}>
            <FiltersContext.Provider value={{filters, setFilters}}>
                <header>
                    <h1>Color Palette Project</h1>
                </header>
                <div className='main-container'>
                    <Tags tags={tags}/>
                    <Palettes palettes={colorPaletteWithLikes}/>
                    <Favorites favorites= {favorites} />
                </div>
            </FiltersContext.Provider>
        </FavoritesContext.Provider>
    )

}


export default Home;