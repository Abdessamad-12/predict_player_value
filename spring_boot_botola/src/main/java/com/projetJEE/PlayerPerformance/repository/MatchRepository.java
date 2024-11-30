package com.projetJEE.PlayerPerformance.repository;

import com.projetJEE.PlayerPerformance.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
