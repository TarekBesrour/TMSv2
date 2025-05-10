import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    usrnom: '',
    usremail: '',
    usrpassword: '',
    usractif: true,
    usrrolid: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('/api/utilisateurs');
    setUsers(res.data);
  };

  const fetchRoles = async () => {
    const res = await axios.get('/api/roles');
    setRoles(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/api/utilisateurs/${editingId}`, form);
    } else {
      await axios.post('/api/utilisateurs', form);
    }
    setForm({
      usrnom: '',
      usremail: '',
      usrpassword: '',
      usractif: true,
      usrrolid: ''
    });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      usrnom: user.usrnom,
      usremail: user.usremail,
      usrpassword: '', // Ne pas afficher l'ancien mot de passe
      usractif: user.usractif,
      usrrolid: user.usrrolid
    });
    setEditingId(user.usrid);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      await axios.delete(`/api/utilisateurs/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gestion des utilisateurs</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="usrnom"
          placeholder="Nom"
          value={form.usrnom}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="usremail"
          placeholder="Email"
          value={form.usremail}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="usrpassword"
          placeholder="Mot de passe"
          value={form.usrpassword}
          onChange={handleChange}
          className="border p-2 w-full"
          required={!editingId}
        />
        <label className="block">
          <input
            type="checkbox"
            name="usractif"
            checked={form.usractif}
            onChange={handleChange}
            className="mr-2"
          />
          Actif
        </label>
        <select
          name="usrrolid"
          value={form.usrrolid}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">-- Sélectionner un rôle --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.libelle}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actif</th>
            <th className="border p-2">Rôle</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.usrid}>
              <td className="border p-2">{u.usrnom}</td>
              <td className="border p-2">{u.usremail}</td>
              <td className="border p-2">{u.usractif ? 'Oui' : 'Non'}</td>
              <td className="border p-2">{roles.find(r => r.id === u.usrrolid)?.libelle || '—'}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(u)} className="text-blue-500">Éditer</button>
                <button onClick={() => handleDelete(u.usrid)} className="text-red-500">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
