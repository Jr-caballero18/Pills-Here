package com.pillshere.backend.controller;

import com.pillshere.backend.dto.CrearAvisoRequestDTO;
import com.pillshere.backend.model.Aviso;
import com.pillshere.backend.service.AvisoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avisos")
@CrossOrigin(origins = "http://localhost:5173")
public class AvisoController {

    private final AvisoService avisoService;

    public AvisoController(AvisoService avisoService) {
        this.avisoService = avisoService;
    }

    @PostMapping("/crear")
    public ResponseEntity<Aviso> crearAviso(@RequestBody CrearAvisoRequestDTO request) {
        Aviso avisoCreado = avisoService.crearAviso(request);
        return ResponseEntity.ok(avisoCreado);
    }
}