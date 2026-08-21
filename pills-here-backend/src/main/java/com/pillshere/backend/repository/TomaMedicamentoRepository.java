package com.pillshere.backend.repository;

import com.pillshere.backend.model.TomaMedicamento;
import java.time.LocalDateTime;
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

    @Query("""
    SELECT COUNT(t)
    FROM TomaMedicamento t
    WHERE t.dosis.tratamiento.medico.idMedico = :idMedico
    AND t.estado = :estado
    """)
    Long contarPorMedicoYEstado(
            @Param("idMedico") Integer idMedico,
            @Param("estado") String estado
    );

    @Query("""
    SELECT t
    FROM TomaMedicamento t
    JOIN FETCH t.dosis d
    JOIN FETCH d.tratamiento tr
    WHERE tr.paciente.idPaciente = :idPaciente
    AND t.fechaHoraProgramada >= :inicio
    AND t.fechaHoraProgramada < :fin
""")
    List<TomaMedicamento> obtenerTomasCalendarioPorDia(
            @Param("idPaciente") Integer idPaciente,
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin
    );

@Query("""
    SELECT COUNT(t)
    FROM TomaMedicamento t
    JOIN t.dosis d
    JOIN d.tratamiento tr
    WHERE tr.paciente.idPaciente = :idPaciente
    AND t.estado = :estado
    AND tr.estado <> 'CANCELADO'
""")
Long contarPorPacienteYEstadoSinCancelados(
        @Param("idPaciente") Integer idPaciente,
        @Param("estado") String estado
);


List<TomaMedicamento> findByDosisIdDosisOrderByFechaHoraProgramadaAsc(
        Integer idDosis
);
}
