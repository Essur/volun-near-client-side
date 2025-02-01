import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegistrationPage from './pages/registration/RegistrationPage';
import VolunteerProfilePage from './pages/profile/VolunteerProfilePage.tsx';
import OrganizationProfilePage from './pages/profile/OrganizationProfilePage.tsx';
import AboutProjectPage from './pages/info/AboutProjectPage.tsx';
import Footer from './components/Footer.tsx';
import AllOrganizationsPage from './pages/info/AllOrganizationsPage.tsx';
import Home from './pages/info/HomePage.tsx';
import { AppContainer, MainContentContainer } from './styles/StyledContainers.tsx';
import OrganizationInfoPage from './pages/info/OrganizationInfoPage.tsx';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContainer>
                <Navbar />
                <MainContentContainer>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutProjectPage />} />
                        <Route path="/organizations" element={<AllOrganizationsPage/>}/>
                        <Route path="/organization/:id" element={<OrganizationInfoPage/>}/>
                        <Route path="/volunteer-profile" element={<VolunteerProfilePage />} />
                        <Route path="/organization-profile" element={<OrganizationProfilePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                    </Routes>
                </MainContentContainer>
                <Footer/>
            </AppContainer>
        </BrowserRouter>
    );
};

export default App;
