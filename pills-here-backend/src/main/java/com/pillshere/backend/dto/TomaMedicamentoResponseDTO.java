package com.pillshere.backend.dto;

public class TomaMedicamentoResponseDTO {

    private Integer idToma;
    private Integer idDosis;
    private String nombre;
    private String dosis;
    private Integer intervaloHoras;
    private String hora;
    private String estado;

    public TomaMedicamentoResponseDTO(
            Integer idToma,
            Integer idDosis,
            String nombre,
            String dosis,
            Integer intervaloHoras,
            String hora,
            String estado
    ) {
        this.idToma = idToma;
        this.idDosis = idDosis;
        this.nombre = nombre;
        this.dosis = dosis;
        this.intervaloHoras = intervaloHoras;
        this.hora = hora;
        this.estado = estado;
    }

    public Integer getIdToma() {
        return idToma;
    }

    public Integer getIdDosis() {
        return idDosis;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDosis() {
        return dosis;
    }

    public Integer getIntervaloHoras() {
        return intervaloHoras;
    }

    public String getHora() {
        return hora;
    }

    public String getEstado() {
        return estado;
    }
}