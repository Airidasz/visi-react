import { useEffect , useState} from 'react';
import './Shop.scss'

const Products = ({shopID}) => {
    const [products, setProducts] = useState(false);

    useEffect(() => {
        if(typeof products !== 'object') {
            fetch(process.env.REACT_APP_API_URL + "/shop/" + shopID + '/products', {method:'GET'})
            .then(async response => {
                const data = await response.json();
    
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setProducts(data);
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
        }
    }, [products])

    if(typeof products !== 'object')
        return (
            <div><h1>Loading...</h1></div>
        )
    return (
        <div className="products">
            {typeof products === 'object' && products.map((product) => {
                return (
                    <div key={product.id} className="product">
                        <h3>{product.name}</h3>

                        {typeof product.categories === 'object' && product.categories.map((category) => {
                            return (
                                <div key={category.id} className="category">
                                    {category.name}
                                </div>
                            )    
                        })}
                    </div>
                )    
            })}
        </div>
        
    );
}

export default Products
