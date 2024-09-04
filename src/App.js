import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UrlShort from './Components/UrlShort';
import Redirect from './Components/Redirect';
import Loader from './Components/Loader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UrlShort />} />
        <Route path='/:id' element={<Redirect />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
