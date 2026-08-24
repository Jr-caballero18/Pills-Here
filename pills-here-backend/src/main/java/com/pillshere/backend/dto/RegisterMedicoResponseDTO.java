package com.pillshere.backend.dto;

public class RegisterMedicoResponseDTO {

    private boolean exito;
    private String mensaje;
    private Integer idUsuario;
    private Integer idMedico;
    private String nombre;

    public RegisterMedicoResponseDTO() {
    }

    public RegisterMedicoResponseDTO(
            boolean exito,
            String mensaje,
            Integer idUsuario,
            Integer idMedico,
            String nombre
    ) {
        this.exito = exito;
        this.mensaje = mensaje;
        this.idUsuario = idUsuario;
        this.idMedico = idMedico;
        this.nombre = nombre;
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

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdMedico() {
        return idMedico;
    }

    public void setIdMedico(Integer idMedico) {
        this.idMedico = idMedico;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}