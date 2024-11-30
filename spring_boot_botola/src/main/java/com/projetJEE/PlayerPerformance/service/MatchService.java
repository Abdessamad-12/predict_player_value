package com.projetJEE.PlayerPerformance.service;


import com.projetJEE.PlayerPerformance.models.Match;
import com.projetJEE.PlayerPerformance.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    @Value("${sports.api.base-url}")
    private String apiUrl;

    @Value("${sports.api.key}")
    private String apiKey;

    private final MatchRepository matchRepository;
    private final WebClient webClient;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
        this.webClient = WebClient.builder()
                .defaultHeader("x-rapidapi-key", apiKey)
                .defaultHeader("x-rapidapi-host", "v3.football.api-sports.io")
                .baseUrl(apiUrl)
                .build();
    }

    public List<Match> getLiveMatches() {
        List<Match> liveMatches = webClient.get()
                .uri("/fixtures/live")
                .retrieve()
                .bodyToMono(List.class) // Adjust based on API response structure
                .block();

        // Save live matches to the database
        if (liveMatches != null) {
            liveMatches.forEach(match -> {
                Match newMatch = new Match();
                newMatch.setHomeTeam(match.get("teams").get("home").get("name").toString());
                newMatch.setAwayTeam(match.get("teams").get("away").get("name").toString());
                newMatch.setHomeScore(Integer.parseInt(match.get("goals").get("home").toString()));
                newMatch.setAwayScore(Integer.parseInt(match.get("goals").get("away").toString()));
                newMatch.setMatchDate(match.get("fixture").get("date").toString());
                newMatch.setStatus(match.get("fixture").get("status").get("long").toString());
                matchRepository.save(newMatch);
            });
        }
        return matchRepository.findAll();
    }
}
