package com.pillshere.backend.dto;


public class LoginResponseDTO {

    private Integer idUsuario;
    private String nombre;
    private String rol;
    private String mensaje;
    private boolean success;
    public LoginResponseDTO() {
    }

    public LoginResponseDTO(Integer idUsuario, String nombre, String rol, String mensaje, boolean success) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.rol = rol;
        this.mensaje = mensaje;
        this.success = success;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}