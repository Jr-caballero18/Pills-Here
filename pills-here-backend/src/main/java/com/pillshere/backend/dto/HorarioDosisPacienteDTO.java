package com.pillshere.backend.dto;

import java.time.LocalTime;

public class HorarioDosisPacienteDTO {

    private Integer idDosis;
    private LocalTime horaInicioPaciente;

    public Integer getIdDosis() {
        return idDosis;
    }

    public void setIdDosis(Integer idDosis) {
        this.idDosis = idDosis;
    }

    public LocalTime getHoraInicioPaciente() {
        return horaInicioPaciente;
    }

    public void setHoraInicioPaciente(LocalTime horaInicioPaciente) {
        this.horaInicioPaciente = horaInicioPaciente;
    }
}