/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pillshere.backend.dto;

import java.time.LocalDate;

/**
 *
 * @author pamel
 */
public class PerfilMedicoDTO {
    
    private Integer idMedico;
    private String nombreCompleto;
    private String correo;
    private LocalDate fechaNacimiento;
    private String especialidad;
    private String cedulaProfesional;
    private String consultorio;

    public PerfilMedicoDTO(Integer idMedico, String nombreCompleto, String correo,
            LocalDate fechaNacimiento, String especialidad, String cedulaProfesional,
            String consultorio) {
        this.idMedico = idMedico;
        this.nombreCompleto = nombreCompleto;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.especialidad = especialidad;
        this.cedulaProfesional = cedulaProfesional;
        this.consultorio = consultorio;
    }

    public Integer getIdMedico() { return idMedico; }
    public String getNombreCompleto() { return nombreCompleto; }
    public String getCorreo() { return correo; }
    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public String getEspecialidad() { return especialidad; }
    public String getCedulaProfesional() { return cedulaProfesional; }
    public String getConsultorio() { return consultorio; }
}
