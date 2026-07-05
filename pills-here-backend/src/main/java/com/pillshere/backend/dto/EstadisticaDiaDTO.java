package com.pillshere.backend.dto;

public class EstadisticaDiaDTO {

    private String fecha;
    private Integer tomadas;
    private Integer pendientes;
    private Integer omitidas;

    public EstadisticaDiaDTO(String fecha, Integer tomadas, Integer pendientes, Integer omitidas) {
        this.fecha = fecha;
        this.tomadas = tomadas;
        this.pendientes = pendientes;
        this.omitidas = omitidas;
    }

    public String getFecha() {
        return fecha;
    }

    public Integer getTomadas() {
        return tomadas;
    }

    public Integer getPendientes() {
        return pendientes;
    }

    public Integer getOmitidas() {
        return omitidas;
    }
}