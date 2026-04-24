
package com.pillshere.backend.dto;

import java.time.LocalDate;
import java.util.List;


public class CrearTratamientoRequestDTO {
    private Integer idPaciente;
    private Integer idMedico;
    private String diagnostico;
    private String recomendaciones;
    private LocalDate fechaInicio;
    private List<MedicamentoTratamientoDTO> medicamentos;

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public Integer getIdMedico() {
        return idMedico;
    }

    public void setIdMedico(Integer idMedico) {
        this.idMedico = idMedico;
    }

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

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public List<MedicamentoTratamientoDTO> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<MedicamentoTratamientoDTO> medicamentos) {
        this.medicamentos = medicamentos;
    }
}
