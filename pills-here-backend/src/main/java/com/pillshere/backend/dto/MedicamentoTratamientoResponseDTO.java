package com.pillshere.backend.dto;

public class MedicamentoTratamientoResponseDTO {

    private Integer idDosis;
    private Integer idMedicamento;
    private String nombre;
    private String dosis;
    private String presentacion;
    private String via;

    public MedicamentoTratamientoResponseDTO(Integer idDosis, Integer idMedicamento, String nombre, String dosis, String presentacion, String via) {
        this.idDosis = idDosis;
        this.idMedicamento = idMedicamento;
        this.nombre = nombre;
        this.dosis = dosis;
        this.presentacion = presentacion;
        this.via = via;
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

    public String getPresentacion() {
        return presentacion;
    }

    public String getVia() {
        return via;
    }
}