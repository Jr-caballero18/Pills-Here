import axios from "axios";

const API_URL = "http://localhost:8082/auth";

export const loginUsuario = async (datosLogin) => {
  const response = await axios.post(`${API_URL}/login`, datosLogin);
  return response.data;
};