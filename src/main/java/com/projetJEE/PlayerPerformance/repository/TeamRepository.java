package com.projetJEE.PlayerPerformance.repository;

import com.projetJEE.PlayerPerformance.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
}
