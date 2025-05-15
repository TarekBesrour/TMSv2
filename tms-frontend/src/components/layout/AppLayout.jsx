import { useState, useEffect } from 'react';
import { 
  Truck, 
  Menu, 
  Package, 
  Map, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronDown,
  Search,
  LayoutDashboard,
  Sun,
  Moon
} from 'lucide-react';

// Composant principal de layout
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

  // Appliquer le thème au chargement et quand il change
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Menu items
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Tableau de bord' },
    { id: 'shipments', icon: <Package size={20} />, label: 'Expéditions' },
    { id: 'routes', icon: <Map size={20} />, label: 'Itinéraires' },
    { id: 'fleet', icon: <Truck size={20} />, label: 'Flotte' },
    { id: 'drivers', icon: <Users size={20} />, label: 'Chauffeurs' },
    { id: 'documents', icon: <FileText size={20} />, label: 'Documents' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Paramètres' },
  ];

  // Demo content
  const getPageContent = () => {
    switch(activePage) {
      case 'dashboard':
        return <DashboardContent darkMode={darkMode} />;
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Page {activePage}</h2>
            <p className="text-gray-600 dark:text-gray-300">Contenu de la page {activePage} à venir</p>
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-16'} ${darkMode ? 'bg-blue-900' : 'bg-gradient-to-br from-sky-500 to-blue-600'} text-white transition-all duration-300 ease-in-out flex flex-col relative`}
      >
        {/* Logo */}
        <div className={`flex items-center ${sidebarOpen ? 'justify-start px-6' : 'justify-center'} h-16 border-b ${darkMode ? 'border-blue-800' : 'border-sky-400'}`}>
          {sidebarOpen ? (
            <div className="flex items-center">
              <Truck size={28} className="text-white" />
              <span className="ml-3 font-bold text-xl">TransPort TMS</span>
            </div>
          ) : (
            <Truck size={28} className="text-white" />
          )}
        </div>

        {/* Toggle sidebar button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-3 -right-3 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-sky-400 hover:bg-sky-500'} rounded-full p-1 text-white shadow-md`}
        >
          <Menu size={16} />
        </button>

        {/* Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className={`px-2 ${!sidebarOpen && 'flex flex-col items-center'}`}>
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`
                  flex items-center ${sidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 mb-3 rounded-lg cursor-pointer transition-colors
                  ${activePage === item.id ? 
                    (darkMode ? 'bg-blue-700 text-white' : 'bg-sky-400 text-white') : 
                    (darkMode ? 'text-blue-100 hover:bg-blue-800' : 'text-sky-100 hover:bg-sky-400 hover:bg-opacity-70')}
                `}
                title={!sidebarOpen ? item.label : ""}
              >
                <div className="text-lg">{item.icon}</div>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* Dark mode toggle */}
        <div className={`${sidebarOpen ? 'px-4 py-2' : 'py-2 flex justify-center'} ${darkMode ? 'border-t border-blue-800' : 'border-t border-sky-400'}`}>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`${sidebarOpen ? 'flex items-center w-full justify-between px-4' : 'p-2'} 
            ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-sky-400 hover:bg-sky-500'} rounded-lg transition-colors`}
            title={darkMode ? "Mode jour" : "Mode nuit"}
          >
            {sidebarOpen ? (
              <>
                <span>{darkMode ? 'Mode jour' : 'Mode nuit'}</span>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </>
            ) : (
              darkMode ? <Sun size={18} /> : <Moon size={18} />
            )}
          </button>
        </div>

        {/* User profile */}
        <div className={`${darkMode ? 'border-t border-blue-800' : 'border-t border-sky-400'} p-4 ${sidebarOpen ? '' : 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center cursor-pointer"
            >
              <div className={`h-8 w-8 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-sky-400'} flex items-center justify-center`}>
                <span className="font-medium text-sm">JD</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">Jean Dupont</p>
                <p className={`text-xs ${darkMode ? 'text-blue-200' : 'text-sky-200'}`}>Administrateur</p>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          ) : (
            <div 
              className={`h-8 w-8 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-sky-400'} flex items-center justify-center cursor-pointer`}
              onClick={() => sidebarOpen ? setDropdownOpen(!dropdownOpen) : setSidebarOpen(true)}
              title="Jean Dupont"
            >
              <span className="font-medium text-sm">JD</span>
            </div>
          )}
          
          {/* User dropdown */}
          {sidebarOpen && dropdownOpen && (
            <div className={`mt-3 py-2 ${darkMode ? 'bg-blue-700' : 'bg-sky-400'} rounded-lg shadow-lg`}>
              <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-blue-600' : 'hover:bg-sky-500'}`}>Profil</a>
              <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-blue-600' : 'hover:bg-sky-500'}`}>Préférences</a>
              <div className={`border-t ${darkMode ? 'border-blue-600' : 'border-sky-500'} my-1`}></div>
              <a href="#" className={`px-4 py-2 text-sm ${darkMode ? 'hover:bg-blue-600' : 'hover:bg-sky-500'} flex items-center`}>
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm'} z-10`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search size={18} className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </span>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className={`w-full pl-10 pr-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-sky-500 focus:border-sky-500'}`}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <Bell size={20} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} cursor-pointer`} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              
              <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Jean Dupont</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {getPageContent()}
        </main>
      </div>
    </div>
  );
};

// Exemple de contenu pour le tableau de bord
const DashboardContent = ({ darkMode }) => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tableau de bord</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bienvenue sur votre système de gestion de transport</p>
      </header>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Expéditions actives', value: '24', lightColor: 'bg-sky-500', darkColor: 'bg-sky-700', icon: <Package size={24} className="text-white" /> },
          { label: 'Véhicules en route', value: '18', lightColor: 'bg-blue-500', darkColor: 'bg-blue-700', icon: <Truck size={24} className="text-white" /> },
          { label: 'Livraisons du jour', value: '12', lightColor: 'bg-teal-500', darkColor: 'bg-teal-700', icon: <Map size={24} className="text-white" /> },
          { label: 'Alertes', value: '3', lightColor: 'bg-amber-500', darkColor: 'bg-amber-700', icon: <Bell size={24} className="text-white" /> },
        ].map((stat, index) => (
          <div key={index} className={`${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow'} rounded-lg p-6 border-l-4`} style={{ borderColor: darkMode ? stat.darkColor.replace('bg-', '') : stat.lightColor.replace('bg-', '') }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{stat.label}</h3>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
              </div>
              <div className={`${darkMode ? stat.darkColor : stat.lightColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Shipments & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Expéditions récentes</h2>
            <button className={`text-sm ${darkMode ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-800'}`}>Voir tout</button>
          </div>
          <div className="px-6 py-4">
            <table className="min-w-full">
              <thead>
                <tr className={`text-left text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Origine</th>
                  <th className="px-4 py-2">Destination</th>
                  <th className="px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {[
                  { id: 'TMS-2589', client: 'LogiTech', from: 'Paris', to: 'Lyon', status: 'En cours' },
                  { id: 'TMS-2588', client: 'TechCo', from: 'Marseille', to: 'Bordeaux', status: 'Livré' },
                  { id: 'TMS-2587', client: 'ElectroPro', from: 'Lille', to: 'Toulouse', status: 'En attente' },
                  { id: 'TMS-2586', client: 'FoodExpress', from: 'Nantes', to: 'Strasbourg', status: 'En cours' },
                ].map((shipment, index) => (
                  <tr key={index} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className={`px-4 py-3 text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>{shipment.id}</td>
                    <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{shipment.client}</td>
                    <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{shipment.from}</td>
                    <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{shipment.to}</td>
                    <td className="px-4 py-3">
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${
                          shipment.status === 'En cours' ? 
                            (darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800') :
                          shipment.status === 'Livré' ? 
                            (darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800') :
                            (darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                        }`}
                      >
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Activité récente</h2>
          </div>
          <div className="px-6 py-4">
            <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {[
                { action: 'Expédition TMS-2589 créée', time: 'Il y a 10 min', user: 'Jean D.' },
                { action: 'Chauffeur assigné à TMS-2585', time: 'Il y a 45 min', user: 'Marie L.' },
                { action: 'Livraison confirmée TMS-2582', time: 'Il y a 2h', user: 'Thomas B.' },
                { action: 'Nouvel itinéraire pour TMS-2587', time: 'Il y a 3h', user: 'Sophie M.' },
                { action: 'Nouveau client ajouté', time: 'Il y a 5h', user: 'Jean D.' },
                { action: 'Rapport mensuel généré', time: 'Hier, 16:42', user: 'Système' },
              ].map((activity, index) => (
                <li key={index} className="py-3">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-sky-100 text-sky-600'} flex items-center justify-center`}>
                      {activity.user.split(' ')[0][0]}{activity.user.split(' ').length > 1 ? activity.user.split(' ')[1][0] : ''}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{activity.action}</p>
                      <div className="flex mt-1">
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`}>par {activity.user}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;