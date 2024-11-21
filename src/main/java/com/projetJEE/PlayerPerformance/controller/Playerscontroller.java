package com.projetJEE.PlayerPerformance.controller;

import com.projetJEE.PlayerPerformance.exception.ResourceNotFoundException;
import com.projetJEE.PlayerPerformance.models.Players;
import com.projetJEE.PlayerPerformance.repository.PlayerRepository;
import com.projetJEE.PlayerPerformance.service.PlayersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/players")
public class Playerscontroller {

    @Autowired
    private PlayersService playersService;

    @Autowired
    private PlayerRepository playerRepository;

    @GetMapping
    public List<Players> getAllPlayers() {
        return playerRepository.findAll();
    }

    @PostMapping
    public Players createPlayer(@RequestBody Players players){
        return playerRepository.save(players);
    }
    @GetMapping("{id}")
    public ResponseEntity<Players> getPlayerById(@PathVariable
                                                     long id){
        Players players = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not exist"));
        return ResponseEntity.ok(players);
    }

    @PutMapping("{id}")
    public ResponseEntity<Players> updatePlayer(@PathVariable long id,@RequestBody Players playerinfo){
        Players updatePlayer = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not exist"));
        updatePlayer.setName(playerinfo.getName());
        updatePlayer.setAge(playerinfo.getAge());
        updatePlayer.setTeam(playerinfo.getTeam());

        playerRepository.save(updatePlayer);

        return ResponseEntity.ok(updatePlayer);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePlayer(@PathVariable long id){
        Players player = playerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player not exist"));
        playerRepository.delete(player);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    @PostMapping("/save")
    public ResponseEntity<Players> savePlayer(@RequestBody Players player) {
        Players savedPlayer = playersService.savePlayer(player);
        return ResponseEntity.ok(savedPlayer);
    }

}
