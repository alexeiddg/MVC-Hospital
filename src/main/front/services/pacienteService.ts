const BASE_URL = 'http://localhost:8080/api/paciente';

/**
 * Service to handle all paciente-related API calls
 */
export const PacienteService = {
    // Obtener todos los pacientes
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

    // Obtener un paciente por ID
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

    // Agregar un nuevo paciente
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

    // Eliminar un paciente por ID
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

    // Obtener citas por ID de paciente
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

    // Agregar una cita
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

    // Eliminar una cita por ID
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
