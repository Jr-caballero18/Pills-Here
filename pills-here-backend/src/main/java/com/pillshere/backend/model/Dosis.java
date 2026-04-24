
package com.pillshere.backend.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "dosis")
public class Dosis {
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dosis")
    private Integer idDosis;

    @ManyToOne
    @JoinColumn(name = "id_tratamiento", nullable = false)
    private Tratamiento tratamiento;

    @ManyToOne
    @JoinColumn(name = "id_medicamento", nullable = false)
    private Medicamento medicamento;

    @Column(name = "cantidad", length = 50)
    private String cantidad;

    @Column(name = "frecuencia", length = 50)
    private String frecuencia;

    @Column(name = "hora_programada")
    private LocalTime horaProgramada;

    @Column(name = "duracion")
    private Integer duracion;

    public Integer getIdDosis() {
        return idDosis;
    }

    public void setIdDosis(Integer idDosis) {
        this.idDosis = idDosis;
    }

    public Tratamiento getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(Tratamiento tratamiento) {
        this.tratamiento = tratamiento;
    }

    public Medicamento getMedicamento() {
        return medicamento;
    }

    public void setMedicamento(Medicamento medicamento) {
        this.medicamento = medicamento;
    }

    public String getCantidad() {
        return cantidad;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

    public String getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(String frecuencia) {
        this.frecuencia = frecuencia;
    }

    public LocalTime getHoraProgramada() {
        return horaProgramada;
    }

    public void setHoraProgramada(LocalTime horaProgramada) {
        this.horaProgramada = horaProgramada;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public void setDuracion(Integer duracion) {
        this.duracion = duracion;
    }  
}
