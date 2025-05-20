// components/MenuLayout.jsx
import { Link, Outlet } from 'react-router-dom';

const MenuLayout = () => {
  return (
    <div className="flex">
      {/* Menu à gauche */}
      <nav className="w-1/5 bg-gray-200 h-screen p-4">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/utilisateurs">Documents</Link> {/* Lien vers UsersPage */}
          </li>
        </ul>
      </nav>

      {/* Contenu central */}
      <main className="w-4/5 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MenuLayout;
