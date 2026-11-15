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
      initialPlaceId: "capernaum",
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
    },
    {
      id: "judea",
      name: "Jerusalem & Judea",
      subtitle: "A second offline locator for the southern hill country and Gospel-era places",
      bounds: { west: 35.05, east: 35.50, south: 31.48, north: 31.95 },
      initialPlaceId: "jerusalem",
      mapNotice: "Coordinate locator only — not a surveyed road map, ancient border map or reconstruction of routes. Jerusalem and Bethlehem points represent modern settlements; Jericho and other archaeological points are tied to the specific candidate sites named below.",
      places: [
        {
          id: "hebron",
          name: "Hebron",
          ancientId: "a85151a",
          modernId: "m86f941",
          resolutionName: "Tel Rumeida",
          longitude: 35.102220,
          latitude: 31.525087,
          coordinateRole: "point",
          precision: "Point on the archaeological tell; the source describes a 50-metre precision radius.",
          score: 500,
          type: "settlement",
          labelOffset: { x: -10, y: 23 },
          summary: "Hebron is associated with the patriarchal narratives and later with David's early kingship over Judah.",
          references: [
            { book: "Genesis", chapter: 23, verse: 2 },
            { book: "Joshua", chapter: 14, verse: 13 },
            { book: "2 Samuel", chapter: 5, verse: 3 }
          ]
        },
        {
          id: "bethlehem",
          name: "Bethlehem",
          ancientId: "a112427",
          modernId: "m9b8daa",
          resolutionName: "Bethlehem",
          longitude: 35.207639,
          latitude: 31.704306,
          coordinateRole: "point",
          precision: "Archaeological site in the modern settlement; the source describes an approximately 250-metre settlement radius.",
          score: 500,
          type: "settlement",
          labelOffset: { x: -22, y: 24 },
          summary: "Bethlehem is connected with Ruth and David and is named in Micah's promise and the Gospel birth narratives.",
          references: [
            { book: "Ruth", chapter: 1, verse: 19 },
            { book: "Micah", chapter: 5, verse: 2 },
            { book: "Matthew", chapter: 2, verse: 1 },
            { book: "Luke", chapter: 2, verse: 4 }
          ]
        },
        {
          id: "jerusalem",
          name: "Jerusalem",
          ancientId: "a15257a",
          modernId: "m66c5b8",
          resolutionName: "Jerusalem",
          longitude: 35.234167,
          latitude: 31.776667,
          coordinateRole: "point",
          precision: "Point in the modern settlement; the source describes an approximately 250-metre settlement radius, not an exact ancient building or gate.",
          score: 500,
          type: "settlement",
          labelOffset: { x: -80, y: -34 },
          summary: "Jerusalem is the central city of Judah and the setting for the temple, Jesus' final week, His death and resurrection appearances.",
          references: [
            { book: "Matthew", chapter: 21, verse: 10 },
            { book: "Luke", chapter: 19, verse: 41 },
            { book: "John", chapter: 12, verse: 12 },
            { book: "Acts", chapter: 21, verse: 17 }
          ]
        },
        {
          id: "mount-of-olives",
          name: "Mount of Olives",
          ancientId: "ac2c4c5",
          modernId: "me461ba",
          resolutionName: "Mount of Olives",
          longitude: 35.245686,
          latitude: 31.777946,
          coordinateRole: "point",
          precision: "Point on the hill; the source describes an approximately 300-metre terrain radius.",
          score: 500,
          type: "hill",
          labelOffset: { x: 18, y: -20 },
          summary: "The Mount of Olives is associated with Jesus' approach to Jerusalem, teaching and prayer, and with the disciples' return after the ascension.",
          references: [
            { book: "Matthew", chapter: 21, verse: 1 },
            { book: "Luke", chapter: 19, verse: 29 },
            { book: "Acts", chapter: 1, verse: 12 }
          ]
        },
        {
          id: "gethsemane",
          name: "Gethsemane",
          ancientId: "a42418f",
          modernId: "m835caa",
          resolutionName: "Gethsemane",
          longitude: 35.239425,
          latitude: 31.779419,
          coordinateRole: "point",
          precision: "The source records an approximately 250-metre radius; the point should not be read as the exact location of every event in the garden.",
          score: 500,
          type: "garden",
          labelOffset: { x: 18, y: 22 },
          summary: "Gethsemane is named in the Gospel accounts of Jesus' prayer and arrest before His crucifixion.",
          references: [
            { book: "Matthew", chapter: 26, verse: 36 },
            { book: "Mark", chapter: 14, verse: 32 }
          ]
        },
        {
          id: "bethany",
          name: "Bethany",
          ancientId: "a4f35bc",
          modernId: "m227592",
          resolutionName: "Al Eizariya",
          longitude: 35.255903,
          latitude: 31.771661,
          coordinateRole: "point",
          precision: "Point in the modern settlement; the source describes an approximately 250-metre settlement radius.",
          score: 753,
          type: "settlement",
          labelOffset: { x: 16, y: 35 },
          summary: "Bethany is associated with Mary, Martha and Lazarus and with scenes shortly before Jesus' final entry into Jerusalem.",
          references: [
            { book: "John", chapter: 11, verse: 1 },
            { book: "John", chapter: 12, verse: 1 },
            { book: "Luke", chapter: 19, verse: 29 }
          ]
        },
        {
          id: "jericho-ot",
          name: "Jericho (Old Testament)",
          ancientId: "a231f80",
          modernId: "m95349d",
          resolutionName: "Tell es-Sultan",
          longitude: 35.444564,
          latitude: 31.871719,
          coordinateRole: "point",
          precision: "Point on the archaeological tell; the source describes a 50-metre precision radius.",
          score: 500,
          type: "settlement",
          labelOffset: { x: -88, y: -13 },
          summary: "The Old Testament place record is associated with the conquest narratives and the city whose walls fall in Joshua 6.",
          references: [
            { book: "Joshua", chapter: 6, verse: 1 },
            { book: "Joshua", chapter: 6, verse: 20 },
            { book: "Joshua", chapter: 6, verse: 26 }
          ]
        },
        {
          id: "jericho-nt",
          name: "Jericho (Gospel-era)",
          ancientId: "aaf03fa",
          modernId: "mdf4652",
          resolutionName: "Tell el-Alayiq",
          longitude: 35.436238,
          latitude: 31.851872,
          coordinateRole: "point",
          precision: "Point in visible remains; the source describes a five-metre precision radius.",
          score: 500,
          type: "settlement",
          labelOffset: { x: -100, y: 26 },
          summary: "The New Testament place record is linked with Jesus' approach to Jericho, the healing of a blind man and the account of Zacchaeus.",
          references: [
            { book: "Matthew", chapter: 20, verse: 29 },
            { book: "Mark", chapter: 10, verse: 46 },
            { book: "Luke", chapter: 18, verse: 35 },
            { book: "Luke", chapter: 19, verse: 1 }
          ]
        }
      ],
      journeys: [
        {
          id: "bethany-olives-jerusalem-luke-19",
          title: "Bethany, the Mount of Olives and Jerusalem — Luke 19",
          description: "Luke places Jesus' approach to Jerusalem near Bethany and the Mount called Olivet, then records His tears over the city. These are linked Gospel scenes, not a measured road or travel-time reconstruction.",
          stops: [
            { placeId: "bethany", reference: { book: "Luke", chapter: 19, verse: 29 }, caption: "Jesus approaches from the area of Bethany." },
            { placeId: "mount-of-olives", reference: { book: "Luke", chapter: 19, verse: 29 }, caption: "The narrative names the Mount called Olivet." },
            { placeId: "jerusalem", reference: { book: "Luke", chapter: 19, verse: 41 }, caption: "Jesus sees the city and weeps over Jerusalem." }
          ]
        },
        {
          id: "jericho-to-jerusalem-luke-19",
          title: "From Jericho toward Jerusalem — Luke 19",
          description: "Luke records Jesus entering Jericho and later going ahead on the way up to Jerusalem. This sequence connects the Gospel passages without claiming an exact historical road.",
          stops: [
            { placeId: "jericho-nt", reference: { book: "Luke", chapter: 19, verse: 1 }, caption: "Jesus enters and passes through Jericho." },
            { placeId: "jerusalem", reference: { book: "Luke", chapter: 19, verse: 28 }, caption: "Jesus goes ahead, going up to Jerusalem." }
          ]
        }
      ]
    }]
  });
})();
})();
