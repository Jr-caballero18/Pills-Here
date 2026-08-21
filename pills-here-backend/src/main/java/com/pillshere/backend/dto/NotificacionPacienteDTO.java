package com.pillshere.backend.dto;

public class NotificacionPacienteDTO {

    private Integer id;
    private String tipo;
    private String nombreMedico;
    private String contenido;
    private String titulo;
    private String observaciones;
    private String fecha;
    private Integer idTratamiento;
    private String fechaHora;

    public NotificacionPacienteDTO(Integer id, String tipo, String nombreMedico, String contenido,
            String titulo, String observaciones, String fecha,Integer idTratamiento,             String fechaHora
) {
        this.id = id;
        this.tipo = tipo;
        this.nombreMedico = nombreMedico;
        this.contenido = contenido;
        this.titulo = titulo;
        this.observaciones = observaciones;
        this.fecha = fecha;
        this.idTratamiento = idTratamiento;
        this.fechaHora = fechaHora;


    }

    public Integer getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public String getNombreMedico() {
        return nombreMedico;
    }

    public String getContenido() {
        return contenido;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public String getFecha() {
        return fecha;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public String getFechaHora() {
        return fechaHora;
    }
    
}
