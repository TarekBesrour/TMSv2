// pages/LoginPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { email, motDePasse });
      onLogin(); // Auth OK
      navigate('/menu');
    } catch (err) {
      alert("Échec de l'authentification");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        placeholder="Mot de passe"
        type="password"
        onChange={e => setMotDePasse(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginPage;
