import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Dashboard from './pages/Dashboard.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegistrationPage from './pages/registration/RegistrationPage';
import VolunteerProfilePage from './pages/VolunteerProfilePage.tsx';
import OrganizationProfilePage from './pages/OrganizationProfilePage.tsx';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/volunteer-profile" element={<VolunteerProfilePage />} />
                        <Route path="/organization-profile" element={<OrganizationProfilePage/>}/>
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
