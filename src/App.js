import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dressing from './pages/dressing/Dressing';
import AddItem from './pages/dressing/AddItem';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/dressing" element={ <Dressing /> } />
        <Route path="/dressing/add-item" element={ <AddItem /> } />
      </Routes>
    </div>
  );
}

export default App;
