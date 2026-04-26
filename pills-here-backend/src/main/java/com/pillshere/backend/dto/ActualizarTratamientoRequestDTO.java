package com.pillshere.backend.dto;

import java.util.List;

public class ActualizarTratamientoRequestDTO {

    private String diagnostico;
    private String recomendaciones;
    private List<MedicamentoTratamientoDTO> medicamentos;

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(String recomendaciones) {
        this.recomendaciones = recomendaciones;
    }

    public List<MedicamentoTratamientoDTO> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<MedicamentoTratamientoDTO> medicamentos) {
        this.medicamentos = medicamentos;
    }
}