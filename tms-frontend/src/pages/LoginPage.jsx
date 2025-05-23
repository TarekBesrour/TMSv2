import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Truck, Shield, Lock, Mail } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/login', { email, password });
      onLogin();
      navigate('/AppLayout');
    } catch (err) {
      setError(err.response?.data?.message || err.message ||'Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Logo/Header Section */}
          <div className="bg-blue-600 py-6 px-8 flex items-center justify-center flex-col">
            <div className="rounded-full bg-white p-3 mb-3">
              <Truck size={32} className="text-blue-600" />
            </div>
            <h1 className="text-white text-2xl font-bold">Salma TMS</h1>
            <p className="text-blue-100 text-sm mt-1">Gestion de Transport Simplifiée</p>
          </div>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
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
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 text-sm font-medium">Mot de passe</label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
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
                    onChange={e => setMotDePasse(e.target.value)}
                    required
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
              type="submit"
              disabled={loading}
              className={`w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          
          {/* Footer */}
          <div className="py-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte? <a href="#" className="text-blue-600 font-medium hover:text-blue-800">Contactez l'administrateur</a>
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