package com.pillshere.backend.service;

import com.pillshere.backend.dto.DashboardPacienteDTO;
import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.model.Usuario;
import com.pillshere.backend.repository.PacienteRepository;
import com.pillshere.backend.repository.UsuarioRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public DashboardPacienteDTO obtenerDashboardPaciente(Integer idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(idUsuario);

        if (usuarioOpt.isEmpty()) {
            return null;
        }

        Usuario usuario = usuarioOpt.get();

        if (!"PACIENTE".equalsIgnoreCase(usuario.getRol())) {
            return null;
        }

        Optional<Paciente> pacienteOpt = pacienteRepository.findByUsuario(usuario);

        if (pacienteOpt.isEmpty()) {
            return null;
        }

        Paciente paciente = pacienteOpt.get();

        String nombreCompleto = construirNombreCompleto(
            paciente.getNombre(),
            paciente.getApellidoPaterno(),
            paciente.getApellidoMaterno()
        );

        return new DashboardPacienteDTO(nombreCompleto);
    }

    private String construirNombreCompleto(String nombre, String apellidoPaterno, String apellidoMaterno) {
        StringBuilder nombreCompleto = new StringBuilder();

        if (nombre != null && !nombre.isBlank()) {
            nombreCompleto.append(nombre.trim());
        }

        if (apellidoPaterno != null && !apellidoPaterno.isBlank()) {
            nombreCompleto.append(" ").append(apellidoPaterno.trim());
        }

        if (apellidoMaterno != null && !apellidoMaterno.isBlank()) {
            nombreCompleto.append(" ").append(apellidoMaterno.trim());
        }

        return nombreCompleto.toString().trim();
    }
}