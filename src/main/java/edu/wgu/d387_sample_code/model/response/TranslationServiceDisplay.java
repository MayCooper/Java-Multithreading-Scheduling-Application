package edu.wgu.d387_sample_code.model.response;

import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Manages messages for different locales using resource bundles.
 */
public class TranslationServiceDisplay {

    private final ResourceBundle resourceBundle;

    public TranslationServiceDisplay(Locale locale) {
        String resourceName = "translation_" + locale.toString().replace('-', '_');
        this.resourceBundle = ResourceBundle.getBundle(resourceName, locale);
    }

    public String greetingMessage() {
        return resourceBundle.getString("greetingMessage");
    }
}
