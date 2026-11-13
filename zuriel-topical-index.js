/* Zuriel Topical Study Index. Summaries are original study aids, not Bible quotations. Read each linked passage in context. */
(function(){
"use strict";
const topics=[
  {
    "title": "God's Character",
    "summary": "God's holiness, goodness, faithfulness and mercy.",
    "keywords": [
      "faithfulness",
      "mercy",
      "holiness"
    ],
    "references": [
      {
        "label": "Exodus 34:6-7",
        "book": "Exodus",
        "chapter": 34,
        "verse": 6,
        "endVerse": 7
      },
      {
        "label": "Psalm 103:8-14",
        "book": "Psalm",
        "chapter": 103,
        "verse": 8,
        "endVerse": 14
      },
      {
        "label": "Psalm 145:8-9",
        "book": "Psalm",
        "chapter": 145,
        "verse": 8,
        "endVerse": 9
      },
      {
        "label": "John 4:24",
        "book": "John",
        "chapter": 4,
        "verse": 24,
        "endVerse": null
      },
      {
        "label": "1 John 4:8",
        "book": "1 John",
        "chapter": 4,
        "verse": 8,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Creation and the Creator",
    "summary": "God made and sustains all things.",
    "keywords": [
      "creation",
      "creator"
    ],
    "references": [
      {
        "label": "Genesis 1:1",
        "book": "Genesis",
        "chapter": 1,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "Genesis 1:26-27",
        "book": "Genesis",
        "chapter": 1,
        "verse": 26,
        "endVerse": 27
      },
      {
        "label": "Psalm 19:1",
        "book": "Psalm",
        "chapter": 19,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "John 1:3",
        "book": "John",
        "chapter": 1,
        "verse": 3,
        "endVerse": null
      },
      {
        "label": "Colossians 1:16-17",
        "book": "Colossians",
        "chapter": 1,
        "verse": 16,
        "endVerse": 17
      }
    ]
  },
  {
    "title": "The Word of God",
    "summary": "Scripture as God's revelation, truth and guide.",
    "keywords": [
      "word",
      "scripture",
      "truth"
    ],
    "references": [
      {
        "label": "Psalm 119:105",
        "book": "Psalm",
        "chapter": 119,
        "verse": 105,
        "endVerse": null
      },
      {
        "label": "Psalm 119:11",
        "book": "Psalm",
        "chapter": 119,
        "verse": 11,
        "endVerse": null
      },
      {
        "label": "2 Timothy 3:16-17",
        "book": "2 Timothy",
        "chapter": 3,
        "verse": 16,
        "endVerse": 17
      },
      {
        "label": "Hebrews 4:12",
        "book": "Hebrews",
        "chapter": 4,
        "verse": 12,
        "endVerse": null
      },
      {
        "label": "John 17:17",
        "book": "John",
        "chapter": 17,
        "verse": 17,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Faith and Trust",
    "summary": "Depending on God's character and promises in obedient trust.",
    "keywords": [
      "faith",
      "trust"
    ],
    "references": [
      {
        "label": "Proverbs 3:5-6",
        "book": "Proverbs",
        "chapter": 3,
        "verse": 5,
        "endVerse": 6
      },
      {
        "label": "Hebrews 11:1",
        "book": "Hebrews",
        "chapter": 11,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "Hebrews 11:6",
        "book": "Hebrews",
        "chapter": 11,
        "verse": 6,
        "endVerse": null
      },
      {
        "label": "Romans 10:17",
        "book": "Romans",
        "chapter": 10,
        "verse": 17,
        "endVerse": null
      },
      {
        "label": "Mark 9:24",
        "book": "Mark",
        "chapter": 9,
        "verse": 24,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Grace and Salvation",
    "summary": "God's gracious salvation through Jesus Christ, received by faith.",
    "keywords": [
      "grace",
      "salvation"
    ],
    "references": [
      {
        "label": "John 3:16",
        "book": "John",
        "chapter": 3,
        "verse": 16,
        "endVerse": null
      },
      {
        "label": "Ephesians 2:8-10",
        "book": "Ephesians",
        "chapter": 2,
        "verse": 8,
        "endVerse": 10
      },
      {
        "label": "Romans 5:1-2",
        "book": "Romans",
        "chapter": 5,
        "verse": 1,
        "endVerse": 2
      },
      {
        "label": "Titus 3:4-7",
        "book": "Titus",
        "chapter": 3,
        "verse": 4,
        "endVerse": 7
      },
      {
        "label": "Romans 10:9-10",
        "book": "Romans",
        "chapter": 10,
        "verse": 9,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Life in Christ",
    "summary": "New identity and life through union with Jesus.",
    "keywords": [
      "life",
      "christ",
      "new"
    ],
    "references": [
      {
        "label": "2 Corinthians 5:17",
        "book": "2 Corinthians",
        "chapter": 5,
        "verse": 17,
        "endVerse": null
      },
      {
        "label": "Galatians 2:20",
        "book": "Galatians",
        "chapter": 2,
        "verse": 20,
        "endVerse": null
      },
      {
        "label": "Romans 6:4",
        "book": "Romans",
        "chapter": 6,
        "verse": 4,
        "endVerse": null
      },
      {
        "label": "Colossians 3:1-4",
        "book": "Colossians",
        "chapter": 3,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "John 15:4-5",
        "book": "John",
        "chapter": 15,
        "verse": 4,
        "endVerse": 5
      }
    ]
  },
  {
    "title": "The Holy Spirit",
    "summary": "The Spirit's presence, guidance and work in believers.",
    "keywords": [
      "spirit",
      "holy"
    ],
    "references": [
      {
        "label": "John 14:16-17",
        "book": "John",
        "chapter": 14,
        "verse": 16,
        "endVerse": 17
      },
      {
        "label": "John 16:13",
        "book": "John",
        "chapter": 16,
        "verse": 13,
        "endVerse": null
      },
      {
        "label": "Acts 1:8",
        "book": "Acts",
        "chapter": 1,
        "verse": 8,
        "endVerse": null
      },
      {
        "label": "Romans 8:14-16",
        "book": "Romans",
        "chapter": 8,
        "verse": 14,
        "endVerse": 16
      },
      {
        "label": "Galatians 5:22-23",
        "book": "Galatians",
        "chapter": 5,
        "verse": 22,
        "endVerse": 23
      }
    ]
  },
  {
    "title": "Prayer and Communion",
    "summary": "Coming to God with worship, requests and thanksgiving.",
    "keywords": [
      "prayer",
      "ask"
    ],
    "references": [
      {
        "label": "Matthew 6:9-13",
        "book": "Matthew",
        "chapter": 6,
        "verse": 9,
        "endVerse": 13
      },
      {
        "label": "Philippians 4:6-7",
        "book": "Philippians",
        "chapter": 4,
        "verse": 6,
        "endVerse": 7
      },
      {
        "label": "1 Thessalonians 5:17-18",
        "book": "1 Thessalonians",
        "chapter": 5,
        "verse": 17,
        "endVerse": 18
      },
      {
        "label": "Hebrews 4:16",
        "book": "Hebrews",
        "chapter": 4,
        "verse": 16,
        "endVerse": null
      },
      {
        "label": "1 John 5:14",
        "book": "1 John",
        "chapter": 5,
        "verse": 14,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Wisdom and Guidance",
    "summary": "Seeking God's wisdom and walking in His instruction.",
    "keywords": [
      "wisdom",
      "guide"
    ],
    "references": [
      {
        "label": "James 1:5",
        "book": "James",
        "chapter": 1,
        "verse": 5,
        "endVerse": null
      },
      {
        "label": "Proverbs 3:5-6",
        "book": "Proverbs",
        "chapter": 3,
        "verse": 5,
        "endVerse": 6
      },
      {
        "label": "Psalm 32:8",
        "book": "Psalm",
        "chapter": 32,
        "verse": 8,
        "endVerse": null
      },
      {
        "label": "Psalm 119:105",
        "book": "Psalm",
        "chapter": 119,
        "verse": 105,
        "endVerse": null
      },
      {
        "label": "Colossians 1:9-10",
        "book": "Colossians",
        "chapter": 1,
        "verse": 9,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Peace and Anxiety",
    "summary": "God's peace and care amid trouble and uncertainty.",
    "keywords": [
      "peace",
      "anxiety",
      "fear"
    ],
    "references": [
      {
        "label": "Isaiah 26:3",
        "book": "Isaiah",
        "chapter": 26,
        "verse": 3,
        "endVerse": null
      },
      {
        "label": "John 14:27",
        "book": "John",
        "chapter": 14,
        "verse": 27,
        "endVerse": null
      },
      {
        "label": "Philippians 4:6-7",
        "book": "Philippians",
        "chapter": 4,
        "verse": 6,
        "endVerse": 7
      },
      {
        "label": "1 Peter 5:7",
        "book": "1 Peter",
        "chapter": 5,
        "verse": 7,
        "endVerse": null
      },
      {
        "label": "Psalm 46:1-2",
        "book": "Psalm",
        "chapter": 46,
        "verse": 1,
        "endVerse": 2
      }
    ]
  },
  {
    "title": "Courage and Strength",
    "summary": "Courage rooted in God's presence and strength.",
    "keywords": [
      "courage",
      "strength"
    ],
    "references": [
      {
        "label": "Joshua 1:9",
        "book": "Joshua",
        "chapter": 1,
        "verse": 9,
        "endVerse": null
      },
      {
        "label": "Isaiah 41:10",
        "book": "Isaiah",
        "chapter": 41,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "Psalm 27:1",
        "book": "Psalm",
        "chapter": 27,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "Ephesians 6:10",
        "book": "Ephesians",
        "chapter": 6,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "2 Timothy 1:7",
        "book": "2 Timothy",
        "chapter": 1,
        "verse": 7,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Love and Compassion",
    "summary": "God's love expressed through patience, mercy and service.",
    "keywords": [
      "love",
      "compassion"
    ],
    "references": [
      {
        "label": "1 Corinthians 13:4-7",
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 4,
        "endVerse": 7
      },
      {
        "label": "John 13:34-35",
        "book": "John",
        "chapter": 13,
        "verse": 34,
        "endVerse": 35
      },
      {
        "label": "Colossians 3:12-14",
        "book": "Colossians",
        "chapter": 3,
        "verse": 12,
        "endVerse": 14
      },
      {
        "label": "1 John 4:7-12",
        "book": "1 John",
        "chapter": 4,
        "verse": 7,
        "endVerse": 12
      },
      {
        "label": "Romans 12:9-10",
        "book": "Romans",
        "chapter": 12,
        "verse": 9,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Forgiveness and Reconciliation",
    "summary": "Receiving God's forgiveness and extending forgiveness.",
    "keywords": [
      "forgive",
      "forgiveness"
    ],
    "references": [
      {
        "label": "Matthew 6:14-15",
        "book": "Matthew",
        "chapter": 6,
        "verse": 14,
        "endVerse": 15
      },
      {
        "label": "Ephesians 4:31-32",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 31,
        "endVerse": 32
      },
      {
        "label": "Colossians 3:13",
        "book": "Colossians",
        "chapter": 3,
        "verse": 13,
        "endVerse": null
      },
      {
        "label": "1 John 1:9",
        "book": "1 John",
        "chapter": 1,
        "verse": 9,
        "endVerse": null
      },
      {
        "label": "Luke 17:3-4",
        "book": "Luke",
        "chapter": 17,
        "verse": 3,
        "endVerse": 4
      }
    ]
  },
  {
    "title": "Holiness and Consecration",
    "summary": "A life set apart for God, shaped by truth and grace.",
    "keywords": [
      "holy",
      "holiness"
    ],
    "references": [
      {
        "label": "Romans 12:1-2",
        "book": "Romans",
        "chapter": 12,
        "verse": 1,
        "endVerse": 2
      },
      {
        "label": "1 Peter 1:15-16",
        "book": "1 Peter",
        "chapter": 1,
        "verse": 15,
        "endVerse": 16
      },
      {
        "label": "2 Corinthians 7:1",
        "book": "2 Corinthians",
        "chapter": 7,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "Hebrews 12:14",
        "book": "Hebrews",
        "chapter": 12,
        "verse": 14,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Renewal of the Mind",
    "summary": "God's truth reshaping thought, discernment and choices.",
    "keywords": [
      "mind",
      "renew"
    ],
    "references": [
      {
        "label": "Romans 12:2",
        "book": "Romans",
        "chapter": 12,
        "verse": 2,
        "endVerse": null
      },
      {
        "label": "Ephesians 4:22-24",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 22,
        "endVerse": 24
      },
      {
        "label": "Philippians 4:8",
        "book": "Philippians",
        "chapter": 4,
        "verse": 8,
        "endVerse": null
      },
      {
        "label": "Colossians 3:1-2",
        "book": "Colossians",
        "chapter": 3,
        "verse": 1,
        "endVerse": 2
      },
      {
        "label": "2 Corinthians 10:5",
        "book": "2 Corinthians",
        "chapter": 10,
        "verse": 5,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Temptation and Self-Control",
    "summary": "Resisting temptation through God's faithfulness and obedience.",
    "keywords": [
      "temptation",
      "self-control"
    ],
    "references": [
      {
        "label": "1 Corinthians 10:13",
        "book": "1 Corinthians",
        "chapter": 10,
        "verse": 13,
        "endVerse": null
      },
      {
        "label": "Matthew 4:1-11",
        "book": "Matthew",
        "chapter": 4,
        "verse": 1,
        "endVerse": 11
      },
      {
        "label": "James 1:12-15",
        "book": "James",
        "chapter": 1,
        "verse": 12,
        "endVerse": 15
      },
      {
        "label": "Galatians 5:16-23",
        "book": "Galatians",
        "chapter": 5,
        "verse": 16,
        "endVerse": 23
      },
      {
        "label": "Ephesians 6:11-18",
        "book": "Ephesians",
        "chapter": 6,
        "verse": 11,
        "endVerse": 18
      }
    ]
  },
  {
    "title": "Spiritual Warfare",
    "summary": "Standing in God's strength and using His provision.",
    "keywords": [
      "warfare",
      "armour"
    ],
    "references": [
      {
        "label": "Ephesians 6:10-18",
        "book": "Ephesians",
        "chapter": 6,
        "verse": 10,
        "endVerse": 18
      },
      {
        "label": "2 Corinthians 10:3-5",
        "book": "2 Corinthians",
        "chapter": 10,
        "verse": 3,
        "endVerse": 5
      },
      {
        "label": "James 4:7-8",
        "book": "James",
        "chapter": 4,
        "verse": 7,
        "endVerse": 8
      },
      {
        "label": "1 Peter 5:8-9",
        "book": "1 Peter",
        "chapter": 5,
        "verse": 8,
        "endVerse": 9
      },
      {
        "label": "1 John 4:4",
        "book": "1 John",
        "chapter": 4,
        "verse": 4,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Hope and Endurance",
    "summary": "Persevering with hope because of God's promises.",
    "keywords": [
      "hope",
      "endure"
    ],
    "references": [
      {
        "label": "Romans 5:3-5",
        "book": "Romans",
        "chapter": 5,
        "verse": 3,
        "endVerse": 5
      },
      {
        "label": "Romans 15:13",
        "book": "Romans",
        "chapter": 15,
        "verse": 13,
        "endVerse": null
      },
      {
        "label": "Hebrews 10:23",
        "book": "Hebrews",
        "chapter": 10,
        "verse": 23,
        "endVerse": null
      },
      {
        "label": "James 1:2-4",
        "book": "James",
        "chapter": 1,
        "verse": 2,
        "endVerse": 4
      },
      {
        "label": "1 Peter 1:3-5",
        "book": "1 Peter",
        "chapter": 1,
        "verse": 3,
        "endVerse": 5
      }
    ]
  },
  {
    "title": "Suffering and Comfort",
    "summary": "God's presence, comfort and sustaining grace in hardship.",
    "keywords": [
      "suffering",
      "comfort"
    ],
    "references": [
      {
        "label": "Psalm 34:18",
        "book": "Psalm",
        "chapter": 34,
        "verse": 18,
        "endVerse": null
      },
      {
        "label": "2 Corinthians 1:3-5",
        "book": "2 Corinthians",
        "chapter": 1,
        "verse": 3,
        "endVerse": 5
      },
      {
        "label": "Romans 8:18",
        "book": "Romans",
        "chapter": 8,
        "verse": 18,
        "endVerse": null
      },
      {
        "label": "1 Peter 5:10",
        "book": "1 Peter",
        "chapter": 5,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "John 16:33",
        "book": "John",
        "chapter": 16,
        "verse": 33,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Thanksgiving and Worship",
    "summary": "Responding to God with gratitude, praise and whole-life worship.",
    "keywords": [
      "thanks",
      "worship",
      "praise"
    ],
    "references": [
      {
        "label": "Psalm 100:1-5",
        "book": "Psalm",
        "chapter": 100,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Psalm 103:1-5",
        "book": "Psalm",
        "chapter": 103,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Romans 12:1",
        "book": "Romans",
        "chapter": 12,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "Colossians 3:16-17",
        "book": "Colossians",
        "chapter": 3,
        "verse": 16,
        "endVerse": 17
      },
      {
        "label": "1 Thessalonians 5:16-18",
        "book": "1 Thessalonians",
        "chapter": 5,
        "verse": 16,
        "endVerse": 18
      }
    ]
  },
  {
    "title": "Kingdom of God",
    "summary": "Jesus' teaching about God's reign and its values.",
    "keywords": [
      "kingdom",
      "reign"
    ],
    "references": [
      {
        "label": "Matthew 6:33",
        "book": "Matthew",
        "chapter": 6,
        "verse": 33,
        "endVerse": null
      },
      {
        "label": "Mark 1:14-15",
        "book": "Mark",
        "chapter": 1,
        "verse": 14,
        "endVerse": 15
      },
      {
        "label": "Luke 17:20-21",
        "book": "Luke",
        "chapter": 17,
        "verse": 20,
        "endVerse": 21
      },
      {
        "label": "Matthew 13:31-33",
        "book": "Matthew",
        "chapter": 13,
        "verse": 31,
        "endVerse": 33
      },
      {
        "label": "Romans 14:17",
        "book": "Romans",
        "chapter": 14,
        "verse": 17,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Discipleship and Obedience",
    "summary": "Following Jesus through trust, learning and faithful service.",
    "keywords": [
      "disciple",
      "follow",
      "obey"
    ],
    "references": [
      {
        "label": "Matthew 16:24-26",
        "book": "Matthew",
        "chapter": 16,
        "verse": 24,
        "endVerse": 26
      },
      {
        "label": "John 8:31-32",
        "book": "John",
        "chapter": 8,
        "verse": 31,
        "endVerse": 32
      },
      {
        "label": "John 14:15",
        "book": "John",
        "chapter": 14,
        "verse": 15,
        "endVerse": null
      },
      {
        "label": "Luke 9:23",
        "book": "Luke",
        "chapter": 9,
        "verse": 23,
        "endVerse": null
      },
      {
        "label": "James 1:22",
        "book": "James",
        "chapter": 1,
        "verse": 22,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Family and Relationships",
    "summary": "Biblical love, honour, patience and responsibility in relationships.",
    "keywords": [
      "family",
      "marriage",
      "children"
    ],
    "references": [
      {
        "label": "Ephesians 5:21",
        "book": "Ephesians",
        "chapter": 5,
        "verse": 21,
        "endVerse": null
      },
      {
        "label": "Ephesians 6:1-4",
        "book": "Ephesians",
        "chapter": 6,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "Colossians 3:18-21",
        "book": "Colossians",
        "chapter": 3,
        "verse": 18,
        "endVerse": 21
      },
      {
        "label": "Joshua 24:15",
        "book": "Joshua",
        "chapter": 24,
        "verse": 15,
        "endVerse": null
      },
      {
        "label": "1 Peter 3:8-9",
        "book": "1 Peter",
        "chapter": 3,
        "verse": 8,
        "endVerse": 9
      }
    ]
  },
  {
    "title": "Work and Stewardship",
    "summary": "Serving faithfully and working with integrity before God.",
    "keywords": [
      "work",
      "serve"
    ],
    "references": [
      {
        "label": "Colossians 3:23-24",
        "book": "Colossians",
        "chapter": 3,
        "verse": 23,
        "endVerse": 24
      },
      {
        "label": "Proverbs 16:3",
        "book": "Proverbs",
        "chapter": 16,
        "verse": 3,
        "endVerse": null
      },
      {
        "label": "1 Peter 4:10",
        "book": "1 Peter",
        "chapter": 4,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "Luke 16:10",
        "book": "Luke",
        "chapter": 16,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "2 Thessalonians 3:10-12",
        "book": "2 Thessalonians",
        "chapter": 3,
        "verse": 10,
        "endVerse": 12
      }
    ]
  },
  {
    "title": "Justice and Mercy",
    "summary": "God's concern for justice, mercy and care for the vulnerable.",
    "keywords": [
      "justice",
      "mercy"
    ],
    "references": [
      {
        "label": "Micah 6:8",
        "book": "Micah",
        "chapter": 6,
        "verse": 8,
        "endVerse": null
      },
      {
        "label": "Isaiah 1:17",
        "book": "Isaiah",
        "chapter": 1,
        "verse": 17,
        "endVerse": null
      },
      {
        "label": "Proverbs 31:8-9",
        "book": "Proverbs",
        "chapter": 31,
        "verse": 8,
        "endVerse": 9
      },
      {
        "label": "Matthew 23:23",
        "book": "Matthew",
        "chapter": 23,
        "verse": 23,
        "endVerse": null
      },
      {
        "label": "James 1:27",
        "book": "James",
        "chapter": 1,
        "verse": 27,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Return of Christ",
    "summary": "The Christian hope of Christ's return and final restoration.",
    "keywords": [
      "return",
      "resurrection"
    ],
    "references": [
      {
        "label": "John 14:1-3",
        "book": "John",
        "chapter": 14,
        "verse": 1,
        "endVerse": 3
      },
      {
        "label": "Acts 1:11",
        "book": "Acts",
        "chapter": 1,
        "verse": 11,
        "endVerse": null
      },
      {
        "label": "1 Thessalonians 4:13-18",
        "book": "1 Thessalonians",
        "chapter": 4,
        "verse": 13,
        "endVerse": 18
      },
      {
        "label": "Titus 2:11-13",
        "book": "Titus",
        "chapter": 2,
        "verse": 11,
        "endVerse": 13
      },
      {
        "label": "Revelation 21:1-5",
        "book": "Revelation",
        "chapter": 21,
        "verse": 1,
        "endVerse": 5
      }
    ]
  },
  {
    "title": "Resurrection and Eternal Life",
    "summary": "God's victory over death and promised life through Jesus.",
    "keywords": [
      "resurrection",
      "eternal"
    ],
    "references": [
      {
        "label": "John 11:25-26",
        "book": "John",
        "chapter": 11,
        "verse": 25,
        "endVerse": 26
      },
      {
        "label": "John 5:24-29",
        "book": "John",
        "chapter": 5,
        "verse": 24,
        "endVerse": 29
      },
      {
        "label": "1 Corinthians 15:20-22",
        "book": "1 Corinthians",
        "chapter": 15,
        "verse": 20,
        "endVerse": 22
      },
      {
        "label": "1 Corinthians 15:51-57",
        "book": "1 Corinthians",
        "chapter": 15,
        "verse": 51,
        "endVerse": 57
      },
      {
        "label": "1 John 5:11-13",
        "book": "1 John",
        "chapter": 5,
        "verse": 11,
        "endVerse": 13
      }
    ]
  },
  {
    "title": "Wisdom in Speech",
    "summary": "Using words truthfully, graciously and constructively.",
    "keywords": [
      "speech",
      "tongue"
    ],
    "references": [
      {
        "label": "Proverbs 15:1",
        "book": "Proverbs",
        "chapter": 15,
        "verse": 1,
        "endVerse": null
      },
      {
        "label": "Proverbs 18:21",
        "book": "Proverbs",
        "chapter": 18,
        "verse": 21,
        "endVerse": null
      },
      {
        "label": "Ephesians 4:29",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 29,
        "endVerse": null
      },
      {
        "label": "Colossians 4:6",
        "book": "Colossians",
        "chapter": 4,
        "verse": 6,
        "endVerse": null
      },
      {
        "label": "James 3:1-12",
        "book": "James",
        "chapter": 3,
        "verse": 1,
        "endVerse": 12
      }
    ]
  },
  {
    "title": "Humility and Servanthood",
    "summary": "The way of Jesus: humility, service and regard for others.",
    "keywords": [
      "humility",
      "servant"
    ],
    "references": [
      {
        "label": "Matthew 20:26-28",
        "book": "Matthew",
        "chapter": 20,
        "verse": 26,
        "endVerse": 28
      },
      {
        "label": "John 13:12-17",
        "book": "John",
        "chapter": 13,
        "verse": 12,
        "endVerse": 17
      },
      {
        "label": "Philippians 2:3-8",
        "book": "Philippians",
        "chapter": 2,
        "verse": 3,
        "endVerse": 8
      },
      {
        "label": "James 4:6-10",
        "book": "James",
        "chapter": 4,
        "verse": 6,
        "endVerse": 10
      },
      {
        "label": "1 Peter 5:5-6",
        "book": "1 Peter",
        "chapter": 5,
        "verse": 5,
        "endVerse": 6
      }
    ]
  },
  {
    "title": "God's Promises and Faithfulness",
    "summary": "Read promises in covenant and literary context; trust God's faithfulness.",
    "keywords": [
      "promise",
      "faithful"
    ],
    "references": [
      {
        "label": "Numbers 23:19",
        "book": "Numbers",
        "chapter": 23,
        "verse": 19,
        "endVerse": null
      },
      {
        "label": "Joshua 21:45",
        "book": "Joshua",
        "chapter": 21,
        "verse": 45,
        "endVerse": null
      },
      {
        "label": "2 Corinthians 1:20",
        "book": "2 Corinthians",
        "chapter": 1,
        "verse": 20,
        "endVerse": null
      },
      {
        "label": "Hebrews 10:23",
        "book": "Hebrews",
        "chapter": 10,
        "verse": 23,
        "endVerse": null
      },
      {
        "label": "2 Peter 1:3-4",
        "book": "2 Peter",
        "chapter": 1,
        "verse": 3,
        "endVerse": 4
      }
    ]
  },
  {
    "title": "Repentance and Transformation",
    "summary": "Turning to God with a changed mind and life, relying on His mercy.",
    "keywords": [
      "repent",
      "change"
    ],
    "references": [
      {
        "label": "Psalm 51:1-12",
        "book": "Psalm",
        "chapter": 51,
        "verse": 1,
        "endVerse": 12
      },
      {
        "label": "Proverbs 28:13",
        "book": "Proverbs",
        "chapter": 28,
        "verse": 13,
        "endVerse": null
      },
      {
        "label": "Mark 1:15",
        "book": "Mark",
        "chapter": 1,
        "verse": 15,
        "endVerse": null
      },
      {
        "label": "Acts 3:19",
        "book": "Acts",
        "chapter": 3,
        "verse": 19,
        "endVerse": null
      },
      {
        "label": "2 Corinthians 7:10",
        "book": "2 Corinthians",
        "chapter": 7,
        "verse": 10,
        "endVerse": null
      }
    ]
  }
];
function normalize(value){return String(value||"").toLowerCase().replace(/\s+/g," ").trim();}
function findForReference(reference){
 const match=String(reference||"").match(/^(.+?)\\s+(\\d+):(\\d+)$/);
 if(!match)return [];
 const book=normalize(match[1]), chapter=Number(match[2]), verse=Number(match[3]);
 return topics.filter(topic=>topic.references.some(item=>
  normalize(item.book)===book && item.chapter===chapter &&
  verse>=item.verse && verse<=(item.endVerse||item.verse)
 ));
}
window.ZurielTopicalIndex={
 list:function(){return topics.slice();},
 findForReference:findForReference,
 findByKeyword:function(word){
  const key=normalize(word); if(!key)return [];
  return topics.filter(topic=>topic.keywords.some(item=>item.includes(key)||key.includes(item)));
 }
};
})();