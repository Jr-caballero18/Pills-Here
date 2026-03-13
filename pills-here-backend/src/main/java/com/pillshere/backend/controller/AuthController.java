package com.pillshere.backend.controller;

import com.pillshere.backend.dto.LoginRequestDTO;
import com.pillshere.backend.dto.LoginResponseDTO;
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
}