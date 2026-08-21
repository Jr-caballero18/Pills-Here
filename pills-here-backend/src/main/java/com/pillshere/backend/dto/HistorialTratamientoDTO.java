package com.pillshere.backend.dto;

import java.time.LocalDate;

public class HistorialTratamientoDTO {

    private Integer idTratamiento;
    private LocalDate fecha;
    private String diagnostico;
    private String medico;
    private String estado;

    public HistorialTratamientoDTO(
            Integer idTratamiento,
            LocalDate fecha,
            String diagnostico,
            String medico,
            String estado
    ) {
        this.idTratamiento = idTratamiento;
        this.fecha = fecha;
        this.diagnostico = diagnostico;
        this.medico = medico;
        this.estado = estado;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
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