const BASE_URL = 'http://localhost:8080/api/administrador';

/**
 * Service to handle all administrator-related API calls
 */
export const AdministradorService = {
    // Medicos management
    getAllMedicos: async () => {
      try {
        const response = await fetch(`${BASE_URL}/medicos`);
        if (!response.ok) {
          throw new Error(`Error fetching doctors: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching all doctors:', error);
        throw error;
      }
    },
  
    getMedicoById: async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/medicos/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching doctor with ID ${id}: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching doctor ${id}:`, error);
        throw error;
      }
    },
  
    addMedico: async (medicoData) => {
      try {
        const response = await fetch(`${BASE_URL}/add/medico`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicoData),
        });
        if (!response.ok) {
          throw new Error(`Error adding doctor: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error adding doctor:', error);
        throw error;
      }
    },
  
    deleteMedico: async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/delete/medico/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error deleting doctor with ID ${id}: ${response.status}`);
        }
        return { success: true };
      } catch (error) {
        console.error(`Error deleting doctor ${id}:`, error);
        throw error;
      }
    },
  
    // Administradores management
    getAllAdministradores: async () => {
      try {
        const response = await fetch(`${BASE_URL}/get`);
        if (!response.ok) {
          throw new Error(`Error fetching administrators: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching all administrators:', error);
        throw error;
      }
    },
  
    getAdministradorById: async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/get/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching administrator with ID ${id}: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching administrator ${id}:`, error);
        throw error;
      }
    },
  
    addAdministrador: async (adminData) => {
      try {
        const response = await fetch(`${BASE_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminData),
        });
        if (!response.ok) {
          throw new Error(`Error adding administrator: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error adding administrator:', error);
        throw error;
      }
    },
  
    deleteAdministrador: async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error deleting administrator with ID ${id}: ${response.status}`);
        }
        return { success: true };
      } catch (error) {
        console.error(`Error deleting administrator ${id}:`, error);
        throw error;
      }
    }
  };
  
  export default AdministradorService;
