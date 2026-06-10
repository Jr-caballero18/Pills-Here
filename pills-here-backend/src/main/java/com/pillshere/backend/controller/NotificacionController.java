package com.pillshere.backend.controller;

import com.pillshere.backend.dto.NotificacionPacienteDTO;
import com.pillshere.backend.model.Aviso;
import com.pillshere.backend.repository.AvisoRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.*;
import com.pillshere.backend.model.TomaMedicamento;
import com.pillshere.backend.repository.TomaMedicamentoRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@RestController
@RequestMapping("/notificaciones")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificacionController {

    private final AvisoRepository avisoRepository;
    private final TomaMedicamentoRepository tomaMedicamentoRepository;

    public NotificacionController(AvisoRepository avisoRepository, TomaMedicamentoRepository tomaMedicamentoRepository) {
        this.avisoRepository = avisoRepository;
        this.tomaMedicamentoRepository = tomaMedicamentoRepository;
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<NotificacionPacienteDTO> obtenerNotificacionesPaciente(
            @PathVariable Integer idPaciente
    ) {

        List<NotificacionPacienteDTO> notificaciones = new ArrayList<>();

        notificaciones.addAll(
                avisoRepository.findByPaciente_IdPacienteOrderByFechaPublicacionDesc(idPaciente)
                        .stream()
                        .map(aviso -> new NotificacionPacienteDTO(
                        aviso.getIdAviso(),
                        "AVISO",
                        aviso.getMedico().getNombre() + " "
                        + aviso.getMedico().getApellidoPaterno(),
                        aviso.getContenido(),
                        aviso.getTitulo(),
                        aviso.getObservaciones(),
                        aviso.getFechaPublicacion().toLocalDate().toString()
                ))
                        .collect(Collectors.toList())
        );

        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("hh:mm a");

        List<TomaMedicamento> tomasPendientes
                = tomaMedicamentoRepository
                        .findByDosisTratamientoPacienteIdPacienteAndEstadoOrderByFechaHoraProgramadaAsc(
                                idPaciente,
                                "PENDIENTE"
                        );

        for (TomaMedicamento toma : tomasPendientes) {

            long minutosRestantes
                    = java.time.Duration.between(
                            LocalDateTime.now(),
                            toma.getFechaHoraProgramada()
                    ).toMinutes();

            if (minutosRestantes >= 0 && minutosRestantes <= 30) {

                notificaciones.add(
                        new NotificacionPacienteDTO(
                                toma.getIdToma(),
                                "MEDICAMENTO",
                                "",
                                "Te toca tomar "
                                + toma.getDosis().getMedicamento().getNombre()
                                + " a las "
                                + toma.getFechaHoraProgramada().format(formatoHora),
                                "Recordatorio de medicamento",
                                "",
                                toma.getFechaHoraProgramada().toLocalDate().toString()
                        )
                );
            }
        }

        return notificaciones;
    }
}
