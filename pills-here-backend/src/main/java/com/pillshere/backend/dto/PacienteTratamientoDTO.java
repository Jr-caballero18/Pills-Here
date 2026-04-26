package com.pillshere.backend.dto;

public class PacienteTratamientoDTO {

    private Integer idPaciente;
    private String nombreCompleto;
    private Integer edad;
    private String sexo;

    public PacienteTratamientoDTO(Integer idPaciente, String nombreCompleto, Integer edad, String sexo) {
        this.idPaciente = idPaciente;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
        this.sexo = sexo;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public Integer getEdad() {
        return edad;
    }

    public String getSexo() {
        return sexo;
    }
}