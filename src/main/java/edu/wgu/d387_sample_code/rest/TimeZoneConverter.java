package edu.wgu.d387_sample_code.rest;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

public class TimeZoneConverter {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");
    private static final Map<String, String> TIME_ZONES = new LinkedHashMap<>();

    static {
        // Initialize static time zone mappings once for reuse
        initializeTimeZones();
    }

    private static void initializeTimeZones() {
        TIME_ZONES.put("ET", "America/New_York");
        TIME_ZONES.put("MT", "America/Denver");
        TIME_ZONES.put("UTC", "UTC");
    }

    public static String convertToAllZones(String userTimeZone) {
        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of(userTimeZone));
        Map<String, ZonedDateTime> timeMapping = createTimeMapping(currentTime);

        return formatTimeZones(timeMapping, userTimeZone);
    }

    private static Map<String, ZonedDateTime> createTimeMapping(ZonedDateTime currentTime) {
        Map<String, ZonedDateTime> mappedTimes = new TreeMap<>();
        TIME_ZONES.forEach((label, zone) ->
                mappedTimes.put(label, currentTime.withZoneSameInstant(ZoneId.of(zone)))
        );
        return mappedTimes;
    }

    private static String formatTimeZones(Map<String, ZonedDateTime> timeMapping, String userTimeZone) {
        StringBuilder result = new StringBuilder();
        String userZoneLabel = findUserZoneLabel(userTimeZone);

        if (userZoneLabel != null) {
            result.append(formatTimeForZone(timeMapping.get(userZoneLabel), userZoneLabel));
            timeMapping.remove(userZoneLabel);
        }

        timeMapping.forEach((label, zonedTime) ->
                appendFormattedTime(result, zonedTime, label)
        );

        return result.toString();
    }

    private static String findUserZoneLabel(String userTimeZone) {
        return TIME_ZONES.entrySet().stream()
                .filter(entry -> entry.getValue().equals(userTimeZone))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);
    }

    private static void appendFormattedTime(StringBuilder builder, ZonedDateTime time, String label) {
        if (builder.length() > 0) builder.append(", ");
        builder.append(formatTimeForZone(time, label));
    }

    private static String formatTimeForZone(ZonedDateTime time, String label) {
        return time.format(TIME_FORMATTER) + " " + label;
    }
}
