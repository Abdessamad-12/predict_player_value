package com.projetJEE.PlayerPerformance.repository;

import com.projetJEE.PlayerPerformance.models.Players;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Players, Long> {
    List<Players> findByTeam(String team);
    //all crud methode
}
