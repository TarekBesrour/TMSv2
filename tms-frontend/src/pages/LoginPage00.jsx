import { useState } from 'react';
import { Truck, Shield, Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de connexion
    setTimeout(() => {
      if (email === 'demo@transport.com' && password === 'password') {
        // Succès simulé
        console.log('Connexion réussie');
      } else {
        // Erreur simulée
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-md px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200">
          {/* Logo/Header Section */}
          <div className="bg-blue-600 py-6 px-8 flex items-center justify-center flex-col">
            <div className="rounded-full bg-white p-3 mb-3">
              <Truck size={32} className="text-blue-600" />
            </div>
            <h1 className="text-white text-2xl font-bold">TransPort TMS</h1>
            <p className="text-blue-100 text-sm mt-1">Gestion de Transport Simplifiée</p>
          </div>
          
          {/* Form Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Connexion à votre compte</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-6 flex items-center">
                <Shield size={18} className="mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="votre@email.com"
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 text-sm font-medium">Mot de passe</label>
                  <a className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                    Mot de passe oublié?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
          
          {/* Footer */}
          <div className="py-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte? <a className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer">Contactez l'administrateur</a>
            </p>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-xs mt-6">
          &copy; 2025 TransPort TMS. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;