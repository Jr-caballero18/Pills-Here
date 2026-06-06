package com.pillshere.backend.dto;

public class MedicamentoTratamientoResponseDTO {

    private Integer idDosis;
    private Integer idMedicamento;
    private String nombre;
    private String dosis;
    private Integer intervaloHoras;
    private String presentacion;
    private String via;
    private String horaInicioPaciente;
    private Boolean tratamientoIniciado;

    public MedicamentoTratamientoResponseDTO(Integer idDosis, Integer idMedicamento, String nombre, String dosis, Integer intervaloHoras,
            String presentacion, String via, String horaInicioPaciente,
            Boolean tratamientoIniciado) {

        this.idDosis = idDosis;
        this.idMedicamento = idMedicamento;
        this.nombre = nombre;
        this.dosis = dosis;
        this.intervaloHoras = intervaloHoras;
        this.presentacion = presentacion;
        this.via = via;
        this.horaInicioPaciente = horaInicioPaciente;
        this.tratamientoIniciado = tratamientoIniciado;
    }

    public Integer getIdDosis() {
        return idDosis;
    }

    public Integer getIdMedicamento() {
        return idMedicamento;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDosis() {
        return dosis;
    }

    public Integer getIntervaloHoras() {
        return intervaloHoras;
    }

    public String getPresentacion() {
        return presentacion;
    }

    public String getVia() {
        return via;
    }

    public String getHoraInicioPaciente() {
        return horaInicioPaciente;
    }

    public Boolean getTratamientoIniciado() {
        return tratamientoIniciado;
    }
}
