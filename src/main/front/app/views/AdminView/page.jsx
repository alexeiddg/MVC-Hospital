'use client'

import React, { useState } from 'react';

export default function AdminView() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. García', email: 'garcia@hospital.com', role: 'Doctor' },
    { id: 2, name: 'Enf. López', email: 'lopez@hospital.com', role: 'Nurse' },
    { id: 3, name: 'Paciente Rodríguez', email: 'rodriguez@email.com', role: 'Patient' }
  ]);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Patient' });

  const handleAddUser = (e) => {
    e.preventDefault();
    // gestionar_usuarios() implementation for creating users
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id }]);
    setNewUser({ name: '', email: '', role: 'Patient' });
  };

  const handleDeleteUser = (id) => {
    // gestionar_usuarios() implementation for deleting users
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Administration Panel</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser} className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded flex-1"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded flex-1"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            required
          />
          <select
            className="p-2 border rounded"
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Add User
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-gray-50">System Users</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}