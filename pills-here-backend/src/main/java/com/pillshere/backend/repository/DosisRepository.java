
package com.pillshere.backend.repository;

import com.pillshere.backend.model.Dosis;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DosisRepository extends JpaRepository<Dosis, Integer> {
        List<Dosis> findByTratamientoIdTratamiento(Integer idTratamiento);
        void deleteByTratamientoIdTratamiento(Integer idTratamiento);
}