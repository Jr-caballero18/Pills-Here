import axios from "axios";

const API_URL = "http://localhost:8083/medico-paciente";

export const vincularPacientePorCodigo = async (idUsuarioMedico, codigoPaciente) => {
  const response = await axios.post(`${API_URL}/vincular`, {
    idUsuarioMedico,
    codigoPaciente,
  });

  return response.data;
};

export const obtenerDetallePaciente = async (idPaciente) => {
  const response = await axios.get(`${API_URL}/detalle-paciente/${idPaciente}`);
  return response.data;
};

export const obtenerPacientesDelMedico = async (idUsuarioMedico) => {
  const response = await axios.get(`${API_URL}/lista/${idUsuarioMedico}`);
  return response.data;
};

export const registrarConsultaPaciente = async (idUsuarioMedico, idPaciente) => {
  await axios.post(`${API_URL}/registrar-consulta/${idUsuarioMedico}/${idPaciente}`);
};