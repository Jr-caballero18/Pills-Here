package com.pillshere.backend.controller;

import com.pillshere.backend.dto.DetallePacienteDTO;
import com.pillshere.backend.dto.VincularPacienteRequestDTO;
import com.pillshere.backend.dto.VincularPacienteResponseDTO;
import com.pillshere.backend.service.MedicoPacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medico-paciente")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicoPacienteController {

    @Autowired
    private MedicoPacienteService medicoPacienteService;

    @PostMapping("/vincular")
    public ResponseEntity<VincularPacienteResponseDTO> vincularPaciente(@RequestBody VincularPacienteRequestDTO request) {
        VincularPacienteResponseDTO response = medicoPacienteService.vincularPacientePorCodigo(request);

        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/detalle-paciente/{idPaciente}")
    public ResponseEntity<DetallePacienteDTO> obtenerDetallePaciente(@PathVariable Integer idPaciente) {
        DetallePacienteDTO detalle = medicoPacienteService.obtenerDetallePaciente(idPaciente);

        if (detalle == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(detalle);
    }
    
    @GetMapping("/lista/{idUsuarioMedico}")
public ResponseEntity<java.util.List<com.pillshere.backend.dto.PacienteMedicoDTO>> obtenerPacientesDelMedico(
        @PathVariable Integer idUsuarioMedico) {
    return ResponseEntity.ok(medicoPacienteService.obtenerPacientesDelMedico(idUsuarioMedico));
}

@PostMapping("/registrar-consulta/{idUsuarioMedico}/{idPaciente}")
public ResponseEntity<Void> registrarConsultaPaciente(
        @PathVariable Integer idUsuarioMedico,
        @PathVariable Integer idPaciente) {
    medicoPacienteService.registrarConsultaPaciente(idUsuarioMedico, idPaciente);
    return ResponseEntity.ok().build();
}
    
}