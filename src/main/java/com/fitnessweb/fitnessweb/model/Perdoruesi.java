package com.fitnessweb.fitnessweb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Perdoruesit")
@NoArgsConstructor
@AllArgsConstructor
public class Perdoruesi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "perdoruesi", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Stervitja> stervitja;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Stervitja> getStervitja() {
        return stervitja;
    }

    public void setStervitja(List<Stervitja> stervitja) {
        this.stervitja = stervitja;
    }
}
