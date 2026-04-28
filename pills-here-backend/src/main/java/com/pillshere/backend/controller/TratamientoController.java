
package com.pillshere.backend.controller;

import com.pillshere.backend.dto.ActualizarTratamientoRequestDTO;
import com.pillshere.backend.dto.ComentarioTratamientoRequestDTO;
import com.pillshere.backend.dto.CrearTratamientoRequestDTO;
import com.pillshere.backend.dto.DetalleTratamientoResponseDTO;
import com.pillshere.backend.dto.HistorialPacienteResponseDTO;
import com.pillshere.backend.dto.TratamientoPacienteResponseDTO;
import com.pillshere.backend.service.TratamientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pillshere.backend.dto.TratamientoActualPacienteDTO;
import java.util.List;

@RestController
@RequestMapping("/tratamientos")
@CrossOrigin(origins = "http://localhost:5173")
public class TratamientoController {
    private final TratamientoService tratamientoService;

    public TratamientoController(TratamientoService tratamientoService) {
        this.tratamientoService = tratamientoService;
    }

    @PostMapping("/crear")
    public ResponseEntity<String> crearTratamiento(@RequestBody CrearTratamientoRequestDTO request) {
        tratamientoService.crearTratamiento(request);
        return ResponseEntity.ok("Tratamiento creado correctamente");
    }
    
    @GetMapping("/paciente/{idPaciente}")
public ResponseEntity<TratamientoPacienteResponseDTO> obtenerTratamientoPorPaciente(@PathVariable Integer idPaciente) {
    TratamientoPacienteResponseDTO tratamiento = tratamientoService.obtenerTratamientoPorPaciente(idPaciente);

    if (tratamiento == null) {
        return ResponseEntity.noContent().build();
    }

    return ResponseEntity.ok(tratamiento);
}

@GetMapping("/{idTratamiento}")
public ResponseEntity<DetalleTratamientoResponseDTO> obtenerDetalleTratamiento(@PathVariable Integer idTratamiento) {
    return ResponseEntity.ok(tratamientoService.obtenerDetalleTratamiento(idTratamiento));
}

@PutMapping("/{idTratamiento}/cancelar")
public ResponseEntity<String> cancelarTratamiento(@PathVariable Integer idTratamiento) {
    tratamientoService.cancelarTratamiento(idTratamiento);
    return ResponseEntity.ok("Tratamiento cancelado correctamente");
}


@PutMapping("/{idTratamiento}")
public ResponseEntity<String> actualizarTratamiento(
        @PathVariable Integer idTratamiento,
        @RequestBody ActualizarTratamientoRequestDTO request
) {
    tratamientoService.actualizarTratamiento(idTratamiento, request);
    return ResponseEntity.ok("Tratamiento actualizado correctamente");
}

@GetMapping("/historial/paciente/{idPaciente}")
public ResponseEntity<HistorialPacienteResponseDTO> obtenerHistorialPaciente(@PathVariable Integer idPaciente) {
    return ResponseEntity.ok(tratamientoService.obtenerHistorialPaciente(idPaciente));
}

@PutMapping("/{idTratamiento}/comentario")
public ResponseEntity<String> agregarComentarioTratamiento(
        @PathVariable Integer idTratamiento,
        @RequestBody ComentarioTratamientoRequestDTO request
) {
    tratamientoService.agregarComentarioTratamiento(idTratamiento, request.getComentario());
    return ResponseEntity.ok("Comentario agregado correctamente");
}

@GetMapping("/paciente-actuales/{idPaciente}")
public ResponseEntity<List<TratamientoActualPacienteDTO>> obtenerTratamientosActivosPaciente(
        @PathVariable Integer idPaciente
) {
    return ResponseEntity.ok(tratamientoService.obtenerTratamientosActivosPaciente(idPaciente));
}
}
