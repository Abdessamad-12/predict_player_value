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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class Playerscontroller {

    @Autowired
    private PlayersService playersService;


    @GetMapping
    public List<Players> getAllPlayers() {
        return playersService.getAllPlayers();
    }


    @GetMapping("{id}")
    public ResponseEntity<Players> getPlayerById(@PathVariable long id){
        return playersService.getPlayerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/import")
    public ResponseEntity<?> importPlayersFromCsv(@RequestParam("file") MultipartFile file) {
        try {
            playersService.importPlayersFromCsv(file);
            return ResponseEntity.ok().body("Players imported successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error importing players: " + e.getMessage());
        }
    }
    @PostMapping
    public ResponseEntity<Players> createPlayer(@RequestBody Players player) {
        Players savedPlayer = playersService.savePlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlayer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Players> updatePlayer(@PathVariable Long id, @RequestBody Players playerInfo) {
        Players updatedPlayer = playersService.updatePlayer(id, playerInfo);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        playersService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/save")
    public ResponseEntity<Players> savePlayer(@RequestBody Players player) {
        Players savedPlayer = playersService.savePlayer(player);
        return ResponseEntity.ok(savedPlayer);
    }


    @GetMapping("/team/{teamName}")
    public ResponseEntity<List<Players>> getPlayersByTeam(@PathVariable String teamName) {
        List<Players> players = playersService.getPlayersByTeam(teamName);
        return ResponseEntity.ok(players);
    }


}
