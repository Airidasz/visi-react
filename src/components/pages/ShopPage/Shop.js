import { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Products from './Products';

const Shop = () => {
    let { id } = useParams();
    const [shop, setShop] = useState(false);
    const [locations, setLocations] = useState(false);

    useEffect(() => {
        if(typeof shop !== 'object') {
            fetch(process.env.REACT_APP_API_URL + "/shop/" + id, {method:'GET'})
            .then(async response => {
                const data = await response.json();
    
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setShop(data);
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
        }

        if(typeof locations !== 'object') {
            fetch(process.env.REACT_APP_API_URL + "/shop/" + id + '/locations', {method:'GET'})
            .then(async response => {
                const data = await response.json();
    
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setLocations(data);
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
        }





    }, [shop, locations])

    if(typeof shop !== 'object')
        return (
            <div className='pageView'><h1>Loading...</h1></div>
        )
    return (
        <div className="pageView">
        <div className='container'>
        <div className="title">
                <h1>{shop.name}</h1>
                {localStorage.getItem('userID') == shop.userID && <input type="button" className="btn-dark" value="Koreguoti" style={{width: '10rem'}}/>}
                </div>
            <div className="shop">
               
            
            
            
            <p>{shop.description}</p>
            {/* <h2>Locations:</h2>
            {typeof locations === 'object' && locations.map((data) => {
                return (
                    <div key={data.id}>
                        <h3>{data.coordinates}</h3>
                    </div>
                )    
            })} */}
            <h2>Ūkio siūlomi produktai</h2>
            <Products shopID={id}/>
        </div>
        </div>
        </div>
    )
}

export default Shop
