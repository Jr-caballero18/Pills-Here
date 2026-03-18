package com.pillshere.backend.service;

import com.pillshere.backend.dto.LoginRequestDTO;
import com.pillshere.backend.dto.LoginResponseDTO;
import com.pillshere.backend.dto.RegisterMedicoRequestDTO;
import com.pillshere.backend.dto.RegisterPacienteRequestDTO;
import com.pillshere.backend.dto.RegisterPacienteResponseDTO;
import com.pillshere.backend.dto.RegisterResponseDTO;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.model.Usuario;
import com.pillshere.backend.repository.MedicoRepository;
import com.pillshere.backend.repository.PacienteRepository;
import com.pillshere.backend.repository.UsuarioRepository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
//Sin encriptacion aun, primero haremos que funcione

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

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

    public RegisterResponseDTO registrarMedico(RegisterMedicoRequestDTO request) {

        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            return new RegisterResponseDTO(false, "El correo ya está registrado");
        }

        if (medicoRepository.findByCedulaProfesional(request.getCedulaProfesional()).isPresent()) {
            return new RegisterResponseDTO(false, "La cédula profesional ya está registrada");
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(request.getCorreo());
        usuario.setContrasena(request.getContrasena());
        usuario.setTelefono(null);
        usuario.setRol("MEDICO");
        usuario.setFechaRegistro(LocalDate.now());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Medico medico = new Medico();
        medico.setUsuario(usuarioGuardado);
        medico.setNombre(request.getNombre());
        medico.setApellidoPaterno(request.getApellidoPaterno());
        medico.setApellidoMaterno(request.getApellidoMaterno());
        medico.setFechaNacimiento(LocalDate.parse(request.getFechaNacimiento()));
        medico.setSexo(request.getSexo());
        medico.setCedulaProfesional(request.getCedulaProfesional());
        medico.setEspecialidad(request.getEspecialidad());
        medico.setConsultorio(request.getConsultorio());
        medico.setFechaAlta(LocalDate.now());

        medicoRepository.save(medico);

        return new RegisterResponseDTO(true, "Médico registrado correctamente");
    }

    private String generarCodigoPacienteUnico() {
        Random random = new Random();
        String codigo;

        do {
            int numero = 100000 + random.nextInt(900000);
            codigo = "PAC-" + numero;
        } while (pacienteRepository.findByCodigoPaciente(codigo).isPresent());

        return codigo;
    }

    public RegisterPacienteResponseDTO registrarPaciente(RegisterPacienteRequestDTO request) {

        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            return new RegisterPacienteResponseDTO(false, "El correo ya está registrado", null);
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(request.getCorreo());
        usuario.setContrasena(request.getContrasena());
        usuario.setTelefono(null);
        usuario.setRol("PACIENTE");
        usuario.setFechaRegistro(LocalDate.now());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        String codigoGenerado = generarCodigoPacienteUnico();

        Paciente paciente = new Paciente();
        paciente.setUsuario(usuarioGuardado);
        paciente.setCodigoPaciente(codigoGenerado);
        paciente.setNombre(request.getNombre());
        paciente.setApellidoPaterno(request.getApellidoPaterno());
        paciente.setApellidoMaterno(request.getApellidoMaterno());
        paciente.setFechaNacimiento(LocalDate.parse(request.getFechaNacimiento()));
        paciente.setSexo(request.getSexo());
        paciente.setTipoSangre(request.getTipoSangre());
        paciente.setAlergias(request.getAlergias());

        pacienteRepository.save(paciente);

        return new RegisterPacienteResponseDTO(
                true,
                "Paciente registrado correctamente",
                codigoGenerado
        );
    }
}
