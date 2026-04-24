import axios from "axios";

const API_URL = "http://localhost:8083";

export const buscarMedicamentos = async (nombre) => {
  const response = await axios.get(`${API_URL}/medicamentos/buscar`, {
    params: { nombre },
  });

  return response.data;
};

export const crearTratamiento = async (tratamiento) => {
  const response = await axios.post(`${API_URL}/tratamientos/crear`, tratamiento);
  return response.data;
};