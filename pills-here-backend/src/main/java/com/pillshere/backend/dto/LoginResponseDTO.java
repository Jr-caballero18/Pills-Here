package com.pillshere.backend.dto;

public class LoginResponseDTO {

    private boolean exito;
    private String mensaje;
    private String rol;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(boolean exito, String mensaje, String rol) {
        this.exito = exito;
        this.mensaje = mensaje;
        this.rol = rol;
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

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}