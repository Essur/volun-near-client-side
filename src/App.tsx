import './App.css'
import RegistrationPage from './pages/registration/RegistrationPage'
import LoginPage from './pages/LoginPage.tsx'
import Navbar from './components/Navbar.tsx';
import PrivateRoute from './components/PrivateRoute.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import ProfilePage from './pages/ProfilePage.tsx';


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <p>This is the home page.</p>
        </div>
    );
};

export default App;
