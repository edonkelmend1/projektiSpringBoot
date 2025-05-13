package com.fitnessweb.fitnessweb.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Stervitjet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Stervitja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private Integer hapat;
    private Double distanca;
    private Double kalorite_e_humbura;
    private Integer pulsi_para_stervitjes;
    private Integer pulsi_maksimal_gjate_stervitjes;

    @ManyToOne
    @JoinColumn(name = "perdoruesi_id", nullable = false)
    private Perdoruesi perdoruesi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getHapat() {
        return hapat;
    }

    public void setHapat(Integer hapat) {
        this.hapat = hapat;
    }

    public Double getDistanca() {
        return distanca;
    }

    public void setDistanca(Double distanca) {
        this.distanca = distanca;
    }

    public Double getKalorite_e_humbura() {
        return kalorite_e_humbura;
    }

    public void setKalorite_e_humbura(Double kalorite_e_humbura) {
        this.kalorite_e_humbura = kalorite_e_humbura;
    }

    public Integer getPulsi_para_stervitjes() {
        return pulsi_para_stervitjes;
    }

    public void setPulsi_para_stervitjes(Integer pulsi_para_stervitjes) {
        this.pulsi_para_stervitjes = pulsi_para_stervitjes;
    }

    public Integer getPulsi_maksimal_gjate_stervitjes() {
        return pulsi_maksimal_gjate_stervitjes;
    }

    public void setPulsi_maksimal_gjate_stervitjes(Integer pulsi_maksimal_gjate_stervitjes) {
        this.pulsi_maksimal_gjate_stervitjes = pulsi_maksimal_gjate_stervitjes;
    }

    public Perdoruesi getPerdoruesi() {
        return perdoruesi;
    }

    public void setPerdoruesi(Perdoruesi perdoruesi) {
        this.perdoruesi = perdoruesi;
    }
}
