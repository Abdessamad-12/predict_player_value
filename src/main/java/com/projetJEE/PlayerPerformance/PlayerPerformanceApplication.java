package com.projetJEE.PlayerPerformance;

import com.projetJEE.PlayerPerformance.models.Players;
import com.projetJEE.PlayerPerformance.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class PlayerPerformanceApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(PlayerPerformanceApplication.class, args);
	}

	@Autowired
	private PlayerRepository playerRepository;

	@Override
	public void run(String... args) throws Exception {
		

	}
}
