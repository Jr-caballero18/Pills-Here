package com.pillshere.backend.service;

import com.pillshere.backend.dto.CrearAvisoRequestDTO;
import com.pillshere.backend.model.Aviso;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.repository.AvisoRepository;
import com.pillshere.backend.repository.MedicoRepository;
import com.pillshere.backend.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AvisoService {

    private final AvisoRepository avisoRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public AvisoService(
            AvisoRepository avisoRepository,
            MedicoRepository medicoRepository,
            PacienteRepository pacienteRepository
    ) {
        this.avisoRepository = avisoRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public Aviso crearAviso(CrearAvisoRequestDTO request) {

        Medico medico = medicoRepository.findById(request.getIdMedico())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        Paciente paciente = pacienteRepository.findById(request.getIdPaciente())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Aviso aviso = new Aviso();
        aviso.setMedico(medico);
        aviso.setPaciente(paciente);
        aviso.setTitulo(request.getTitulo());
        aviso.setContenido(request.getContenido());
        aviso.setObservaciones(request.getObservaciones());
        aviso.setFechaPublicacion(LocalDateTime.now());
        aviso.setEstado("ACTIVO");

        return avisoRepository.save(aviso);
    }
}