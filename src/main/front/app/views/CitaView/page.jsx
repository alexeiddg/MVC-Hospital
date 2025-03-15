'use client'

import React, { useState, useEffect } from 'react';

export default function CitaView({ userType = 'doctor', userId = 201 }) {
  // State for the selected appointment
  const [currentAppointment, setCurrentAppointment] = useState(null);
  
  // Mock data for doctors and patients that would normally come from your database
  const doctors = [
    { id: 201, nombre: 'Dr. García', especialidad: 'Cardiología' },
    { id: 202, nombre: 'Dra. Rodríguez', especialidad: 'Pediatría' }
  ];
  
  const patients = [
    { id: 101, nombre: 'Ana Martínez', email: 'ana@example.com' },
    { id: 102, nombre: 'Carlos Sánchez', email: 'carlos@example.com' },
    { id: 103, nombre: 'Elena López', email: 'elena@example.com' }
  ];
  
  // State for appointments using the DB schema structure
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      fecha: '2025-03-15', 
      hora: '10:00', 
      motivo_consulta: 'Control anual cardiovascular',
      estado: 'Pendiente',
      medico_id: 201,
      paciente_id: 101
    },
    { 
      id: 2, 
      fecha: '2025-03-15', 
      hora: '11:00', 
      motivo_consulta: 'Dolor en el pecho',
      estado: 'Confirmada',
      medico_id: 201,
      paciente_id: 102
    },
    { 
      id: 3, 
      fecha: '2025-03-16', 
      hora: '09:00', 
      motivo_consulta: 'Fiebre alta en niño de 5 años',
      estado: 'Pendiente',
      medico_id: 202,
      paciente_id: 103
    }
  ]);

  // Helper functions to get doctor and patient info by ID
  const getDoctorById = (id) => doctors.find(doc => doc.id === id) || { nombre: 'Doctor desconocido', especialidad: 'N/A' };
  const getPatientById = (id) => patients.find(pat => pat.id === id) || { nombre: 'Paciente desconocido', email: 'N/A' };

  // Function to confirm appointment
  const confirmarCita = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, estado: 'Confirmada'} : appointment
    ));
    
    if (currentAppointment && currentAppointment.id === id) {
      setCurrentAppointment({...currentAppointment, estado: 'Confirmada'});
    }
  };

  // Function to cancel appointment
  const cancelarCita = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, estado: 'Cancelada'} : appointment
    ));
    
    if (currentAppointment && currentAppointment.id === id) {
      setCurrentAppointment({...currentAppointment, estado: 'Cancelada'});
    }
  };

  // Filter appointments based on user type and ID
  const filteredAppointments = userType === 'doctor' 
    ? appointments.filter(app => app.medico_id === userId)
    : appointments.filter(app => app.paciente_id === userId);

  // Set default selected appointment
  useEffect(() => {
    if (filteredAppointments.length > 0 && !currentAppointment) {
      setCurrentAppointment(filteredAppointments[0]);
    }
  }, [filteredAppointments, currentAppointment]);

  // Get status badge style
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Confirmada': return 'bg-green-100 text-green-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 max-w-6xl mx-auto gap-6">
      {/* Appointments List Panel */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {userType === 'doctor' ? 'Mis Pacientes' : 'Mis Citas'}
        </h2>
        
        <div className="space-y-2">
          {filteredAppointments.map(appointment => {
            const patientInfo = getPatientById(appointment.paciente_id);
            const doctorInfo = getDoctorById(appointment.medico_id);
            
            return (
              <div 
                key={appointment.id}
                onClick={() => setCurrentAppointment(appointment)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  currentAppointment && currentAppointment.id === appointment.id 
                    ? 'bg-blue-100 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {userType === 'doctor' ? patientInfo.nombre : doctorInfo.nombre}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.fecha} - {appointment.hora}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(appointment.estado)}`}>
                    {appointment.estado}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment Details Panel */}
      {currentAppointment && (
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Detalles de la Cita</h2>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(currentAppointment.estado)}`}>
              {currentAppointment.estado}
            </span>
          </div>

          {currentAppointment && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Información del Paciente</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {(() => {
                      const patient = getPatientById(currentAppointment.paciente_id);
                      return (
                        <>
                          <p className="font-medium">{patient.nombre}</p>
                          <p className="text-sm text-gray-600">{patient.email}</p>
                          <p className="text-sm text-gray-600">ID: {currentAppointment.paciente_id}</p>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Información del Médico</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {(() => {
                      const doctor = getDoctorById(currentAppointment.medico_id);
                      return (
                        <>
                          <p className="font-medium">{doctor.nombre}</p>
                          <p className="text-sm text-gray-600">{doctor.especialidad}</p>
                          <p className="text-sm text-gray-600">ID: {currentAppointment.medico_id}</p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Detalles de la Consulta</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p>{currentAppointment.fecha}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hora</p>
                      <p>{currentAppointment.hora}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Motivo de la Consulta</p>
                    <p className="mt-1">{currentAppointment.motivo_consulta}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                {currentAppointment.estado === 'Pendiente' && (
                  <button
                    onClick={() => confirmarCita(currentAppointment.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Confirmar Cita
                  </button>
                )}
                
                {currentAppointment.estado !== 'Cancelada' && (
                  <button
                    onClick={() => cancelarCita(currentAppointment.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Cancelar Cita
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}