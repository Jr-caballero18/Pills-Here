
package com.pillshere.backend.controller;

import com.pillshere.backend.model.Medicamento;
import com.pillshere.backend.repository.MedicamentoRepository;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medicamentos")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicamentoController {
   private final MedicamentoRepository medicamentoRepository;

    public MedicamentoController(MedicamentoRepository medicamentoRepository) {
        this.medicamentoRepository = medicamentoRepository;
    }

    @GetMapping("/buscar")
    public List<Medicamento> buscarMedicamentos(@RequestParam String nombre) {
        return medicamentoRepository.findByNombreContainingIgnoreCase(nombre);
    } 
}
