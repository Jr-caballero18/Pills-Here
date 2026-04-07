package com.pillshere.backend.dto;

public class VincularPacienteResponseDTO {

    private boolean success;
    private String mensaje;
    private Integer idPaciente;

    public VincularPacienteResponseDTO() {
    }

    public VincularPacienteResponseDTO(boolean success, String mensaje, Integer idPaciente) {
        this.success = success;
        this.mensaje = mensaje;
        this.idPaciente = idPaciente;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }
}