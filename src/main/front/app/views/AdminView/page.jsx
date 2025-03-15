'use client'

import React, { useState, useEffect } from 'react';
import { AdministradorService } from '../../../services/administradorService';

export default function AdminView() {
  // State for doctors and administrators
  const [doctors, setDoctors] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for new user form
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    role: 'Doctor',
    specialty: '', // For doctors
    department: '' // For administrators
  });

  // Fetch all doctors and administrators on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Fetch doctors and administrators in parallel
        const [doctorsData, adminsData] = await Promise.all([
          AdministradorService.getAllMedicos(),
          AdministradorService.getAllAdministradores()
        ]);
        
        setDoctors(doctorsData);
        setAdministrators(adminsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    try {
      if (newUser.role === 'Doctor') {
        // Create doctor object with required fields
        const medicoData = {
          nombre: newUser.name,
          email: newUser.email,
          especialidad: newUser.specialty || 'General'
          // Add other required fields for your Doctor model
        };
        
        await AdministradorService.addMedico(medicoData);
        const updatedDoctors = await AdministradorService.getAllMedicos();
        setDoctors(updatedDoctors);
      } else {
        // Create administrator object with required fields
        const adminData = {
          nombre: newUser.name,
          email: newUser.email,
          departamento: newUser.department || 'General'
          // Add other required fields for your Administrador model
        };
        
        await AdministradorService.addAdministrador(adminData);
        const updatedAdmins = await AdministradorService.getAllAdministradores();
        setAdministrators(updatedAdmins);
      }
      
      // Reset form
      setNewUser({ 
        name: '', 
        email: '', 
        role: 'Doctor',
        specialty: '',
        department: ''
      });
    } catch (err) {
      console.error('Error adding user:', err);
      setError(`Failed to add ${newUser.role.toLowerCase()}. Please try again.`);
    }
  };

  const handleDeleteUser = async (id, role) => {
    try {
      if (role === 'Doctor') {
        await AdministradorService.deleteMedico(id);
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      } else {
        await AdministradorService.deleteAdministrador(id);
        setAdministrators(administrators.filter(admin => admin.id !== id));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(`Failed to delete ${role.toLowerCase()}. Please try again.`);
    }
  };

  // Show additional fields based on role selection
  const renderRoleSpecificFields = () => {
    if (newUser.role === 'Doctor') {
      return (
        <input
          type="text"
          placeholder="Specialty"
          className="p-2 border rounded flex-1"
          value={newUser.specialty}
          onChange={(e) => setNewUser({...newUser, specialty: e.target.value})}
        />
      );
    } else {
      return (
        <input
          type="text"
          placeholder="Department"
          className="p-2 border rounded flex-1"
          value={newUser.department}
          onChange={(e) => setNewUser({...newUser, department: e.target.value})}
        />
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Administration Panel</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
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
            <option value="Doctor">Doctor</option>
            <option value="Admin">Administrator</option>
          </select>
          
          {renderRoleSpecificFields()}
          
          <button 
            type="submit" 
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Add User'}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <h2 className="text-xl font-semibold p-4 bg-gray-50">Doctors</h2>
        {loading ? (
          <div className="text-center p-4">Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="text-center p-4">No doctors found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.especialidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteUser(doctor.id, 'Doctor')}
                      className="text-red-600 hover:text-red-900"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-gray-50">Administrators</h2>
        {loading ? (
          <div className="text-center p-4">Loading administrators...</div>
        ) : administrators.length === 0 ? (
          <div className="text-center p-4">No administrators found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {administrators.map(admin => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.departamento}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteUser(admin.id, 'Admin')}
                      className="text-red-600 hover:text-red-900"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}