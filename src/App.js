import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dressing from './pages/dressing/Dressing';
import AddItem from './pages/dressing/AddItem';
import EditItem from './pages/dressing/EditItem';

import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import GenerateOutfit from './pages/outfits/GenerateOutfit';
import RandomOutfits from './pages/outfits/RandomOutfits';
import ViewOutfit from './pages/outfits/ViewOutfit';

function App() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {!isLoggedIn ?
          <Route path="/" element={<HomePage />} />
          :
          <Route path="/" element={<Dashboard />} />
        }
        <Route path="/dressing" element={<Dressing />} />
        <Route path="/dressing/item/add" element={<AddItem />} />
        <Route path="/dressing/item/edit/:itemId" element={<EditItem />} />
        <Route path="/outfits/random" element={<GenerateOutfit />} />
        <Route path="/outfits/random/view" element={<RandomOutfits />} />
        <Route path="/outfits/single/view" element={<ViewOutfit />} />
      </Routes>
    </div>
  );
}

export default App;
