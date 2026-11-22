# zuriel-living-word-bible
An independent, offline-first Bible reading and study app.
Zuriel Living Word Bible — His Words, My Life, My Victory.

## Bible translation access

- The King James Version (KJV) is the confirmed bundled offline Bible and remains available without an internet connection.
- Online translation comparison is optional and lists only versions returned by the configured publisher-authorised provider account.
- YouVersion passages are displayed online only by default. Zuriel does not save YouVersion text locally unless the exact publisher licence explicitly permits offline storage.
- API.Bible chapter caching follows the provider's existing 29-day refresh limit and retains publisher attribution.
- Online providers are not considered connected until the secure translation proxy has been deployed, its catalogue and passage routes have passed live smoke tests, and the verified endpoint is present in release metadata.
