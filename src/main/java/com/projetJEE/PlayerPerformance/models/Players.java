package com.projetJEE.PlayerPerformance.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "players")
public class Players {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "Name")
    private String name;
    @Column(name = "Age")
    private int age;
    @Column(name = "Team")
    private String team;
    @Column(name = "nationalite")
    private String nationality;
    @Column(name = "pied_prefere")
    private String preferredFoot;
    @Column(name = "position")
    private String position;
    @Column(name = "taille")
    private String taille;
    @Column(name = "Valeur_Actuelle")
    private String valeurActuelle;
    @Column(name = "Overall_Rating")
    private Double overallRating;
    @Column(name = "best_overall")
    private Double potentielMax;
    @Column(name = "Growth")
    private Double growth;


}
