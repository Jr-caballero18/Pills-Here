package com.pillshere.backend.repository;

import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.model.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    Optional<Paciente> findByUsuario(Usuario usuario);
    
    Optional<Paciente> findByCodigoPaciente(String codigoPaciente);

}