import Header from './components/Header';
import { Outlet } from 'react-router-dom'
import Shops from './components/pages/Shops';
import './App.scss';

function App() {
  
  return (
    <div className="App">
      <Header />
        <Outlet />
    </div>
  );
}

export default App;
