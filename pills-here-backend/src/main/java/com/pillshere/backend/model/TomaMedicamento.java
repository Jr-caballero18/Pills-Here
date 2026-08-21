package com.pillshere.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "toma_medicamento")
public class TomaMedicamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_toma")
    private Integer idToma;

    @ManyToOne
    @JoinColumn(name = "id_dosis", nullable = false)
    private Dosis dosis;

    @Column(name = "fecha_hora_programada", nullable = false)
    private LocalDateTime fechaHoraProgramada;

    @Column(name = "fecha_hora_tomada")
    private LocalDateTime fechaHoraTomada;

    @Column(name = "estado", length = 20, nullable = false)
    private String estado;

    @Column(name = "fecha_notificacion")
    private LocalDateTime fechaNotificacion;

    public Integer getIdToma() {
        return idToma;
    }

    public void setIdToma(Integer idToma) {
        this.idToma = idToma;
    }

    public Dosis getDosis() {
        return dosis;
    }

    public void setDosis(Dosis dosis) {
        this.dosis = dosis;
    }

    public LocalDateTime getFechaHoraProgramada() {
        return fechaHoraProgramada;
    }

    public void setFechaHoraProgramada(LocalDateTime fechaHoraProgramada) {
        this.fechaHoraProgramada = fechaHoraProgramada;
    }

    public LocalDateTime getFechaHoraTomada() {
        return fechaHoraTomada;
    }

    public void setFechaHoraTomada(LocalDateTime fechaHoraTomada) {
        this.fechaHoraTomada = fechaHoraTomada;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaNotificacion() {
        return fechaNotificacion;
    }

    public void setFechaNotificacion(LocalDateTime fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }
    
    
}
