package com.pillshere.backend.repository;

import com.pillshere.backend.model.TomaMedicamento;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TomaMedicamentoRepository extends JpaRepository<TomaMedicamento, Integer> {

    long countByDosisIdDosis(Integer idDosis);
    
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
    
    void deleteByDosisTratamientoIdTratamiento(Integer idTratamiento);
    
    @Query("""
    SELECT COUNT(t)
    FROM TomaMedicamento t
    WHERE t.dosis.tratamiento.paciente.idPaciente = :idPaciente
    AND t.estado = :estado
""")
Long contarPorPacienteYEstado(
        @Param("idPaciente") Integer idPaciente,
        @Param("estado") String estado
);
    
}
