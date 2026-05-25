const API_URL = "http://localhost:8083/avisos";

export const crearAviso = async (aviso) => {
  const response = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aviso),
  });

  if (!response.ok) {
    throw new Error("Error al crear aviso");
  }

  return await response.json();
};