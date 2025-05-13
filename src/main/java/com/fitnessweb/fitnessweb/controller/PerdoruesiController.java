package com.fitnessweb.fitnessweb.controller;

import com.fitnessweb.fitnessweb.dto.LoginRequest;
import com.fitnessweb.fitnessweb.model.Perdoruesi;
import com.fitnessweb.fitnessweb.service.PerdoruesiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/perdoruesit")

public class PerdoruesiController {

    private final PerdoruesiService perdoruesiService;

    @Autowired
    public PerdoruesiController(PerdoruesiService perdoruesiService) {
        this.perdoruesiService = perdoruesiService;
    }


    @PostMapping("/regjistro")
    public ResponseEntity<Perdoruesi> regjistroPerdoruesin(@RequestBody Perdoruesi perdoruesi){
        Perdoruesi perdoruesi_per_regjistrim = perdoruesiService.krijoPerdoruesin(perdoruesi);
        return new ResponseEntity<>(perdoruesi_per_regjistrim, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        Optional<Perdoruesi> perdoruesi = perdoruesiService.authenticatePerdoruesi(loginRequest.getUsername(), loginRequest.getPassword());
        if(perdoruesi.isPresent()){
            return ResponseEntity.ok(perdoruesi.get());
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Emri i perdoruesit ose fjalekalimi i pasakte!");

        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Perdoruesi> gjejPerdoruesin(@PathVariable Long id){
        Optional<Perdoruesi> perdoruesi = perdoruesiService.gjejPermesId(id);
        return perdoruesi.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
