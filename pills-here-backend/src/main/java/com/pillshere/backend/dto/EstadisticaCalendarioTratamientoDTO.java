
package com.pillshere.backend.dto;


public class EstadisticaCalendarioTratamientoDTO {

    private Integer idTratamiento;
    private String nombreTratamiento;
    private Long tomadas;
    private Long pendientes;
    private Long omitidas;

    public EstadisticaCalendarioTratamientoDTO() {
    }

    public EstadisticaCalendarioTratamientoDTO(
            Integer idTratamiento,
            String nombreTratamiento,
            Long tomadas,
            Long pendientes,
            Long omitidas
    ) {
        this.idTratamiento = idTratamiento;
        this.nombreTratamiento = nombreTratamiento;
        this.tomadas = tomadas;
        this.pendientes = pendientes;
        this.omitidas = omitidas;
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
}
