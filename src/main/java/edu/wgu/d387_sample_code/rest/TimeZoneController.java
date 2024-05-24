package edu.wgu.d387_sample_code.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/time")
@CrossOrigin(origins = "http://localhost:4200")
public class TimeZoneController {

    @GetMapping("/convert")
    public String convertTime(@RequestParam(required = false, defaultValue = "UTC") String timeZone) {
        return TimeZoneConverter.convertToAllZones(timeZone);
    }
}
