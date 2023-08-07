import { Routes, Route } from 'react-router-dom'
import Home from './Home';
import './App.css';

function App() {
  return (
    <div className='rainbow'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
