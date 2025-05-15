
import { useState } from 'react';
import { 
  Truck, 
  Menu, 
  Home, 
  Package, 
  Map, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronDown,
  Search,
  LayoutDashboard
} from 'lucide-react';

// Composant principal de layout
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

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
        return <DashboardContent />;
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Page {activePage}</h2>
            <p className="text-gray-600">Contenu de la page {activePage} à venir</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className={`flex items-center ${sidebarOpen ? 'justify-start px-6' : 'justify-center'} h-16 border-b border-blue-700`}>
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
          className="absolute top-3 -right-3 bg-blue-600 hover:bg-blue-700 rounded-full p-1 text-white shadow-md"
        >
          <Menu size={16} />
        </button>

        {/* Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`
                  flex items-center ${sidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 mb-1 rounded-lg cursor-pointer transition-colors
                  ${activePage === item.id ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}
                `}
              >
                <div className="text-lg">{item.icon}</div>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* User profile */}
        <div className={`border-t border-blue-700 p-4 ${sidebarOpen ? '' : 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="font-medium text-sm">JD</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">Jean Dupont</p>
                <p className="text-xs text-blue-200">Administrateur</p>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-medium text-sm">JD</span>
            </div>
          )}
          
          {/* User dropdown */}
          {sidebarOpen && dropdownOpen && (
            <div className="mt-3 py-2 bg-blue-700 rounded-lg shadow-lg">
              <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600">Profil</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-600">Préférences</a>
              <div className="border-t border-blue-600 my-1"></div>
              <a href="#" className=" px-4 py-2 text-sm hover:bg-blue-600 flex items-center">
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
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search size={18} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <Bell size={20} className="text-gray-600 cursor-pointer" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              
              <span className="text-gray-700">Jean Dupont</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {getPageContent()}
        </main>
      </div>
    </div>
  );
};

// Exemple de contenu pour le tableau de bord
const DashboardContent = () => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue sur votre système de gestion de transport</p>
      </header>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Expéditions actives', value: '24', color: 'bg-blue-500', icon: <Package size={24} className="text-blue-100" /> },
          { label: 'Véhicules en route', value: '18', color: 'bg-green-500', icon: <Truck size={24} className="text-green-100" /> },
          { label: 'Livraisons du jour', value: '12', color: 'bg-amber-500', icon: <Map size={24} className="text-amber-100" /> },
          { label: 'Alertes', value: '3', color: 'bg-red-500', icon: <Bell size={24} className="text-red-100" /> },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 border-t-4 border-l-4 border-r-0 border-b-0 border-opacity-50" style={{ borderColor: stat.color.replace('bg-', '').split('-')[0] }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Shipments & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Expéditions récentes</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">Voir tout</button>
          </div>
          <div className="px-6 py-4">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Origine</th>
                  <th className="px-4 py-2">Destination</th>
                  <th className="px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { id: 'TMS-2589', client: 'LogiTech', from: 'Paris', to: 'Lyon', status: 'En cours' },
                  { id: 'TMS-2588', client: 'TechCo', from: 'Marseille', to: 'Bordeaux', status: 'Livré' },
                  { id: 'TMS-2587', client: 'ElectroPro', from: 'Lille', to: 'Toulouse', status: 'En attente' },
                  { id: 'TMS-2586', client: 'FoodExpress', from: 'Nantes', to: 'Strasbourg', status: 'En cours' },
                ].map((shipment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{shipment.id}</td>
                    <td className="px-4 py-3 text-sm">{shipment.client}</td>
                    <td className="px-4 py-3 text-sm">{shipment.from}</td>
                    <td className="px-4 py-3 text-sm">{shipment.to}</td>
                    <td className="px-4 py-3">
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${
                          shipment.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                          shipment.status === 'Livré' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
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
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Activité récente</h2>
          </div>
          <div className="px-6 py-4">
            <ul className="divide-y divide-gray-200">
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
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {activity.user.split(' ')[0][0]}{activity.user.split(' ').length > 1 ? activity.user.split(' ')[1][0] : ''}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <div className="flex mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <p className="text-xs text-gray-500 ml-2">par {activity.user}</p>
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