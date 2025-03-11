'use client'

import React, { useState } from 'react';

export default function PacienteView() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2025-03-15', time: '10:00', doctor: 'Dr. García', status: 'Scheduled' },
    { id: 2, date: '2025-02-20', time: '15:30', doctor: 'Dr. Rodríguez', status: 'Completed' }
  ]);
  
  const [medicalHistory, setMedicalHistory] = useState([
    { id: 1, date: '2025-02-20', doctor: 'Dr. Rodríguez', diagnosis: 'Common cold', prescription: 'Rest and fluids' },
    { id: 2, date: '2024-12-10', doctor: 'Dr. López', diagnosis: 'Seasonal allergies', prescription: 'Antihistamines' }
  ]);
  
  const [showHistory, setShowHistory] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  
  const handleRequestAppointment = (e) => {
    e.preventDefault();
    // solicitar_cita() implementation
    if (newAppointmentDate) {
      const newId = Math.max(...appointments.map(a => a.id)) + 1;
      const newAppointment = {
        id: newId,
        date: newAppointmentDate,
        time: '09:00',
        doctor: 'Pending Assignment',
        status: 'Requested'
      };
      setAppointments([...appointments, newAppointment]);
      setNewAppointmentDate('');
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
            // ver_historial() implementation
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medicalHistory.map(record => (
                  <tr key={record.id}>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map(appointment => (
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
