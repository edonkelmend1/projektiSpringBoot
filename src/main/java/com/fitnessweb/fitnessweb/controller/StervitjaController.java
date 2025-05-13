package com.fitnessweb.fitnessweb.controller;

import com.fitnessweb.fitnessweb.model.Perdoruesi;
import com.fitnessweb.fitnessweb.model.Stervitja;
import com.fitnessweb.fitnessweb.service.PerdoruesiService;
import com.fitnessweb.fitnessweb.service.StervitjaService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stervitja")
public class StervitjaController {

    private final StervitjaService stervitjaService;
    private final PerdoruesiService perdoruesiService;

    @Autowired
    public StervitjaController(StervitjaService stervitjaService, PerdoruesiService perdoruesiService) {
        this.stervitjaService = stervitjaService;
        this.perdoruesiService = perdoruesiService;
    }

    @PostMapping("/{perdoruesiId}")
    public ResponseEntity<Stervitja> shtoTeDhenaStervitjeje(@PathVariable Long perdoruesiId, @RequestBody Stervitja teDhenat){
        Optional<Perdoruesi> perdoruesi = perdoruesiService.gjejPermesId(perdoruesiId);
        if(perdoruesi.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        teDhenat.setPerdoruesi(perdoruesi.get());
        Stervitja teDhenatPerStervitje = stervitjaService.ruajStervitjen(teDhenat);
        return new ResponseEntity<>(teDhenatPerStervitje, HttpStatus.CREATED);


    }

    @GetMapping("/perdoruesi/{perdoruesiId}")
    public ResponseEntity<List<Stervitja>> gjejTeDhenatPerNjePerdorues(@PathVariable Long perdoruesiId){

        Optional<Perdoruesi> perdoruesi = perdoruesiService.gjejPermesId(perdoruesiId);
        if(perdoruesi.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        List<Stervitja> teDhenat = stervitjaService.teDhenatPerNjePerdorues(perdoruesi.get());
        return ResponseEntity.ok(teDhenat);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stervitja> gjejStervitjenSipasId(@PathVariable Long id){
        Optional<Stervitja> stervitja = stervitjaService.teDhenatSipasId(id);
        return stervitja.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PutMapping("/{id}")
    public ResponseEntity<Stervitja> perditesoNjeStervitje(@PathVariable Long id, @RequestBody Stervitja teDhenat){
        Optional<Stervitja> stervitja_e_perditesuar = stervitjaService.perditesoTeDhenatperNjeStervitje(id, teDhenat);
        return stervitja_e_perditesuar.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> fshijTeDhenatSipasId(@PathVariable Long id){
        boolean te_dhenat_e_fshira = stervitjaService.fshijNjeStervitje(id);
        return te_dhenat_e_fshira ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();

    }
}
