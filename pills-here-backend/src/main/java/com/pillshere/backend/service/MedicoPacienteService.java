package com.pillshere.backend.service;

import com.pillshere.backend.dto.DetallePacienteDTO;
import com.pillshere.backend.dto.PacienteMedicoDTO;
import com.pillshere.backend.dto.VincularPacienteRequestDTO;
import com.pillshere.backend.dto.VincularPacienteResponseDTO;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.MedicoPaciente;
import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.model.Usuario;
import com.pillshere.backend.repository.MedicoPacienteRepository;
import com.pillshere.backend.repository.MedicoRepository;
import com.pillshere.backend.repository.PacienteRepository;
import com.pillshere.backend.repository.UsuarioRepository;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicoPacienteService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private MedicoPacienteRepository medicoPacienteRepository;

    public VincularPacienteResponseDTO vincularPacientePorCodigo(VincularPacienteRequestDTO request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(request.getIdUsuarioMedico());

        if (usuarioOpt.isEmpty()) {
            return new VincularPacienteResponseDTO(false, "Usuario médico no encontrado", null);
        }

        Usuario usuario = usuarioOpt.get();

        if (!"MEDICO".equalsIgnoreCase(usuario.getRol())) {
            return new VincularPacienteResponseDTO(false, "El usuario no corresponde a un médico", null);
        }

        Optional<Medico> medicoOpt = medicoRepository.findByUsuario(usuario);
        if (medicoOpt.isEmpty()) {
            return new VincularPacienteResponseDTO(false, "Médico no encontrado", null);
        }

        Optional<Paciente> pacienteOpt = pacienteRepository.findByCodigoPaciente(request.getCodigoPaciente());
        if (pacienteOpt.isEmpty()) {
            return new VincularPacienteResponseDTO(false, "El código del paciente no existe", null);
        }

        Medico medico = medicoOpt.get();
        Paciente paciente = pacienteOpt.get();

        boolean yaVinculado = medicoPacienteRepository.findByMedicoAndPaciente(medico, paciente).isPresent();
        if (yaVinculado) {
            return new VincularPacienteResponseDTO(false, "El paciente ya está vinculado a este médico", paciente.getIdPaciente());
        }

        MedicoPaciente medicoPaciente = new MedicoPaciente();
        medicoPaciente.setMedico(medico);
        medicoPaciente.setPaciente(paciente);
        medicoPaciente.setFechaVinculacion(LocalDate.now());

        medicoPacienteRepository.save(medicoPaciente);

        return new VincularPacienteResponseDTO(true, "Paciente vinculado correctamente", paciente.getIdPaciente());
    }

    public DetallePacienteDTO obtenerDetallePaciente(Integer idPaciente) {
        Optional<Paciente> pacienteOpt = pacienteRepository.findById(idPaciente);

        if (pacienteOpt.isEmpty()) {
            return null;
        }

        Paciente paciente = pacienteOpt.get();

        String nombreCompleto = construirNombreCompleto(
            paciente.getNombre(),
            paciente.getApellidoPaterno(),
            paciente.getApellidoMaterno()
        );

        int edad = Period.between(paciente.getFechaNacimiento(), LocalDate.now()).getYears();

        return new DetallePacienteDTO(
            paciente.getIdPaciente(),
            nombreCompleto,
            edad,
            paciente.getSexo(),
            paciente.getTipoSangre()
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
    
    public List<PacienteMedicoDTO> obtenerPacientesDelMedico(Integer idUsuarioMedico) {
    Optional<Usuario> usuarioOpt = usuarioRepository.findById(idUsuarioMedico);

    if (usuarioOpt.isEmpty()) {
        return List.of();
    }

    Usuario usuario = usuarioOpt.get();

    if (!"MEDICO".equalsIgnoreCase(usuario.getRol())) {
        return List.of();
    }

    Optional<Medico> medicoOpt = medicoRepository.findByUsuario(usuario);
    if (medicoOpt.isEmpty()) {
        return List.of();
    }

    Medico medico = medicoOpt.get();

    return medicoPacienteRepository.findByMedico(medico)
        .stream()
        .map(relacion -> convertirPacienteResumen(relacion.getPaciente()))
        .toList();
}

public void registrarConsultaPaciente(Integer idUsuarioMedico, Integer idPaciente) {
    Optional<Usuario> usuarioOpt = usuarioRepository.findById(idUsuarioMedico);
    Optional<Paciente> pacienteOpt = pacienteRepository.findById(idPaciente);

    if (usuarioOpt.isEmpty() || pacienteOpt.isEmpty()) {
        return;
    }

    Usuario usuario = usuarioOpt.get();

    if (!"MEDICO".equalsIgnoreCase(usuario.getRol())) {
        return;
    }

    Optional<Medico> medicoOpt = medicoRepository.findByUsuario(usuario);
    if (medicoOpt.isEmpty()) {
        return;
    }

    Medico medico = medicoOpt.get();
    Paciente paciente = pacienteOpt.get();

    Optional<MedicoPaciente> relacionOpt = medicoPacienteRepository.findByMedicoAndPaciente(medico, paciente);

    if (relacionOpt.isPresent()) {
        MedicoPaciente relacion = relacionOpt.get();
        relacion.setFechaUltimaConsulta(java.time.LocalDateTime.now());
        medicoPacienteRepository.save(relacion);
    }
}
    private PacienteMedicoDTO convertirPacienteResumen(Paciente paciente) {
    String nombreCompleto = construirNombreCompleto(
        paciente.getNombre(),
        paciente.getApellidoPaterno(),
        paciente.getApellidoMaterno()
    );

    int edad = Period.between(paciente.getFechaNacimiento(), LocalDate.now()).getYears();
    String edadSexo = edad + " años, " + paciente.getSexo();

    return new com.pillshere.backend.dto.PacienteMedicoDTO(
        paciente.getIdPaciente(),
        nombreCompleto,
        edadSexo
    );
}
    
}