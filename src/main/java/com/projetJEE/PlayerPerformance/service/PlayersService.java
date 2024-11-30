package com.projetJEE.PlayerPerformance.service;

import com.projetJEE.PlayerPerformance.exception.ResourceNotFoundException;
import com.projetJEE.PlayerPerformance.models.Players;
import com.projetJEE.PlayerPerformance.repository.PlayerRepository;
import com.projetJEE.PlayerPerformance.utils.CsvParser;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PlayersService {
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private CsvParser csvParser;

    public List<Players> getAllPlayers() {
        return playerRepository.findAll();
    }



    public Optional<Players> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public Players savePlayer(Players player) {
        return playerRepository.save(player);
    }

    public void importPlayersFromCsv(MultipartFile file) throws Exception {
        List<Players> players = csvParser.parseCsvFile(file);
        playerRepository.saveAll(players);
    }

    public Players updatePlayer(Long id, Players playerInfo) {
        return playerRepository.findById(id)
                .map(player -> {
                    player.setName(playerInfo.getName());
                    player.setAge(playerInfo.getAge());
                    player.setTeam(playerInfo.getTeam());
                    player.setNationality(playerInfo.getNationality());
                    player.setTaille(playerInfo.getTaille());
                    player.setATT(playerInfo.getATT());
                    player.setTEC(playerInfo.getTEC());
                    player.setTAC(playerInfo.getTAC());
                    player.setDEF(playerInfo.getDEF());
                    player.setAER(playerInfo.getAER());
                    player.setANT(playerInfo.getANT());
                    player.setBAL(playerInfo.getBAL());
                    player.setCRE(playerInfo.getCRE());
                    player.setSAV(playerInfo.getSAV());
                    player.setOverall_rating(playerInfo.getOverall_rating());
                    player.setLongue_passe(playerInfo.getLongue_passe());
                    player.setPosition(playerInfo.getPosition());
                    player.setPotentiel_max(playerInfo.getPotentiel_max());
                    player.setPreferred_foot(playerInfo.getPreferred_foot());
                    player.setCurrentValue(playerInfo.getCurrentValue());
                    player.setArrets_par_match(playerInfo.getArrets_par_match());
                    return playerRepository.save(player);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + id));
    }
    public void deletePlayer(Long id) {
        Players player = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + id));
        playerRepository.delete(player);
    }


}
