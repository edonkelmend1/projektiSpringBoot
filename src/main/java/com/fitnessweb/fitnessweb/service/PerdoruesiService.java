package com.fitnessweb.fitnessweb.service;

import com.fitnessweb.fitnessweb.model.Perdoruesi;
import com.fitnessweb.fitnessweb.repository.PerdoruesiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PerdoruesiService {


    private PerdoruesiRepository perdoruesiRepository;

    @Autowired
    public PerdoruesiService(PerdoruesiRepository perdoruesiRepository) {
        this.perdoruesiRepository = perdoruesiRepository;
    }


    public Perdoruesi krijoPerdoruesin(Perdoruesi perdoruesi) {
        return perdoruesiRepository.save(perdoruesi);
    }

    public Optional<Perdoruesi> gjejPermesId(Long id){
        return perdoruesiRepository.findById(id);
    }

    public Perdoruesi perditesoPerdoruesin(Long id, Perdoruesi teDhenat){
        Optional<Perdoruesi> perdoruesi = perdoruesiRepository.findById(id);
        if(perdoruesi.isPresent()){
            Perdoruesi perdoruesiEkzistues = perdoruesi.get();
            perdoruesiEkzistues.setUsername(teDhenat.getUsername());
            perdoruesiEkzistues.setPassword(teDhenat.getPassword());
            return perdoruesiRepository.save(perdoruesiEkzistues);


        }
        return null;
    }

    public void fshijPerdoruesin(Long id) {
        perdoruesiRepository.deleteById(id);
    }

    public Optional<Perdoruesi> authenticatePerdoruesi(String username, String password) {
        return perdoruesiRepository.findByUsernameAndPassword(username, password);
    }
}
