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
import com.pillshere.backend.dto.IniciarTratamientoPacienteRequestDTO;
import com.pillshere.backend.dto.TomaMedicamentoResponseDTO;
import com.pillshere.backend.dto.EstadisticaDiaDTO;
import com.pillshere.backend.dto.EstadisticasGeneralesPacienteDTO;
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

    @PutMapping("/paciente/iniciar")
    public ResponseEntity<String> iniciarTratamientoPaciente(
            @RequestBody IniciarTratamientoPacienteRequestDTO request
    ) {
        tratamientoService.iniciarTratamientoPaciente(request);
        return ResponseEntity.ok("Tratamiento iniciado correctamente");
    }

    @PutMapping("/tomas/{idToma}/tomada")
    public ResponseEntity<String> marcarTomaComoTomada(@PathVariable Integer idToma) {
        tratamientoService.marcarTomaComoTomada(idToma);
        return ResponseEntity.ok("Toma marcada como tomada");
    }

    @GetMapping("/{idTratamiento}/medicacion")
    public ResponseEntity<List<TomaMedicamentoResponseDTO>> obtenerTomasTratamiento(
            @PathVariable Integer idTratamiento
    ) {
        return ResponseEntity.ok(
                tratamientoService.obtenerTomasTratamiento(idTratamiento)
        );
    }

    @GetMapping("/paciente/{idPaciente}/todos")
    public ResponseEntity<List<TratamientoPacienteResponseDTO>> obtenerTratamientosPorPaciente(
            @PathVariable Integer idPaciente
    ) {
        List<TratamientoPacienteResponseDTO> tratamientos
                = tratamientoService.obtenerTratamientosPorPaciente(idPaciente);

        if (tratamientos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(tratamientos);
    }

    @GetMapping("/{idTratamiento}/estadisticas")
    public ResponseEntity<List<EstadisticaDiaDTO>> obtenerEstadisticasTratamiento(
            @PathVariable Integer idTratamiento
    ) {
        return ResponseEntity.ok(
                tratamientoService.obtenerEstadisticasTratamiento(idTratamiento)
        );
    }

    @GetMapping("/medico/{idMedico}/activos/count")
    public ResponseEntity<Long> contarTratamientosActivosMedico(@PathVariable Integer idMedico) {
        return ResponseEntity.ok(tratamientoService.contarTratamientosActivosMedico(idMedico));
    }

    @GetMapping("/medico/{idMedico}/finalizados/count")
    public ResponseEntity<Long> contarTratamientosFinalizadosMedico(@PathVariable Integer idMedico) {
        return ResponseEntity.ok(tratamientoService.contarTratamientosFinalizadosMedico(idMedico));
    }
    
    @GetMapping("/estadisticas-generales/paciente/{idPaciente}")
public ResponseEntity<EstadisticasGeneralesPacienteDTO>
        obtenerEstadisticasGeneralesPaciente(
                @PathVariable Integer idPaciente
        ) {

    EstadisticasGeneralesPacienteDTO estadisticas =
            tratamientoService.obtenerEstadisticasGeneralesPaciente(
                    idPaciente
            );

    return ResponseEntity.ok(estadisticas);
}
}
