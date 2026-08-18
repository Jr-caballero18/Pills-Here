package com.pillshere.backend.dto;

import java.util.List;

public class EstadisticaCalendarioTratamientoDTO {

    private Integer idTratamiento;
    private String nombreTratamiento;
    private List<String> medicamentos;

    public EstadisticaCalendarioTratamientoDTO() {
    }

    public EstadisticaCalendarioTratamientoDTO(
            Integer idTratamiento,
            String nombreTratamiento,
            List<String> medicamentos
    ) {
        this.idTratamiento = idTratamiento;
        this.nombreTratamiento = nombreTratamiento;
        this.medicamentos = medicamentos;
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

    public List<String> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<String> medicamentos) {
        this.medicamentos = medicamentos;
    }
}