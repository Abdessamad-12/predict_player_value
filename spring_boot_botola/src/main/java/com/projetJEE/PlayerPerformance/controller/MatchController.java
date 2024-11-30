/*package com.projetJEE.PlayerPerformance.controller;

import com.projetJEE.PlayerPerformance.exception.ResourceNotFoundException;
import com.projetJEE.PlayerPerformance.models.Match;
import com.projetJEE.PlayerPerformance.models.Players;
import com.projetJEE.PlayerPerformance.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class MatchController {



    private MatchRepository matchRepository;

    @GetMapping
    public List<Match> getAllMatch() {
        return matchRepository.findAll();
    }

    @PutMapping
    public ResponseEntity<Match> getMatchById(@PathVariable int id){
        Match match = matchRepository.findById((long) id)
                .orElseThrow(() -> new ResourceNotFoundException("match not exist"));
        return ResponseEntity.ok(match);
    }
    @PutMapping
    public ResponseEntity<Match> updateMatch(int id, Match newMatch){
        Match updateMatch = matchRepository.findById((long) id)
                .orElseThrow(() -> new ResourceNotFoundException("match not exist"));
        updateMatch.setLeagueName(newMatch.getLeagueName());
        updateMatch.setHometeam(newMatch.getHometeam());
        updateMatch.setTeamaway(newMatch.getTeamaway());

        matchRepository.save(updateMatch);

        return ResponseEntity.ok(updateMatch);
    }

}*/

