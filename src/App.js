import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Account from './pages/Account';
import AddEditAccomadation from './components/account/AddEditAccomadation';
import axios from 'axios';
import { useContext } from 'react';
import { UserContex } from './contex/UserContext';
import SinglePage from './pages/SinglePage';
import SearchResult from './pages/SearchResult';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

function App() {
  const { user } = useContext(UserContex);

  if (user?.token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${user.token}`,
    };
  }

  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE;

  return (
    <BrowserRouter basename="/travelhub">
      <Header />
      <div className="min-h-screen ">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account/:page" element={<Account />} />
          <Route path="room/:id" element={<SinglePage />} />
          <Route path="place/" element={<SearchResult />} />
          <Route
            path="account/accomadations/add"
            element={<AddEditAccomadation />}
          />
          <Route
            path="account/accomadations/edit/:id"
            element={<AddEditAccomadation />}
          />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
