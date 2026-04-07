package com.pillshere.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.MedicoPaciente;
import com.pillshere.backend.model.Paciente;
import java.util.List;

public interface MedicoPacienteRepository extends JpaRepository<MedicoPaciente, Integer> {

    Optional<MedicoPaciente> findByMedicoAndPaciente(Medico medico, Paciente paciente);
    
    List<MedicoPaciente> findByMedico(Medico medico);
    
    List<MedicoPaciente> findTop5ByMedicoAndFechaUltimaConsultaIsNotNullOrderByFechaUltimaConsultaDesc(Medico medico);
    
    long countByMedico(Medico medico);
   
}