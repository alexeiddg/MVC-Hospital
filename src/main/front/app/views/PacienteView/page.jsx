'use client';

import React, { useState, useEffect } from 'react';
import { PacienteService } from '../../../services/pacienteService';
import { useRouter } from 'next/navigation';

export default function PacienteView() {
  const [patientId, setPatientId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'paciente') {
          setPatientId(user.id);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      fetchAppointments(patientId);
      fetchMedicalHistory(patientId);
    }
  }, [patientId]);

  const fetchAppointments = async (id) => {
    try {
      const data = await PacienteService.getCitasByPacienteId(id);
      setAppointments(Array.isArray(data) ? data : []);
      console.log('Appointments:', data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const fetchMedicalHistory = async (id) => {
    try {
      const paciente = await PacienteService.getPacienteById(id);
      console.log('Paciente:', paciente);
      setMedicalHistory(
          paciente.historial_medico ? JSON.parse(paciente.historial_medico) : []
      );
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  const handleRequestAppointment = async (e) => {
    e.preventDefault()
    if (newAppointmentDate) {
      router.push(`/views/CitaView?date=${encodeURIComponent(newAppointmentDate)}`);
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
              <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Request Appointment
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {showHistory ? 'Medical History' : 'My Appointments'}
              </h2>
              <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-blue-600 hover:text-blue-900"
              >
                {showHistory ? 'View Appointments' : 'View Medical History'}
              </button>
            </div>

            {showHistory ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Diagnosis</th>
                    <th>Prescription</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {medicalHistory.map((record, index) => (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.doctor}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.prescription}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.fecha}</td>
                        <td>{appointment.hora}</td>
                        <td>
                          {appointment.medico
                              ? appointment.medico.nombre
                              : 'No doctor assigned'}
                        </td>
                        <td>{appointment.estado}</td>
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
