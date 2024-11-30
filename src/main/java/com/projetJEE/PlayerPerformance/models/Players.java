package com.projetJEE.PlayerPerformance.models;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "players")
public class Players {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double age;
    private String nationality;
    private Double position;
    private Double taille;
    private String preferred_foot;
    private String team;

    private Double AER;
    private Double ANT;
    private Double ATT;
    private Double arrets_par_match;
    private Double BAL;
    private Double CRE;
    private Double DEF;
    private Double overall_rating;
    private Double SAV;
    private Double TAC;
    private Double TEC;
    private Double longue_passe;
    private Double passes_Precision;
    private Double potentiel_max;

    @Column(name = "valeur_actuelle", precision = 19, scale = 2)
    private BigDecimal currentValue;

    @Column(name = "predicted_value", precision = 19, scale = 2)
    private BigDecimal predictedValue;
}
