package com.pillshere.backend.dto;

import java.time.LocalDate;

public class TratamientoActualPacienteDTO {

    private Integer idTratamiento;
    private String nombreTratamiento;
    private String diagnostico;
    private String estado;
    private LocalDate fechaInicio;

    public TratamientoActualPacienteDTO(Integer idTratamiento, String nombreTratamiento, String diagnostico, String estado, LocalDate fechaInicio) {
        this.idTratamiento = idTratamiento;
        this.nombreTratamiento = nombreTratamiento;
        this.diagnostico = diagnostico;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public String getNombreTratamiento() {
        return nombreTratamiento;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public String getEstado() {
        return estado;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }
}