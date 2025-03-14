'use client';

import React, { useState, useEffect } from 'react';
import EnfermeraService from '../../../services/enfermeraService';
import CitaService from '../../../services/citaService';
import { useRouter } from 'next/navigation';

export default function EnfermeraView() {
  const [nurseId, setNurseId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'enfermera') {
          setNurseId(user.id);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (nurseId) {
      fetchAppointments(nurseId);
    }
  }, [nurseId]);

  const fetchAppointments = async (id) => {
    try {
      setLoading(true);
      const data = await EnfermeraService.getCitasByEnfermeraId(id.toString());
      setAppointments(Array.isArray(data) ? data : []);
      console.log('Nurse Appointments:', data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments');
      setAppointments([]);
      setLoading(false);
    }
  };

  const handleCreateAppointment = () => {
    router.push('/views/CitaView');
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('¿Está seguro que desea eliminar esta cita?')) {
      try {
        await CitaService.deleteCita(appointmentId.toString());
        // Refresh the appointments list
        fetchAppointments(nurseId);
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error al eliminar la cita');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Assuming dateString is in format 'YYYY-MM-DD'
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!nurseId) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>You must be logged in as a nurse to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nurse Portal</h1>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New Appointment</h2>
            <button
              onClick={handleCreateAppointment}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Create Appointment
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          
          {loading ? (
            <div className="text-center py-4">
              <p>Loading appointments...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p>{error}</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-4">
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{formatDate(appointment.fecha)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.hora}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.medico
                          ? appointment.medico.nombre
                          : 'No doctor assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.paciente
                          ? appointment.paciente.nombre
                          : 'No patient assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appointment.estado === 'Confirmada' ? 'bg-green-100 text-green-800' : 
                          appointment.estado === 'Cancelada' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                          {appointment.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
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
          )}
        </div>
      </div>
    </div>
  );
}