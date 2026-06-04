package com.pillshere.backend.dto;

public class MedicamentoTratamientoDTO {

    private Integer idMedicamento;
    private String dosis;
    private Integer intervaloHoras;

    public Integer getIdMedicamento() {
        return idMedicamento;
    }

    public void setIdMedicamento(Integer idMedicamento) {
        this.idMedicamento = idMedicamento;
    }

    public String getDosis() {
        return dosis;
    }

    public void setDosis(String dosis) {
        this.dosis = dosis;
    }

    public Integer getIntervaloHoras() {
        return intervaloHoras;
    }

    public void setIntervaloHoras(Integer intervaloHoras) {
        this.intervaloHoras = intervaloHoras;
    }
}
