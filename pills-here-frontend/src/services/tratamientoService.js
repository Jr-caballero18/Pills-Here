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

export const obtenerTratamientoPorPaciente = async (idPaciente) => {
  const response = await axios.get(`${API_URL}/tratamientos/paciente/${idPaciente}`);
  return response.data;
};

export const eliminarTratamiento = async (idTratamiento) => {
  const response = await axios.delete(`${API_URL}/tratamientos/${idTratamiento}`);
  return response.data;
};

export const obtenerDetalleTratamiento = async (idTratamiento) => {
  const response = await axios.get(`${API_URL}/tratamientos/${idTratamiento}`);
  return response.data;
};

export const actualizarTratamiento = async (idTratamiento, tratamiento) => {
  const response = await axios.put(
    `${API_URL}/tratamientos/${idTratamiento}`,
    tratamiento
  );

  return response.data;
};

export const cancelarTratamiento = async (idTratamiento) => {
  const response = await axios.put(
    `${API_URL}/tratamientos/${idTratamiento}/cancelar`
  );

  return response.data;
};

export const agregarComentarioTratamiento = async (idTratamiento, comentario) => {
  const response = await axios.put(
    `${API_URL}/tratamientos/${idTratamiento}/comentario`,
    { comentario }
  );

  return response.data;
};

export const obtenerTratamientosActivosPaciente = async (idPaciente) => {
  const response = await axios.get(
    `${API_URL}/tratamientos/paciente-actuales/${idPaciente}`
  );

  return response.data;
};