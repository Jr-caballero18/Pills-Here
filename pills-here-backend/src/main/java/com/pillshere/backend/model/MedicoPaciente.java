package com.pillshere.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medico_paciente")
public class MedicoPaciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medico_paciente")
    private Integer idMedicoPaciente;

    @ManyToOne
    @JoinColumn(name = "id_medico", nullable = false)
    private Medico medico;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    @Column(name = "fecha_vinculacion", nullable = false)
    private LocalDate fechaVinculacion;

    @Column(name = "fecha_ultima_consulta")
    private LocalDateTime fechaUltimaConsulta;

    public MedicoPaciente() {
    }

    public Integer getIdMedicoPaciente() {
        return idMedicoPaciente;
    }

    public void setIdMedicoPaciente(Integer idMedicoPaciente) {
        this.idMedicoPaciente = idMedicoPaciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public LocalDate getFechaVinculacion() {
        return fechaVinculacion;
    }

    public void setFechaVinculacion(LocalDate fechaVinculacion) {
        this.fechaVinculacion = fechaVinculacion;
    }

    public LocalDateTime getFechaUltimaConsulta() {
        return fechaUltimaConsulta;
    }

    public void setFechaUltimaConsulta(LocalDateTime fechaUltimaConsulta) {
        this.fechaUltimaConsulta = fechaUltimaConsulta;
    }

}
