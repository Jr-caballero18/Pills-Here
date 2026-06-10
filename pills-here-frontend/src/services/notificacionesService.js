
const API_URL = "http://localhost:8083/notificaciones";

export const obtenerNotificacionesPaciente = async (idPaciente) => {
  const response = await fetch(`${API_URL}/paciente/${idPaciente}`);

  if (!response.ok) {
    throw new Error("Error al obtener notificaciones");
  }

  return await response.json();
};