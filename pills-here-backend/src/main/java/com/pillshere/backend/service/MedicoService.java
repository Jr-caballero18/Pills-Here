package com.pillshere.backend.service;

import com.pillshere.backend.dto.DashboardMedicoDTO;
import com.pillshere.backend.dto.PacienteMedicoDTO;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.model.Usuario;
import com.pillshere.backend.repository.MedicoPacienteRepository;
import com.pillshere.backend.repository.MedicoRepository;
import com.pillshere.backend.repository.UsuarioRepository;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pillshere.backend.dto.PerfilMedicoDTO;

@Service
public class MedicoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private MedicoPacienteRepository medicoPacienteRepository;

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

        int totalPacientes = (int) medicoPacienteRepository.countByMedico(medico);

        List<PacienteMedicoDTO> pacientesRecientes = medicoPacienteRepository
                .findTop5ByMedicoAndFechaUltimaConsultaIsNotNullOrderByFechaUltimaConsultaDesc(medico)
                .stream()
                .map(relacion -> convertirPacienteResumen(relacion.getPaciente()))
                .collect(Collectors.toList());

        return new DashboardMedicoDTO(
                nombreCompleto,
                totalPacientes,
                0,
                0,
                pacientesRecientes
        );
    }

    private PacienteMedicoDTO convertirPacienteResumen(Paciente paciente) {
        String nombreCompleto = construirNombreCompleto(
                paciente.getNombre(),
                paciente.getApellidoPaterno(),
                paciente.getApellidoMaterno()
        );

        int edad = Period.between(paciente.getFechaNacimiento(), LocalDate.now()).getYears();
        String edadSexo = edad + " años, " + paciente.getSexo();

        return new PacienteMedicoDTO(
                paciente.getIdPaciente(),
                nombreCompleto,
                edadSexo
        );
    }

    public PerfilMedicoDTO obtenerPerfilMedico(Integer idMedico) {
        Optional<Medico> medicoOpt = medicoRepository.findById(idMedico);

        if (medicoOpt.isEmpty()) {
            return null;
        }

        Medico medico = medicoOpt.get();

        String nombreCompleto = construirNombreCompleto(
                medico.getNombre(),
                medico.getApellidoPaterno(),
                medico.getApellidoMaterno()
        );

        return new PerfilMedicoDTO(
                medico.getIdMedico(),
                nombreCompleto,
                medico.getUsuario().getCorreo(),
                medico.getFechaNacimiento(),
                medico.getEspecialidad(),
                medico.getCedulaProfesional(),
                medico.getConsultorio()
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
