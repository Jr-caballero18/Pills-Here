package com.pillshere.backend.dto;

import java.time.LocalDate;

public class HistorialClinicoItemDTO {

    private Integer idHistorial;
    private LocalDate fecha;
    private String descripcion;
    private String observaciones;

    public HistorialClinicoItemDTO() {
    }

    public HistorialClinicoItemDTO(Integer idHistorial, LocalDate fecha, String descripcion, String observaciones) {
        this.idHistorial = idHistorial;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.observaciones = observaciones;
    }

    public Integer getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Integer idHistorial) {
        this.idHistorial = idHistorial;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}