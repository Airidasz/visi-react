import Header from './components/Header';
import { Outlet } from 'react-router-dom'
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
