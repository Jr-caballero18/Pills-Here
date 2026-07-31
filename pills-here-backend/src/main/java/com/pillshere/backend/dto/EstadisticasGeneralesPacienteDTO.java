package com.pillshere.backend.dto;

public class EstadisticasGeneralesPacienteDTO {

    private Long tomadas;
    private Long pendientes;
    private Long omitidas;
    private Double porcentajeCumplimiento;

    public EstadisticasGeneralesPacienteDTO() {
    }

    public EstadisticasGeneralesPacienteDTO(
            Long tomadas,
            Long pendientes,
            Long omitidas,
            Double porcentajeCumplimiento
    ) {
        this.tomadas = tomadas;
        this.pendientes = pendientes;
        this.omitidas = omitidas;
        this.porcentajeCumplimiento = porcentajeCumplimiento;
    }

    public Long getTomadas() {
        return tomadas;
    }

    public void setTomadas(Long tomadas) {
        this.tomadas = tomadas;
    }

    public Long getPendientes() {
        return pendientes;
    }

    public void setPendientes(Long pendientes) {
        this.pendientes = pendientes;
    }

    public Long getOmitidas() {
        return omitidas;
    }

    public void setOmitidas(Long omitidas) {
        this.omitidas = omitidas;
    }

    public Double getPorcentajeCumplimiento() {
        return porcentajeCumplimiento;
    }

    public void setPorcentajeCumplimiento(Double porcentajeCumplimiento) {
        this.porcentajeCumplimiento = porcentajeCumplimiento;
    }
}