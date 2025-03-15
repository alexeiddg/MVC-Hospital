const BASE_URL = 'http://localhost:8080/api/medico';

export const MedicoService = {
    getAllMedicos: async () => {
        try {
            const response = await fetch(`${BASE_URL}/getall`);
            if (!response.ok) {
                throw new Error(`Error fetching medicos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching all medicos:', error);
            throw error;
        }
    },

    getMedicoById: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/get/${id}`);
            if (!response.ok) {
                throw new Error(`Error fetching medico by ID: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching medico by ID:', error);
            throw error;
        }
    },

    addMedico: async (medico: any) => {
        try {
            const response = await fetch(`${BASE_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(medico),
            });
            if (!response.ok) {
                throw new Error(`Error adding medico: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding medico:', error);
            throw error;
        }
    },

    deleteMedico: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Error deleting medico: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting medico:', error);
            throw error;
        }
    },

    getCitasByMedicoId: async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/citas/${id}`);
            if (!response.ok) {
                throw new Error(`Error fetching citas: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching citas by medico ID:', error);
            throw error;
        }
    }
};

export default MedicoService;
