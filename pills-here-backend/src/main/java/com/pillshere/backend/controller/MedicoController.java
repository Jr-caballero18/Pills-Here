package com.pillshere.backend.controller;

import com.pillshere.backend.dto.DashboardMedicoDTO;
import com.pillshere.backend.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pillshere.backend.dto.PerfilMedicoDTO;

@RestController
@RequestMapping("/medico")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @GetMapping("/dashboard/{idUsuario}")
    public ResponseEntity<DashboardMedicoDTO> obtenerDashboard(@PathVariable Integer idUsuario) {
        DashboardMedicoDTO dashboard = medicoService.obtenerDashboardMedico(idUsuario);

        if (dashboard == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/perfil/{idMedico}")
    public ResponseEntity<PerfilMedicoDTO> obtenerPerfilMedico(@PathVariable Integer idMedico) {
        PerfilMedicoDTO perfil = medicoService.obtenerPerfilMedico(idMedico);

        if (perfil == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(perfil);
    }
}
