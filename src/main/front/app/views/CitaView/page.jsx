'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PacienteService from '../../../services/pacienteService';
import MedicoService from '../../../services/medicoService';
import EnfermeraService from '../../../services/enfermeraService';
import CitaService from '../../../services/citaService';
import {router} from "next/client";

export default function NewCitaForm() {
  const searchParams = useSearchParams();
  const initialFecha = searchParams.get('date') || '';

  const [fecha, setFecha] = useState(initialFecha);
  const [hora, setHora] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [estado, setEstado] = useState('Pendiente');

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [errorDoctors, setErrorDoctors] = useState(null);

  const [nurses, setNurses] = useState([]);
  const [loadingNurses, setLoadingNurses] = useState(true);
  const [errorNurses, setErrorNurses] = useState(null);

  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [errorPatients, setErrorPatients] = useState(null);

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(
      searchParams.get('pacienteId') || ''
  );
  const [selectedNurse, setSelectedNurse] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    MedicoService.getAllMedicos()
        .then((data) => {
          setDoctors(data);
          setLoadingDoctors(false);
          if (data && data.length > 0) {
            setSelectedDoctor(data[0].id);
          }
        })
        .catch((err) => {
          console.error('Error fetching doctors:', err);
          setErrorDoctors(err);
          setLoadingDoctors(false);
        });
  }, []);

  useEffect(() => {
    EnfermeraService.getAllEnfermeras()
        .then((data) => {
          setNurses(data);
          setLoadingNurses(false);
          if (data && data.length > 0) {
            setSelectedNurse(data[0].id);
          }
        })
        .catch((err) => {
          console.error('Error fetching nurses:', err);
          setErrorNurses(err);
          setLoadingNurses(false);
        });
  }, []);

  useEffect(() => {
    PacienteService.getAllPacientes()
        .then((data) => {
          setPatients(data);
          setLoadingPatients(false);
          if (!selectedPatient && data.length > 0) {
            setSelectedPatient(data[0].id);
          }
        })
        .catch((err) => {
          console.error('Error fetching patients:', err);
          setErrorPatients(err);
          setLoadingPatients(false);
        });
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      PacienteService.getPacienteById(selectedPatient)
          .then((data) => setPatientInfo(data))
          .catch((err) => console.error('Error fetching patient info:', err));
    }
  }, [selectedPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCita = {
      fecha,
      hora,
      motivo_consulta: motivoConsulta,
      estado,
      medico: { id: selectedDoctor },
      paciente: { id: selectedPatient },
      enfermera: { id: selectedNurse },
    };

    try {
      const result = await CitaService.addCita(newCita);
      console.log('New Cita created:', result);
    } catch (error) {
      console.error('Error creating cita:', error);
    }

    setFecha('');
    setHora('');
    setMotivoConsulta('');
    setEstado('Pendiente');
    router.push("/views/PacienteView")
  };

  return (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Crear Nueva Cita</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Fecha</label>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Hora</label>
            <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Motivo de la Consulta</label>
            <textarea
                value={motivoConsulta}
                onChange={(e) => setMotivoConsulta(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Describe el motivo de la consulta"
                required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Estado</label>
            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full p-2 border rounded"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Médico</label>
            {loadingDoctors ? (
                <p>Cargando médicos...</p>
            ) : errorDoctors ? (
                <p>Error al cargar médicos.</p>
            ) : (
                <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                  {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.nombre} - {doc.especialidad}
                      </option>
                  ))}
                </select>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Paciente</label>
            {loadingPatients ? (
                <p>Cargando pacientes...</p>
            ) : errorPatients ? (
                <p>Error al cargar pacientes.</p>
            ) : patientInfo ? (
                <input
                    type="text"
                    value={patientInfo.nombre}
                    disabled
                    className="w-full p-2 border rounded"
                />
            ) : (
                <select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                  {patients.map((pat) => (
                      <option key={pat.id} value={pat.id}>
                        {pat.nombre}
                      </option>
                  ))}
                </select>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Enfermera</label>
            {loadingNurses ? (
                <p>Cargando enfermeras...</p>
            ) : errorNurses ? (
                <p>Error al cargar enfermeras.</p>
            ) : (
                <select
                    value={selectedNurse}
                    onChange={(e) => setSelectedNurse(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                  {nurses.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.nombre}
                      </option>
                  ))}
                </select>
            )}
          </div>
          <div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Crear Cita
            </button>
          </div>
        </form>
      </div>
  );
}
