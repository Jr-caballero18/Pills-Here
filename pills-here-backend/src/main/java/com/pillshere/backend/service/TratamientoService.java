package com.pillshere.backend.service;

import com.pillshere.backend.dto.CrearTratamientoRequestDTO;
import com.pillshere.backend.dto.MedicamentoTratamientoDTO;
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
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
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
}
