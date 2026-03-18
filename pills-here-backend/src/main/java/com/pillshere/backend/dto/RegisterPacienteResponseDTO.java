package com.pillshere.backend.dto;

public class RegisterPacienteResponseDTO {

    private boolean exito;
    private String mensaje;
    private String codigoPaciente;

    public RegisterPacienteResponseDTO() {
    }

    public RegisterPacienteResponseDTO(boolean exito, String mensaje, String codigoPaciente) {
        this.exito = exito;
        this.mensaje = mensaje;
        this.codigoPaciente = codigoPaciente;
    }

    public boolean isExito() {
        return exito;
    }

    public void setExito(boolean exito) {
        this.exito = exito;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getCodigoPaciente() {
        return codigoPaciente;
    }

    public void setCodigoPaciente(String codigoPaciente) {
        this.codigoPaciente = codigoPaciente;
    }
}