package com.fitnessweb.fitnessweb.repository;

import com.fitnessweb.fitnessweb.model.Perdoruesi;
import com.fitnessweb.fitnessweb.model.Stervitja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StervitjaRepository extends JpaRepository<Stervitja, Long> {

    List<Stervitja> findByPerdoruesi(Perdoruesi perdoruesi);
}
