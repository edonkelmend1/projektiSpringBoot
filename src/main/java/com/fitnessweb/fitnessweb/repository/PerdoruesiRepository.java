package com.fitnessweb.fitnessweb.repository;

import com.fitnessweb.fitnessweb.model.Perdoruesi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerdoruesiRepository extends JpaRepository<Perdoruesi, Long> {

    Optional<Perdoruesi> findByUsernameAndPassword(String username, String password);
}
