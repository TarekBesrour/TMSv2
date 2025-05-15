// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/loginPage';
import MenuPage from './pages/menuPage';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';
import AppLayout from './components/layout/AppLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    
    <Router>
        
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route
          path="/menu"
          element={isAuthenticated ? <MenuPage /> : <Navigate to="/" />}
        />
        <Route
          path="/AppLayout"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/" />}
        />
        <Route
          path="/utilisateurs"
          element={isAuthenticated ? <UsersPage /> : <Navigate to="/" />}
        />
        <Route
          path="/roles"
          element={isAuthenticated ? <RolesPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
