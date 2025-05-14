// pages/MenuPage.jsx
import { Link } from 'react-router-dom';

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Menu Principal</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/utilisateurs"
              className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Gestion des utilisateurs
            </Link>
          </li>
          <li>
            <Link
              to="/roles"
              className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Gestion des rôles
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuPage;
