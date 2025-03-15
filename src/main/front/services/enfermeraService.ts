const BASE_URL = 'http://localhost:8080/api/enfermera';

export const EnfermeraService = {
  getAllEnfermeras: async () => {
    try {
      const response = await fetch(`${BASE_URL}/getall`);
      if (!response.ok) {
        throw new Error(`Error fetching enfermeras: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all enfermeras:', error);
      throw error;
    }
  },

  getEnfermeraById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/get/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching enfermera by ID: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching enfermera by ID:', error);
      throw error;
    }
  },

  addEnfermera: async (enfermera: any) => {
    try {
      const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enfermera),
      });
      if (!response.ok) {
        throw new Error(`Error adding enfermera: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding enfermera:', error);
      throw error;
    }
  },

  deleteEnfermera: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Error deleting enfermera: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting enfermera:', error);
      throw error;
    }
  },

  getCitasByEnfermeraId: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/citas/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching citas: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching citas by enfermera ID:', error);
      throw error;
    }
  },
};

export default EnfermeraService;
