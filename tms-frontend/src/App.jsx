// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/menuPage';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    
    <Router>
        {/* ✅ Test Tailwind */}
      <div className="bg-blue-200 text-blue-900 p-4 text-center font-semibold">
  ✅ Tailwind CSS fonctionne !
</div>
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
