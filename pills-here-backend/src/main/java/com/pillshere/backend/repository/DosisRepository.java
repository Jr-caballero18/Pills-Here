
package com.pillshere.backend.repository;

import com.pillshere.backend.model.Dosis;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DosisRepository extends JpaRepository<Dosis, Integer> {
}