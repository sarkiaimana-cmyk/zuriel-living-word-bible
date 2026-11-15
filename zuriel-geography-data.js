/* Zuriel Bible Geography — curated offline place data.
 * Place data adapted from OpenBible.info Bible Geocoding Data, pinned snapshot.
 * See docs/BIBLE-GEOGRAPHY-SOURCES.md for attribution and confidence policy.
 */
(function () {
  "use strict";
  window.ZurielGeographyData = Object.freeze({
    metadata: {
      source: "OpenBible.info Bible Geocoding Data",
      sourceUrl: "https://github.com/openbibleinfo/Bible-Geocoding-Data",
      sourceCommit: "7eb18a5ee62f27b9b93bd6689ea272d76dd23b8f",
      license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
      attribution: "Place identifications and coordinates adapted from OpenBible.info Bible Geocoding Data, CC BY 4.0.",
      confidenceNote: "The source describes a best-path score of 500 or higher as very high confidence. Scores are source ratings, not statistical probabilities."
    },
    regions: [{
      id: "galilee",
      name: "Galilee",
      subtitle: "A first offline locator for the Gospel places of northern Galilee",
      bounds: { west: 35.24, east: 35.66, south: 32.65, north: 32.93 },
      mapNotice: "Coordinate locator only — not a surveyed road map, modern political boundary map or reconstruction of the ancient coastline. Water and regional markers use representative points where stated.",
      places: [
        {
          id: "nazareth",
          name: "Nazareth",
          ancientId: "af5884f",
          modernId: "mb3f688",
          resolutionName: "Nazareth",
          longitude: 35.297690,
          latitude: 32.702140,
          coordinateRole: "point",
          precision: "Traditional site in the modern settlement; the source describes the coordinate as a traditional site.",
          score: 500,
          type: "settlement",
          labelOffset: { x: -10, y: 22 },
          summary: "Nazareth is the town associated with Jesus' upbringing. Luke records Jesus reading in the synagogue there.",
          references: [
            { book: "Matthew", chapter: 2, verse: 23 },
            { book: "Luke", chapter: 2, verse: 39 },
            { book: "Luke", chapter: 4, verse: 16 }
          ]
        },
        {
          id: "cana",
          name: "Cana",
          ancientId: "a031bda",
          modernId: "m7c7d60",
          resolutionName: "Horbat Qana",
          longitude: 35.302690,
          latitude: 32.822200,
          coordinateRole: "point",
          precision: "The selected candidate is recorded with a 20-metre precision description in the source dataset.",
          score: 685,
          type: "settlement",
          labelOffset: { x: -54, y: -12 },
          summary: "John places the wedding where Jesus performed a sign at Cana and records a later healing request connected with the town.",
          alternatives: [
            { name: "Kefr Kenna", score: 120, note: "An alternative proposed identification with a lower source score; retained here as a note rather than a second confirmed pin." }
          ],
          references: [
            { book: "John", chapter: 2, verse: 1 },
            { book: "John", chapter: 4, verse: 46 },
            { book: "John", chapter: 21, verse: 2 }
          ]
        },
        {
          id: "sea-of-galilee",
          name: "Sea of Galilee",
          ancientId: "a562fcc",
          modernId: "m0438ff",
          resolutionName: "Sea of Galilee",
          longitude: 35.590033,
          latitude: 32.818906,
          coordinateRole: "representative_point",
          precision: "Representative point inside the body of water; it does not describe the shoreline.",
          score: 500,
          type: "body of water",
          labelOffset: { x: -82, y: 26 },
          summary: "The lake is a setting for several Gospel scenes, including Jesus calling disciples and teaching near its shores.",
          references: [
            { book: "Matthew", chapter: 4, verse: 18 },
            { book: "John", chapter: 6, verse: 1 },
            { book: "John", chapter: 21, verse: 1 }
          ]
        },
        {
          id: "capernaum",
          name: "Capernaum",
          ancientId: "af2161c",
          modernId: "m66efd0",
          resolutionName: "Tell Hum",
          longitude: 35.575000,
          latitude: 32.881111,
          coordinateRole: "point",
          precision: "Point in visible remains; the source records a five-metre precision description.",
          score: 860,
          type: "settlement",
          labelOffset: { x: 14, y: -10 },
          summary: "Capernaum became a prominent setting in Jesus' Galilean ministry, including teaching in the synagogue and acts of healing.",
          references: [
            { book: "Matthew", chapter: 4, verse: 13 },
            { book: "Mark", chapter: 1, verse: 21 },
            { book: "Luke", chapter: 4, verse: 31 },
            { book: "John", chapter: 6, verse: 59 }
          ]
        }
      ],
      journeys: [{
        id: "nazareth-to-capernaum-luke-4",
        title: "From Nazareth to Capernaum — Luke's Gospel sequence",
        description: "Luke narrates Jesus teaching in the synagogue at Nazareth and then going down to Capernaum. This is a Scripture-reading connection, not a reconstruction of the exact road, distance or travel time.",
        stops: [
          { placeId: "nazareth", reference: { book: "Luke", chapter: 4, verse: 16 }, caption: "Jesus reads and teaches in Nazareth." },
          { placeId: "capernaum", reference: { book: "Luke", chapter: 4, verse: 31 }, caption: "Jesus teaches in Capernaum." }
        ]
      }]
    }]
  });
})();
