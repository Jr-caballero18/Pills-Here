package com.pillshere.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class DetalleTratamientoResponseDTO {

    private Integer idTratamiento;
    private String diagnostico;
    private String estado;
    private LocalDate fechaInicio;
    private String notasMedicas;
    private PacienteTratamientoDTO paciente;
    private List<MedicamentoTratamientoResponseDTO> medicamentos;
    private String nombreMedico;
    private Integer porcentajeCumplimiento;

    public Integer getPorcentajeCumplimiento() {
        return porcentajeCumplimiento;
    }

    public void setPorcentajeCumplimiento(Integer porcentajeCumplimiento) {
        this.porcentajeCumplimiento = porcentajeCumplimiento;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getNotasMedicas() {
        return notasMedicas;
    }

    public void setNotasMedicas(String notasMedicas) {
        this.notasMedicas = notasMedicas;
    }

    public PacienteTratamientoDTO getPaciente() {
        return paciente;
    }

    public void setPaciente(PacienteTratamientoDTO paciente) {
        this.paciente = paciente;
    }

    public List<MedicamentoTratamientoResponseDTO> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<MedicamentoTratamientoResponseDTO> medicamentos) {
        this.medicamentos = medicamentos;
    }

    public String getNombreMedico() {
        return nombreMedico;
    }

    public void setNombreMedico(String nombreMedico) {
        this.nombreMedico = nombreMedico;
    }
}
