package com.pillshere.backend.service;

import com.pillshere.backend.dto.ActualizarTratamientoRequestDTO;
import com.pillshere.backend.dto.CrearTratamientoRequestDTO;
import com.pillshere.backend.dto.MedicamentoTratamientoDTO;
import com.pillshere.backend.dto.TratamientoPacienteResponseDTO;
import com.pillshere.backend.model.Dosis;
import com.pillshere.backend.model.Medicamento;
import com.pillshere.backend.model.Medico;
import com.pillshere.backend.model.Paciente;
import com.pillshere.backend.model.Tratamiento;
import com.pillshere.backend.repository.DosisRepository;
import com.pillshere.backend.repository.MedicamentoRepository;
import com.pillshere.backend.repository.MedicoRepository;
import com.pillshere.backend.repository.PacienteRepository;
import com.pillshere.backend.repository.TratamientoRepository;
import com.pillshere.backend.dto.DetalleTratamientoResponseDTO;
import com.pillshere.backend.dto.MedicamentoTratamientoResponseDTO;
import com.pillshere.backend.dto.PacienteTratamientoDTO;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.Optional;
@Service
public class TratamientoService {

    private final TratamientoRepository tratamientoRepository;
    private final DosisRepository dosisRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final MedicamentoRepository medicamentoRepository;

    public TratamientoService(
            TratamientoRepository tratamientoRepository,
            DosisRepository dosisRepository,
            PacienteRepository pacienteRepository,
            MedicoRepository medicoRepository,
            MedicamentoRepository medicamentoRepository
    ) {
        this.tratamientoRepository = tratamientoRepository;
        this.dosisRepository = dosisRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.medicamentoRepository = medicamentoRepository;
    }

    public void crearTratamiento(CrearTratamientoRequestDTO request) {

        Paciente paciente = pacienteRepository.findById(request.getIdPaciente())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Medico medico = medicoRepository.findById(request.getIdMedico())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        Tratamiento tratamiento = new Tratamiento();
        tratamiento.setPaciente(paciente);
        tratamiento.setMedico(medico);
        tratamiento.setNombreTratamiento(request.getDiagnostico());

        tratamiento.setDiagnostico(request.getDiagnostico());
        tratamiento.setNotasMedicas(request.getRecomendaciones());
        tratamiento.setFechaInicio(
                request.getFechaInicio() != null ? request.getFechaInicio() : LocalDate.now()
        );
        tratamiento.setEstado("ACTIVO");
        tratamiento.setRecetaMedica("");
        Tratamiento tratamientoGuardado = tratamientoRepository.save(tratamiento);

        for (MedicamentoTratamientoDTO medicamentoDTO : request.getMedicamentos()) {

            Medicamento medicamento = medicamentoRepository.findById(medicamentoDTO.getIdMedicamento())
                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

            Dosis dosis = new Dosis();
            dosis.setTratamiento(tratamientoGuardado);
            dosis.setMedicamento(medicamento);
            dosis.setCantidad(medicamentoDTO.getDosis());
            dosis.setFrecuencia("N/A");
            dosis.setHoraProgramada(LocalTime.of(0,0));
            dosis.setDuracion(0);
            dosisRepository.save(dosis);
        }
    }
    
    public TratamientoPacienteResponseDTO obtenerTratamientoPorPaciente(Integer idPaciente) {
    Optional<Tratamiento> tratamientoOpt =
            tratamientoRepository.findFirstByPacienteIdPacienteAndEstadoOrderByFechaInicioDesc(idPaciente, "ACTIVO");

    if (tratamientoOpt.isEmpty()) {
        return null;
    }

    Tratamiento tratamiento = tratamientoOpt.get();

    return new TratamientoPacienteResponseDTO(
            tratamiento.getIdTratamiento(),
            tratamiento.getNombreTratamiento(),
            tratamiento.getDiagnostico(),
            tratamiento.getEstado(),
            tratamiento.getFechaInicio(),
            tratamiento.getNotasMedicas()
    );
}
    
    public DetalleTratamientoResponseDTO obtenerDetalleTratamiento(Integer idTratamiento) {
    Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento)
            .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));

    Paciente paciente = tratamiento.getPaciente();

    String nombrePaciente = construirNombreCompleto(
            paciente.getNombre(),
            paciente.getApellidoPaterno(),
            paciente.getApellidoMaterno()
    );

    Integer edad = null;

    if (paciente.getFechaNacimiento() != null) {
        edad = Period.between(paciente.getFechaNacimiento(), LocalDate.now()).getYears();
    }

    PacienteTratamientoDTO pacienteDTO = new PacienteTratamientoDTO(
            paciente.getIdPaciente(),
            nombrePaciente,
            edad,
            paciente.getSexo()
    );

    List<Dosis> dosisList = dosisRepository.findByTratamientoIdTratamiento(idTratamiento);

    List<MedicamentoTratamientoResponseDTO> medicamentosDTO = dosisList.stream()
            .map(dosis -> new MedicamentoTratamientoResponseDTO(
                    dosis.getIdDosis(),
                    dosis.getMedicamento().getIdMedicamento(),
                    dosis.getMedicamento().getNombre(),
                    dosis.getCantidad(),
                    dosis.getMedicamento().getPresentacion(),
                    dosis.getMedicamento().getViaAdministracion()
            ))
            .collect(Collectors.toList());

    DetalleTratamientoResponseDTO response = new DetalleTratamientoResponseDTO();
    response.setIdTratamiento(tratamiento.getIdTratamiento());
    response.setDiagnostico(tratamiento.getDiagnostico());
    response.setEstado(tratamiento.getEstado());
    response.setFechaInicio(tratamiento.getFechaInicio());
    response.setNotasMedicas(tratamiento.getNotasMedicas());
    response.setPaciente(pacienteDTO);
    response.setMedicamentos(medicamentosDTO);

    return response;
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
    
    public void cancelarTratamiento(Integer idTratamiento) {
    Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento)
            .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));

    tratamiento.setEstado("CANCELADO");

    tratamientoRepository.save(tratamiento);
}
    
    @Transactional
public void actualizarTratamiento(Integer idTratamiento, ActualizarTratamientoRequestDTO request) {
    Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento)
            .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));

    tratamiento.setDiagnostico(request.getDiagnostico());
    tratamiento.setNombreTratamiento(request.getDiagnostico());
    tratamiento.setNotasMedicas(request.getRecomendaciones());

    tratamientoRepository.save(tratamiento);

    dosisRepository.deleteByTratamientoIdTratamiento(idTratamiento);

    for (MedicamentoTratamientoDTO medicamentoDTO : request.getMedicamentos()) {
        Medicamento medicamento = medicamentoRepository.findById(medicamentoDTO.getIdMedicamento())
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

        Dosis dosis = new Dosis();
        dosis.setTratamiento(tratamiento);
        dosis.setMedicamento(medicamento);
        dosis.setCantidad(medicamentoDTO.getDosis());
        dosis.setFrecuencia("N/A");
        dosis.setHoraProgramada(LocalTime.of(0, 0));
        dosis.setDuracion(0);

        dosisRepository.save(dosis);
    }
}
}
