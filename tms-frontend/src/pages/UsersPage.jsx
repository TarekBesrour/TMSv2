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
  <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold text-gray-700 mb-6">Gestion des utilisateurs</h2>

    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <input
          type="text"
          name="usrnom"
          placeholder="Nom"
          value={form.usrnom}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="usremail"
          placeholder="Email"
          value={form.usremail}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="usrpassword"
          placeholder="Mot de passe"
          value={form.usrpassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required={!editingId}
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="usractif"
          checked={form.usractif}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Actif</label>
      </div>
      <div>
        <select
          name="usrrolid"
          value={form.usrrolid}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">-- Sélectionner un rôle --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.libelle}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
        >
          {editingId ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>

    <table className="w-full text-sm text-left border border-gray-200">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-2 border">Nom</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Actif</th>
          <th className="px-4 py-2 border">Rôle</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.usrid} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">{u.usrnom}</td>
            <td className="px-4 py-2 border">{u.usremail}</td>
            <td className="px-4 py-2 border">
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                  u.usractif ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}
              >
                {u.usractif ? 'Oui' : 'Non'}
              </span>
            </td>
            <td className="px-4 py-2 border">
              {roles.find((r) => r.id === u.usrrolid)?.libelle || '—'}
            </td>
            <td className="px-4 py-2 border space-x-2">
              <button
                onClick={() => handleEdit(u)}
                className="text-blue-600 hover:underline"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(u.usrid)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

};

export default UsersPage;
