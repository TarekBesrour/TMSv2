import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ rolcode: '', rolnom: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchRoles = async () => {
    const res = await axios.get(`/api/roles`);
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/api/roles/${editingId}`, form);
    } else {
      await axios.post('/api/roles', form);
    }
    setForm({ rolcode: '', rolnom: '' });
    setEditingId(null);
    fetchRoles();
  };

  const handleEdit = (role) => {
    setForm({ rolcode: role.rolcode, rolnom: role.rolnom });
    setEditingId(role.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce rôle ?')) {
      await axios.delete(`/api/roles/${id}`);
      fetchRoles();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gestion des rôles</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="rolcode"
          placeholder="Code"
          value={form.rolcode}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="libelle"
          placeholder="Libellé"
          value={form.rolnom}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Libellé</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border p-2">{role.id}</td>
              <td className="border p-2">{role.rolcode}</td>
              <td className="border p-2">{role.rolnom}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(role)} className="text-blue-500">Éditer</button>
                <button onClick={() => handleDelete(role.id)} className="text-red-500">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesPage;
