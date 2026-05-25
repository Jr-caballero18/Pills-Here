package com.pillshere.backend.controller;

import com.pillshere.backend.dto.NotificacionPacienteDTO;
import com.pillshere.backend.model.Aviso;
import com.pillshere.backend.repository.AvisoRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notificaciones")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificacionController {

    private final AvisoRepository avisoRepository;

    public NotificacionController(AvisoRepository avisoRepository) {
        this.avisoRepository = avisoRepository;
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<NotificacionPacienteDTO> obtenerNotificacionesPaciente(@PathVariable Integer idPaciente) {
        return avisoRepository.findByPaciente_IdPacienteOrderByFechaPublicacionDesc(idPaciente)
                .stream()
                .map(aviso -> new NotificacionPacienteDTO(
                aviso.getIdAviso(),
                "AVISO",
                aviso.getMedico().getNombre() + " " + aviso.getMedico().getApellidoPaterno(),
                aviso.getContenido(),
                aviso.getTitulo(),
                aviso.getObservaciones(),
                aviso.getFechaPublicacion().toLocalDate().toString()
        ))
                .collect(Collectors.toList());
    }
}
