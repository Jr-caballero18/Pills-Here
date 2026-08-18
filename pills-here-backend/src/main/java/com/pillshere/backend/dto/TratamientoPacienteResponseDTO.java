package com.pillshere.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TratamientoPacienteResponseDTO {

    private Integer idTratamiento;
    private String nombreTratamiento;
    private String diagnostico;
    private String estado;
    private LocalDate fechaInicio;
    private LocalDateTime fechaInicioReal;
    private LocalDate fechaFin;
    private String notasMedicas;
    private Integer porcentajeCumplimiento;

    public TratamientoPacienteResponseDTO() {
    }

    public TratamientoPacienteResponseDTO(
            Integer idTratamiento,
            String nombreTratamiento,
            String diagnostico,
            String estado,
            LocalDate fechaInicio,
            LocalDateTime fechaInicioReal,
            LocalDate fechaFin,
            String notasMedicas
    ) {
        this.idTratamiento = idTratamiento;
        this.nombreTratamiento = nombreTratamiento;
        this.diagnostico = diagnostico;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaInicioReal = fechaInicioReal;
        this.fechaFin = fechaFin;
        this.notasMedicas = notasMedicas;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public String getNombreTratamiento() {
        return nombreTratamiento;
    }

    public void setNombreTratamiento(String nombreTratamiento) {
        this.nombreTratamiento = nombreTratamiento;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getNotasMedicas() {
        return notasMedicas;
    }

    public void setNotasMedicas(String notasMedicas) {
        this.notasMedicas = notasMedicas;
    }

    public Integer getPorcentajeCumplimiento() {
        return porcentajeCumplimiento;
    }

    public void setPorcentajeCumplimiento(Integer porcentajeCumplimiento) {
        this.porcentajeCumplimiento = porcentajeCumplimiento;
    }

    public LocalDateTime getFechaInicioReal() {
        return fechaInicioReal;
    }

    public void setFechaInicioReal(LocalDateTime fechaInicioReal) {
        this.fechaInicioReal = fechaInicioReal;
    }
}
