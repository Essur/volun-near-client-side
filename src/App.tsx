import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import AboutProjectPage from './pages/info/AboutProjectPage.tsx';
import AllOrganizationsPage from './pages/info/AllOrganizationsPage.tsx';
import Home from './pages/info/HomePage.tsx';
import OrganizationInfoPage from './pages/info/OrganizationInfoPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import OrganizationProfilePage from './pages/profile/OrganizationProfilePage.tsx';
import VolunteerProfilePage from './pages/profile/VolunteerProfilePage.tsx';
import RegistrationPage from './pages/registration/RegistrationPage';
import { AppContainer, MainContentContainer } from './styles/GlobalStyledContainers.tsx';
import AllActivitiesPage from './pages/info/AllActivitiesPage.tsx';
import ActivityInfoPage from './pages/info/ActivityInfoPage.tsx';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContainer>
                <Navbar />
                <MainContentContainer>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutProjectPage />} />
                        <Route path="/all-activities" element={<AllActivitiesPage/>}/>
                        <Route path="/organizations" element={<AllOrganizationsPage/>}/>
                        <Route path="/organization/:id" element={<OrganizationInfoPage/>}/>
                        <Route path="/activity/:id" element={<ActivityInfoPage/>}/>
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
