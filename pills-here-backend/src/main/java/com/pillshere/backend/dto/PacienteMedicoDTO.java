package com.pillshere.backend.dto;

public class PacienteMedicoDTO {

    private Integer idPaciente;
    private String nombre;
    private String edadSexo;

    public PacienteMedicoDTO() {
    }

    public PacienteMedicoDTO(Integer idPaciente, String nombre, String edadSexo) {
        this.idPaciente = idPaciente;
        this.nombre = nombre;
        this.edadSexo = edadSexo;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEdadSexo() {
        return edadSexo;
    }

    public void setEdadSexo(String edadSexo) {
        this.edadSexo = edadSexo;
    }
}