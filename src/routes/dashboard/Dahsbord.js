import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import './dashboard.css';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      <div className="dashboard">
        <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
        <div className="main-container">
            <SideBar />
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/watchlater" element={<WatchLater />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
