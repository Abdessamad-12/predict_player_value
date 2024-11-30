package com.projetJEE.PlayerPerformance.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "Match of day")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "LeagueName")
    private String leagueName;
    @Column(name = "Hometeam")
    private String hometeam;
    @Column(name = "Teamaway")
    private String teamaway;
}
