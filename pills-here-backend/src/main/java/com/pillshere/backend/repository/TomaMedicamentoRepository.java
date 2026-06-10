package com.pillshere.backend.repository;

import com.pillshere.backend.model.TomaMedicamento;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TomaMedicamentoRepository extends JpaRepository<TomaMedicamento, Integer> {

    Optional<TomaMedicamento> findFirstByDosisIdDosisAndEstadoOrderByFechaHoraProgramadaAsc(
            Integer idDosis,
            String estado
    );

    List<TomaMedicamento> findByDosisTratamientoIdTratamientoOrderByFechaHoraProgramadaAsc(
            Integer idTratamiento
    );

    List<TomaMedicamento> findByDosisTratamientoPacienteIdPacienteAndEstadoOrderByFechaHoraProgramadaAsc(
            Integer idPaciente,
            String estado
    );
}
