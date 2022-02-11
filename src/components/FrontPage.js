import Shops from './Shop/Shops';
import { useEffect } from 'react';
import './FrontPage.scss';

const FrontPage = () => {
  useEffect(() => {
    document.title = 'Pagrindinis';
  }, []);

  return (
    <div className="pageView">
      <div className="intro">
        <h1 style={{ fontSize: '10vw' }}>VISI ŪKIAI</h1>
      </div>
      <div className="container">
        <Shops />
      </div>
    </div>
  );
};

export default FrontPage;
