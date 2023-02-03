import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';

import { AuthContext } from './context/auth.context';
import IsPrivate from './components/routesProtection/IsPrivate';
import IsAnonymous from './components/routesProtection/IsAnonymous'

import Error404 from './pages/Error404'

import NavBar from './components/NavBar';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard'

import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';

import Dressing from './pages/dressing/Dressing';
import AddItem from './pages/dressing/AddItem';
import EditItem from './pages/dressing/EditItem';

import GenerateOutfit from './pages/outfits/GenerateOutfit';
import RandomOutfits from './pages/outfits/RandomOutfits';
import ViewOutfit from './pages/outfits/ViewOutfit';
import EditOutfit from './pages/outfits/EditOutfit';
import SavedOutfits from './pages/outfits/SavedOutfits';

import SubscriptionPage from './pages/stripe/SubscriptionPage';



function App() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <div className="container-fluid">
        <div className={isLoggedIn ? "row flex-nowrap" : "row"}>
          <Toaster />
          {!isLoggedIn ? <NavBar /> : <NavBarLoggedIn />}

          <div id={isLoggedIn ? "main" : ""} className={isLoggedIn ? "col p-5" : "col"}>
            <Routes>
              <Route path="/signup" element={<IsAnonymous><Signup /></IsAnonymous>} />
              <Route path="/login" element={<IsAnonymous><Login /></IsAnonymous>} />
              <Route path="/" element={<IsAnonymous><HomePage /></IsAnonymous>} />

              <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
              <Route path="/dressing" element={<IsPrivate><Dressing /></IsPrivate>} />
              <Route path="/dressing/item/add" element={<IsPrivate><AddItem /></IsPrivate>} />
              <Route path="/dressing/item/edit/:itemId" element={<IsPrivate><EditItem /></IsPrivate>} />

              <Route path="/outfits/random" element={<IsPrivate><GenerateOutfit /></IsPrivate>} />
              <Route path="/outfits/random/view" element={<IsPrivate><RandomOutfits /></IsPrivate>} />
              <Route path="/outfits/random/view/single" element={<IsPrivate><ViewOutfit /></IsPrivate>} />
              <Route path="/outfits/view/:outfitId" element={<IsPrivate><EditOutfit /></IsPrivate>} />
              <Route path="/outfits/saved" element={<IsPrivate><SavedOutfits /></IsPrivate>} />

              <Route path="/account" element={<IsPrivate><Account /></IsPrivate>} />
              <Route path="/subscribe" element={<IsPrivate><SubscriptionPage /></IsPrivate>} />

              <Route path="/error-404" element={<Error404 />} />
              <Route path="/*" element={<Error404 />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
