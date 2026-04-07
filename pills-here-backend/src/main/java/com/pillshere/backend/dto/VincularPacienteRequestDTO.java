package com.pillshere.backend.dto;

public class VincularPacienteRequestDTO {

    private Integer idUsuarioMedico;
    private String codigoPaciente;

    public VincularPacienteRequestDTO() {
    }

    public Integer getIdUsuarioMedico() {
        return idUsuarioMedico;
    }

    public void setIdUsuarioMedico(Integer idUsuarioMedico) {
        this.idUsuarioMedico = idUsuarioMedico;
    }

    public String getCodigoPaciente() {
        return codigoPaciente;
    }

    public void setCodigoPaciente(String codigoPaciente) {
        this.codigoPaciente = codigoPaciente;
    }
}