import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Shops = () => {
    const [shopData, setShopData] = useState(false);

    useEffect(() => {
        if(typeof shopData !== 'object' ) {
            fetch(process.env.REACT_APP_API_URL + "/shops", {method:'GET'})
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                
                setShopData(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }


    }, [shopData])

    if(typeof shopData !== 'object')
        return (
            <div><h1>Loading...</h1></div>
        )

    return (
        <div style={{display:'grid', rowGap:'20px'}}>
            {shopData.map((data) => {
                return (
                    <Link to={'/shop/' + data.id}  key={data.id} >
                    <div style={{border: '1px solid gray', borderRadius: '4px', padding: '15px 20px'}}>
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                    </div>
                    </Link>
                )    
            })}
        </div>
    )
}

export default Shops
