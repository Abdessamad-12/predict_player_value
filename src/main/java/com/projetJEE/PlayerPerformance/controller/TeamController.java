package com.projetJEE.PlayerPerformance.controller;

import com.projetJEE.PlayerPerformance.exception.ResourceNotFoundException;
import com.projetJEE.PlayerPerformance.models.Players;
import com.projetJEE.PlayerPerformance.models.Team;
import com.projetJEE.PlayerPerformance.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping
    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }
    @PostMapping
    public Team createTeam(Team team){
        return teamRepository.save(team);
    }

    @GetMapping("{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not exist"));
        return ResponseEntity.ok(team);
    }

    @PutMapping("{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable long id, @RequestBody Team teamInfo) {
        Team updateTeam = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not exist"));
        updateTeam.setName(teamInfo.getName());

        teamRepository.save(updateTeam);

        return ResponseEntity.ok(updateTeam);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTeam(@PathVariable long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not exist"));
        teamRepository.delete(team);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
