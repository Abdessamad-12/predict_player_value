package com.projetJEE.PlayerPerformance.controller;



import com.projetJEE.PlayerPerformance.models.Match;
import com.projetJEE.PlayerPerformance.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @GetMapping("/live")
    public List<Match> getLiveMatches() {
        return matchService.getLiveMatches();
    }
}

