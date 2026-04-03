package com.pillshere.backend.dto;

import java.util.List;

public class DashboardMedicoDTO {

    private String nombre;
    private int totalPacientes;
    private int tratamientosActivos;
    private int tratamientosCompletados;
    private List<String> pacientesRecientes;

    public DashboardMedicoDTO() {
    }

    public DashboardMedicoDTO(String nombre, int totalPacientes, int tratamientosActivos,
                              int tratamientosCompletados, List<String> pacientesRecientes) {
        this.nombre = nombre;
        this.totalPacientes = totalPacientes;
        this.tratamientosActivos = tratamientosActivos;
        this.tratamientosCompletados = tratamientosCompletados;
        this.pacientesRecientes = pacientesRecientes;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getTotalPacientes() {
        return totalPacientes;
    }

    public void setTotalPacientes(int totalPacientes) {
        this.totalPacientes = totalPacientes;
    }

    public int getTratamientosActivos() {
        return tratamientosActivos;
    }

    public void setTratamientosActivos(int tratamientosActivos) {
        this.tratamientosActivos = tratamientosActivos;
    }

    public int getTratamientosCompletados() {
        return tratamientosCompletados;
    }

    public void setTratamientosCompletados(int tratamientosCompletados) {
        this.tratamientosCompletados = tratamientosCompletados;
    }

    public List<String> getPacientesRecientes() {
        return pacientesRecientes;
    }

    public void setPacientesRecientes(List<String> pacientesRecientes) {
        this.pacientesRecientes = pacientesRecientes;
    }
}