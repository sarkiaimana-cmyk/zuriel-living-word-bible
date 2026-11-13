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
  },
  {
    "title": "Covenant and God's Faithfulness",
    "summary": "God's covenant dealings reveal His faithfulness and call His people to trust.",
    "keywords": [
      "covenant",
      "faithfulness",
      "promise"
    ],
    "references": [
      {
        "label": "Genesis 12:1-3",
        "book": "Genesis",
        "chapter": 12,
        "verse": 1,
        "endVerse": 3
      },
      {
        "label": "Genesis 17:1-8",
        "book": "Genesis",
        "chapter": 17,
        "verse": 1,
        "endVerse": 8
      },
      {
        "label": "Exodus 19:4-6",
        "book": "Exodus",
        "chapter": 19,
        "verse": 4,
        "endVerse": 6
      },
      {
        "label": "Jeremiah 31:31-34",
        "book": "Jeremiah",
        "chapter": 31,
        "verse": 31,
        "endVerse": 34
      },
      {
        "label": "Hebrews 8:6-13",
        "book": "Hebrews",
        "chapter": 8,
        "verse": 6,
        "endVerse": 13
      }
    ]
  },
  {
    "title": "The Patriarchs",
    "summary": "The stories of Abraham, Isaac and Jacob show God's calling, promise and providence.",
    "keywords": [
      "abraham",
      "isaac",
      "jacob"
    ],
    "references": [
      {
        "label": "Genesis 12:1-9",
        "book": "Genesis",
        "chapter": 12,
        "verse": 1,
        "endVerse": 9
      },
      {
        "label": "Genesis 15:1-6",
        "book": "Genesis",
        "chapter": 15,
        "verse": 1,
        "endVerse": 6
      },
      {
        "label": "Genesis 22:1-18",
        "book": "Genesis",
        "chapter": 22,
        "verse": 1,
        "endVerse": 18
      },
      {
        "label": "Genesis 26:1-5",
        "book": "Genesis",
        "chapter": 26,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Genesis 32:24-30",
        "book": "Genesis",
        "chapter": 32,
        "verse": 24,
        "endVerse": 30
      }
    ]
  },
  {
    "title": "Moses and Deliverance",
    "summary": "The exodus displays God's hearing, deliverance and formation of His covenant people.",
    "keywords": [
      "moses",
      "exodus",
      "deliverance"
    ],
    "references": [
      {
        "label": "Exodus 3:1-12",
        "book": "Exodus",
        "chapter": 3,
        "verse": 1,
        "endVerse": 12
      },
      {
        "label": "Exodus 12:1-14",
        "book": "Exodus",
        "chapter": 12,
        "verse": 1,
        "endVerse": 14
      },
      {
        "label": "Exodus 14:13-31",
        "book": "Exodus",
        "chapter": 14,
        "verse": 13,
        "endVerse": 31
      },
      {
        "label": "Exodus 15:1-18",
        "book": "Exodus",
        "chapter": 15,
        "verse": 1,
        "endVerse": 18
      },
      {
        "label": "Deuteronomy 6:20-25",
        "book": "Deuteronomy",
        "chapter": 6,
        "verse": 20,
        "endVerse": 25
      }
    ]
  },
  {
    "title": "The Law and Its Purpose",
    "summary": "The law reveals God's holiness and shapes covenant life; the New Testament explains its fulfilment in Christ.",
    "keywords": [
      "law",
      "commandments",
      "torah"
    ],
    "references": [
      {
        "label": "Exodus 20:1-17",
        "book": "Exodus",
        "chapter": 20,
        "verse": 1,
        "endVerse": 17
      },
      {
        "label": "Leviticus 19:1-18",
        "book": "Leviticus",
        "chapter": 19,
        "verse": 1,
        "endVerse": 18
      },
      {
        "label": "Deuteronomy 6:4-9",
        "book": "Deuteronomy",
        "chapter": 6,
        "verse": 4,
        "endVerse": 9
      },
      {
        "label": "Matthew 5:17-20",
        "book": "Matthew",
        "chapter": 5,
        "verse": 17,
        "endVerse": 20
      },
      {
        "label": "Romans 7:7-12",
        "book": "Romans",
        "chapter": 7,
        "verse": 7,
        "endVerse": 12
      }
    ]
  },
  {
    "title": "The Tabernacle and God's Presence",
    "summary": "The tabernacle portrays God's desire to dwell among His people and points toward Christ.",
    "keywords": [
      "tabernacle",
      "presence",
      "sanctuary"
    ],
    "references": [
      {
        "label": "Exodus 25:1-9",
        "book": "Exodus",
        "chapter": 25,
        "verse": 1,
        "endVerse": 9
      },
      {
        "label": "Exodus 40:34-38",
        "book": "Exodus",
        "chapter": 40,
        "verse": 34,
        "endVerse": 38
      },
      {
        "label": "Leviticus 16:1-19",
        "book": "Leviticus",
        "chapter": 16,
        "verse": 1,
        "endVerse": 19
      },
      {
        "label": "John 1:14",
        "book": "John",
        "chapter": 1,
        "verse": 14,
        "endVerse": null
      },
      {
        "label": "Hebrews 9:1-14",
        "book": "Hebrews",
        "chapter": 9,
        "verse": 1,
        "endVerse": 14
      }
    ]
  },
  {
    "title": "Priesthood and Intercession",
    "summary": "Priestly service and Christ's unique priesthood illuminate mediation and access to God.",
    "keywords": [
      "priest",
      "intercession",
      "mediator"
    ],
    "references": [
      {
        "label": "Exodus 28:1-4",
        "book": "Exodus",
        "chapter": 28,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "Leviticus 9:22-24",
        "book": "Leviticus",
        "chapter": 9,
        "verse": 22,
        "endVerse": 24
      },
      {
        "label": "Numbers 6:22-27",
        "book": "Numbers",
        "chapter": 6,
        "verse": 22,
        "endVerse": 27
      },
      {
        "label": "Hebrews 4:14-16",
        "book": "Hebrews",
        "chapter": 4,
        "verse": 14,
        "endVerse": 16
      },
      {
        "label": "Hebrews 7:23-28",
        "book": "Hebrews",
        "chapter": 7,
        "verse": 23,
        "endVerse": 28
      }
    ]
  },
  {
    "title": "Sacrifice and Atonement",
    "summary": "Sacrifice shows the seriousness of sin, God's provision and Christ's once-for-all offering.",
    "keywords": [
      "sacrifice",
      "atonement",
      "blood"
    ],
    "references": [
      {
        "label": "Leviticus 17:11",
        "book": "Leviticus",
        "chapter": 17,
        "verse": 11,
        "endVerse": null
      },
      {
        "label": "Isaiah 53:4-6",
        "book": "Isaiah",
        "chapter": 53,
        "verse": 4,
        "endVerse": 6
      },
      {
        "label": "Mark 10:45",
        "book": "Mark",
        "chapter": 10,
        "verse": 45,
        "endVerse": null
      },
      {
        "label": "Romans 3:23-26",
        "book": "Romans",
        "chapter": 3,
        "verse": 23,
        "endVerse": 26
      },
      {
        "label": "Hebrews 10:1-14",
        "book": "Hebrews",
        "chapter": 10,
        "verse": 1,
        "endVerse": 14
      }
    ]
  },
  {
    "title": "The Promised Land and Inheritance",
    "summary": "Israel's inheritance is tied to God's promise, faithfulness and obedient response.",
    "keywords": [
      "inheritance",
      "land",
      "promise"
    ],
    "references": [
      {
        "label": "Genesis 15:18-21",
        "book": "Genesis",
        "chapter": 15,
        "verse": 18,
        "endVerse": 21
      },
      {
        "label": "Numbers 14:6-9",
        "book": "Numbers",
        "chapter": 14,
        "verse": 6,
        "endVerse": 9
      },
      {
        "label": "Joshua 1:1-9",
        "book": "Joshua",
        "chapter": 1,
        "verse": 1,
        "endVerse": 9
      },
      {
        "label": "Joshua 21:43-45",
        "book": "Joshua",
        "chapter": 21,
        "verse": 43,
        "endVerse": 45
      },
      {
        "label": "Hebrews 4:1-11",
        "book": "Hebrews",
        "chapter": 4,
        "verse": 1,
        "endVerse": 11
      }
    ]
  },
  {
    "title": "Judges and Deliverance",
    "summary": "Judges warns about unfaithfulness while showing God's mercy in raising deliverers.",
    "keywords": [
      "judges",
      "deliverer"
    ],
    "references": [
      {
        "label": "Judges 2:10-19",
        "book": "Judges",
        "chapter": 2,
        "verse": 10,
        "endVerse": 19
      },
      {
        "label": "Judges 3:7-11",
        "book": "Judges",
        "chapter": 3,
        "verse": 7,
        "endVerse": 11
      },
      {
        "label": "Judges 6:11-16",
        "book": "Judges",
        "chapter": 6,
        "verse": 11,
        "endVerse": 16
      },
      {
        "label": "Judges 7:1-8",
        "book": "Judges",
        "chapter": 7,
        "verse": 1,
        "endVerse": 8
      },
      {
        "label": "Judges 21:25",
        "book": "Judges",
        "chapter": 21,
        "verse": 25,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Kingship and God's Kingdom",
    "summary": "Israel's monarchy and the promise to David prepare the hope for God's righteous King.",
    "keywords": [
      "king",
      "kingship",
      "david"
    ],
    "references": [
      {
        "label": "1 Samuel 8:4-9",
        "book": "1 Samuel",
        "chapter": 8,
        "verse": 4,
        "endVerse": 9
      },
      {
        "label": "2 Samuel 7:8-16",
        "book": "2 Samuel",
        "chapter": 7,
        "verse": 8,
        "endVerse": 16
      },
      {
        "label": "Psalm 2:1-12",
        "book": "Psalm",
        "chapter": 2,
        "verse": 1,
        "endVerse": 12
      },
      {
        "label": "Isaiah 9:6-7",
        "book": "Isaiah",
        "chapter": 9,
        "verse": 6,
        "endVerse": 7
      },
      {
        "label": "Luke 1:30-33",
        "book": "Luke",
        "chapter": 1,
        "verse": 30,
        "endVerse": 33
      }
    ]
  },
  {
    "title": "David: Worship and Repentance",
    "summary": "David's story includes courageous faith, worship, failure, repentance and covenant promise.",
    "keywords": [
      "david",
      "repentance",
      "worship"
    ],
    "references": [
      {
        "label": "1 Samuel 17:32-50",
        "book": "1 Samuel",
        "chapter": 17,
        "verse": 32,
        "endVerse": 50
      },
      {
        "label": "2 Samuel 7:18-29",
        "book": "2 Samuel",
        "chapter": 7,
        "verse": 18,
        "endVerse": 29
      },
      {
        "label": "2 Samuel 12:1-13",
        "book": "2 Samuel",
        "chapter": 12,
        "verse": 1,
        "endVerse": 13
      },
      {
        "label": "Psalm 51:1-17",
        "book": "Psalm",
        "chapter": 51,
        "verse": 1,
        "endVerse": 17
      },
      {
        "label": "Psalm 78:70-72",
        "book": "Psalm",
        "chapter": 78,
        "verse": 70,
        "endVerse": 72
      }
    ]
  },
  {
    "title": "The Wisdom Literature",
    "summary": "Job, Proverbs and Ecclesiastes explore wise living, suffering and reverence for God.",
    "keywords": [
      "wisdom",
      "job",
      "proverbs"
    ],
    "references": [
      {
        "label": "Job 1:20-22",
        "book": "Job",
        "chapter": 1,
        "verse": 20,
        "endVerse": 22
      },
      {
        "label": "Job 38:1-7",
        "book": "Job",
        "chapter": 38,
        "verse": 1,
        "endVerse": 7
      },
      {
        "label": "Proverbs 1:1-7",
        "book": "Proverbs",
        "chapter": 1,
        "verse": 1,
        "endVerse": 7
      },
      {
        "label": "Ecclesiastes 12:9-14",
        "book": "Ecclesiastes",
        "chapter": 12,
        "verse": 9,
        "endVerse": 14
      },
      {
        "label": "James 3:13-18",
        "book": "James",
        "chapter": 3,
        "verse": 13,
        "endVerse": 18
      }
    ]
  },
  {
    "title": "The Fear of the Lord",
    "summary": "Reverent awe before God is the beginning of wisdom and shapes worship and obedience.",
    "keywords": [
      "fear of the lord",
      "reverence",
      "awe"
    ],
    "references": [
      {
        "label": "Proverbs 1:7",
        "book": "Proverbs",
        "chapter": 1,
        "verse": 7,
        "endVerse": null
      },
      {
        "label": "Proverbs 9:10",
        "book": "Proverbs",
        "chapter": 9,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "Psalm 111:10",
        "book": "Psalm",
        "chapter": 111,
        "verse": 10,
        "endVerse": null
      },
      {
        "label": "Ecclesiastes 12:13-14",
        "book": "Ecclesiastes",
        "chapter": 12,
        "verse": 13,
        "endVerse": 14
      },
      {
        "label": "Acts 9:31",
        "book": "Acts",
        "chapter": 9,
        "verse": 31,
        "endVerse": null
      }
    ]
  },
  {
    "title": "The Psalms: Honest Prayer",
    "summary": "The Psalms give language for praise, lament, confession and trust in every season.",
    "keywords": [
      "psalms",
      "lament",
      "prayer"
    ],
    "references": [
      {
        "label": "Psalm 13:1-6",
        "book": "Psalm",
        "chapter": 13,
        "verse": 1,
        "endVerse": 6
      },
      {
        "label": "Psalm 42:1-11",
        "book": "Psalm",
        "chapter": 42,
        "verse": 1,
        "endVerse": 11
      },
      {
        "label": "Psalm 51:1-17",
        "book": "Psalm",
        "chapter": 51,
        "verse": 1,
        "endVerse": 17
      },
      {
        "label": "Psalm 103:1-22",
        "book": "Psalm",
        "chapter": 103,
        "verse": 1,
        "endVerse": 22
      },
      {
        "label": "Psalm 150:1-6",
        "book": "Psalm",
        "chapter": 150,
        "verse": 1,
        "endVerse": 6
      }
    ]
  },
  {
    "title": "Prophets and God's Call to Justice",
    "summary": "The prophets call God's people to covenant faithfulness, justice, mercy and hope.",
    "keywords": [
      "prophets",
      "justice",
      "repentance"
    ],
    "references": [
      {
        "label": "Isaiah 1:10-20",
        "book": "Isaiah",
        "chapter": 1,
        "verse": 10,
        "endVerse": 20
      },
      {
        "label": "Jeremiah 7:1-11",
        "book": "Jeremiah",
        "chapter": 7,
        "verse": 1,
        "endVerse": 11
      },
      {
        "label": "Amos 5:21-24",
        "book": "Amos",
        "chapter": 5,
        "verse": 21,
        "endVerse": 24
      },
      {
        "label": "Micah 6:6-8",
        "book": "Micah",
        "chapter": 6,
        "verse": 6,
        "endVerse": 8
      },
      {
        "label": "Zechariah 7:8-10",
        "book": "Zechariah",
        "chapter": 7,
        "verse": 8,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Exile, Discipline and Restoration",
    "summary": "Exile reveals covenant consequences while restoration displays God's mercy and hope.",
    "keywords": [
      "exile",
      "restoration"
    ],
    "references": [
      {
        "label": "2 Kings 17:7-23",
        "book": "2 Kings",
        "chapter": 17,
        "verse": 7,
        "endVerse": 23
      },
      {
        "label": "2 Chronicles 36:15-23",
        "book": "2 Chronicles",
        "chapter": 36,
        "verse": 15,
        "endVerse": 23
      },
      {
        "label": "Jeremiah 29:4-14",
        "book": "Jeremiah",
        "chapter": 29,
        "verse": 4,
        "endVerse": 14
      },
      {
        "label": "Ezekiel 36:22-28",
        "book": "Ezekiel",
        "chapter": 36,
        "verse": 22,
        "endVerse": 28
      },
      {
        "label": "Ezra 1:1-5",
        "book": "Ezra",
        "chapter": 1,
        "verse": 1,
        "endVerse": 5
      }
    ]
  },
  {
    "title": "The New Covenant",
    "summary": "The prophets promise inward renewal and forgiveness, fulfilled through Christ.",
    "keywords": [
      "new covenant",
      "renewal"
    ],
    "references": [
      {
        "label": "Jeremiah 31:31-34",
        "book": "Jeremiah",
        "chapter": 31,
        "verse": 31,
        "endVerse": 34
      },
      {
        "label": "Ezekiel 36:25-27",
        "book": "Ezekiel",
        "chapter": 36,
        "verse": 25,
        "endVerse": 27
      },
      {
        "label": "Luke 22:19-20",
        "book": "Luke",
        "chapter": 22,
        "verse": 19,
        "endVerse": 20
      },
      {
        "label": "2 Corinthians 3:4-6",
        "book": "2 Corinthians",
        "chapter": 3,
        "verse": 4,
        "endVerse": 6
      },
      {
        "label": "Hebrews 8:6-13",
        "book": "Hebrews",
        "chapter": 8,
        "verse": 6,
        "endVerse": 13
      }
    ]
  },
  {
    "title": "The Birth and Incarnation of Jesus",
    "summary": "The Gospels present Jesus as promised Messiah, Son of God and Word made flesh.",
    "keywords": [
      "birth of jesus",
      "incarnation",
      "messiah"
    ],
    "references": [
      {
        "label": "Isaiah 7:14",
        "book": "Isaiah",
        "chapter": 7,
        "verse": 14,
        "endVerse": null
      },
      {
        "label": "Isaiah 9:6-7",
        "book": "Isaiah",
        "chapter": 9,
        "verse": 6,
        "endVerse": 7
      },
      {
        "label": "Matthew 1:18-25",
        "book": "Matthew",
        "chapter": 1,
        "verse": 18,
        "endVerse": 25
      },
      {
        "label": "Luke 2:1-20",
        "book": "Luke",
        "chapter": 2,
        "verse": 1,
        "endVerse": 20
      },
      {
        "label": "John 1:1-18",
        "book": "John",
        "chapter": 1,
        "verse": 1,
        "endVerse": 18
      }
    ]
  },
  {
    "title": "The Identity of Jesus Christ",
    "summary": "Jesus is Messiah, Son of God, Lord and the revelation of the Father.",
    "keywords": [
      "jesus",
      "son of god",
      "christology"
    ],
    "references": [
      {
        "label": "Matthew 16:13-17",
        "book": "Matthew",
        "chapter": 16,
        "verse": 13,
        "endVerse": 17
      },
      {
        "label": "John 1:1-18",
        "book": "John",
        "chapter": 1,
        "verse": 1,
        "endVerse": 18
      },
      {
        "label": "John 10:30-38",
        "book": "John",
        "chapter": 10,
        "verse": 30,
        "endVerse": 38
      },
      {
        "label": "Colossians 1:15-20",
        "book": "Colossians",
        "chapter": 1,
        "verse": 15,
        "endVerse": 20
      },
      {
        "label": "Hebrews 1:1-4",
        "book": "Hebrews",
        "chapter": 1,
        "verse": 1,
        "endVerse": 4
      }
    ]
  },
  {
    "title": "The Teachings of Jesus",
    "summary": "Jesus' teaching reveals kingdom values and calls hearers to obedient response.",
    "keywords": [
      "teachings of jesus",
      "sermon",
      "discipleship"
    ],
    "references": [
      {
        "label": "Matthew 5:1-12",
        "book": "Matthew",
        "chapter": 5,
        "verse": 1,
        "endVerse": 12
      },
      {
        "label": "Matthew 6:19-34",
        "book": "Matthew",
        "chapter": 6,
        "verse": 19,
        "endVerse": 34
      },
      {
        "label": "Matthew 7:24-27",
        "book": "Matthew",
        "chapter": 7,
        "verse": 24,
        "endVerse": 27
      },
      {
        "label": "Mark 8:34-38",
        "book": "Mark",
        "chapter": 8,
        "verse": 34,
        "endVerse": 38
      },
      {
        "label": "Luke 6:27-36",
        "book": "Luke",
        "chapter": 6,
        "verse": 27,
        "endVerse": 36
      }
    ]
  },
  {
    "title": "The Parables of Jesus",
    "summary": "Jesus' parables invite hearers to discern the kingdom and examine their response to God's word.",
    "keywords": [
      "parables",
      "kingdom"
    ],
    "references": [
      {
        "label": "Matthew 13:1-23",
        "book": "Matthew",
        "chapter": 13,
        "verse": 1,
        "endVerse": 23
      },
      {
        "label": "Matthew 13:24-30",
        "book": "Matthew",
        "chapter": 13,
        "verse": 24,
        "endVerse": 30
      },
      {
        "label": "Luke 10:25-37",
        "book": "Luke",
        "chapter": 10,
        "verse": 25,
        "endVerse": 37
      },
      {
        "label": "Luke 15:11-32",
        "book": "Luke",
        "chapter": 15,
        "verse": 11,
        "endVerse": 32
      },
      {
        "label": "Luke 18:9-14",
        "book": "Luke",
        "chapter": 18,
        "verse": 9,
        "endVerse": 14
      }
    ]
  },
  {
    "title": "The Miracles of Jesus",
    "summary": "Jesus' signs reveal compassion and authority and point to God's kingdom.",
    "keywords": [
      "miracles",
      "healing",
      "signs"
    ],
    "references": [
      {
        "label": "Mark 1:29-34",
        "book": "Mark",
        "chapter": 1,
        "verse": 29,
        "endVerse": 34
      },
      {
        "label": "Mark 4:35-41",
        "book": "Mark",
        "chapter": 4,
        "verse": 35,
        "endVerse": 41
      },
      {
        "label": "Mark 5:21-43",
        "book": "Mark",
        "chapter": 5,
        "verse": 21,
        "endVerse": 43
      },
      {
        "label": "John 6:1-15",
        "book": "John",
        "chapter": 6,
        "verse": 1,
        "endVerse": 15
      },
      {
        "label": "John 11:1-44",
        "book": "John",
        "chapter": 11,
        "verse": 1,
        "endVerse": 44
      }
    ]
  },
  {
    "title": "The Compassion of Jesus",
    "summary": "Jesus welcomes and serves people in need, revealing God's compassion.",
    "keywords": [
      "compassion",
      "mercy"
    ],
    "references": [
      {
        "label": "Matthew 9:35-38",
        "book": "Matthew",
        "chapter": 9,
        "verse": 35,
        "endVerse": 38
      },
      {
        "label": "Matthew 14:13-21",
        "book": "Matthew",
        "chapter": 14,
        "verse": 13,
        "endVerse": 21
      },
      {
        "label": "Mark 1:40-45",
        "book": "Mark",
        "chapter": 1,
        "verse": 40,
        "endVerse": 45
      },
      {
        "label": "Luke 7:11-17",
        "book": "Luke",
        "chapter": 7,
        "verse": 11,
        "endVerse": 17
      },
      {
        "label": "John 11:32-36",
        "book": "John",
        "chapter": 11,
        "verse": 32,
        "endVerse": 36
      }
    ]
  },
  {
    "title": "The Cross of Christ",
    "summary": "The crucifixion is central to redemption, reconciliation and sacrificial love.",
    "keywords": [
      "cross",
      "crucifixion",
      "redemption"
    ],
    "references": [
      {
        "label": "Isaiah 53:4-12",
        "book": "Isaiah",
        "chapter": 53,
        "verse": 4,
        "endVerse": 12
      },
      {
        "label": "Matthew 27:32-54",
        "book": "Matthew",
        "chapter": 27,
        "verse": 32,
        "endVerse": 54
      },
      {
        "label": "John 19:16-30",
        "book": "John",
        "chapter": 19,
        "verse": 16,
        "endVerse": 30
      },
      {
        "label": "Romans 5:6-11",
        "book": "Romans",
        "chapter": 5,
        "verse": 6,
        "endVerse": 11
      },
      {
        "label": "1 Peter 2:21-25",
        "book": "1 Peter",
        "chapter": 2,
        "verse": 21,
        "endVerse": 25
      }
    ]
  },
  {
    "title": "The Resurrection of Jesus",
    "summary": "The resurrection grounds Christian hope and confidence in Christ's victory.",
    "keywords": [
      "resurrection",
      "empty tomb"
    ],
    "references": [
      {
        "label": "Matthew 28:1-10",
        "book": "Matthew",
        "chapter": 28,
        "verse": 1,
        "endVerse": 10
      },
      {
        "label": "Luke 24:1-12",
        "book": "Luke",
        "chapter": 24,
        "verse": 1,
        "endVerse": 12
      },
      {
        "label": "John 20:1-18",
        "book": "John",
        "chapter": 20,
        "verse": 1,
        "endVerse": 18
      },
      {
        "label": "Acts 2:22-36",
        "book": "Acts",
        "chapter": 2,
        "verse": 22,
        "endVerse": 36
      },
      {
        "label": "1 Corinthians 15:12-28",
        "book": "1 Corinthians",
        "chapter": 15,
        "verse": 12,
        "endVerse": 28
      }
    ]
  },
  {
    "title": "Ascension and Exaltation of Christ",
    "summary": "The risen Jesus is exalted as Lord at the Father's right hand.",
    "keywords": [
      "ascension",
      "exaltation",
      "lordship"
    ],
    "references": [
      {
        "label": "Luke 24:50-53",
        "book": "Luke",
        "chapter": 24,
        "verse": 50,
        "endVerse": 53
      },
      {
        "label": "Acts 1:6-11",
        "book": "Acts",
        "chapter": 1,
        "verse": 6,
        "endVerse": 11
      },
      {
        "label": "Acts 2:32-36",
        "book": "Acts",
        "chapter": 2,
        "verse": 32,
        "endVerse": 36
      },
      {
        "label": "Ephesians 1:19-23",
        "book": "Ephesians",
        "chapter": 1,
        "verse": 19,
        "endVerse": 23
      },
      {
        "label": "Philippians 2:9-11",
        "book": "Philippians",
        "chapter": 2,
        "verse": 9,
        "endVerse": 11
      }
    ]
  },
  {
    "title": "The Great Commission and Mission",
    "summary": "Jesus sends His followers to make disciples and bear witness in the Spirit's power.",
    "keywords": [
      "mission",
      "evangelism"
    ],
    "references": [
      {
        "label": "Matthew 28:16-20",
        "book": "Matthew",
        "chapter": 28,
        "verse": 16,
        "endVerse": 20
      },
      {
        "label": "Luke 24:44-49",
        "book": "Luke",
        "chapter": 24,
        "verse": 44,
        "endVerse": 49
      },
      {
        "label": "John 20:21-22",
        "book": "John",
        "chapter": 20,
        "verse": 21,
        "endVerse": 22
      },
      {
        "label": "Acts 1:8",
        "book": "Acts",
        "chapter": 1,
        "verse": 8,
        "endVerse": null
      },
      {
        "label": "2 Corinthians 5:18-20",
        "book": "2 Corinthians",
        "chapter": 5,
        "verse": 18,
        "endVerse": 20
      }
    ]
  },
  {
    "title": "The Early Church and Fellowship",
    "summary": "Acts shows a Spirit-formed community devoted to teaching, fellowship, prayer and care.",
    "keywords": [
      "church",
      "fellowship",
      "community"
    ],
    "references": [
      {
        "label": "Acts 2:37-47",
        "book": "Acts",
        "chapter": 2,
        "verse": 37,
        "endVerse": 47
      },
      {
        "label": "Acts 4:32-35",
        "book": "Acts",
        "chapter": 4,
        "verse": 32,
        "endVerse": 35
      },
      {
        "label": "Acts 6:1-7",
        "book": "Acts",
        "chapter": 6,
        "verse": 1,
        "endVerse": 7
      },
      {
        "label": "Acts 11:19-26",
        "book": "Acts",
        "chapter": 11,
        "verse": 19,
        "endVerse": 26
      },
      {
        "label": "Acts 20:17-35",
        "book": "Acts",
        "chapter": 20,
        "verse": 17,
        "endVerse": 35
      }
    ]
  },
  {
    "title": "Spiritual Gifts and Service",
    "summary": "The Spirit gives gifts for the common good and building up Christ's body.",
    "keywords": [
      "spiritual gifts",
      "service"
    ],
    "references": [
      {
        "label": "Romans 12:3-8",
        "book": "Romans",
        "chapter": 12,
        "verse": 3,
        "endVerse": 8
      },
      {
        "label": "1 Corinthians 12:4-27",
        "book": "1 Corinthians",
        "chapter": 12,
        "verse": 4,
        "endVerse": 27
      },
      {
        "label": "1 Corinthians 13:1-13",
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 1,
        "endVerse": 13
      },
      {
        "label": "1 Corinthians 14:1-12",
        "book": "1 Corinthians",
        "chapter": 14,
        "verse": 1,
        "endVerse": 12
      },
      {
        "label": "1 Peter 4:10-11",
        "book": "1 Peter",
        "chapter": 4,
        "verse": 10,
        "endVerse": 11
      }
    ]
  },
  {
    "title": "The Church as Christ's Body",
    "summary": "Believers are joined to Christ and one another, serving in unity and love.",
    "keywords": [
      "church",
      "body of christ",
      "unity"
    ],
    "references": [
      {
        "label": "Romans 12:4-5",
        "book": "Romans",
        "chapter": 12,
        "verse": 4,
        "endVerse": 5
      },
      {
        "label": "1 Corinthians 12:12-27",
        "book": "1 Corinthians",
        "chapter": 12,
        "verse": 12,
        "endVerse": 27
      },
      {
        "label": "Ephesians 2:19-22",
        "book": "Ephesians",
        "chapter": 2,
        "verse": 19,
        "endVerse": 22
      },
      {
        "label": "Ephesians 4:1-16",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 1,
        "endVerse": 16
      },
      {
        "label": "Colossians 1:18",
        "book": "Colossians",
        "chapter": 1,
        "verse": 18,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Unity Among Believers",
    "summary": "Christians are called to preserve unity through humility, truth and love.",
    "keywords": [
      "unity",
      "peace"
    ],
    "references": [
      {
        "label": "John 17:20-23",
        "book": "John",
        "chapter": 17,
        "verse": 20,
        "endVerse": 23
      },
      {
        "label": "Romans 14:1-13",
        "book": "Romans",
        "chapter": 14,
        "verse": 1,
        "endVerse": 13
      },
      {
        "label": "1 Corinthians 1:10-13",
        "book": "1 Corinthians",
        "chapter": 1,
        "verse": 10,
        "endVerse": 13
      },
      {
        "label": "Ephesians 4:1-6",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 1,
        "endVerse": 6
      },
      {
        "label": "Philippians 2:1-4",
        "book": "Philippians",
        "chapter": 2,
        "verse": 1,
        "endVerse": 4
      }
    ]
  },
  {
    "title": "Christian Character and Fruit",
    "summary": "The Spirit forms Christlike character, visible in love, patience, goodness and self-control.",
    "keywords": [
      "fruit",
      "character"
    ],
    "references": [
      {
        "label": "Matthew 7:15-20",
        "book": "Matthew",
        "chapter": 7,
        "verse": 15,
        "endVerse": 20
      },
      {
        "label": "John 15:1-8",
        "book": "John",
        "chapter": 15,
        "verse": 1,
        "endVerse": 8
      },
      {
        "label": "Galatians 5:16-26",
        "book": "Galatians",
        "chapter": 5,
        "verse": 16,
        "endVerse": 26
      },
      {
        "label": "Ephesians 5:8-10",
        "book": "Ephesians",
        "chapter": 5,
        "verse": 8,
        "endVerse": 10
      },
      {
        "label": "Colossians 3:12-17",
        "book": "Colossians",
        "chapter": 3,
        "verse": 12,
        "endVerse": 17
      }
    ]
  },
  {
    "title": "Christian Freedom and Conscience",
    "summary": "Christian freedom is exercised with love, a clear conscience and concern for others.",
    "keywords": [
      "conscience",
      "freedom"
    ],
    "references": [
      {
        "label": "Romans 14:13-23",
        "book": "Romans",
        "chapter": 14,
        "verse": 13,
        "endVerse": 23
      },
      {
        "label": "1 Corinthians 8:1-13",
        "book": "1 Corinthians",
        "chapter": 8,
        "verse": 1,
        "endVerse": 13
      },
      {
        "label": "1 Corinthians 10:23-33",
        "book": "1 Corinthians",
        "chapter": 10,
        "verse": 23,
        "endVerse": 33
      },
      {
        "label": "Galatians 5:1-13",
        "book": "Galatians",
        "chapter": 5,
        "verse": 1,
        "endVerse": 13
      },
      {
        "label": "1 Peter 2:16-17",
        "book": "1 Peter",
        "chapter": 2,
        "verse": 16,
        "endVerse": 17
      }
    ]
  },
  {
    "title": "Money, Generosity and Contentment",
    "summary": "Scripture teaches stewardship, generosity and freedom from the love of money.",
    "keywords": [
      "money",
      "generosity",
      "contentment"
    ],
    "references": [
      {
        "label": "Proverbs 3:9-10",
        "book": "Proverbs",
        "chapter": 3,
        "verse": 9,
        "endVerse": 10
      },
      {
        "label": "Matthew 6:19-24",
        "book": "Matthew",
        "chapter": 6,
        "verse": 19,
        "endVerse": 24
      },
      {
        "label": "Luke 12:13-21",
        "book": "Luke",
        "chapter": 12,
        "verse": 13,
        "endVerse": 21
      },
      {
        "label": "2 Corinthians 9:6-11",
        "book": "2 Corinthians",
        "chapter": 9,
        "verse": 6,
        "endVerse": 11
      },
      {
        "label": "1 Timothy 6:6-10",
        "book": "1 Timothy",
        "chapter": 6,
        "verse": 6,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "The Poor and Vulnerable",
    "summary": "God's people are called to protect and show practical compassion to those in need.",
    "keywords": [
      "poor",
      "vulnerable"
    ],
    "references": [
      {
        "label": "Deuteronomy 15:7-11",
        "book": "Deuteronomy",
        "chapter": 15,
        "verse": 7,
        "endVerse": 11
      },
      {
        "label": "Proverbs 19:17",
        "book": "Proverbs",
        "chapter": 19,
        "verse": 17,
        "endVerse": null
      },
      {
        "label": "Isaiah 58:6-10",
        "book": "Isaiah",
        "chapter": 58,
        "verse": 6,
        "endVerse": 10
      },
      {
        "label": "Luke 14:12-14",
        "book": "Luke",
        "chapter": 14,
        "verse": 12,
        "endVerse": 14
      },
      {
        "label": "James 2:14-17",
        "book": "James",
        "chapter": 2,
        "verse": 14,
        "endVerse": 17
      }
    ]
  },
  {
    "title": "Marriage and Covenant Love",
    "summary": "Biblical marriage teaching emphasizes covenant faithfulness, mutual honour and sacrificial love.",
    "keywords": [
      "marriage",
      "husband",
      "wife"
    ],
    "references": [
      {
        "label": "Genesis 2:18-25",
        "book": "Genesis",
        "chapter": 2,
        "verse": 18,
        "endVerse": 25
      },
      {
        "label": "Matthew 19:3-9",
        "book": "Matthew",
        "chapter": 19,
        "verse": 3,
        "endVerse": 9
      },
      {
        "label": "Ephesians 5:21-33",
        "book": "Ephesians",
        "chapter": 5,
        "verse": 21,
        "endVerse": 33
      },
      {
        "label": "Colossians 3:18-19",
        "book": "Colossians",
        "chapter": 3,
        "verse": 18,
        "endVerse": 19
      },
      {
        "label": "1 Peter 3:1-7",
        "book": "1 Peter",
        "chapter": 3,
        "verse": 1,
        "endVerse": 7
      }
    ]
  },
  {
    "title": "Parenting and Raising Children",
    "summary": "Parents are called to nurture children in wisdom, love, instruction and faithful example.",
    "keywords": [
      "parenting",
      "children"
    ],
    "references": [
      {
        "label": "Deuteronomy 6:4-9",
        "book": "Deuteronomy",
        "chapter": 6,
        "verse": 4,
        "endVerse": 9
      },
      {
        "label": "Psalm 78:1-8",
        "book": "Psalm",
        "chapter": 78,
        "verse": 1,
        "endVerse": 8
      },
      {
        "label": "Proverbs 22:6",
        "book": "Proverbs",
        "chapter": 22,
        "verse": 6,
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
        "label": "Colossians 3:20-21",
        "book": "Colossians",
        "chapter": 3,
        "verse": 20,
        "endVerse": 21
      }
    ]
  },
  {
    "title": "Friendship and Community",
    "summary": "Wise friendship offers loyalty, encouragement, correction and mutual support.",
    "keywords": [
      "friendship",
      "community"
    ],
    "references": [
      {
        "label": "Proverbs 17:17",
        "book": "Proverbs",
        "chapter": 17,
        "verse": 17,
        "endVerse": null
      },
      {
        "label": "Proverbs 27:5-10",
        "book": "Proverbs",
        "chapter": 27,
        "verse": 5,
        "endVerse": 10
      },
      {
        "label": "Ecclesiastes 4:9-12",
        "book": "Ecclesiastes",
        "chapter": 4,
        "verse": 9,
        "endVerse": 12
      },
      {
        "label": "John 15:12-15",
        "book": "John",
        "chapter": 15,
        "verse": 12,
        "endVerse": 15
      },
      {
        "label": "Hebrews 10:24-25",
        "book": "Hebrews",
        "chapter": 10,
        "verse": 24,
        "endVerse": 25
      }
    ]
  },
  {
    "title": "Work, Calling and Vocation",
    "summary": "Work can be offered to God as faithful service, diligence and integrity.",
    "keywords": [
      "work",
      "calling"
    ],
    "references": [
      {
        "label": "Genesis 2:15",
        "book": "Genesis",
        "chapter": 2,
        "verse": 15,
        "endVerse": null
      },
      {
        "label": "Proverbs 14:23",
        "book": "Proverbs",
        "chapter": 14,
        "verse": 23,
        "endVerse": null
      },
      {
        "label": "Ecclesiastes 3:12-13",
        "book": "Ecclesiastes",
        "chapter": 3,
        "verse": 12,
        "endVerse": 13
      },
      {
        "label": "Colossians 3:23-24",
        "book": "Colossians",
        "chapter": 3,
        "verse": 23,
        "endVerse": 24
      },
      {
        "label": "1 Thessalonians 4:9-12",
        "book": "1 Thessalonians",
        "chapter": 4,
        "verse": 9,
        "endVerse": 12
      }
    ]
  },
  {
    "title": "Leadership and Servant Authority",
    "summary": "Biblical leadership is accountable to God and shaped by humility, justice and service.",
    "keywords": [
      "leadership",
      "servant"
    ],
    "references": [
      {
        "label": "Exodus 18:13-24",
        "book": "Exodus",
        "chapter": 18,
        "verse": 13,
        "endVerse": 24
      },
      {
        "label": "1 Samuel 12:1-5",
        "book": "1 Samuel",
        "chapter": 12,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Mark 10:42-45",
        "book": "Mark",
        "chapter": 10,
        "verse": 42,
        "endVerse": 45
      },
      {
        "label": "Acts 20:28-35",
        "book": "Acts",
        "chapter": 20,
        "verse": 28,
        "endVerse": 35
      },
      {
        "label": "1 Peter 5:1-4",
        "book": "1 Peter",
        "chapter": 5,
        "verse": 1,
        "endVerse": 4
      }
    ]
  },
  {
    "title": "Integrity and Truthfulness",
    "summary": "God's people are called to honesty, trustworthy speech and integrity.",
    "keywords": [
      "integrity",
      "honesty"
    ],
    "references": [
      {
        "label": "Leviticus 19:11-18",
        "book": "Leviticus",
        "chapter": 19,
        "verse": 11,
        "endVerse": 18
      },
      {
        "label": "Proverbs 12:17-22",
        "book": "Proverbs",
        "chapter": 12,
        "verse": 17,
        "endVerse": 22
      },
      {
        "label": "Matthew 5:33-37",
        "book": "Matthew",
        "chapter": 5,
        "verse": 33,
        "endVerse": 37
      },
      {
        "label": "Ephesians 4:25",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 25,
        "endVerse": null
      },
      {
        "label": "Colossians 3:9-10",
        "book": "Colossians",
        "chapter": 3,
        "verse": 9,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Anger and Reconciliation",
    "summary": "Scripture warns against destructive anger and calls for patience and reconciliation.",
    "keywords": [
      "anger",
      "reconciliation"
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
        "label": "Proverbs 16:32",
        "book": "Proverbs",
        "chapter": 16,
        "verse": 32,
        "endVerse": null
      },
      {
        "label": "Matthew 5:21-26",
        "book": "Matthew",
        "chapter": 5,
        "verse": 21,
        "endVerse": 26
      },
      {
        "label": "Ephesians 4:26-32",
        "book": "Ephesians",
        "chapter": 4,
        "verse": 26,
        "endVerse": 32
      },
      {
        "label": "James 1:19-20",
        "book": "James",
        "chapter": 1,
        "verse": 19,
        "endVerse": 20
      }
    ]
  },
  {
    "title": "Grief, Lament and Comfort",
    "summary": "Biblical lament gives language for sorrow while holding onto God's presence and hope.",
    "keywords": [
      "grief",
      "lament",
      "comfort"
    ],
    "references": [
      {
        "label": "Psalm 6:1-10",
        "book": "Psalm",
        "chapter": 6,
        "verse": 1,
        "endVerse": 10
      },
      {
        "label": "Psalm 34:17-18",
        "book": "Psalm",
        "chapter": 34,
        "verse": 17,
        "endVerse": 18
      },
      {
        "label": "Lamentations 3:19-26",
        "book": "Lamentations",
        "chapter": 3,
        "verse": 19,
        "endVerse": 26
      },
      {
        "label": "Matthew 5:4",
        "book": "Matthew",
        "chapter": 5,
        "verse": 4,
        "endVerse": null
      },
      {
        "label": "2 Corinthians 1:3-7",
        "book": "2 Corinthians",
        "chapter": 1,
        "verse": 3,
        "endVerse": 7
      }
    ]
  },
  {
    "title": "Fear and God's Presence",
    "summary": "Scripture grounds courage in God's presence, help and faithful care.",
    "keywords": [
      "fear",
      "presence",
      "courage"
    ],
    "references": [
      {
        "label": "Genesis 26:24",
        "book": "Genesis",
        "chapter": 26,
        "verse": 24,
        "endVerse": null
      },
      {
        "label": "Deuteronomy 31:6-8",
        "book": "Deuteronomy",
        "chapter": 31,
        "verse": 6,
        "endVerse": 8
      },
      {
        "label": "Psalm 23:4",
        "book": "Psalm",
        "chapter": 23,
        "verse": 4,
        "endVerse": null
      },
      {
        "label": "Isaiah 43:1-3",
        "book": "Isaiah",
        "chapter": 43,
        "verse": 1,
        "endVerse": 3
      },
      {
        "label": "Matthew 14:27",
        "book": "Matthew",
        "chapter": 14,
        "verse": 27,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Waiting on God and Patience",
    "summary": "Waiting involves trust, endurance and faithful action rather than passivity.",
    "keywords": [
      "waiting",
      "patience"
    ],
    "references": [
      {
        "label": "Psalm 27:13-14",
        "book": "Psalm",
        "chapter": 27,
        "verse": 13,
        "endVerse": 14
      },
      {
        "label": "Psalm 37:3-7",
        "book": "Psalm",
        "chapter": 37,
        "verse": 3,
        "endVerse": 7
      },
      {
        "label": "Isaiah 40:28-31",
        "book": "Isaiah",
        "chapter": 40,
        "verse": 28,
        "endVerse": 31
      },
      {
        "label": "Romans 8:24-25",
        "book": "Romans",
        "chapter": 8,
        "verse": 24,
        "endVerse": 25
      },
      {
        "label": "James 5:7-11",
        "book": "James",
        "chapter": 5,
        "verse": 7,
        "endVerse": 11
      }
    ]
  },
  {
    "title": "Guidance and Discernment",
    "summary": "Believers seek wisdom through Scripture, prayer, mature counsel and tested discernment.",
    "keywords": [
      "discernment",
      "guidance"
    ],
    "references": [
      {
        "label": "Psalm 25:4-5",
        "book": "Psalm",
        "chapter": 25,
        "verse": 4,
        "endVerse": 5
      },
      {
        "label": "Proverbs 11:14",
        "book": "Proverbs",
        "chapter": 11,
        "verse": 14,
        "endVerse": null
      },
      {
        "label": "Isaiah 30:20-21",
        "book": "Isaiah",
        "chapter": 30,
        "verse": 20,
        "endVerse": 21
      },
      {
        "label": "Romans 12:1-2",
        "book": "Romans",
        "chapter": 12,
        "verse": 1,
        "endVerse": 2
      },
      {
        "label": "Philippians 1:9-10",
        "book": "Philippians",
        "chapter": 1,
        "verse": 9,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Confession and Repentance",
    "summary": "Confession brings sin into God's light; repentance turns toward Him in truth.",
    "keywords": [
      "confession",
      "repentance"
    ],
    "references": [
      {
        "label": "Psalm 32:1-5",
        "book": "Psalm",
        "chapter": 32,
        "verse": 1,
        "endVerse": 5
      },
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
        "label": "Luke 18:9-14",
        "book": "Luke",
        "chapter": 18,
        "verse": 9,
        "endVerse": 14
      },
      {
        "label": "1 John 1:5-10",
        "book": "1 John",
        "chapter": 1,
        "verse": 5,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Testing and Perseverance",
    "summary": "Scripture encourages steadfast trust and distinguishes testing from enticement to sin.",
    "keywords": [
      "testing",
      "perseverance"
    ],
    "references": [
      {
        "label": "Genesis 22:1-14",
        "book": "Genesis",
        "chapter": 22,
        "verse": 1,
        "endVerse": 14
      },
      {
        "label": "Matthew 4:1-11",
        "book": "Matthew",
        "chapter": 4,
        "verse": 1,
        "endVerse": 11
      },
      {
        "label": "1 Corinthians 10:12-13",
        "book": "1 Corinthians",
        "chapter": 10,
        "verse": 12,
        "endVerse": 13
      },
      {
        "label": "James 1:2-18",
        "book": "James",
        "chapter": 1,
        "verse": 2,
        "endVerse": 18
      },
      {
        "label": "1 Peter 1:6-9",
        "book": "1 Peter",
        "chapter": 1,
        "verse": 6,
        "endVerse": 9
      }
    ]
  },
  {
    "title": "The Armor of God",
    "summary": "Ephesians describes spiritual readiness through truth, righteousness, faith, salvation, the word and prayer.",
    "keywords": [
      "armor",
      "warfare"
    ],
    "references": [
      {
        "label": "Isaiah 59:15-17",
        "book": "Isaiah",
        "chapter": 59,
        "verse": 15,
        "endVerse": 17
      },
      {
        "label": "Romans 13:11-14",
        "book": "Romans",
        "chapter": 13,
        "verse": 11,
        "endVerse": 14
      },
      {
        "label": "2 Corinthians 6:7",
        "book": "2 Corinthians",
        "chapter": 6,
        "verse": 7,
        "endVerse": null
      },
      {
        "label": "Ephesians 6:10-18",
        "book": "Ephesians",
        "chapter": 6,
        "verse": 10,
        "endVerse": 18
      },
      {
        "label": "1 Thessalonians 5:8-11",
        "book": "1 Thessalonians",
        "chapter": 5,
        "verse": 8,
        "endVerse": 11
      }
    ]
  },
  {
    "title": "Angels and God's Messengers",
    "summary": "Angels serve God's purposes; Scripture directs worship and trust to God alone.",
    "keywords": [
      "angels",
      "messengers"
    ],
    "references": [
      {
        "label": "Genesis 19:1-22",
        "book": "Genesis",
        "chapter": 19,
        "verse": 1,
        "endVerse": 22
      },
      {
        "label": "Psalm 91:9-12",
        "book": "Psalm",
        "chapter": 91,
        "verse": 9,
        "endVerse": 12
      },
      {
        "label": "Daniel 6:19-23",
        "book": "Daniel",
        "chapter": 6,
        "verse": 19,
        "endVerse": 23
      },
      {
        "label": "Luke 1:26-38",
        "book": "Luke",
        "chapter": 1,
        "verse": 26,
        "endVerse": 38
      },
      {
        "label": "Hebrews 1:13-14",
        "book": "Hebrews",
        "chapter": 1,
        "verse": 13,
        "endVerse": 14
      }
    ]
  },
  {
    "title": "Heaven and the New Creation",
    "summary": "The final hope is God's renewed creation and His dwelling with His people.",
    "keywords": [
      "heaven",
      "new creation"
    ],
    "references": [
      {
        "label": "Isaiah 65:17-25",
        "book": "Isaiah",
        "chapter": 65,
        "verse": 17,
        "endVerse": 25
      },
      {
        "label": "John 14:1-3",
        "book": "John",
        "chapter": 14,
        "verse": 1,
        "endVerse": 3
      },
      {
        "label": "Romans 8:18-25",
        "book": "Romans",
        "chapter": 8,
        "verse": 18,
        "endVerse": 25
      },
      {
        "label": "2 Peter 3:10-13",
        "book": "2 Peter",
        "chapter": 3,
        "verse": 10,
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
    "title": "Judgment and Accountability",
    "summary": "God judges justly and calls people to faithful accountability.",
    "keywords": [
      "judgment",
      "accountability"
    ],
    "references": [
      {
        "label": "Ecclesiastes 12:13-14",
        "book": "Ecclesiastes",
        "chapter": 12,
        "verse": 13,
        "endVerse": 14
      },
      {
        "label": "Matthew 25:31-46",
        "book": "Matthew",
        "chapter": 25,
        "verse": 31,
        "endVerse": 46
      },
      {
        "label": "John 5:24-29",
        "book": "John",
        "chapter": 5,
        "verse": 24,
        "endVerse": 29
      },
      {
        "label": "Romans 14:10-12",
        "book": "Romans",
        "chapter": 14,
        "verse": 10,
        "endVerse": 12
      },
      {
        "label": "Revelation 20:11-15",
        "book": "Revelation",
        "chapter": 20,
        "verse": 11,
        "endVerse": 15
      }
    ]
  },
  {
    "title": "The New Testament Letters",
    "summary": "The letters apply the gospel to doctrine, worship, relationships and daily life.",
    "keywords": [
      "epistles",
      "letters"
    ],
    "references": [
      {
        "label": "Romans 1:1-7",
        "book": "Romans",
        "chapter": 1,
        "verse": 1,
        "endVerse": 7
      },
      {
        "label": "1 Corinthians 1:1-9",
        "book": "1 Corinthians",
        "chapter": 1,
        "verse": 1,
        "endVerse": 9
      },
      {
        "label": "Galatians 1:1-10",
        "book": "Galatians",
        "chapter": 1,
        "verse": 1,
        "endVerse": 10
      },
      {
        "label": "Ephesians 1:1-14",
        "book": "Ephesians",
        "chapter": 1,
        "verse": 1,
        "endVerse": 14
      },
      {
        "label": "1 Peter 1:1-9",
        "book": "1 Peter",
        "chapter": 1,
        "verse": 1,
        "endVerse": 9
      }
    ]
  },
  {
    "title": "Revelation and Faithful Witness",
    "summary": "Revelation calls churches to worship God, resist compromise and remain faithful to Jesus.",
    "keywords": [
      "revelation",
      "faithful witness"
    ],
    "references": [
      {
        "label": "Revelation 1:9-20",
        "book": "Revelation",
        "chapter": 1,
        "verse": 9,
        "endVerse": 20
      },
      {
        "label": "Revelation 2:1-7",
        "book": "Revelation",
        "chapter": 2,
        "verse": 1,
        "endVerse": 7
      },
      {
        "label": "Revelation 5:1-14",
        "book": "Revelation",
        "chapter": 5,
        "verse": 1,
        "endVerse": 14
      },
      {
        "label": "Revelation 12:10-11",
        "book": "Revelation",
        "chapter": 12,
        "verse": 10,
        "endVerse": 11
      },
      {
        "label": "Revelation 22:1-5",
        "book": "Revelation",
        "chapter": 22,
        "verse": 1,
        "endVerse": 5
      }
    ]
  },
  {
    "title": "Ruth: Loyalty and Redemption",
    "summary": "Ruth portrays steadfast love, courageous loyalty and God's providence through ordinary faithfulness.",
    "keywords": [
      "ruth",
      "loyalty",
      "redemption"
    ],
    "references": [
      {
        "label": "Ruth 1:15-18",
        "book": "Ruth",
        "chapter": 1,
        "verse": 15,
        "endVerse": 18
      },
      {
        "label": "Ruth 2:8-12",
        "book": "Ruth",
        "chapter": 2,
        "verse": 8,
        "endVerse": 12
      },
      {
        "label": "Ruth 2:19-23",
        "book": "Ruth",
        "chapter": 2,
        "verse": 19,
        "endVerse": 23
      },
      {
        "label": "Ruth 3:9-13",
        "book": "Ruth",
        "chapter": 3,
        "verse": 9,
        "endVerse": 13
      },
      {
        "label": "Ruth 4:13-17",
        "book": "Ruth",
        "chapter": 4,
        "verse": 13,
        "endVerse": 17
      }
    ]
  },
  {
    "title": "Solomon and the Wisdom of Kings",
    "summary": "Solomon's reign highlights wisdom as God's gift and warns that prosperity must remain under covenant faithfulness.",
    "keywords": [
      "solomon",
      "wisdom",
      "temple"
    ],
    "references": [
      {
        "label": "1 Kings 3:5-14",
        "book": "1 Kings",
        "chapter": 3,
        "verse": 5,
        "endVerse": 14
      },
      {
        "label": "1 Kings 4:29-34",
        "book": "1 Kings",
        "chapter": 4,
        "verse": 29,
        "endVerse": 34
      },
      {
        "label": "1 Kings 8:22-30",
        "book": "1 Kings",
        "chapter": 8,
        "verse": 22,
        "endVerse": 30
      },
      {
        "label": "1 Kings 11:1-13",
        "book": "1 Kings",
        "chapter": 11,
        "verse": 1,
        "endVerse": 13
      },
      {
        "label": "2 Chronicles 7:11-22",
        "book": "2 Chronicles",
        "chapter": 7,
        "verse": 11,
        "endVerse": 22
      }
    ]
  },
  {
    "title": "Remembering God's Works",
    "summary": "The chronicler calls God's people to remember His acts, worship faithfully and learn from their history.",
    "keywords": [
      "remembrance",
      "history",
      "worship"
    ],
    "references": [
      {
        "label": "1 Chronicles 16:8-36",
        "book": "1 Chronicles",
        "chapter": 16,
        "verse": 8,
        "endVerse": 36
      },
      {
        "label": "1 Chronicles 17:16-27",
        "book": "1 Chronicles",
        "chapter": 17,
        "verse": 16,
        "endVerse": 27
      },
      {
        "label": "1 Chronicles 29:10-20",
        "book": "1 Chronicles",
        "chapter": 29,
        "verse": 10,
        "endVerse": 20
      },
      {
        "label": "2 Chronicles 20:5-12",
        "book": "2 Chronicles",
        "chapter": 20,
        "verse": 5,
        "endVerse": 12
      },
      {
        "label": "2 Chronicles 30:18-22",
        "book": "2 Chronicles",
        "chapter": 30,
        "verse": 18,
        "endVerse": 22
      }
    ]
  },
  {
    "title": "Rebuilding and Renewal",
    "summary": "The rebuilding narratives show prayerful leadership, perseverance and renewal of community life.",
    "keywords": [
      "rebuilding",
      "renewal",
      "nehemiah"
    ],
    "references": [
      {
        "label": "Ezra 3:10-13",
        "book": "Ezra",
        "chapter": 3,
        "verse": 10,
        "endVerse": 13
      },
      {
        "label": "Ezra 7:6-10",
        "book": "Ezra",
        "chapter": 7,
        "verse": 6,
        "endVerse": 10
      },
      {
        "label": "Nehemiah 1:4-11",
        "book": "Nehemiah",
        "chapter": 1,
        "verse": 4,
        "endVerse": 11
      },
      {
        "label": "Nehemiah 4:6-14",
        "book": "Nehemiah",
        "chapter": 4,
        "verse": 6,
        "endVerse": 14
      },
      {
        "label": "Nehemiah 8:1-12",
        "book": "Nehemiah",
        "chapter": 8,
        "verse": 1,
        "endVerse": 12
      }
    ]
  },
  {
    "title": "Courage and Providence in Esther",
    "summary": "Esther's story explores courage, wise action and providence in the face of danger.",
    "keywords": [
      "esther",
      "courage",
      "providence"
    ],
    "references": [
      {
        "label": "Esther 2:15-18",
        "book": "Esther",
        "chapter": 2,
        "verse": 15,
        "endVerse": 18
      },
      {
        "label": "Esther 4:10-17",
        "book": "Esther",
        "chapter": 4,
        "verse": 10,
        "endVerse": 17
      },
      {
        "label": "Esther 5:1-8",
        "book": "Esther",
        "chapter": 5,
        "verse": 1,
        "endVerse": 8
      },
      {
        "label": "Esther 7:1-6",
        "book": "Esther",
        "chapter": 7,
        "verse": 1,
        "endVerse": 6
      },
      {
        "label": "Esther 9:20-28",
        "book": "Esther",
        "chapter": 9,
        "verse": 20,
        "endVerse": 28
      }
    ]
  },
  {
    "title": "Love and Faithfulness in Song of Solomon",
    "summary": "The Song celebrates covenant love, desire and mutual delight within its poetic wisdom setting.",
    "keywords": [
      "song of solomon",
      "love",
      "marriage"
    ],
    "references": [
      {
        "label": "Song of Solomon 2:8-17",
        "book": "Song of Solomon",
        "chapter": 2,
        "verse": 8,
        "endVerse": 17
      },
      {
        "label": "Song of Solomon 3:1-5",
        "book": "Song of Solomon",
        "chapter": 3,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Song of Solomon 4:9-16",
        "book": "Song of Solomon",
        "chapter": 4,
        "verse": 9,
        "endVerse": 16
      },
      {
        "label": "Song of Solomon 6:3",
        "book": "Song of Solomon",
        "chapter": 6,
        "verse": 3,
        "endVerse": null
      },
      {
        "label": "Song of Solomon 8:6-7",
        "book": "Song of Solomon",
        "chapter": 8,
        "verse": 6,
        "endVerse": 7
      }
    ]
  },
  {
    "title": "Hosea: Covenant Love and Return",
    "summary": "Hosea uses the image of marriage to portray God's steadfast love and call His people to return.",
    "keywords": [
      "hosea",
      "covenant love",
      "return"
    ],
    "references": [
      {
        "label": "Hosea 2:14-23",
        "book": "Hosea",
        "chapter": 2,
        "verse": 14,
        "endVerse": 23
      },
      {
        "label": "Hosea 3:1-5",
        "book": "Hosea",
        "chapter": 3,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Hosea 6:1-6",
        "book": "Hosea",
        "chapter": 6,
        "verse": 1,
        "endVerse": 6
      },
      {
        "label": "Hosea 11:1-9",
        "book": "Hosea",
        "chapter": 11,
        "verse": 1,
        "endVerse": 9
      },
      {
        "label": "Hosea 14:1-9",
        "book": "Hosea",
        "chapter": 14,
        "verse": 1,
        "endVerse": 9
      }
    ]
  },
  {
    "title": "Joel: The Day of the Lord and the Spirit",
    "summary": "Joel calls for wholehearted return to God and promises the outpouring of His Spirit.",
    "keywords": [
      "joel",
      "day of the lord",
      "spirit"
    ],
    "references": [
      {
        "label": "Joel 1:13-20",
        "book": "Joel",
        "chapter": 1,
        "verse": 13,
        "endVerse": 20
      },
      {
        "label": "Joel 2:12-17",
        "book": "Joel",
        "chapter": 2,
        "verse": 12,
        "endVerse": 17
      },
      {
        "label": "Joel 2:28-32",
        "book": "Joel",
        "chapter": 2,
        "verse": 28,
        "endVerse": 32
      },
      {
        "label": "Joel 2:18-27",
        "book": "Joel",
        "chapter": 2,
        "verse": 18,
        "endVerse": 27
      },
      {
        "label": "Acts 2:14-21",
        "book": "Acts",
        "chapter": 2,
        "verse": 14,
        "endVerse": 21
      }
    ]
  },
  {
    "title": "Obadiah: Pride and Justice",
    "summary": "Obadiah warns against pride and rejoicing over another's calamity, affirming God's justice.",
    "keywords": [
      "obadiah",
      "pride",
      "justice"
    ],
    "references": [
      {
        "label": "Obadiah 1:1-4",
        "book": "Obadiah",
        "chapter": 1,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "Obadiah 1:10-14",
        "book": "Obadiah",
        "chapter": 1,
        "verse": 10,
        "endVerse": 14
      },
      {
        "label": "Obadiah 1:15-16",
        "book": "Obadiah",
        "chapter": 1,
        "verse": 15,
        "endVerse": 16
      },
      {
        "label": "Obadiah 1:17-18",
        "book": "Obadiah",
        "chapter": 1,
        "verse": 17,
        "endVerse": 18
      },
      {
        "label": "Obadiah 1:21",
        "book": "Obadiah",
        "chapter": 1,
        "verse": 21,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Jonah: Mercy Beyond Our Boundaries",
    "summary": "Jonah confronts narrow compassion and reveals God's concern for people beyond Israel.",
    "keywords": [
      "jonah",
      "mercy",
      "mission"
    ],
    "references": [
      {
        "label": "Jonah 1:1-3",
        "book": "Jonah",
        "chapter": 1,
        "verse": 1,
        "endVerse": 3
      },
      {
        "label": "Jonah 2:1-10",
        "book": "Jonah",
        "chapter": 2,
        "verse": 1,
        "endVerse": 10
      },
      {
        "label": "Jonah 3:1-10",
        "book": "Jonah",
        "chapter": 3,
        "verse": 1,
        "endVerse": 10
      },
      {
        "label": "Jonah 4:1-4",
        "book": "Jonah",
        "chapter": 4,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "Jonah 4:9-11",
        "book": "Jonah",
        "chapter": 4,
        "verse": 9,
        "endVerse": 11
      }
    ]
  },
  {
    "title": "Nahum: God's Justice Against Oppression",
    "summary": "Nahum announces judgment against violent oppression and portrays God as refuge for those who trust Him.",
    "keywords": [
      "nahum",
      "justice",
      "refuge"
    ],
    "references": [
      {
        "label": "Nahum 1:2-8",
        "book": "Nahum",
        "chapter": 1,
        "verse": 2,
        "endVerse": 8
      },
      {
        "label": "Nahum 1:9-15",
        "book": "Nahum",
        "chapter": 1,
        "verse": 9,
        "endVerse": 15
      },
      {
        "label": "Nahum 2:1-6",
        "book": "Nahum",
        "chapter": 2,
        "verse": 1,
        "endVerse": 6
      },
      {
        "label": "Nahum 3:1-7",
        "book": "Nahum",
        "chapter": 3,
        "verse": 1,
        "endVerse": 7
      },
      {
        "label": "Psalm 9:7-10",
        "book": "Psalm",
        "chapter": 9,
        "verse": 7,
        "endVerse": 10
      }
    ]
  },
  {
    "title": "Habakkuk: Faith in Troubled Times",
    "summary": "Habakkuk brings hard questions to God and learns to live by faith while waiting for His justice.",
    "keywords": [
      "habakkuk",
      "faith",
      "waiting"
    ],
    "references": [
      {
        "label": "Habakkuk 1:1-4",
        "book": "Habakkuk",
        "chapter": 1,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "Habakkuk 1:12-17",
        "book": "Habakkuk",
        "chapter": 1,
        "verse": 12,
        "endVerse": 17
      },
      {
        "label": "Habakkuk 2:1-4",
        "book": "Habakkuk",
        "chapter": 2,
        "verse": 1,
        "endVerse": 4
      },
      {
        "label": "Habakkuk 3:16-19",
        "book": "Habakkuk",
        "chapter": 3,
        "verse": 16,
        "endVerse": 19
      },
      {
        "label": "Romans 1:16-17",
        "book": "Romans",
        "chapter": 1,
        "verse": 16,
        "endVerse": 17
      }
    ]
  },
  {
    "title": "Zephaniah: Judgment and Restoration",
    "summary": "Zephaniah warns of the day of the Lord and promises purification, joy and restoration.",
    "keywords": [
      "zephaniah",
      "restoration",
      "day of the lord"
    ],
    "references": [
      {
        "label": "Zephaniah 1:14-18",
        "book": "Zephaniah",
        "chapter": 1,
        "verse": 14,
        "endVerse": 18
      },
      {
        "label": "Zephaniah 2:1-3",
        "book": "Zephaniah",
        "chapter": 2,
        "verse": 1,
        "endVerse": 3
      },
      {
        "label": "Zephaniah 3:9-13",
        "book": "Zephaniah",
        "chapter": 3,
        "verse": 9,
        "endVerse": 13
      },
      {
        "label": "Zephaniah 3:14-17",
        "book": "Zephaniah",
        "chapter": 3,
        "verse": 14,
        "endVerse": 17
      },
      {
        "label": "Zephaniah 3:18-20",
        "book": "Zephaniah",
        "chapter": 3,
        "verse": 18,
        "endVerse": 20
      }
    ]
  },
  {
    "title": "Haggai: Priorities and God's Presence",
    "summary": "Haggai challenges misplaced priorities and encourages the people to rebuild in dependence on God's presence.",
    "keywords": [
      "haggai",
      "priorities",
      "temple"
    ],
    "references": [
      {
        "label": "Haggai 1:2-11",
        "book": "Haggai",
        "chapter": 1,
        "verse": 2,
        "endVerse": 11
      },
      {
        "label": "Haggai 1:12-15",
        "book": "Haggai",
        "chapter": 1,
        "verse": 12,
        "endVerse": 15
      },
      {
        "label": "Haggai 2:1-9",
        "book": "Haggai",
        "chapter": 2,
        "verse": 1,
        "endVerse": 9
      },
      {
        "label": "Haggai 2:10-19",
        "book": "Haggai",
        "chapter": 2,
        "verse": 10,
        "endVerse": 19
      },
      {
        "label": "Haggai 2:20-23",
        "book": "Haggai",
        "chapter": 2,
        "verse": 20,
        "endVerse": 23
      }
    ]
  },
  {
    "title": "Malachi: Covenant Faithfulness",
    "summary": "Malachi calls the community to honour God in worship, relationships and covenant faithfulness.",
    "keywords": [
      "malachi",
      "covenant",
      "worship"
    ],
    "references": [
      {
        "label": "Malachi 1:6-14",
        "book": "Malachi",
        "chapter": 1,
        "verse": 6,
        "endVerse": 14
      },
      {
        "label": "Malachi 2:10-16",
        "book": "Malachi",
        "chapter": 2,
        "verse": 10,
        "endVerse": 16
      },
      {
        "label": "Malachi 3:1-5",
        "book": "Malachi",
        "chapter": 3,
        "verse": 1,
        "endVerse": 5
      },
      {
        "label": "Malachi 3:6-12",
        "book": "Malachi",
        "chapter": 3,
        "verse": 6,
        "endVerse": 12
      },
      {
        "label": "Malachi 4:1-6",
        "book": "Malachi",
        "chapter": 4,
        "verse": 1,
        "endVerse": 6
      }
    ]
  },
  {
    "title": "Philemon: Forgiveness and Reconciliation",
    "summary": "Paul appeals for a transformed relationship in Christ, grounded in love rather than coercion.",
    "keywords": [
      "philemon",
      "reconciliation",
      "forgiveness"
    ],
    "references": [
      {
        "label": "Philemon 1:4-7",
        "book": "Philemon",
        "chapter": 1,
        "verse": 4,
        "endVerse": 7
      },
      {
        "label": "Philemon 1:8-16",
        "book": "Philemon",
        "chapter": 1,
        "verse": 8,
        "endVerse": 16
      },
      {
        "label": "Philemon 1:17-21",
        "book": "Philemon",
        "chapter": 1,
        "verse": 17,
        "endVerse": 21
      },
      {
        "label": "Ephesians 2:13-18",
        "book": "Ephesians",
        "chapter": 2,
        "verse": 13,
        "endVerse": 18
      },
      {
        "label": "Colossians 3:12-14",
        "book": "Colossians",
        "chapter": 3,
        "verse": 12,
        "endVerse": 14
      }
    ]
  },
  {
    "title": "Truth, Love and Discernment in 2 John",
    "summary": "Second John joins love with obedience to truth and careful discernment about teaching.",
    "keywords": [
      "2 john",
      "truth",
      "discernment"
    ],
    "references": [
      {
        "label": "2 John 1:4-6",
        "book": "2 John",
        "chapter": 1,
        "verse": 4,
        "endVerse": 6
      },
      {
        "label": "2 John 1:7-8",
        "book": "2 John",
        "chapter": 1,
        "verse": 7,
        "endVerse": 8
      },
      {
        "label": "2 John 1:9-11",
        "book": "2 John",
        "chapter": 1,
        "verse": 9,
        "endVerse": 11
      },
      {
        "label": "John 14:15",
        "book": "John",
        "chapter": 14,
        "verse": 15,
        "endVerse": null
      },
      {
        "label": "1 John 4:1-3",
        "book": "1 John",
        "chapter": 4,
        "verse": 1,
        "endVerse": 3
      }
    ]
  },
  {
    "title": "Hospitality and Faithfulness in 3 John",
    "summary": "Third John commends generous hospitality and faithful partnership while warning against self-serving leadership.",
    "keywords": [
      "3 john",
      "hospitality",
      "faithfulness"
    ],
    "references": [
      {
        "label": "3 John 1:2-4",
        "book": "3 John",
        "chapter": 1,
        "verse": 2,
        "endVerse": 4
      },
      {
        "label": "3 John 1:5-8",
        "book": "3 John",
        "chapter": 1,
        "verse": 5,
        "endVerse": 8
      },
      {
        "label": "3 John 1:9-10",
        "book": "3 John",
        "chapter": 1,
        "verse": 9,
        "endVerse": 10
      },
      {
        "label": "3 John 1:11-12",
        "book": "3 John",
        "chapter": 1,
        "verse": 11,
        "endVerse": 12
      },
      {
        "label": "Romans 12:13",
        "book": "Romans",
        "chapter": 12,
        "verse": 13,
        "endVerse": null
      }
    ]
  },
  {
    "title": "Contending for the Faith in Jude",
    "summary": "Jude urges believers to remain grounded in the apostolic faith, show wise mercy and rely on God's keeping power.",
    "keywords": [
      "jude",
      "faith",
      "perseverance"
    ],
    "references": [
      {
        "label": "Jude 1:3-4",
        "book": "Jude",
        "chapter": 1,
        "verse": 3,
        "endVerse": 4
      },
      {
        "label": "Jude 1:5-7",
        "book": "Jude",
        "chapter": 1,
        "verse": 5,
        "endVerse": 7
      },
      {
        "label": "Jude 1:17-19",
        "book": "Jude",
        "chapter": 1,
        "verse": 17,
        "endVerse": 19
      },
      {
        "label": "Jude 1:20-23",
        "book": "Jude",
        "chapter": 1,
        "verse": 20,
        "endVerse": 23
      },
      {
        "label": "Jude 1:24-25",
        "book": "Jude",
        "chapter": 1,
        "verse": 24,
        "endVerse": 25
      }
    ]
  }
];
function normalize(value){return String(value||"").toLowerCase().replace(/\s+/g," ").trim();}
function findForReference(reference){
 const match=String(reference||"").match(/^(.+?)\s+(\d+):(\d+)$/);
 if(!match)return [];
 const book=normalize(match[1]), chapter=Number(match[2]), verse=Number(match[3]);
 return topics.filter(topic=>topic.references.some(item=>normalize(item.book)===book && item.chapter===chapter && verse>=item.verse && verse<=(item.endVerse||item.verse)));
}
window.ZurielTopicalIndex={
 list:function(){return topics.slice();},
 findForReference:findForReference,
 findByKeyword:function(word){const key=normalize(word);if(!key)return [];return topics.filter(topic=>topic.keywords.some(item=>item.includes(key)||key.includes(item)));},
 search:function(query){const key=normalize(query);if(!key)return topics.slice();return topics.filter(topic=>normalize(topic.title+" "+topic.summary+" "+topic.keywords.join(" ")).includes(key));},
 getTopic:function(title){const key=normalize(title);return topics.find(topic=>normalize(topic.title)===key)||null;}
};
})();