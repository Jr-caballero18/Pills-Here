package com.pillshere.backend.repository;

import com.pillshere.backend.model.Aviso;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvisoRepository extends JpaRepository<Aviso, Integer> {
        List<Aviso> findByPaciente_IdPacienteOrderByFechaPublicacionDesc(Integer idPaciente);

}