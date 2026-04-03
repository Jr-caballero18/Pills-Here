package com.pillshere.backend.repository;

import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Integer> {
    Optional<Medico> findByUsuario(Usuario usuario);
    
        Optional<Medico> findByCedulaProfesional(String cedulaProfesional);

}