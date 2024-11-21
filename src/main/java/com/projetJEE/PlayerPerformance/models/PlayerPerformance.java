package com.projetJEE.PlayerPerformance.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "player_performance")
public class PlayerPerformance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Players player;

    @Column(name = "goals")
    private int goals;

    @Column(name = "assists")
    private int assists;

    @Column(name = "minutes_played")
    private int minutesPlayed;

    @Column(name = "passprecision")
    private int passprescision;

    @Column(name = "deffrating")

    private int deffrating;


    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;
}
