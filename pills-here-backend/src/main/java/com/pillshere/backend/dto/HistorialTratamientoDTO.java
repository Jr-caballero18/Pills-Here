package com.pillshere.backend.dto;

import java.time.LocalDate;

public class HistorialTratamientoDTO {
    private LocalDate fecha;
    private String diagnostico;
    private String medico;
    private String estado;

    public HistorialTratamientoDTO(LocalDate fecha, String diagnostico, String medico, String estado) {
        this.fecha = fecha;
        this.diagnostico = diagnostico;
        this.medico = medico;
        this.estado = estado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public String getMedico() {
        return medico;
    }

    public String getEstado() {
        return estado;
    }
}