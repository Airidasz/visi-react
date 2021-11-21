import Shops from "./Shops";
import './FrontPage.scss'

const FrontPage = () => {
    return (
        <div className="pageView">
            <div className="intro">
                <h1 style={{fontSize:'10vw'}}>VISI ŪKIAI</h1>
            </div>
        <div className="container">
            
            <Shops />
        </div>
        </div>
    );
}

export default FrontPage
