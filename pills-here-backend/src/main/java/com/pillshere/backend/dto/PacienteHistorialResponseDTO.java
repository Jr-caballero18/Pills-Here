package com.pillshere.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class PacienteHistorialResponseDTO {

    private Integer idPaciente;
    private String codigoPaciente;
    private String nombreCompleto;
    private LocalDate fechaNacimiento;
    private String sexo;
    private String tipoSangre;
    private String alergias;
    private List<HistorialClinicoItemDTO> historial;

    public PacienteHistorialResponseDTO() {
    }

    public PacienteHistorialResponseDTO(Integer idPaciente, String codigoPaciente, String nombreCompleto,
                                        LocalDate fechaNacimiento, String sexo, String tipoSangre,
                                        String alergias, List<HistorialClinicoItemDTO> historial) {
        this.idPaciente = idPaciente;
        this.codigoPaciente = codigoPaciente;
        this.nombreCompleto = nombreCompleto;
        this.fechaNacimiento = fechaNacimiento;
        this.sexo = sexo;
        this.tipoSangre = tipoSangre;
        this.alergias = alergias;
        this.historial = historial;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getCodigoPaciente() {
        return codigoPaciente;
    }

    public void setCodigoPaciente(String codigoPaciente) {
        this.codigoPaciente = codigoPaciente;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getTipoSangre() {
        return tipoSangre;
    }

    public void setTipoSangre(String tipoSangre) {
        this.tipoSangre = tipoSangre;
    }

    public String getAlergias() {
        return alergias;
    }

    public void setAlergias(String alergias) {
        this.alergias = alergias;
    }

    public List<HistorialClinicoItemDTO> getHistorial() {
        return historial;
    }

    public void setHistorial(List<HistorialClinicoItemDTO> historial) {
        this.historial = historial;
    }
}