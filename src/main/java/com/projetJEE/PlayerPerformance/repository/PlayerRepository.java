package com.projetJEE.PlayerPerformance.repository;

import com.projetJEE.PlayerPerformance.models.Players;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Players, Long> {
    //all crud methode
}
