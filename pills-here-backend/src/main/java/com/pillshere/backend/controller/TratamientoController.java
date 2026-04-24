
package com.pillshere.backend.controller;

import com.pillshere.backend.dto.CrearTratamientoRequestDTO;
import com.pillshere.backend.service.TratamientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
