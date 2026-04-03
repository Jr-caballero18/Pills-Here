package com.pillshere.backend.service;

import com.pillshere.backend.dto.DashboardMedicoDTO;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.Usuario;
import com.pillshere.backend.repository.MedicoRepository;
import com.pillshere.backend.repository.UsuarioRepository;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    public DashboardMedicoDTO obtenerDashboardMedico(Integer idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(idUsuario);

        if (usuarioOpt.isEmpty()) {
            return null;
        }

        Usuario usuario = usuarioOpt.get();

        if (!"MEDICO".equalsIgnoreCase(usuario.getRol())) {
            return null;
        }

        Optional<Medico> medicoOpt = medicoRepository.findByUsuario(usuario);

        if (medicoOpt.isEmpty()) {
            return null;
        }

        Medico medico = medicoOpt.get();

        String nombreCompleto = construirNombreCompleto(
            medico.getNombre(),
            medico.getApellidoPaterno(),
            medico.getApellidoMaterno()
        );

        return new DashboardMedicoDTO(
            nombreCompleto,
            0,
            0,
            0,
            new ArrayList<>()
        );
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