
package com.pillshere.backend.repository;

import com.pillshere.backend.model.Medicamento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MedicamentoRepository extends JpaRepository<Medicamento, Integer> {

    List<Medicamento> findByNombreContainingIgnoreCase(String nombre);

}