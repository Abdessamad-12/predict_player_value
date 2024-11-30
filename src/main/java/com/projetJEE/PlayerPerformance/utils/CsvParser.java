package com.projetJEE.PlayerPerformance.utils;


import com.projetJEE.PlayerPerformance.models.Players;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class CsvParser {
    public List<Players> parseCsvFile(MultipartFile file) throws Exception {
        List<Players> players = new ArrayList<>();

        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord csvRecord : csvParser) {
                Players player = new Players();
                player.setName(getValueOrNull(csvRecord, "Name"));
                player.setAge(parseDoubleOrNull(csvRecord.get("age")));
                player.setNationality(getValueOrNull(csvRecord, "nationality"));
                player.setPosition(parseDoubleOrNull(csvRecord.get("position")));
                player.setTaille(parseDoubleOrNull(csvRecord.get("taille")));
                player.setPreferred_foot(getValueOrNull(csvRecord, "preferred_foot"));
                player.setTeam(getValueOrNull(csvRecord, "team"));
                player.setCurrentValue(parseValueString(csvRecord.get("valeur_actuelle")));

                // Set player statistics
                player.setAER(parseDoubleOrNull(csvRecord.get("AER")));
                player.setANT(parseDoubleOrNull(csvRecord.get("ANT")));
                player.setATT(parseDoubleOrNull(csvRecord.get("ATT")));
                player.setArrets_par_match(parseDoubleOrNull(csvRecord.get("Arrets_par_match")));
                player.setBAL(parseDoubleOrNull(csvRecord.get("BAL")));
                player.setCRE(parseDoubleOrNull(csvRecord.get("CRE")));
                player.setDEF(parseDoubleOrNull(csvRecord.get("DEF")));
                player.setOverall_rating(parseDoubleOrNull(csvRecord.get("Overall rating")));
                player.setSAV(parseDoubleOrNull(csvRecord.get("SAV")));
                player.setTAC(parseDoubleOrNull(csvRecord.get("TAC")));
                player.setTEC(parseDoubleOrNull(csvRecord.get("TEC")));
                player.setLongue_passe(parseDoubleOrNull(csvRecord.get("longue_passe")));
                player.setPasses_Precision(parseDoubleOrNull(csvRecord.get("passes_Precision")));
                player.setPotentiel_max(parseDoubleOrNull(csvRecord.get("potentiel_max")));

                players.add(player);
            }
        }
        return players;
    }

    private String getValueOrNull(CSVRecord record, String key) {
        try {
            String value = record.get(key);
            return value.isEmpty() ? null : value;
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private Integer parseIntegerOrNull(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Double parseDoubleOrNull(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            // Remove percentage sign and handle percentage values
            value = value.replace("%", "").trim();
            if (value.contains("(")) {
                value = value.substring(0, value.indexOf("(")).trim();
            }
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private BigDecimal parseValueString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            // Remove currency symbol, spaces, and K/M suffix
            String cleanValue = value.replaceAll("[^0-9.,KMk€]", "").trim();
            double multiplier = 1;

            // Handle K (thousands) and M (millions)
            if (cleanValue.toUpperCase().endsWith("K")) {
                multiplier = 1000;
                cleanValue = cleanValue.substring(0, cleanValue.length() - 1);
            } else if (cleanValue.toUpperCase().endsWith("M")) {
                multiplier = 1000000;
                cleanValue = cleanValue.substring(0, cleanValue.length() - 1);
            }

            // Remove € symbol if present
            cleanValue = cleanValue.replace("€", "").trim();

            // Parse the numeric value and apply multiplier
            double numericValue = Double.parseDouble(cleanValue) * multiplier;
            return BigDecimal.valueOf(numericValue);
        } catch (NumberFormatException e) {
            return null;
        }
    }

}
