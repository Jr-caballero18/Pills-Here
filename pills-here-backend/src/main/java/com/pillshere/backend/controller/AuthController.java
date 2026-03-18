package com.pillshere.backend.controller;

import com.pillshere.backend.dto.LoginRequestDTO;
import com.pillshere.backend.dto.LoginResponseDTO;
import com.pillshere.backend.dto.RegisterMedicoRequestDTO;
import com.pillshere.backend.dto.RegisterPacienteRequestDTO;
import com.pillshere.backend.dto.RegisterPacienteResponseDTO;
import com.pillshere.backend.dto.RegisterResponseDTO;
import com.pillshere.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        return authService.iniciarSesion(request);
    }

    @PostMapping("/register-medico")
    public RegisterResponseDTO registerMedico(@RequestBody RegisterMedicoRequestDTO request) {
        return authService.registrarMedico(request);
    }

    @PostMapping("/register-paciente")
    public RegisterPacienteResponseDTO registerPaciente(@RequestBody RegisterPacienteRequestDTO request) {
        return authService.registrarPaciente(request);
    }

}
