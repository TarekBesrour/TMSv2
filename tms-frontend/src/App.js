// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import UsersPage from './pages/UserPage';
import RolesPage from './pages/RolePage';

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
