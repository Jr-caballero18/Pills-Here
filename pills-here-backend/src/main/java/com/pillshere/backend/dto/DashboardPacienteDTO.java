package com.pillshere.backend.dto;

public class DashboardPacienteDTO {

    private String nombre;

    public DashboardPacienteDTO() {
    }

    public DashboardPacienteDTO(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}