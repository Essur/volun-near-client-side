import './App.css'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage.tsx'
import Navbar from './components/Navbar.tsx';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';


const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
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