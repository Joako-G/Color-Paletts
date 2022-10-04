import { useEffect, useState } from "react";
import Color from "./Color";
import { getColors} from "../service";

const ColorList = () => {
    const [ colorList, setColorList ] = useState([]);
    const [ backgroundColor, setBackgroundColor ] = useState('white')
    const [ isLoading, setIsLoading ] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      getColors()
        .then((data) => setColorList(data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }, [])
    
    return (
      <>
        <div className='page' style={{ backgroundColor }}>
          { isLoading && <snap className='loading-test'>Loading</snap>}
          {
            colorList.map(color => (
              <Color 
                key={color.id} 
                hex={color.hex} 
                name={color.name} 
                setBackgroundColor={setBackgroundColor} />
            ))
          }
        </div>
      </>
      
    )
  }
  
  export default ColorList;