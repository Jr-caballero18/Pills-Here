package com.pillshere.backend.repository;

import com.pillshere.backend.model.HistorialClinico;
import com.pillshere.backend.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistorialClinicoRepository extends JpaRepository<HistorialClinico, Integer> {
    List<HistorialClinico> findByPacienteOrderByFechaDesc(Paciente paciente);
}