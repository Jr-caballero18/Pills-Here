import axios from "axios";

const API_URL = "http://localhost:8083/paciente";

export const obtenerDashboardPaciente = async (idUsuario) => {
  const response = await axios.get(`${API_URL}/dashboard/${idUsuario}`);
  return response.data;
};

export const obtenerHistorialPaciente = async (idPaciente) => {
  const response = await axios.get(`${API_URL}/historial/${idPaciente}`);
  return response.data;
};