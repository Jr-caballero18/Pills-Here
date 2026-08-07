package com.pillshere.backend.repository;

import com.pillshere.backend.model.Tratamiento;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TratamientoRepository extends JpaRepository<Tratamiento, Integer> {

    Optional<Tratamiento> findFirstByPacienteIdPacienteAndEstadoOrderByFechaInicioDesc(
            Integer idPaciente,
            String estado);

    List<Tratamiento> findByPacienteIdPacienteOrderByFechaInicioDesc(Integer idPaciente);

    List<Tratamiento> findByPacienteIdPacienteAndEstadoOrderByFechaInicioDesc(
            Integer idPaciente,
            String estado
    );

    long countByMedicoIdMedicoAndEstado(Integer idMedico, String estado);

    List<Tratamiento> findByMedicoIdMedicoAndEstado(Integer idMedico, String estado);
    
    List<Tratamiento> findByMedicoIdMedico(Integer idMedico);
}
