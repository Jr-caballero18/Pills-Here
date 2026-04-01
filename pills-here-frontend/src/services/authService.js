import axios from "axios";

const API_URL = "http://localhost:8083/auth";

export const loginUsuario = async (datosLogin) => {
  const response = await axios.post(`${API_URL}/login`, datosLogin);
  return response.data;
};

export const registerMedico = async (datosMedico) => {
  const response = await axios.post(`${API_URL}/register-medico`, datosMedico);
  return response.data;
};

export const registerPaciente = async (datosPaciente) => {
  const response = await axios.post(`${API_URL}/register-paciente`, datosPaciente);
  return response.data;
};


