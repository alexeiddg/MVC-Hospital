'use client'

import React, { useState } from 'react';

export default function MedicoView() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Ana Martínez', date: '2025-03-10', symptoms: 'Fever and cough', medication: '' },
    { id: 2, name: 'Carlos Sánchez', date: '2025-03-11', symptoms: 'Headache', medication: 'Ibuprofen 400mg' }
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescription, setPrescription] = useState('');

  const handleAttendPatient = (patient) => {
    // atender_paciente() implementation
    setSelectedPatient(patient);
  };

  const handlePrescribe = (e) => {
    e.preventDefault();
    // recetar_medicacion() implementation
    if (selectedPatient && prescription) {
      const updatedPatients = patients.map(p => 
        p.id === selectedPatient.id ? {...p, medication: prescription} : p
      );
      setPatients(updatedPatients);
      setSelectedPatient({...selectedPatient, medication: prescription});
      setPrescription('');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Patients List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map(patient => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.symptoms}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAttendPatient(patient)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Attend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {selectedPatient ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
              <div className="mb-4">
                <p className="font-semibold">Name:</p>
                <p>{selectedPatient.name}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Symptoms:</p>
                <p>{selectedPatient.symptoms}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Current Medication:</p>
                <p>{selectedPatient.medication || 'None'}</p>
              </div>
              
              <form onSubmit={handlePrescribe}>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Prescribe Medication:</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Save Prescription
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500">Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}