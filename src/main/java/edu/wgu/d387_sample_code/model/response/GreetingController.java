package edu.wgu.d387_sample_code.model.response;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Provides localized greeting messages for different locales.
 */
@RestController
public class GreetingController {

    private final TranslationServiceDisplay displayMessageEnglish;

    public GreetingController() {
        displayMessageEnglish = new TranslationServiceDisplay(new Locale("en", "US"));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/welcome")
    public List<String> retrieveWelcomeMessages() {
        String englishMessage = displayMessageEnglish.greetingMessage();

        TranslationServiceDisplay displayMessageFrench = new TranslationServiceDisplay(new Locale("fr", "CA"));
        String frenchMessage = displayMessageFrench.greetingMessage();

        return Stream.of(englishMessage, frenchMessage).collect(Collectors.toList());
    }
}
