import { useEffect, useState } from 'react';
import './App.css';
import Favorites from './components/Favorite/Favorites';
import Palettes from './components/Palette/Palettes';
import Tagas from './components/Tag/Tags';
import { getColorPalettes, getTags } from './services/service';
import  { FavoriteContext } from './context/FavoriteContext'

function App() {
  const [ colorPalettes, setColorPalettes ] = useState([]);
  const [ tags, setTags ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);
 
  useEffect( () => {
    getColorPalettes()
      .then( data => { 
        setColorPalettes(data)
        setFavorites((data) => data.filter((palette) => palette.liked))
      })
      .catch( err => console.error(err))

    getTags()
      .then( data => setTags(data))
      .catch( err => console.error(err))
  }, [])

  return (
    <FavoriteContext.Provider value={{favorites, setFavorites}}>
      <div className="App">
        <header> <h1> Color Palette Project</h1> </header>
        <div className='main-container'>
          <Tagas tags={tags}/>
          <Palettes palettes={colorPalettes} />
          <Favorites favorites={favorites}/>
        </div>
      </div>
    </FavoriteContext.Provider>
    
  );
}

export default App;
