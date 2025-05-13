package com.fitnessweb.fitnessweb.service;

import com.fitnessweb.fitnessweb.model.Perdoruesi;
import com.fitnessweb.fitnessweb.model.Stervitja;
import com.fitnessweb.fitnessweb.repository.StervitjaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StervitjaService {


    private StervitjaRepository stervitjaRepository;

    @Autowired
    public StervitjaService(StervitjaRepository stervitjaRepository) {
        this.stervitjaRepository = stervitjaRepository;
    }


    public Stervitja ruajStervitjen(Stervitja teDhenatPerStervitje){
        return stervitjaRepository.save(teDhenatPerStervitje);
    }

    public List<Stervitja> teDhenatPerNjePerdorues(Perdoruesi perdoruesi){
        return stervitjaRepository.findByPerdoruesi(perdoruesi);
    }

    public Optional<Stervitja> teDhenatSipasId(Long id){
        return stervitjaRepository.findById(id);
    }

    public Optional<Stervitja> perditesoTeDhenatperNjeStervitje(Long id, Stervitja teDhenat){
        Optional<Stervitja> stervitja = stervitjaRepository.findById(id);
        if(stervitja.isPresent()){
            Stervitja teDhenatEkzistuese = stervitja.get();
            teDhenatEkzistuese.setHapat(teDhenat.getHapat());
            teDhenatEkzistuese.setKalorite_e_humbura(teDhenat.getKalorite_e_humbura());
            teDhenatEkzistuese.setData(teDhenat.getData());
            teDhenatEkzistuese.setDistanca(teDhenat.getDistanca());
            teDhenatEkzistuese.setPulsi_para_stervitjes(teDhenat.getPulsi_para_stervitjes());
            teDhenatEkzistuese.setPulsi_maksimal_gjate_stervitjes(teDhenat.getPulsi_maksimal_gjate_stervitjes());
            return Optional.of(stervitjaRepository.save(teDhenatEkzistuese));

        }
        return null;


    }

    public boolean fshijNjeStervitje(Long id){
        Optional<Stervitja> teDhenat = stervitjaRepository.findById(id);
        if(teDhenat.isPresent()){
            stervitjaRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}
