package com.pillshere.backend.dto;

public class DetallePacienteDTO {

    private Integer idPaciente;
    private String nombreCompleto;
    private Integer edad;
    private String sexo;
    private String tipoSangre;

    public DetallePacienteDTO() {
    }

    public DetallePacienteDTO(Integer idPaciente, String nombreCompleto, Integer edad, String sexo, String tipoSangre) {
        this.idPaciente = idPaciente;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
        this.sexo = sexo;
        this.tipoSangre = tipoSangre;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getTipoSangre() {
        return tipoSangre;
    }

    public void setTipoSangre(String tipoSangre) {
        this.tipoSangre = tipoSangre;
    }
}