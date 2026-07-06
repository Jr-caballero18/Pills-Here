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
import com.pillshere.backend.dto.HistorialPacienteResponseDTO;
import com.pillshere.backend.dto.HistorialTratamientoDTO;
import com.pillshere.backend.dto.MedicamentoTratamientoResponseDTO;
import com.pillshere.backend.dto.PacienteTratamientoDTO;
import com.pillshere.backend.dto.TratamientoActualPacienteDTO;
import com.pillshere.backend.dto.IniciarTratamientoPacienteRequestDTO;
import com.pillshere.backend.dto.HorarioDosisPacienteDTO;
import com.pillshere.backend.model.TomaMedicamento;
import com.pillshere.backend.repository.TomaMedicamentoRepository;
import com.pillshere.backend.dto.TomaMedicamentoResponseDTO;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import jakarta.transaction.Transactional;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.Optional;
import com.pillshere.backend.dto.EstadisticaDiaDTO;
import java.util.Map;
import java.util.LinkedHashMap;

@Service
public class TratamientoService {

    private final TratamientoRepository tratamientoRepository;
    private final DosisRepository dosisRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final MedicamentoRepository medicamentoRepository;
    private final TomaMedicamentoRepository tomaMedicamentoRepository;

    public TratamientoService(
            TratamientoRepository tratamientoRepository,
            DosisRepository dosisRepository,
            PacienteRepository pacienteRepository,
            MedicoRepository medicoRepository,
            MedicamentoRepository medicamentoRepository,
            TomaMedicamentoRepository tomaMedicamentoRepository
    ) {
        this.tratamientoRepository = tratamientoRepository;
        this.dosisRepository = dosisRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.medicamentoRepository = medicamentoRepository;
        this.tomaMedicamentoRepository = tomaMedicamentoRepository;
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

        int duracionMaximaDias = 0;

        for (MedicamentoTratamientoDTO medicamentoDTO : request.getMedicamentos()) {

            Integer duracionDias = medicamentoDTO.getDuracionDias() != null
                    ? medicamentoDTO.getDuracionDias()
                    : 1;

            duracionMaximaDias = Math.max(duracionMaximaDias, duracionDias);
            Medicamento medicamento = medicamentoRepository.findById(medicamentoDTO.getIdMedicamento())
                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

            Dosis dosis = new Dosis();
            dosis.setTratamiento(tratamientoGuardado);
            dosis.setMedicamento(medicamento);
            dosis.setCantidad(medicamentoDTO.getDosis());
            dosis.setFrecuencia("Cada " + medicamentoDTO.getIntervaloHoras() + " horas");
            dosis.setHoraProgramada(LocalTime.of(0, 0));
            dosis.setDuracion(0);
            dosis.setIntervaloHoras(medicamentoDTO.getIntervaloHoras());
            dosis.setTratamientoIniciado(false);
            dosis.setDuracionDias(duracionDias);
            dosisRepository.save(dosis);
        }
        tratamientoGuardado.setFechaFin(
                tratamientoGuardado.getFechaInicio().plusDays(duracionMaximaDias - 1)
        );

        tratamientoRepository.save(tratamientoGuardado);
    }

    public TratamientoPacienteResponseDTO obtenerTratamientoPorPaciente(Integer idPaciente) {
        Optional<Tratamiento> tratamientoOpt
                = tratamientoRepository.findFirstByPacienteIdPacienteAndEstadoOrderByFechaInicioDesc(idPaciente, "ACTIVO");

        if (tratamientoOpt.isEmpty()) {
            return null;
        }

        Tratamiento tratamiento = tratamientoOpt.get();

        actualizarEstadoTratamientoSiVencido(tratamiento);

        if (!"ACTIVO".equals(tratamiento.getEstado())) {
            return null;
        }
        TratamientoPacienteResponseDTO dto = new TratamientoPacienteResponseDTO(
                tratamiento.getIdTratamiento(),
                tratamiento.getNombreTratamiento(),
                tratamiento.getDiagnostico(),
                tratamiento.getEstado(),
                tratamiento.getFechaInicio(),
                tratamiento.getNotasMedicas()
        );

        actualizarTomasOmitidas(tratamiento.getIdTratamiento());
        dto.setPorcentajeCumplimiento(
                calcularPorcentajeCumplimiento(tratamiento.getIdTratamiento())
        );

        return dto;
    }

    public DetalleTratamientoResponseDTO obtenerDetalleTratamiento(Integer idTratamiento) {
        Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento)
                .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));

        actualizarEstadoTratamientoSiVencido(tratamiento);
        Paciente paciente = tratamiento.getPaciente();

        String nombrePaciente = construirNombreCompleto(
                paciente.getNombre(),
                paciente.getApellidoPaterno(),
                paciente.getApellidoMaterno()
        );

        Medico medico = tratamiento.getMedico();

        String nombreMedico = construirNombreCompleto(
                medico.getNombre(),
                medico.getApellidoPaterno(),
                medico.getApellidoMaterno()
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
                dosis.getIntervaloHoras(),
                dosis.getDuracionDias(),
                dosis.getMedicamento().getPresentacion(),
                dosis.getMedicamento().getViaAdministracion(),
                dosis.getHoraInicioPaciente() != null ? dosis.getHoraInicioPaciente().toString() : null,
                dosis.getTratamientoIniciado()
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
        response.setNombreMedico(nombreMedico);

        actualizarTomasOmitidas(idTratamiento);
        response.setPorcentajeCumplimiento(calcularPorcentajeCumplimiento(idTratamiento));

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

        tomaMedicamentoRepository.deleteByDosisTratamientoIdTratamiento(idTratamiento);
        dosisRepository.deleteByTratamientoIdTratamiento(idTratamiento);

        int duracionMaximaDias = 0;

        for (MedicamentoTratamientoDTO medicamentoDTO : request.getMedicamentos()) {

            Integer duracionDias = medicamentoDTO.getDuracionDias() != null
                    ? medicamentoDTO.getDuracionDias()
                    : 1;

            duracionMaximaDias = Math.max(duracionMaximaDias, duracionDias);
            Medicamento medicamento = medicamentoRepository.findById(medicamentoDTO.getIdMedicamento())
                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

            Dosis dosis = new Dosis();
            dosis.setTratamiento(tratamiento);
            dosis.setMedicamento(medicamento);
            dosis.setCantidad(medicamentoDTO.getDosis());
            dosis.setFrecuencia("Cada " + medicamentoDTO.getIntervaloHoras() + " horas");
            dosis.setHoraProgramada(LocalTime.of(0, 0));
            dosis.setDuracion(0);
            dosis.setIntervaloHoras(medicamentoDTO.getIntervaloHoras());
            dosis.setTratamientoIniciado(false);
            dosis.setDuracionDias(duracionDias);
            dosisRepository.save(dosis);
        }

        tratamiento.setFechaFin(
                tratamiento.getFechaInicio().plusDays(duracionMaximaDias - 1)
        );

        tratamientoRepository.save(tratamiento);
    }

    public HistorialPacienteResponseDTO obtenerHistorialPaciente(Integer idPaciente) {
        Paciente paciente = pacienteRepository.findById(idPaciente)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        List<Tratamiento> tratamientos = tratamientoRepository
                .findByPacienteIdPacienteOrderByFechaInicioDesc(idPaciente);

        HistorialPacienteResponseDTO response = new HistorialPacienteResponseDTO();

        Integer edad = null;

        if (paciente.getFechaNacimiento() != null) {
            edad = Period.between(paciente.getFechaNacimiento(), LocalDate.now()).getYears();
        }

        response.setEdad(edad);
        response.setIdPaciente(paciente.getIdPaciente());
        response.setNombreCompleto(construirNombreCompleto(
                paciente.getNombre(),
                paciente.getApellidoPaterno(),
                paciente.getApellidoMaterno()
        ));
        response.setCodigoPaciente(paciente.getCodigoPaciente());
        response.setFechaNacimiento(paciente.getFechaNacimiento());
        response.setSexo(paciente.getSexo());
        response.setTipoSangre(paciente.getTipoSangre());
        response.setAlergias(paciente.getAlergias());
        response.setCorreo(paciente.getUsuario().getCorreo());

        List<HistorialTratamientoDTO> historial = tratamientos.stream()
                .map(tratamiento -> {
                    Medico medico = tratamiento.getMedico();

                    String nombreMedico = construirNombreCompleto(
                            medico.getNombre(),
                            medico.getApellidoPaterno(),
                            medico.getApellidoMaterno()
                    );

                    return new HistorialTratamientoDTO(
                            tratamiento.getFechaInicio(),
                            tratamiento.getDiagnostico(),
                            "Dr. " + nombreMedico,
                            tratamiento.getEstado()
                    );
                })
                .toList();

        response.setHistorial(historial);

        return response;
    }

    public void agregarComentarioTratamiento(Integer idTratamiento, String comentario) {
        Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento)
                .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));

        String notasActuales = tratamiento.getNotasMedicas();

        if (notasActuales == null || notasActuales.isBlank()) {
            tratamiento.setNotasMedicas(comentario);
        } else {
            tratamiento.setNotasMedicas(notasActuales + "\n" + comentario);
        }

        tratamientoRepository.save(tratamiento);
    }

    public List<TratamientoActualPacienteDTO> obtenerTratamientosActivosPaciente(Integer idPaciente) {
        List<Tratamiento> tratamientos = tratamientoRepository
                .findByPacienteIdPacienteAndEstadoOrderByFechaInicioDesc(idPaciente, "ACTIVO");

        tratamientos.forEach(this::actualizarEstadoTratamientoSiVencido);

        return tratamientos.stream()
                .filter(t -> "ACTIVO".equals(t.getEstado()))
                .map(tratamiento -> new TratamientoActualPacienteDTO(
                tratamiento.getIdTratamiento(),
                tratamiento.getNombreTratamiento(),
                tratamiento.getDiagnostico(),
                tratamiento.getEstado(),
                tratamiento.getFechaInicio()
        ))
                .toList();
    }

    @Transactional
    public void iniciarTratamientoPaciente(IniciarTratamientoPacienteRequestDTO request) {

        System.out.println("===== INICIAR TRATAMIENTO =====");
        System.out.println("Request recibido: " + request);

        if (request.getHorarios() == null) {
            System.out.println("HORARIOS ES NULL");
            return;
        }

        System.out.println("Cantidad horarios: " + request.getHorarios().size());

        for (HorarioDosisPacienteDTO horarioDTO : request.getHorarios()) {

            System.out.println(
                    "Dosis: " + horarioDTO.getIdDosis()
                    + " Hora: " + horarioDTO.getHoraInicioPaciente()
            );

            Dosis dosis = dosisRepository.findById(horarioDTO.getIdDosis())
                    .orElseThrow(() -> new RuntimeException("Dosis no encontrada"));

            dosis.setHoraInicioPaciente(horarioDTO.getHoraInicioPaciente());
            dosis.setTratamientoIniciado(true);
            dosisRepository.save(dosis);

            TomaMedicamento toma = new TomaMedicamento();
            toma.setDosis(dosis);
            LocalDateTime fechaProgramada = LocalDate.now().atTime(horarioDTO.getHoraInicioPaciente());

            while (fechaProgramada.isBefore(LocalDateTime.now())) {
                fechaProgramada = fechaProgramada.plusHours(dosis.getIntervaloHoras());
            }

            toma.setFechaHoraProgramada(fechaProgramada);
            toma.setEstado("PENDIENTE");

            tomaMedicamentoRepository.save(toma);
        }
    }

    public List<TomaMedicamentoResponseDTO> obtenerTomasTratamiento(Integer idTratamiento) {

        actualizarTomasOmitidas(idTratamiento);

        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("hh:mm a");

        List<TomaMedicamento> tomas = tomaMedicamentoRepository
                .findByDosisTratamientoIdTratamientoOrderByFechaHoraProgramadaAsc(idTratamiento);

        return tomas.stream()
                .map(toma -> new TomaMedicamentoResponseDTO(
                toma.getIdToma(),
                toma.getDosis().getIdDosis(),
                toma.getDosis().getMedicamento().getNombre(),
                toma.getDosis().getCantidad(),
                toma.getDosis().getIntervaloHoras(),
                toma.getFechaHoraProgramada().format(formatoHora),
                toma.getEstado()
        ))
                .toList();
    }

    @Transactional
    public void marcarTomaComoTomada(Integer idToma) {
        TomaMedicamento toma = tomaMedicamentoRepository.findById(idToma)
                .orElseThrow(() -> new RuntimeException("Toma no encontrada"));

        if ("TOMADA".equals(toma.getEstado())) {
            return;
        }

        toma.setEstado("TOMADA");
        toma.setFechaHoraTomada(LocalDateTime.now());
        tomaMedicamentoRepository.save(toma);

        Dosis dosis = toma.getDosis();

        LocalDateTime siguienteFecha = toma.getFechaHoraProgramada()
                .plusHours(dosis.getIntervaloHoras());

        if (puedeGenerarSiguienteToma(dosis, siguienteFecha)) {
            TomaMedicamento siguienteToma = new TomaMedicamento();
            siguienteToma.setDosis(dosis);
            siguienteToma.setFechaHoraProgramada(siguienteFecha);
            siguienteToma.setEstado("PENDIENTE");

            tomaMedicamentoRepository.save(siguienteToma);
        }

        verificarYFinalizarTratamiento(dosis.getTratamiento().getIdTratamiento());
    }

    private void actualizarTomasOmitidas(Integer idTratamiento) {

        List<TomaMedicamento> tomas = tomaMedicamentoRepository
                .findByDosisTratamientoIdTratamientoOrderByFechaHoraProgramadaAsc(idTratamiento);

        for (TomaMedicamento toma : tomas) {

            if ("PENDIENTE".equals(toma.getEstado())
                    && toma.getFechaHoraProgramada().plusMinutes(1).isBefore(LocalDateTime.now())) {

                toma.setEstado("OMITIDA");
                tomaMedicamentoRepository.save(toma);

                Dosis dosis = toma.getDosis();

                LocalDateTime siguienteFecha = toma.getFechaHoraProgramada()
                        .plusHours(dosis.getIntervaloHoras());

                if (puedeGenerarSiguienteToma(dosis, siguienteFecha)) {
                    TomaMedicamento siguienteToma = new TomaMedicamento();
                    siguienteToma.setDosis(dosis);
                    siguienteToma.setFechaHoraProgramada(siguienteFecha);
                    siguienteToma.setEstado("PENDIENTE");

                    tomaMedicamentoRepository.save(siguienteToma);
                }
            }
        }
        verificarYFinalizarTratamiento(idTratamiento);
    }

    public List<TratamientoPacienteResponseDTO> obtenerTratamientosPorPaciente(Integer idPaciente) {
        List<Tratamiento> tratamientos = tratamientoRepository
                .findByPacienteIdPacienteAndEstadoOrderByFechaInicioDesc(idPaciente, "ACTIVO");

        tratamientos.forEach(this::actualizarEstadoTratamientoSiVencido);
        return tratamientos.stream()
                .filter(t -> "ACTIVO".equals(t.getEstado()))
                .map(tratamiento -> new TratamientoPacienteResponseDTO(
                tratamiento.getIdTratamiento(),
                tratamiento.getNombreTratamiento(),
                tratamiento.getDiagnostico(),
                tratamiento.getEstado(),
                tratamiento.getFechaInicio(),
                tratamiento.getNotasMedicas()
        ))
                .toList();
    }

    public List<EstadisticaDiaDTO> obtenerEstadisticasTratamiento(Integer idTratamiento) {

        actualizarTomasOmitidas(idTratamiento);

        List<TomaMedicamento> tomas = tomaMedicamentoRepository
                .findByDosisTratamientoIdTratamientoOrderByFechaHoraProgramadaAsc(idTratamiento);

        Map<LocalDate, int[]> estadisticasPorDia = new LinkedHashMap<>();

        for (TomaMedicamento toma : tomas) {
            LocalDate fecha = toma.getFechaHoraProgramada().toLocalDate();

            estadisticasPorDia.putIfAbsent(fecha, new int[]{0, 0, 0});

            int[] conteos = estadisticasPorDia.get(fecha);

            if ("TOMADA".equals(toma.getEstado())) {
                conteos[0]++;
            } else if ("PENDIENTE".equals(toma.getEstado())) {
                conteos[1]++;
            } else if ("OMITIDA".equals(toma.getEstado())) {
                conteos[2]++;
            }
        }

        DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("d MMMM");

        return estadisticasPorDia.entrySet()
                .stream()
                .map(entry -> new EstadisticaDiaDTO(
                entry.getKey().format(formatoFecha),
                entry.getValue()[0],
                entry.getValue()[1],
                entry.getValue()[2]
        ))
                .toList();
    }

    @Transactional
    public void actualizarEstadoTratamientoSiVencido(Tratamiento tratamiento) {
        if ("ACTIVO".equals(tratamiento.getEstado())
                && tratamiento.getFechaFin() != null
                && tratamiento.getFechaFin().isBefore(LocalDate.now())) {

            tratamiento.setEstado("FINALIZADO");
            tratamientoRepository.save(tratamiento);
        }
    }

    private boolean puedeGenerarSiguienteToma(Dosis dosis, LocalDateTime siguienteFecha) {
        LocalDate fechaInicioTratamiento = dosis.getTratamiento().getFechaInicio();

        LocalDate fechaFinMedicamento = fechaInicioTratamiento.plusDays(
                dosis.getDuracionDias() - 1
        );

        return !siguienteFecha.toLocalDate().isAfter(fechaFinMedicamento);
    }

    private void verificarYFinalizarTratamiento(Integer idTratamiento) {
        Tratamiento tratamiento = tratamientoRepository.findById(idTratamiento)
                .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));

        if (!"ACTIVO".equals(tratamiento.getEstado())) {
            return;
        }

        List<TomaMedicamento> tomas = tomaMedicamentoRepository
                .findByDosisTratamientoIdTratamientoOrderByFechaHoraProgramadaAsc(idTratamiento);

        boolean hayPendientes = tomas.stream()
                .anyMatch(toma -> "PENDIENTE".equals(toma.getEstado()));

        if (hayPendientes) {
            return;
        }

        List<Dosis> dosisList = dosisRepository.findByTratamientoIdTratamiento(idTratamiento);

        for (Dosis dosis : dosisList) {
            Optional<TomaMedicamento> ultimaToma = tomas.stream()
                    .filter(toma -> toma.getDosis().getIdDosis().equals(dosis.getIdDosis()))
                    .max((a, b) -> a.getFechaHoraProgramada().compareTo(b.getFechaHoraProgramada()));

            if (ultimaToma.isEmpty()) {
                return;
            }

            LocalDateTime siguienteFecha = ultimaToma.get()
                    .getFechaHoraProgramada()
                    .plusHours(dosis.getIntervaloHoras());

            if (puedeGenerarSiguienteToma(dosis, siguienteFecha)) {
                return;
            }
        }

        tratamiento.setEstado("FINALIZADO");
        tratamientoRepository.save(tratamiento);
    }

    private int calcularPorcentajeCumplimiento(Integer idTratamiento) {

        List<Dosis> dosisList = dosisRepository.findByTratamientoIdTratamiento(idTratamiento);

        System.out.println("=== CALCULO CUMPLIMIENTO ===");
        System.out.println("ID TRATAMIENTO: " + idTratamiento);
        System.out.println("DOSIS ENCONTRADAS: " + dosisList.size());

        int totalTratamiento = 0;

        for (Dosis dosis : dosisList) {
            System.out.println("MED: " + dosis.getMedicamento().getNombre());
            System.out.println("INTERVALO: " + dosis.getIntervaloHoras());
            System.out.println("DURACION: " + dosis.getDuracionDias());

            int tomasPorDia = 24 / dosis.getIntervaloHoras();
            int duracionDias = dosis.getDuracionDias();

            totalTratamiento += tomasPorDia * duracionDias;
        }

        List<TomaMedicamento> tomas = tomaMedicamentoRepository
                .findByDosisTratamientoIdTratamientoOrderByFechaHoraProgramadaAsc(idTratamiento);

        long tomadas = tomas.stream()
                .filter(toma -> "TOMADA".equals(toma.getEstado()))
                .count();

        System.out.println("TOMADAS: " + tomadas);
        System.out.println("TOTAL TRATAMIENTO: " + totalTratamiento);

        int porcentaje = totalTratamiento == 0
                ? 0
                : (int) Math.round((tomadas * 100.0) / totalTratamiento);

        System.out.println("PORCENTAJE: " + porcentaje);

        return porcentaje;
    }

}
