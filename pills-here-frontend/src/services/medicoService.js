import axios from "axios";

const API_URL = "http://localhost:8083/medico";

export const obtenerDashboardMedico = async (idUsuario) => {
  const response = await axios.get(`${API_URL}/dashboard/${idUsuario}`);
  return response.data;
};

export const obtenerPerfilMedico = async (idMedico) => {
  const response = await axios.get(`${API_URL}/perfil/${idMedico}`);
  return response.data;
};