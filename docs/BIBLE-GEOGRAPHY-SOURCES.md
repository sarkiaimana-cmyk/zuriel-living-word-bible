# Zuriel Bible Geography Centre — Sources and Accuracy Policy

## First regional release: Galilee

The first offline map is a **Galilee coordinate locator**, not a full historical reconstruction. It plots four source-backed places: Nazareth, Cana (using the highest-scoring candidate in the pinned dataset), the Sea of Galilee, and Capernaum. It also links the narrative sequence in Luke 4:16 and Luke 4:31 from Nazareth to Capernaum.

The locator intentionally does not draw modern political boundaries, ancient territorial borders, roads, shorelines, or a measured travel route. The Sea of Galilee marker is a representative point inside the water body, not a shoreline coordinate. The Luke sequence is a reading connection, not a surveyed route or travel-time estimate.

## Place data source and licence

- Dataset: OpenBible.info Bible Geocoding Data
- Repository: https://github.com/openbibleinfo/Bible-Geocoding-Data
- Pinned source commit: `7eb18a5ee62f27b9b93bd6689ea272d76dd23b8f`
- Dataset licence: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Required attribution: “Place identifications and coordinates adapted from OpenBible.info Bible Geocoding Data, CC BY 4.0.”

The upstream project explains that it compiles place identifications from more than seventy modern sources and cites more than four hundred sources. It also distinguishes an ancient place from a modern location and documents alternative identifications, confidence scores, coordinate roles, and precision notes. The source dataset identifies OpenStreetMap-derived geometries separately under ODbL 1.0; this first locator uses curated point coordinates and does not bundle OSM geometry or map tiles.

## Confidence and precision display

The source README explains that a best-path score of 500 or higher indicates a very high-confidence resolution. Zuriel displays the source score as a score out of 1000, not as a probability or a percentage. It also displays the mapped candidate and its precision description.

Where the source lists competing identifications, Zuriel must not hide the alternatives or present the preferred candidate as universally settled. The Cana entry therefore identifies Horbat Qana as the selected higher-scoring candidate and records Kefr Kenna as a lower-scoring alternative. The marker is a study aid, not a claim that every scholarly question is resolved.

A region or water body may be represented by a centre or representative point. Such a point must never be described as an exact ancient site or shoreline. Places with unknown or materially disputed locations must remain unmapped or be shown only with an explicit uncertainty explanation.

## Second regional release: Jerusalem and Judea

The second offline locator covers Jerusalem and the surrounding Judean hill country. It contains source-backed candidates for Hebron (Tel Rumeida), Bethlehem, Jerusalem, the Mount of Olives, Gethsemane, Bethany (Al Eizariya), Old Testament Jericho (Tell es-Sultan), and the Gospel-era Jericho candidate (Tell el-Alayiq).

The two Jericho records are intentionally kept distinct because the upstream dataset contains separate ancient-place records and separate modern candidate locations. Jerusalem and Bethlehem are represented by points in their modern settlements, not by exact ancient gates, buildings or boundaries. The Mount of Olives point represents a location on the hill; Gethsemane's point carries a 250-metre precision radius. These limitations remain visible in the app.

Two Scripture reading sequences are included:
- Bethany → Mount of Olives → Jerusalem, linked to Luke 19:29 and 19:41.
- Jericho → Jerusalem, linked to Luke 19:1 and 19:28.

These are narrative reading connections, not measured roads, exact itineraries or travel-time claims.

## Scripture connections

The upstream ancient-place records include OSIS verse identifiers. Zuriel's curated data retains selected book, chapter and verse references and opens those references through the local Bible reader. A place-to-passage link must be checked against the cited reference before it is published. A journey is a sequence of Scripture-linked stops; it must not imply a precise road, chronology, distance, or travel time unless the biblical text and reliable geographical evidence support that claim.

## Offline and privacy requirements

- All first-release map data and interface code are bundled with the app and included in the service-worker cache and Android web package.
- The Geography Centre must not require online map tiles, geocoding calls, remote scripts, or user location.
- No location permission is required for this feature.
- Keep map data compact and curated; do not bundle the full upstream dataset or large image archive.
- Keep source attribution and uncertainty notes visible in the app.

## Scholarly and release gates

Before adding another region or journey, record the upstream source identifier, source snapshot, candidate coordinates, score, coordinate role, precision description, relevant Scripture references, and any known alternatives. Review the data and Scripture links independently. Automated checks verify structure and reference shape; they do not replace scholarly review or real-device visual testing.

## Research references

- OpenBible.info, *Bible Geocoding Data* README: https://github.com/openbibleinfo/Bible-Geocoding-Data
- OpenBible.info, Bible Geocoding project overview and licence: https://www.openbible.info/geo/
- Posen Library, *The Geography of the Hebrew Bible*: https://www.posenlibrary.com/guide/geography-hebrew-bible-where-did-ancient-israelites-live
- Enter the Bible, map collection: https://enterthebible.org/maps/
- Society of Biblical Literature, Bible Odyssey map resources overview: https://www.sbl-site.org/assets/pdfs/OnlineTeaching/newsletters/30Mar2020_Teaching_Biblical_Studies_Online.pdf
