import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';

import { AuthContext } from './context/auth.context';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard'

import Signup from './pages/Signup';
import Login from './pages/Login';

import Dressing from './pages/dressing/Dressing';
import AddItem from './pages/dressing/AddItem';
import EditItem from './pages/dressing/EditItem';

import GenerateOutfit from './pages/outfits/GenerateOutfit';
import RandomOutfits from './pages/outfits/RandomOutfits';
import ViewOutfit from './pages/outfits/ViewOutfit';
import EditOutfit from './pages/outfits/EditOutfit';
import SavedOutfits from './pages/outfits/SavedOutfits';

function App() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
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
              <Route path="/outfits/random/view/single" element={<ViewOutfit />} />
              <Route path="/outfits/view/:outfitId" element={<EditOutfit />} />
              <Route path="/outfits/saved/" element={<SavedOutfits />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
