package com.pillshere.backend.dto;

public class RegisterResponseDTO {

    private boolean exito;
    private String mensaje;

    public RegisterResponseDTO() {
    }

    public RegisterResponseDTO(boolean exito, String mensaje) {
        this.exito = exito;
        this.mensaje = mensaje;
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
}