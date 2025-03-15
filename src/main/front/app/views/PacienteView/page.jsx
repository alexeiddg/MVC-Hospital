'use client';

import React, { useState, useEffect } from 'react';
import { PacienteService } from '../../../services/pacienteService'; // Importing the individual functions directly

export default function PacienteView() {
  const  id  = 3; // Obtener ID dinámico del paciente

  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');

  useEffect(() => {
    if (id) {
      fetchAppointments(id);
      fetchMedicalHistory(id);
    }
  }, [id]);

  const fetchAppointments = async (patientId) => {
    try {
      const data = await PacienteService.getCitasByPacienteId(patientId); // Using PacienteService
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const fetchMedicalHistory = async (patientId) => {
    try {
      const paciente = await PacienteService.getPacienteById(patientId); // Using PacienteService
      setMedicalHistory(paciente.historial_medico ? JSON.parse(paciente.historial_medico) : []);
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  const handleRequestAppointment = async (e) => {
    e.preventDefault();
    if (newAppointmentDate) {
      try {
        const newAppointment = {
          date: newAppointmentDate,
          time: '09:00',
          doctor: 'Pending Assignment',
          status: 'Requested',
          pacienteId: id,
        };
  
        console.log("Sending appointment:", newAppointment); // <-- Agrega esto
  
        await PacienteService.addCita(newAppointment);
        fetchAppointments(id);
        setNewAppointmentDate('');
      } catch (error) {
        console.error('Error requesting appointment:', error);
      }
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Portal</h1>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Request Appointment</h2>
          <form onSubmit={handleRequestAppointment} className="flex gap-4">
            <input
              type="date"
              className="p-2 border rounded flex-1"
              value={newAppointmentDate}
              onChange={(e) => setNewAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Request Appointment
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{showHistory ? 'Medical History' : 'My Appointments'}</h2>
            <button onClick={() => setShowHistory(!showHistory)} className="text-blue-600 hover:text-blue-900">
              {showHistory ? 'View Appointments' : 'View Medical History'}
            </button>
          </div>

          {showHistory ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prescription</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medicalHistory.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.diagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.prescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
