package com.projetJEE.PlayerPerformance.service;

import com.projetJEE.PlayerPerformance.models.Players;
import com.projetJEE.PlayerPerformance.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayersService {
    @Autowired
    private PlayerRepository playersRepository;

    public Players savePlayer(Players player) {
        return playersRepository.save(player);
    }
}
