package com.pillshere.backend.controller;

import com.pillshere.backend.dto.DashboardPacienteDTO;
import com.pillshere.backend.dto.PacienteHistorialResponseDTO;
import com.pillshere.backend.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paciente")
@CrossOrigin(origins = "http://localhost:5173")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping("/dashboard/{idUsuario}")
    public ResponseEntity<DashboardPacienteDTO> obtenerDashboard(@PathVariable Integer idUsuario) {
        DashboardPacienteDTO dashboard = pacienteService.obtenerDashboardPaciente(idUsuario);

        if (dashboard == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dashboard);
    }
    
    @GetMapping("/historial/{idPaciente}")
    public ResponseEntity<PacienteHistorialResponseDTO> obtenerHistorialPaciente(@PathVariable Integer idPaciente) {
        PacienteHistorialResponseDTO historial = pacienteService.obtenerHistorialPaciente(idPaciente);

        if (historial == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(historial);
    }
    
}