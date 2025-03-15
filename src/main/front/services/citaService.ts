const BASE_URL = 'http://localhost:8080/api/cita';

export const CitaService = {
    getAllCitas: async () => {
        try {
            const response = await fetch(`${BASE_URL}/getall`);
            if (!response.ok) {
                throw new Error(`Error fetching citas: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching all citas:', error);
            throw error;
        }
    },

    getCitaById: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/get/${id}`);
            if (!response.ok) {
                throw new Error(`Error fetching cita by ID: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching cita by ID:', error);
            throw error;
        }
    },

    addCita: async (cita: any) => {
        try {
            const response = await fetch(`${BASE_URL}/add`, {
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
            const response = await fetch(`${BASE_URL}/delete/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Error deleting cita: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting cita:', error);
            throw error;
        }
    },
};

export default CitaService;
