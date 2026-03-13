package com.pillshere.backend.service;

import com.pillshere.backend.dto.LoginRequestDTO;
import com.pillshere.backend.dto.LoginResponseDTO;
import com.pillshere.backend.model.Usuario;
import com.pillshere.backend.repository.UsuarioRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
//Sin encriptacion aun, primero haremos que funcione
    @Autowired
    private UsuarioRepository usuarioRepository;

    public LoginResponseDTO iniciarSesion(LoginRequestDTO request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(request.getCorreo());

        if (usuarioOpt.isEmpty()) {
            return new LoginResponseDTO(false, "Usuario no encontrado", null);
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getContrasena().equals(request.getContrasena())) {
            return new LoginResponseDTO(false, "Contraseña incorrecta", null);
        }

        return new LoginResponseDTO(true, "Inicio de sesión exitoso", usuario.getRol());
    }
}