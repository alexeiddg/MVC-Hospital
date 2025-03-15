const BASE_URL = 'http://localhost:8080/api/paciente';

export const PacienteService = {

    getAllPacientes: async () => {
        try {
            const response = await fetch(`${BASE_URL}/getall`);
            if (!response.ok) {
                throw new Error(`Error fetching pacientes: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching all pacientes:', error);
            throw error;
        }
    },

    getPacienteById: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/get/${id}`);
            if (!response.ok) {
                throw new Error(`Paciente not found: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching paciente by ID:', error);
            throw error;
        }
    },

    addPaciente: async (paciente: any) => {
        try {
            const response = await fetch(`${BASE_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente),
            });
            if (!response.ok) {
                throw new Error(`Error adding paciente: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding paciente:', error);
            throw error;
        }
    },

    deletePaciente: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Error deleting paciente: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting paciente:', error);
            throw error;
        }
    },

    getCitasByPacienteId: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/citas/${id}`);
            if (!response.ok) {
                throw new Error(`Error fetching citas: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching citas by paciente ID:', error);
            throw error;
        }
    },

    addCita: async (cita: any) => {
        try {
            const response = await fetch(`http://localhost:8080/api/cita/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cita),
            });
            if (!response.ok) {
                throw new Error(`Error adding cita: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding cita:', error);
            throw error;
        }
    },

    deleteCita: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/cita/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Error deleting cita: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting cita:', error);
            throw error;
        }
    }
};

export default PacienteService;
