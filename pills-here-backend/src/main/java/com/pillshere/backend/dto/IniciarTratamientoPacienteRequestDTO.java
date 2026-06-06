package com.pillshere.backend.dto;

import java.util.List;

public class IniciarTratamientoPacienteRequestDTO {

    private List<HorarioDosisPacienteDTO> horarios;

    public List<HorarioDosisPacienteDTO> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<HorarioDosisPacienteDTO> horarios) {
        this.horarios = horarios;
    }
}