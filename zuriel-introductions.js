/* =====================================================
   ZURIEL LIVING WORD BIBLE
   BOOK INTRODUCTION CENTRE
   GENESIS • EXODUS • LEVITICUS
   NUMBERS • DEUTERONOMY • JOSHUA • JUDGES
   ===================================================== */

(function () {
  "use strict";

  const introductions = {
    Genesis: {
      testament: "Old Testament",
      chapters: 50,
      subtitle: "The Book of Beginnings",
      author: "Moses is traditionally recognised as the author of Genesis and the first five books of the Bible.",
      authorStudy: "Genesis does not name its human author. Its composition and sources are discussed by biblical scholars. Traditional Mosaic attribution and modern scholarly explanations should both be studied fairly.",
      date: "A traditional conservative chronology places Moses' life in the second millennium BC. Proposed dates for the writing of Genesis vary.",
      dateStudy: "There is no universally agreed date for the final composition of Genesis. Its traditions, literary formation and final form are subjects of scholarly discussion.",
      place: "The traditional setting connects Moses with Israel's wilderness journey.",
      placeStudy: "The precise place where Genesis reached its final written form is not known.",
      audience: "The people of Israel, especially those seeking to understand their origins, identity, covenant relationship with God and place among the nations.",
      purpose: "To present the beginnings of creation, humanity, sin, nations and God's covenant dealings with the patriarchs, establishing the foundations of the biblical story.",
      background: "Genesis belongs to the ancient Near Eastern world. Its opening chapters address creation, humanity, the fall, judgement and the nations. Later chapters follow Abraham, Isaac, Jacob and Joseph, ending with Israel's family in Egypt.",
      themes: [
        "God as Creator and sovereign Lord",
        "Humanity made in God's image",
        "Sin, judgement, mercy and restoration",
        "Promise, covenant and faith",
        "God's calling and blessing of Abraham's family",
        "Providence, forgiveness and preservation",
        "God's purpose extending to the nations"
      ],
      keyVerses: [
        ["Genesis 1:1", "God is revealed as the Creator of heaven and earth."],
        ["Genesis 1:27", "Humanity is created in the image of God."],
        ["Genesis 12:2–3", "God promises to bless Abraham and extend blessing to the nations."],
        ["Genesis 15:6", "Abraham believes God, and his faith is counted as righteousness."],
        ["Genesis 50:20", "God's providence is seen even through human wrongdoing."]
      ],
      outline: [
        "God creates the heavens and the earth.",
        "The garden of Eden, humanity and marriage.",
        "The serpent, human disobedience and the fall.",
        "Cain, Abel and the spread of human violence.",
        "The genealogy from Adam to Noah.",
        "Human wickedness and God's instruction to Noah.",
        "The flood begins and the earth is covered.",
        "The waters recede and Noah leaves the ark.",
        "God's covenant with Noah and the sign of the rainbow.",
        "The families and nations descended from Noah.",
        "The tower of Babel and the genealogy to Abram.",
        "God calls Abram and promises blessing.",
        "Abram and Lot separate; God confirms the land promise.",
        "Abram rescues Lot and meets Melchizedek.",
        "God establishes His covenant promise with Abram.",
        "Hagar and the birth promise concerning Ishmael.",
        "The covenant sign of circumcision and the promise of Isaac.",
        "The visitors announce Isaac's birth; Abraham intercedes.",
        "Sodom and Gomorrah are judged; Lot is rescued.",
        "Abraham and Sarah in the land of Abimelech.",
        "Isaac is born; Hagar and Ishmael depart.",
        "Abraham's faith is tested concerning Isaac.",
        "Sarah dies and Abraham secures a burial place.",
        "A wife is found for Isaac; Rebekah comes to him.",
        "Abraham's death, Esau and Jacob's birth, and the birthright.",
        "Isaac in Gerar and the renewal of God's promise.",
        "Jacob receives Isaac's blessing.",
        "Jacob's dream at Bethel and God's promise.",
        "Jacob meets Rachel and marries Leah and Rachel.",
        "Jacob's family grows and his flocks increase.",
        "Jacob leaves Laban and returns toward Canaan.",
        "Jacob prepares to meet Esau and wrestles at Peniel.",
        "Jacob and Esau are reconciled.",
        "Dinah, Shechem and the actions of Simeon and Levi.",
        "Jacob returns to Bethel; Rachel and Isaac die.",
        "The descendants and chiefs of Esau.",
        "Joseph's dreams, his brothers' jealousy and his sale.",
        "Judah and Tamar.",
        "Joseph serves in Egypt and is imprisoned.",
        "Joseph interprets the dreams of Pharaoh's servants.",
        "Joseph interprets Pharaoh's dreams and rises to authority.",
        "Joseph's brothers come to Egypt for grain.",
        "Benjamin travels to Egypt with his brothers.",
        "Joseph tests his brothers; Judah pleads for Benjamin.",
        "Joseph reveals his identity and forgives his brothers.",
        "Jacob and his family travel to Egypt.",
        "Israel settles in Goshen; Joseph administers during famine.",
        "Jacob blesses Joseph's sons, Ephraim and Manasseh.",
        "Jacob blesses his sons and speaks concerning their future.",
        "Jacob is buried; Joseph reassures his brothers and dies."
      ]
    },

    Exodus: {
      testament: "Old Testament",
      chapters: 40,
      subtitle: "Deliverance, Covenant and God's Presence",
      author: "Moses is traditionally recognised as the author of Exodus and the other books of the Torah.",
      authorStudy: "Exodus presents Moses as a central leader, witness and mediator of God's covenant. Scholars discuss its composition and transmission, while Jewish and Christian traditions preserve the Mosaic attribution.",
      date: "A traditional view places the events of the Exodus in the second millennium BC. Some chronologies propose an earlier date and others a later date.",
      dateStudy: "The date of the Exodus and the final composition of the book remain debated. The biblical text should be read carefully alongside historical and archaeological discussions without presenting disputed dates as settled facts.",
      place: "The story begins in Egypt, moves through the wilderness and reaches Mount Sinai.",
      placeStudy: "The exact location of some wilderness stations and the precise identification of Mount Sinai remain debated.",
      audience: "Israel, God's covenant people, who needed to understand their deliverance from slavery, their identity as God's people and their calling to live in covenant with Him.",
      purpose: "To record God's deliverance of Israel from Egypt, the establishment of His covenant with the nation, the giving of the Law and the construction of the tabernacle.",
      background: "Exodus continues the family story at the end of Genesis. Israel's descendants multiply in Egypt, but a new Pharaoh enslaves them. God calls Moses, confronts Pharaoh through signs and plagues, delivers Israel through the sea and leads the people to Sinai.",
      themes: [
        "God hears the cry of the oppressed",
        "God's power over Pharaoh and the gods of Egypt",
        "Deliverance, redemption and freedom",
        "The Passover and the meaning of sacrifice",
        "God's covenant and the giving of His Law",
        "God's holiness and the call to obedience",
        "Worship, intercession and forgiveness",
        "God's presence dwelling among His people"
      ],
      keyVerses: [
        ["Exodus 3:7–8", "God sees the suffering of His people and declares His intention to deliver them."],
        ["Exodus 3:14", "God reveals Himself to Moses with the declaration, I AM THAT I AM."],
        ["Exodus 12:13", "The Passover blood is given as a sign of protection."],
        ["Exodus 14:13–14", "Moses calls Israel to stand firm and witness God's deliverance."],
        ["Exodus 20:1–3", "God begins the covenant commandments by identifying Himself as Israel's deliverer."],
        ["Exodus 33:14", "God promises Moses that His presence will go with him."],
        ["Exodus 34:6–7", "God reveals His character as merciful, gracious and just."]
      ],
      outline: [
        "Israel multiplies in Egypt and a new Pharaoh oppresses them.",
        "Moses is born, rescued and raised in Pharaoh's household.",
        "Moses flees Egypt; God appears to him at the burning bush.",
        "God commissions Moses and gives him signs for Israel.",
        "Moses and Aaron confront Pharaoh; the oppression increases.",
        "God renews His promises and identifies Himself as the LORD.",
        "Moses and Aaron continue their appeal before Pharaoh.",
        "The plagues of locusts and darkness confront Egypt.",
        "The final plague is announced; Israel receives Passover instructions.",
        "The firstborn of Egypt die; Israel is released from slavery.",
        "Israel begins its journey; God leads by cloud and fire.",
        "Israel crosses the sea; Pharaoh's army is defeated.",
        "Israel sings of God's deliverance and receives provision in the wilderness.",
        "God provides water and victory over Amalek.",
        "Jethro advises Moses to appoint capable leaders.",
        "Israel arrives at Sinai and receives God's covenant invitation.",
        "God speaks the Ten Commandments.",
        "Further covenant laws concerning worship and community life.",
        "Instructions concerning justice, worship and the covenant feast.",
        "The covenant is confirmed; Moses goes up the mountain.",
        "Israel makes the golden calf while Moses is on the mountain.",
        "Moses intercedes and calls for a response to Israel's sin.",
        "Moses pleads for God's presence and guidance.",
        "God renews the covenant and reveals His character to Moses.",
        "The people are instructed to bring offerings for the tabernacle.",
        "Skilled workers begin making the tabernacle and its furnishings.",
        "The ark, table, lampstand and other furnishings are made.",
        "The altar, courtyard and priestly garments are prepared.",
        "The work of the tabernacle is completed and presented to Moses.",
        "The tabernacle is erected, and God's glory fills it."
      ]
    },

    Leviticus: {
      testament: "Old Testament",
      chapters: 27,
      subtitle: "Holiness, Worship and Life with God",
      author: "Moses is traditionally recognised as the author of Leviticus, which forms part of the Torah.",
      authorStudy: "Leviticus repeatedly presents its laws and instructions as words communicated by the LORD to Moses. The book's literary formation and transmission are discussed by scholars, while the traditional Jewish and Christian understanding attributes it to Moses.",
      date: "The traditional setting places these instructions during Israel's wilderness period, following the construction of the tabernacle described at the end of Exodus.",
      dateStudy: "The date of the final written form is debated. The narrative setting and the history of the book's composition should be distinguished when studying its origins.",
      place: "The instructions are presented in the setting of the tabernacle in the wilderness, particularly at Mount Sinai.",
      placeStudy: "Leviticus 1:1 describes the LORD speaking to Moses from the tent of meeting. The precise historical setting and later development of Israel's worship are subjects of study.",
      audience: "The people of Israel, including priests and worshippers, who needed to understand sacrifice, purity, worship, justice and their calling to holiness.",
      purpose: "To teach Israel how to worship the holy God, how priests should serve, how sacrifices and purification were to be handled, and how the community should live in holiness, justice and covenant faithfulness.",
      background: "Leviticus follows the completion of the tabernacle in Exodus. God's presence dwells among Israel, and the people need instruction about approaching Him. The book explains offerings, priestly service, purity, atonement, holy living, sacred times and covenant responsibilities.",
      themes: [
        "The holiness and presence of God",
        "Sacrifice, atonement and forgiveness",
        "Priestly ministry and responsible worship",
        "Purity and the distinction between clean and unclean",
        "Holiness in everyday life",
        "Love of neighbour and justice",
        "The Sabbath, festivals and sacred seasons",
        "The Day of Atonement",
        "Covenant faithfulness, blessing and accountability"
      ],
      keyVerses: [
        ["Leviticus 11:44–45", "God calls His people to be holy because He is holy."],
        ["Leviticus 16:30", "The Day of Atonement provides cleansing from sin before the LORD."],
        ["Leviticus 17:11", "The life of the flesh is in the blood, given for atonement upon the altar."],
        ["Leviticus 19:2", "Israel is called to holiness because the LORD their God is holy."],
        ["Leviticus 19:18", "God commands His people to love their neighbour as themselves."],
        ["Leviticus 19:34", "The stranger is to be loved as oneself."],
        ["Leviticus 20:26", "God sets Israel apart to belong to Him."]
      ],
      outline: [
        "Instructions for burnt offerings.",
        "Instructions for grain offerings.",
        "Instructions for peace offerings.",
        "Instructions for sin offerings for different people and situations.",
        "Further instructions concerning guilt offerings and restitution.",
        "Priestly responsibilities in handling the offerings.",
        "Regulations for the priests and the beginning of their ministry.",
        "Aaron and his sons begin their priestly service; God's glory appears.",
        "The judgement of Nadab and Abihu for offering unauthorised fire.",
        "Clean and unclean animals and dietary distinctions.",
        "Purification after childbirth.",
        "Regulations concerning skin conditions and inspection.",
        "Further regulations concerning skin conditions and contaminated garments.",
        "Purification procedures for people healed of skin conditions.",
        "Regulations concerning bodily discharges and ritual cleanliness.",
        "The Day of Atonement and the cleansing of the sanctuary and people.",
        "The proper place and manner for sacrifices and the seriousness of blood.",
        "Prohibitions concerning forbidden sexual relationships.",
        "Holiness in worship, family life, justice and love of neighbour.",
        "Penalties for serious violations and the call to covenant holiness.",
        "Requirements for priestly holiness and acceptable offerings.",
        "Acceptable offerings and the sacred festivals of the LORD.",
        "The lampstand, the bread of the Presence and a case of blasphemy.",
        "The Sabbath year, Jubilee and care for the poor.",
        "Blessings for obedience and warnings concerning disobedience.",
        "Vows, dedicated persons, animals and property, and the tithe."
      ]
    },

    Numbers: {
      testament: "Old Testament",
      chapters: 36,
      subtitle: "Wilderness Journey, Testing and God's Faithfulness",
      image: "./images/books/d9f06adf-07c3-45b7-bb53-385c15032679.jpg",
      author: "Moses is traditionally recognised as the author of Numbers as part of the Torah.",
      authorStudy: "Numbers presents Moses as the leader receiving and recording God's instructions. The book contains narratives, laws, lists and records from Israel's wilderness journey. Scholars discuss its compilation and literary development.",
      date: "The narrative is set during Israel's wilderness journey, traditionally in the second millennium BC.",
      dateStudy: "The date of the events and the final composition of Numbers are debated. The traditional Mosaic setting should be distinguished from scholarly proposals about the book's formation.",
      place: "The narrative begins at Mount Sinai, continues through the wilderness and reaches the plains of Moab near the Jordan.",
      placeStudy: "Numbers records several wilderness locations, but the identification of some ancient sites remains uncertain. The plains of Moab form the final major setting before Israel enters Canaan.",
      audience: "Israel, the covenant community preparing to enter the Promised Land, and later generations learning from the nation's journey, failures and God's faithfulness.",
      purpose: "To record Israel's preparation, wilderness journey, rebellion, discipline and renewal, showing God's faithfulness to His covenant despite the people's repeated failures.",
      background: "Numbers follows Leviticus and begins while Israel is camped at Sinai. The people are counted and organised for their journey. Their journey is marked by complaints, rebellion, divine judgement and provision. The older generation dies in the wilderness, while a new generation is prepared to enter the land.",
      themes: [
        "God's faithfulness through the wilderness",
        "The holiness and order of the covenant community",
        "Leadership, responsibility and service",
        "Trust and unbelief",
        "Consequences of rebellion and disobedience",
        "God's provision and protection",
        "Intercession and mercy",
        "Preparation for entering the Promised Land"
      ],
      keyVerses: [
        ["Numbers 6:24–26", "The priestly blessing asks for the LORD's protection, grace and peace."],
        ["Numbers 14:18", "God is merciful and patient, yet takes sin seriously."],
        ["Numbers 14:24", "Caleb is commended for following God wholeheartedly."],
        ["Numbers 23:19", "God is not like humanity; He remains faithful to His word."],
        ["Numbers 24:17", "Balaam speaks of a coming ruler symbolised by a star and sceptre."],
        ["Numbers 32:23", "The people are warned that wrongdoing will be exposed."]
      ],
      outline: [
        "Israel is counted and organised around the tabernacle.",
        "The arrangement of the tribes and duties of the Levites.",
        "The Levites are appointed for service; the camp is kept holy.",
        "The duties of the Kohathites, Gershonites and Merarites.",
        "Purity in the camp and instructions concerning restitution and jealousy.",
        "The Nazirite vow and the priestly blessing.",
        "Tribal leaders bring offerings for the dedication of the altar.",
        "The lampstand is prepared and the Levites are consecrated.",
        "The Passover is observed; the cloud guides Israel's journey.",
        "Silver trumpets are made and Israel departs from Sinai.",
        "The people complain; God provides quail and judges the rebellion.",
        "Miriam and Aaron speak against Moses; Miriam is disciplined.",
        "Twelve spies explore Canaan and report on the land.",
        "Israel refuses to enter; God announces the wilderness judgement.",
        "The people receive further offerings and covenant instructions.",
        "Korah, Dathan and Abiram rebel against Moses and Aaron.",
        "Aaron's staff buds, confirming God's choice of priestly leadership.",
        "Duties and provisions assigned to priests and Levites.",
        "The red heifer and water for purification.",
        "Miriam dies; Moses strikes the rock; Edom refuses passage.",
        "Aaron dies; Israel faces opposition and the bronze serpent is raised.",
        "Israel travels toward Moab and defeats Sihon and Og.",
        "Balak summons Balaam, who blesses Israel instead of cursing them.",
        "Balaam's final sayings and the star prophecy.",
        "Israel falls into idolatry and immorality at Peor.",
        "A new census counts the generation preparing to enter Canaan.",
        "The daughters of Zelophehad request an inheritance; Joshua is appointed.",
        "Instructions for daily offerings, Sabbaths and monthly offerings.",
        "Instructions for annual feasts and sacred offerings.",
        "Vows made by men and women and their responsibilities.",
        "Israel takes action against Midian; the spoils are divided.",
        "The tribes of Reuben and Gad request land east of the Jordan.",
        "The stages of Israel's wilderness journey are recorded.",
        "Boundaries of Canaan and the leaders appointed to distribute the land.",
        "Cities for the Levites, cities of refuge and inheritance laws."
      ]
    },

    Deuteronomy: {
      testament: "Old Testament",
      chapters: 34,
      subtitle: "Remember, Love and Obey the LORD",
      image: "./images/books/d14a5cec-132e-4432-9604-9cb82cd8cf71.jpg",
      author: "Moses is traditionally associated with Deuteronomy, which records his final speeches to Israel before entering Canaan.",
      authorStudy: "The book presents Moses as the speaker of its central addresses. Its account of Moses' death in chapter 34 indicates a concluding continuation beyond his lifetime. Traditional attribution and scholarly discussion of its final form should be distinguished.",
      date: "The narrative setting is the final period of Israel's wilderness journey, on the plains of Moab before entering Canaan.",
      dateStudy: "The date and stages of Deuteronomy's composition are debated. Scholars discuss its relationship to Israel's history and the later biblical books, while its narrative setting remains Moses' final instruction to Israel.",
      place: "The plains of Moab, east of the Jordan River, opposite Jericho.",
      placeStudy: "Deuteronomy repeatedly places Moses and Israel in the land of Moab as the people prepare to cross the Jordan. The exact location of some named sites is uncertain.",
      audience: "The new generation of Israelites preparing to enter the Promised Land, together with later generations called to remember and remain faithful to God's covenant.",
      purpose: "To renew the covenant with Israel, remind the people of God's past faithfulness, explain the importance of loving and obeying Him, and prepare them to live faithfully in the land.",
      background: "Deuteronomy is framed as Moses' final addresses to Israel. He reviews the wilderness journey, repeats and explains covenant instruction, warns against idolatry and calls the people to wholehearted love for God. The book concludes with Moses' final blessing and death.",
      themes: [
        "Remembering God's faithfulness",
        "Loving God wholeheartedly",
        "Covenant obedience and faithfulness",
        "Teaching God's word to the next generation",
        "Justice, compassion and care for the vulnerable",
        "Rejecting idolatry and false worship",
        "Blessings, consequences and covenant choice",
        "God's enduring commitment to His people"
      ],
      keyVerses: [
        ["Deuteronomy 4:29", "Those who seek the LORD wholeheartedly are promised that they will find Him."],
        ["Deuteronomy 6:4–5", "Israel is called to love the LORD with all the heart, soul and strength."],
        ["Deuteronomy 8:3", "Life depends on every word that comes from God."],
        ["Deuteronomy 10:12–13", "God calls His people to reverence, love and obedience."],
        ["Deuteronomy 30:19–20", "Israel is urged to choose life by loving and holding fast to God."],
        ["Deuteronomy 31:6", "God's people are encouraged to be strong because He will not forsake them."]
      ],
      outline: [
        "Moses recalls Israel's journey from Horeb toward the Promised Land.",
        "Moses reviews the appointment of judges and Israel's journey.",
        "Israel's journey around Edom, Moab and Ammon is recalled.",
        "The defeat of Sihon and Og and the land east of Jordan.",
        "Moses urges Israel to obey God's commands and avoid idolatry.",
        "The covenant is recalled and the Ten Commandments are restated.",
        "Israel is called to love God and teach His commands to the next generation.",
        "Israel must remember God and avoid pride when prosperous.",
        "Israel's rebellion and the golden calf are remembered.",
        "Moses recalls the new tablets, the ark and God's call to serve Him.",
        "Israel is urged to remember God's works and obey His commands.",
        "The place of worship and the rejection of idolatry.",
        "Warnings against false prophets and unfaithful worship.",
        "Clean and unclean food and Israel's identity as God's people.",
        "The seventh-year release and generosity toward the poor.",
        "The Passover, Feast of Weeks and Feast of Tabernacles.",
        "Justice, leadership and regulations for Israel's community.",
        "Rules concerning witnesses, warfare and community responsibility.",
        "Atonement for unsolved murder and family responsibilities.",
        "Laws concerning property, marriage, compassion and neighbourly care.",
        "Purity in the camp, marriage, justice and protection of the vulnerable.",
        "Offerings of firstfruits and the people's covenant confession.",
        "Covenant renewal and the call to obedience.",
        "The covenant choice between blessing and curse is set before Israel.",
        "Moses appoints Joshua and encourages the people.",
        "Moses' song warns Israel and declares God's faithfulness.",
        "Moses is instructed to prepare for his death.",
        "Moses blesses the tribes of Israel.",
        "Moses views the Promised Land from Mount Nebo and dies."
      ]
    },

    Joshua: {
      testament: "Old Testament",
      chapters: 24,
      subtitle: "Entering the Promise and Serving the LORD",
      image: "./images/books/738dfb2c-b2e8-49d6-bc1c-d6766be38adf.jpg",
      author: "The book is traditionally associated with Joshua, Moses' successor and the leader of Israel's entry into Canaan.",
      authorStudy: "Joshua is a central witness and leader in the narrative. The book includes events after his death, so its final form reflects a concluding account beyond Joshua's lifetime. Its authorship and compilation are discussed by scholars.",
      date: "The narrative is set during Israel's entry into and settlement of Canaan, traditionally placed in the second millennium BC.",
      dateStudy: "The date of the conquest and the final composition of Joshua are debated. Archaeological interpretations and historical reconstructions differ, so proposed chronologies should be treated with care.",
      place: "The land of Canaan, west of the Jordan River, including Jericho, Ai, the central hill country, the south and the north.",
      placeStudy: "Joshua describes Israel crossing the Jordan and establishing settlements across the land. Some ancient place identifications remain debated.",
      audience: "Israel, the covenant people receiving their inheritance, and later generations learning about God's promises, leadership and covenant faithfulness.",
      purpose: "To record Israel's entry into Canaan, the distribution of the land, the fulfilment of God's promises and Joshua's call for the people to remain faithful to the LORD.",
      background: "Joshua follows Deuteronomy and begins after Moses' death. Joshua leads Israel across the Jordan, the people encounter the cities and peoples of Canaan, and the land is allocated among the tribes. The book ends with covenant renewal and Joshua's final challenge to serve the LORD.",
      themes: [
        "God keeps His promises",
        "Courage and obedience in leadership",
        "Faith and trust in God's word",
        "The importance of covenant faithfulness",
        "God's guidance and presence",
        "Inheritance, responsibility and community",
        "Remembering God's works",
        "Choosing whom to serve"
      ],
      keyVerses: [
        ["Joshua 1:8", "God's instruction is to remain in His word and live by it."],
        ["Joshua 1:9", "Joshua is commanded to be strong and courageous because God is with him."],
        ["Joshua 21:45", "Not one of God's good promises to Israel failed."],
        ["Joshua 23:14", "Joshua testifies that God's promises have all proved faithful."],
        ["Joshua 24:15", "Joshua calls Israel to choose whom they will serve."]
      ],
      outline: [
        "God commissions Joshua to lead Israel across the Jordan.",
        "Rahab receives the spies and makes an agreement with them.",
        "Israel crosses the Jordan on dry ground.",
        "Israel sets up memorial stones and celebrates the Passover.",
        "The commander of the LORD's army appears to Joshua.",
        "Jericho falls after Israel follows God's instructions.",
        "Achan's sin brings defeat at Ai; the sin is exposed.",
        "Israel defeats Ai and renews the covenant at Mount Ebal.",
        "The Gibeonites deceive Israel into making a treaty.",
        "Joshua defeats the southern coalition of kings.",
        "Israel defeats the northern kings and gains control of much of the land.",
        "The defeated kings east and west of the Jordan are listed.",
        "The remaining land is identified for possession.",
        "The land east of Jordan is recalled and Caleb receives Hebron.",
        "The inheritance of the tribes of Judah and Joseph is described.",
        "The land allotted to Ephraim and Manasseh is discussed.",
        "The remaining tribes receive their inheritance at Shiloh.",
        "Cities of refuge and the Levitical towns are appointed.",
        "The eastern tribes return home and explain the altar they built.",
        "Joshua gathers Israel and recalls God's acts for His people.",
        "Joshua urges Israel to remain faithful and avoid idolatry.",
        "Joshua renews the covenant and challenges Israel to serve the LORD.",
        "Joshua dies; Joseph's bones are buried and Eleazar dies."
      ]
    },

    Judges: {
      testament: "Old Testament",
      chapters: 21,
      subtitle: "Cycles of Rebellion, Oppression and Deliverance",
      image: "./images/books/0fc10dde-c515-45e8-916b-5a27f61b0841.jpg",
      author: "The human author is not named. Some Jewish traditions associate the book with Samuel, but the text does not identify its writer.",
      authorStudy: "Judges is part of the historical narrative of Israel. Its repeated cycles and editorial comments connect it with the wider biblical history. The date, sources and final compilation are matters of scholarly discussion.",
      date: "The narrative covers the period between Joshua's generation and the rise of Israel's monarchy.",
      dateStudy: "The chronology of the judges is complex because some periods may overlap. The date of the book's final form is debated, and should not be treated as certain.",
      place: "The events take place across the tribal territories of Israel, including the central hill country, northern regions and the south.",
      placeStudy: "Judges names many locations, but the precise identification of some ancient sites is uncertain. The narrative reflects a period before Israel had a central monarchy.",
      audience: "Israel and later generations who needed to understand the consequences of covenant unfaithfulness and the need for faithful leadership.",
      purpose: "To show the repeated cycle of Israel's disobedience, oppression, crying out and deliverance, revealing both God's mercy and the destructive consequences of turning away from Him.",
      background: "Judges follows the settlement narratives in Joshua. Israel has entered the land but has not fully removed the influences that draw the people into idolatry. A repeated pattern emerges: the people turn away from God, face oppression, cry out, and receive a deliverer. The book's closing chapters describe deep social and spiritual disorder.",
      themes: [
        "The consequences of disobedience",
        "God's mercy toward a repeatedly unfaithful people",
        "The need for wholehearted covenant loyalty",
        "God raising deliverers in times of oppression",
        "The dangers of idolatry and compromise",
        "Leadership, character and responsibility",
        "The spiritual and social cost of moral disorder",
        "The need for righteous leadership"
      ],
      keyVerses: [
        ["Judges 2:16", "The LORD raises judges who deliver Israel from its oppressors."],
        ["Judges 2:18", "God shows compassion when His people groan under oppression."],
        ["Judges 6:12", "Gideon is greeted with the assurance that the LORD is with him."],
        ["Judges 7:2", "God makes clear that victory comes from Him, not human strength."],
        ["Judges 21:25", "The closing summary describes Israel's lack of a king and the disorder of the period."]
      ],
      outline: [
        "Israel's incomplete conquest and the angel's warning at Bochim.",
        "A new generation turns from the LORD and the cycle of the judges begins.",
        "The nations left in the land test Israel; Othniel, Ehud and Shamgar deliver the people.",
        "Deborah and Barak lead Israel to victory over Sisera.",
        "Deborah and Barak sing a song celebrating the LORD's victory.",
        "Israel suffers under Midian; Gideon is called by God.",
        "Gideon tests the call and gathers an army.",
        "God reduces Gideon's army and gives victory over Midian.",
        "Gideon pursues the enemy; his later actions bring trouble.",
        "Abimelech seizes power and brings violence upon Shechem.",
        "Tola, Jair, Jephthah, Ibzan, Elon and Abdon lead Israel.",
        "Jephthah fights Ammon and makes a tragic vow.",
        "The Ephraimites quarrel with Jephthah; the conflict is resolved violently.",
        "Samson is announced and born; the LORD begins to stir him.",
        "Samson's marriage and conflict with the Philistines.",
        "Samson's revenge and the Philistine response.",
        "Samson is betrayed, blinded and imprisoned.",
        "Samson's final act brings down the Philistine temple.",
        "Micah establishes a private shrine and hires a Levite.",
        "The tribe of Dan takes Micah's shrine and captures Laish.",
        "Israel's outrage over a crime in Gibeah leads to civil war."
      ]
    },

    Ruth: {
      testament: "Old Testament", chapters: 4,
      subtitle: "Loyal Love, Redemption and God's Quiet Providence",
      author: "The book does not name its human author. Jewish tradition has associated it with Samuel, but the text itself leaves authorship unstated.",
      authorStudy: "The narrator's perspective, language and genealogy are studied in discussions of the book's date and composition. Samuel's authorship is a traditional proposal, not an explicit statement in the text.",
      date: "The events are set in the period of the judges, before the monarchy.",
      dateStudy: "The final composition date is debated. The genealogy reaching David may be relevant to the book's literary setting, but it does not by itself settle the date.",
      place: "Bethlehem in Judah and the fields and town of Moab are the principal settings.",
      placeStudy: "The narrative moves between Bethlehem and Moab. Specific field locations are not identified.",
      audience: "Israel, especially readers considering covenant faithfulness, family responsibility, care for the vulnerable and the line of David.",
      purpose: "To tell how Ruth, a Moabite widow, finds refuge and a family through loyal love and the role of a family redeemer, while tracing the ancestry of David.",
      background: "The story takes place during the unsettled era of the judges. Famine leads Naomi's family to Moab. After the deaths of her husband and sons, Naomi returns to Bethlehem with Ruth, whose loyalty and faithfulness become central to the story.",
      themes: ["Loyal love and covenant faithfulness", "God's providence in ordinary events", "Welcome and inclusion of a foreign widow", "Family responsibility and redemption", "Dignity, provision and care for the vulnerable", "The ancestry of David"],
      keyVerses: [["Ruth 1:16–17","Ruth expresses steadfast commitment to Naomi and Naomi's people and God."],["Ruth 2:12","Boaz recognises Ruth's refuge under the wings of Israel's God."],["Ruth 3:9","Ruth appeals to the family-redeemer responsibility."],["Ruth 4:14–17","The community celebrates the birth of Obed and the restoration of Naomi's family."]],
      outline: ["Chapters 1: Famine, loss and Ruth's decision to return to Bethlehem with Naomi.","Chapter 2: Ruth gleans in Boaz's field and receives protection and generosity.","Chapter 3: Ruth approaches Boaz at the threshing floor and asks him to act as redeemer.","Chapter 4: The nearer relative declines; Boaz redeems the family land and marries Ruth."]
    },
    "1 Samuel": {
      testament: "Old Testament", chapters: 31,
      subtitle: "Samuel, Saul and the Rise of David",
      author: "The book does not identify a single author. Jewish tradition associates Samuel with the historical records, while the narrative continues beyond his death.",
      authorStudy: "The books of Samuel appear to draw on historical traditions and records. Their final literary formation is discussed by scholars; a single named author cannot be established from the text.",
      date: "The narrative covers the transition from the period of the judges to the early monarchy.",
      dateStudy: "The final form of Samuel is generally understood to have taken shape through a process of transmission and editing. Precise dates and sources remain debated.",
      place: "The story centres on Shiloh, Ramah, Mizpah, Gibeah, Bethlehem and the regions where David flees from Saul.",
      placeStudy: "The narrative names many towns and regions, but some ancient site identifications remain debated. Read travel details from the biblical text without assuming every modern identification is certain.",
      audience: "Israel, learning about prophetic leadership, kingship, covenant obedience and God's choice of David.",
      purpose: "To narrate Israel's move toward monarchy, the rise and failure of Saul, and God's choice and preparation of David.",
      background: "The book opens with Hannah's prayer and Samuel's birth. Samuel becomes a prophet and judge. Israel asks for a king; Saul is anointed but repeatedly disobeys. David is chosen, defeats Goliath and becomes the object of Saul's jealousy.",
      themes: ["God hears prayer and raises leaders", "The authority of God's word", "The limits and responsibilities of kingship", "Obedience rather than outward appearance", "God's choice and preparation of David", "Courage, faith and reliance on God", "Jealousy, persecution and restraint"],
      keyVerses: [["1 Samuel 2:1–10","Hannah praises God's holiness, justice and power to reverse human fortunes."],["1 Samuel 3:10","Samuel responds to God's call with readiness to listen."],["1 Samuel 15:22","Samuel teaches that obedience is better than sacrifice."],["1 Samuel 16:7","God's choice is not governed by outward appearance."],["1 Samuel 17:45–47","David declares that the battle belongs to the LORD."]],
      outline: ["Chapters 1–3: Hannah prays; Samuel is born, dedicated and called by God.","Chapters 4–7: The ark is captured and returned; Samuel leads Israel in repentance and renewal.","Chapters 8–12: Israel asks for a king; Saul is chosen and publicly confirmed.","Chapters 13–15: Saul's disobedience undermines his kingship.","Chapters 16–17: David is anointed and defeats Goliath.","Chapters 18–20: Saul grows hostile; Jonathan and David form a covenant friendship.","Chapters 21–27: David lives as a fugitive but refuses to seize the throne by killing Saul.","Chapters 28–31: Saul seeks forbidden counsel, Israel is defeated, and Saul dies."]
    },
    "2 Samuel": {
      testament: "Old Testament", chapters: 24,
      subtitle: "David's Kingdom, Covenant and Consequences",
      author: "The book does not name its author. It continues the historical narrative begun in 1 Samuel.",
      authorStudy: "The text preserves multiple episodes, poems and court narratives. Its sources and final composition are subjects of scholarly study; no single author is named.",
      date: "The events cover David's reign over Judah and then all Israel.",
      dateStudy: "The final literary form belongs to the wider history of Samuel and Kings, whose composition and editing are debated.",
      place: "The narrative moves from Hebron to Jerusalem and includes battles and events across Israel and neighbouring territories.",
      placeStudy: "Jerusalem becomes David's political and worship centre. The exact location of some battle sites is uncertain.",
      audience: "Israel and later readers seeking to understand the Davidic dynasty, covenant promise, leadership and the consequences of sin.",
      purpose: "To record David's rise as king over all Israel, God's covenant promise to David, his failures and the turmoil within his household and kingdom.",
      background: "After Saul's death, David first rules Judah from Hebron and later becomes king over all Israel. He captures Jerusalem, brings the ark there and receives God's covenant promise. His adultery with Bathsheba and the killing of Uriah bring severe consequences, including rebellion within his family.",
      themes: ["God's covenant promise to David", "Jerusalem as the royal centre", "The responsibilities and failures of leadership", "Sin, confession, judgement and mercy", "The consequences of injustice within families", "God's faithfulness amid human weakness"],
      keyVerses: [["2 Samuel 5:3–5","David is anointed king over all Israel."],["2 Samuel 7:12–16","God promises to establish David's house and kingdom."],["2 Samuel 12:13","David acknowledges his sin after Nathan confronts him."],["2 Samuel 22:2–4","David praises God as his rock, fortress and deliverer."],["2 Samuel 23:3–4","David reflects on just rule under the fear of God."]],
      outline: ["Chapters 1–4: David mourns Saul and Jonathan and becomes king of Judah; conflict continues between the houses.","Chapters 5–6: David becomes king over all Israel, captures Jerusalem and brings the ark to the city.","Chapter 7: God makes a covenant promise concerning David's house and kingdom.","Chapters 8–10: David's kingdom expands and he shows kindness to Mephibosheth.","Chapters 11–12: David sins with Bathsheba; Nathan confronts him.","Chapters 13–18: Violence and rebellion unfold within David's family; Absalom dies.","Chapters 19–20: David returns to Jerusalem amid national division and another revolt.","Chapters 21–24: Closing narratives, songs, mighty men and David's census are recorded."]
    },
    "1 Kings": {
      testament: "Old Testament", chapters: 22,
      subtitle: "Solomon, the Divided Kingdom and the Prophets",
      author: "The book does not name its author. Jewish tradition has associated the wider Kings narrative with Jeremiah, but the text does not identify him as its writer.",
      authorStudy: "Kings is part of a larger historical work that evaluates rulers in relation to covenant faithfulness. Its sources, editorial shaping and date are debated.",
      date: "The narrative begins near the end of David's reign and continues through the reigns of Israel's and Judah's kings, ending with Jehoshaphat and Ahaziah.",
      dateStudy: "The final form of Kings is commonly discussed in relation to the Babylonian exile and later editorial activity. Precise stages of composition remain debated.",
      place: "Jerusalem, Samaria and the territories of Israel and Judah are central; important episodes also occur at Carmel, Horeb and Zarephath.",
      placeStudy: "The northern and southern kingdoms have distinct royal centres. Some prophetic journey locations are identified in the text, while exact modern site identifications may vary.",
      audience: "Israel and Judah, including later generations reflecting on the causes and meaning of national division and decline.",
      purpose: "To explain the succession of kings, the division of the kingdom, the building of the temple and the prophetic call to covenant faithfulness.",
      background: "David's final years lead to Solomon's succession. Solomon builds the temple but later turns toward foreign gods. After his death the kingdom divides into Israel in the north and Judah in the south. Prophets, especially Elijah, confront idolatry and injustice.",
      themes: ["Wisdom and the responsibility of leadership", "The temple and worship of the LORD", "Covenant faithfulness and idolatry", "The divided kingdom", "Prophetic courage and divine judgement", "Justice, humility and repentance"],
      keyVerses: [["1 Kings 3:9","Solomon asks for an understanding heart to govern the people."],["1 Kings 8:23","Solomon acknowledges the uniqueness and covenant faithfulness of God."],["1 Kings 8:27","The temple cannot contain the greatness of God."],["1 Kings 18:21","Elijah challenges Israel to stop wavering between the LORD and Baal."],["1 Kings 19:12–13","Elijah encounters the quiet voice after wind, earthquake and fire."]],
      outline: ["Chapters 1–2: Solomon succeeds David and establishes his kingdom.","Chapters 3–4: Solomon asks for wisdom and administers the kingdom.","Chapters 5–8: Solomon prepares, builds and dedicates the temple.","Chapters 9–11: Solomon's achievements and foreign alliances are followed by spiritual compromise.","Chapters 12–14: The kingdom divides; Jeroboam and Rehoboam lead the two kingdoms.","Chapters 15–16: A succession of kings rules Israel and Judah.","Chapters 17–19: Elijah announces drought, confronts Baal's prophets and travels to Horeb.","Chapters 20–22: Conflicts with Aram, Naboth's vineyard and the death of Ahab."]
    },
    "2 Kings": {
      testament: "Old Testament", chapters: 25,
      subtitle: "Prophetic Witness, Exile and the Fall of the Kingdoms",
      author: "The book does not name its author. It continues the historical account of the kingdoms of Israel and Judah.",
      authorStudy: "The narrative draws on prophetic and royal traditions. Its final shaping is commonly considered alongside the wider Deuteronomistic history, though details remain debated.",
      date: "The events continue from the ministry of Elisha through the fall of Samaria and the destruction of Jerusalem, ending with Jehoiachin's release in Babylon.",
      dateStudy: "The book's final form is often associated with the exilic period, with the closing notice reflecting events in the sixth century BC.",
      place: "Samaria and Jerusalem are central, with episodes in Moab, Syria, Assyria and Babylon.",
      placeStudy: "The account spans the northern and southern kingdoms and the empires that dominate the region. Some campaign routes and ancient site identifications require careful historical study.",
      audience: "The people of Judah and later readers seeking to understand exile, covenant judgement and the continuing hope of God's promises.",
      purpose: "To trace the decline and fall of Israel and Judah, showing the seriousness of covenant unfaithfulness while preserving signs of God's mercy and promise.",
      background: "Elijah is taken up and Elisha continues the prophetic ministry. Israel's rulers persist in idolatry, Samaria falls to Assyria, and Judah later falls to Babylon. The book closes with a small sign of hope when Jehoiachin is released from prison.",
      themes: ["The authority of God's prophetic word", "Covenant consequences and national responsibility", "Idolatry and injustice", "God's compassion and healing", "The fall of Samaria and Jerusalem", "Exile and the preservation of hope"],
      keyVerses: [["2 Kings 2:9–11","Elijah is taken up and Elisha receives his prophetic mantle."],["2 Kings 5:14","Naaman is healed after obeying the prophetic instruction."],["2 Kings 17:7–8","The fall of Israel is interpreted in light of covenant unfaithfulness."],["2 Kings 19:19","Hezekiah prays that the nations may know the LORD is God."],["2 Kings 25:27–30","Jehoiachin is released and treated with honour in Babylon."]],
      outline: ["Chapters 1–2: Elijah's final ministry and his departure; Elisha succeeds him.","Chapters 3–8: Elisha's signs, counsel and prophetic ministry.","Chapters 9–10: Jehu's revolt and the destruction of Ahab's house.","Chapters 11–12: Athaliah is removed and Joash repairs the temple.","Chapters 13–17: Israel's decline continues and Samaria falls to Assyria.","Chapters 18–20: Hezekiah trusts God during the Assyrian threat and later becomes ill.","Chapters 21–23: Manasseh's evil, Josiah's reforms and the rediscovery of the Law.","Chapters 24–25: Judah is conquered, Jerusalem and the temple are destroyed, and the people are exiled."]
    },
    "1 Chronicles": {
      testament: "Old Testament", chapters: 29,
      subtitle: "Israel's Lineage, David and Ordered Worship",
      author: "The book does not name its author. Jewish tradition associates Chronicles with Ezra, but this attribution is not stated in the text.",
      authorStudy: "Chronicles retells Israel's history using genealogies and earlier traditions. Its authorship, sources and post-exilic setting are subjects of scholarly discussion.",
      date: "The narrative retells events from Adam's descendants through David's reign.",
      dateStudy: "The work is generally understood as a post-exilic composition, though proposed dates and stages of editing vary.",
      place: "The account looks toward Jerusalem, the site of David's royal centre and the temple prepared by Solomon.",
      placeStudy: "Chronicles emphasises Jerusalem and the organisation of worship there. Genealogies connect communities across the land and beyond it.",
      audience: "The restored community of Israel, seeking continuity with its ancestors, covenant identity and ordered worship.",
      purpose: "To retell Israel's story with emphasis on David's covenant, the temple, the Levites and the organisation of worship.",
      background: "After extensive genealogies, the book recounts Saul's death and David's reign. It highlights David's preparations for the temple, the ark, the Levites, musicians and divisions of service.",
      themes: ["Continuity of God's people across generations", "The Davidic covenant", "Worship and the temple", "The role of Levites and musicians", "Leadership, preparation and service", "Seeking God wholeheartedly"],
      keyVerses: [["1 Chronicles 16:8–11","David's song calls the people to give thanks and seek the LORD."],["1 Chronicles 17:11–14","God promises an enduring house and kingdom to David."],["1 Chronicles 21:13","David entrusts himself to the mercy of the LORD."],["1 Chronicles 29:11–14","David acknowledges God's greatness and the source of every gift."]],
      outline: ["Chapters 1–9: Genealogies trace the families of Israel and the returned community.","Chapter 10: Saul's death marks the end of his reign.","Chapters 11–12: David becomes king and mighty warriors gather to him.","Chapters 13–16: The ark is brought to Jerusalem and worship is organised.","Chapter 17: God's covenant promise to David is recalled.","Chapters 18–20: David's victories and royal administration are summarised.","Chapters 21–22: The census, altar and preparations for the temple.","Chapters 23–27: Levites, priests, musicians, gatekeepers and military divisions are organised.","Chapters 28–29: David charges Solomon and the people give for the temple."]
    },
    "2 Chronicles": {
      testament: "Old Testament", chapters: 36,
      subtitle: "Solomon's Temple, Judah's Kings and Restoration",
      author: "The book does not name its author. It is part of the same historical work as 1 Chronicles.",
      authorStudy: "The Chronicler's sources and editorial perspective are studied in relation to the post-exilic community. The traditional attribution to Ezra remains a proposal rather than an explicit biblical claim.",
      date: "The narrative begins with Solomon and continues through the kings of Judah to the decree of Cyrus.",
      dateStudy: "The book is generally dated to the post-exilic period, though the precise date of composition is debated.",
      place: "Jerusalem and the temple dominate the narrative, with attention to Judah and the northern tribes.",
      placeStudy: "The account focuses on Judah's kings and Jerusalem while recalling the wider people of Israel.",
      audience: "The restored community, learning from Judah's history and seeking renewal in worship and covenant faithfulness.",
      purpose: "To recount the history of Judah with special attention to the temple, worship, reform, prophetic warning, exile and restoration.",
      background: "Solomon builds and dedicates the temple. The kingdom divides after his death, and Chronicles concentrates on the southern kingdom of Judah. It highlights reforms under Asa, Jehoshaphat, Hezekiah and Josiah, then records exile and the Persian decree allowing return.",
      themes: ["The temple as a centre of worship", "Seeking God and returning to Him", "Reform and covenant renewal", "The influence of faithful and unfaithful kings", "Prophetic warning and national accountability", "Judgement followed by the possibility of restoration"],
      keyVerses: [["2 Chronicles 7:14","God calls His people to humble themselves, pray, seek Him and turn from wicked ways."],["2 Chronicles 15:2","The prophet teaches that the LORD is with those who seek Him."],["2 Chronicles 20:12","Jehoshaphat confesses dependence on God in a time of danger."],["2 Chronicles 30:9","The people are urged to return to the LORD, who is gracious and merciful."],["2 Chronicles 36:22–23","Cyrus announces the opportunity to return and rebuild the temple."]],
      outline: ["Chapters 1–9: Solomon receives wisdom, builds the temple and establishes worship in Jerusalem.","Chapters 10–12: The kingdom divides and Rehoboam's reign begins.","Chapters 13–20: Judah's kings face conflict; Asa and Jehoshaphat pursue reforms.","Chapters 21–24: Jehoram, Ahaziah, Joash and their successors shape Judah's fortunes.","Chapters 25–28: Amaziah, Uzziah, Jotham and Ahaz reign with mixed outcomes.","Chapters 29–32: Hezekiah restores temple worship and faces the Assyrian threat.","Chapters 33–35: Manasseh repents; Josiah renews the covenant and celebrates Passover.","Chapter 36: Judah's final kings, Jerusalem's fall, exile and Cyrus's decree."]
    },
    Ezra: {
      testament: "Old Testament", chapters: 10,
      subtitle: "Return from Exile and Restoration of Worship",
      author: "The book does not explicitly identify its author. Ezra the priest and scribe is central to the later narrative and is traditionally associated with the book.",
      authorStudy: "Ezra contains first-person memoir material, lists and documents. Its compilation and relationship to Chronicles and Nehemiah are discussed by scholars.",
      date: "The events cover the first returns under Persian rule and Ezra's later mission to Jerusalem.",
      dateStudy: "The narrative spans several decades in the Persian period. The relationship between the events in chapters 4–6 and the later mission in chapters 7–10 requires attention to the book's structure.",
      place: "Jerusalem and the province of Judah under Persian administration.",
      placeStudy: "The return journeys begin in Babylon and Persia and lead to Jerusalem. The book also names surrounding communities and officials.",
      audience: "The returned Judean community and later generations learning about restoration, worship and covenant identity.",
      purpose: "To record the return from exile, rebuilding of the temple, restoration of worship and Ezra's work in teaching the Law.",
      background: "Persia conquers Babylon and Cyrus permits exiled peoples to return. The first group rebuilds the altar and temple despite opposition. Later, Ezra arrives with authority to teach and organise the community, confronting unfaithfulness.",
      themes: ["God's faithfulness to restore His people", "Providence through rulers and public decisions", "Worship and rebuilding the temple", "Perseverance amid opposition", "The authority of Scripture and teaching", "Holiness and covenant identity"],
      keyVerses: [["Ezra 1:1–3","Cyrus issues a decree allowing the people to return and rebuild the temple."],["Ezra 3:11","The people praise the LORD as the temple foundation is laid."],["Ezra 7:10","Ezra devotes himself to studying, practising and teaching God's Law."],["Ezra 9:8–9","Ezra recognises God's grace in granting the community a measure of restoration."]],
      outline: ["Chapters 1–2: Cyrus's decree and the first return from exile.","Chapters 3–4: The altar and temple foundation are restored; opposition interrupts the work.","Chapters 5–6: The prophets encourage rebuilding and the temple is completed and dedicated.","Chapters 7–8: Ezra receives authority and leads another group to Jerusalem.","Chapters 9–10: Ezra responds to covenant unfaithfulness and the community undertakes reform."]
    },
    Nehemiah: {
      testament: "Old Testament", chapters: 13,
      subtitle: "Rebuilding Jerusalem and Renewing the Covenant",
      author: "The book contains first-person accounts from Nehemiah. It does not provide a formal statement identifying the final compiler.",
      authorStudy: "The memoir material, lists and covenant documents are studied in relation to the book's composition and its connection with Ezra.",
      date: "The narrative is set during the Persian period, especially the reign of Artaxerxes I in the fifth century BC.",
      dateStudy: "The book records events across more than one visit by Nehemiah. The sequence and relationship of some reforms are discussed by historians.",
      place: "Jerusalem is the main setting, with the Persian court at Susa and surrounding regions also mentioned.",
      placeStudy: "Nehemiah travels from Susa to Jerusalem and organises work around the city's walls and gates. The text names many local sites and neighbouring groups.",
      audience: "The returned community and later readers learning about prayerful leadership, communal responsibility and covenant renewal.",
      purpose: "To record the rebuilding of Jerusalem's walls, Nehemiah's leadership and the people's renewal of their commitment to God's Law.",
      background: "Nehemiah hears that Jerusalem's walls remain broken and prays before seeking the king's permission to return. Despite opposition, the people rebuild the walls. Ezra reads the Law, the people confess their sins and covenant commitments are renewed.",
      themes: ["Prayer joined with courageous action", "Leadership and shared responsibility", "Perseverance under opposition", "Justice and care for the poor", "Public reading and understanding of Scripture", "Confession and covenant renewal"],
      keyVerses: [["Nehemiah 1:4–6","Nehemiah responds to Jerusalem's condition with mourning, fasting and prayer."],["Nehemiah 2:17–18","Nehemiah invites the people to rebuild and they strengthen their hands for the work."],["Nehemiah 4:14","The people are encouraged to remember the Lord and protect their families."],["Nehemiah 8:8","The Law is read and explained so the people can understand it."],["Nehemiah 8:10","The joy of the LORD is declared to be the people's strength."]],
      outline: ["Chapter 1: Nehemiah hears the report about Jerusalem and prays.","Chapters 2–3: Nehemiah arrives, inspects the walls and organises the rebuilding teams.","Chapter 4: The builders face threats and continue with watchful determination.","Chapter 5: Nehemiah confronts exploitation and restores economic justice.","Chapters 6–7: Opposition fails; the wall is completed and the people are registered.","Chapters 8–10: The Law is read, the people confess and a covenant commitment is made.","Chapters 11–12: Jerusalem is repopulated and the wall is dedicated.","Chapter 13: Nehemiah returns and addresses further failures in community life."]
    },
    Esther: {
      testament: "Old Testament", chapters: 10,
      subtitle: "Courage, Deliverance and Providence in Exile",
      author: "The book does not name its author. The narrator's identity is unknown.",
      authorStudy: "The book's literary style, historical setting and relationship to Persian sources are studied by scholars. Its author is not identified in the text.",
      date: "The events take place during the reign of Ahasuerus, commonly identified with Xerxes I of Persia, in the fifth century BC.",
      dateStudy: "The identification of Ahasuerus with Xerxes I is widely held, while the precise date and historical details of the narrative continue to be discussed.",
      place: "Susa, one of the Persian royal capitals, is the principal setting.",
      placeStudy: "The narrative is set within the Persian imperial court and describes Jewish life in the diaspora. Susa's archaeological remains provide wider historical context.",
      audience: "Jewish communities living outside the land and later readers reflecting on identity, courage and deliverance.",
      purpose: "To recount the deliverance of the Jewish people from Haman's planned destruction and explain the origin of the festival of Purim.",
      background: "Esther becomes queen in the Persian court. Haman plots to destroy the Jews after Mordecai refuses to honour him. Esther risks approaching the king, exposes the plot and helps secure the people's deliverance.",
      themes: ["Providence and deliverance", "Courage in the face of danger", "Wisdom and timely action", "The vulnerability and resilience of minority communities", "Remembering deliverance through Purim", "Reversal of pride and injustice"],
      keyVerses: [["Esther 4:14","Mordecai challenges Esther to consider whether she has come to royal position for such a time."],["Esther 4:16","Esther calls for a fast before she approaches the king."],["Esther 7:3–6","Esther reveals her identity and exposes Haman's plot."],["Esther 9:20–22","Mordecai establishes the remembrance of Purim."]],
      outline: ["Chapters 1–2: Vashti is removed; Esther is chosen as queen and Mordecai uncovers a plot.","Chapters 3–4: Haman's decree threatens the Jews; Mordecai urges Esther to act.","Chapters 5–7: Esther prepares banquets, Haman's pride grows, and his plot is exposed.","Chapters 8–9: A new decree allows the Jews to defend themselves; deliverance is remembered through Purim.","Chapter 10: Mordecai's position and service are briefly recorded."]
    },

    Job: {
      testament: "Old Testament", chapters: 42,
      subtitle: "Suffering, Wisdom and the Sovereignty of God",
      author: "The book does not name its human author. Job is its central figure.",
      authorStudy: "The narrator's identity is unknown. The book's poetic dialogue, prose framework, language and relationship to Israel's wisdom tradition are widely studied; proposed authorship and dates remain debated.",
      date: "The story is set in a patriarchal-style world, but the narrative does not provide a firm calendar date.",
      dateStudy: "The setting, language and literary history have led to different proposals for the book's date. These should be presented as scholarly possibilities, not settled facts.",
      place: "The land of Uz is named as Job's home.",
      placeStudy: "The exact location of Uz is uncertain. Biblical references associate the name with regions east or southeast of Israel, but a precise modern map point cannot be established from the text alone.",
      audience: "Readers seeking wisdom about suffering, integrity, human limits and trust in God's justice.",
      purpose: "To explore the mystery of undeserved suffering, challenge simplistic explanations of hardship and direct readers toward reverence for God's wisdom and sovereignty.",
      background: "The book opens with a righteous man who suffers devastating loss. Job's friends argue that his suffering must be punishment for wrongdoing. Their speeches, Job's responses and God's appearance expose the limits of human explanations and call for humility before the Creator.",
      themes: ["The sovereignty and wisdom of God", "The reality of undeserved suffering", "Integrity under severe testing", "The limits of human wisdom", "The danger of judging another person's suffering", "Lament, honest questioning and perseverance", "God's justice and compassion"],
      keyVerses: [["Job 1:20–22","Job grieves deeply yet refuses to charge God with wrongdoing."],["Job 2:9–10","Job rejects the idea that faithfulness means receiving only pleasant things."],["Job 19:25–27","Job expresses hope in his living Redeemer."],["Job 28:28","Wisdom is connected with reverence for the Lord and turning from evil."],["Job 38:1–4","God answers Job from the whirlwind and confronts the limits of human understanding."],["Job 42:1–6","Job responds with humility after encountering God's greatness."]],
      outline: ["Chapters 1–2: Job's integrity, heavenly testing and sudden suffering.","Chapters 3–14: Job laments; the first cycle of speeches begins.","Chapters 15–21: The friends continue their accusations and Job answers.","Chapters 22–27: The debate continues as Job maintains his integrity.","Chapter 28: A wisdom poem asks where true wisdom can be found.","Chapters 29–31: Job remembers his former life and makes his final defence.","Chapters 32–37: Elihu speaks about God's justice and greatness.","Chapters 38–41: The LORD answers Job and displays the wonders of creation.","Chapter 42: Job responds, the friends are corrected and Job's fortunes are restored."]
    },
    Psalms: {
      testament: "Old Testament", chapters: 150,
      subtitle: "Prayer, Praise, Lament and Worship",
      author: "The Psalter contains works associated with David, Asaph, the sons of Korah, Solomon, Moses, Heman and Ethan, as well as many anonymous psalms.",
      authorStudy: "Psalms is a collection formed over time, not a single-author book. Superscriptions preserve traditional attributions and musical or liturgical notes; their interpretation and historical relationship to each psalm require care.",
      date: "The collection includes poems associated with different periods of Israel's history, from the wilderness tradition to the post-exilic community.",
      dateStudy: "Individual psalms have different historical settings. The final shape of the five-book Psalter developed over an extended period; no single date explains the whole collection.",
      place: "The psalms arise from worship and life across Israel, with Jerusalem and the temple especially important in many songs.",
      placeStudy: "Some psalms mention specific events or places, while others provide no location. A place should be attached to an individual psalm only when its text or reliable historical evidence supports it.",
      audience: "Israel's worshipping community and later readers who bring praise, thanksgiving, confession, lament and hope before God.",
      purpose: "To give God's people inspired language for worship and prayer, to remember God's works, to reflect on His instruction and to express trust through every season of life.",
      background: "The 150 psalms include hymns, laments, thanksgiving songs, royal psalms, wisdom poems and songs of ascent. They are arranged in five books and were used in Israel's worship and devotion. Their variety teaches that faithful prayer includes joy, grief, repentance, protest and confidence.",
      themes: ["Praise of God as Creator and King", "Covenant faithfulness and steadfast love", "Prayer in suffering and danger", "Confession, forgiveness and restoration", "God's instruction and wisdom", "The hope of the king and God's kingdom", "Worship in the gathered community", "Trust and thanksgiving"],
      keyVerses: [["Psalm 1:1–3","The blessed person delights in the instruction of the LORD."],["Psalm 23:1–4","The LORD is portrayed as shepherd and faithful guide."],["Psalm 27:1","The LORD is described as light, salvation and stronghold."],["Psalm 46:1","God is a refuge and strength, present help in trouble."],["Psalm 51:10–12","David asks for a clean heart and renewed spirit."],["Psalm 119:105","God's word is a lamp to the feet and a light to the path."],["Psalm 150:6","Everything that has breath is called to praise the LORD."]],
      outline: ["Psalms 1–41 — Book I: Many prayers of David, including trust, lament and praise.","Psalms 42–72 — Book II: Prayers associated with the sons of Korah, Asaph, David and Solomon; closes with a royal prayer.","Psalms 73–89 — Book III: Community worship and reflection on national crisis and the covenant.","Psalms 90–106 — Book IV: The eternal reign of God, human frailty and the LORD's kingship.","Psalms 107–150 — Book V: Thanksgiving, instruction, songs of ascent and the great closing praise."]
    },
    Proverbs: {
      testament: "Old Testament", chapters: 31,
      subtitle: "Wisdom for Godly and Skillful Living",
      author: "Solomon is associated with many proverbs. The book also identifies sayings of the wise, the men of Hezekiah, Agur and King Lemuel.",
      authorStudy: "Proverbs is a collected anthology with several named contributors and editorial groupings. Its own headings should guide attribution; it should not be described as the work of Solomon alone.",
      date: "The collections reflect wisdom traditions from the monarchic period and later editorial activity.",
      dateStudy: "The individual collections may have different dates. Proverbs 25:1 explicitly associates one collection with the scribes of Hezekiah, while the date of the book's final arrangement is not stated.",
      place: "The book reflects family, household, marketplace, city gate, court and community life in ancient Israel.",
      placeStudy: "Proverbs is wisdom literature rather than a travel narrative. Its settings are social and instructional scenes, not a single geographical location.",
      audience: "Learners, young people, families, leaders and all who seek discernment in everyday decisions.",
      purpose: "To teach wisdom, discipline, justice, sound judgement and the fear of the LORD, helping readers recognise the paths that lead toward life or ruin.",
      background: "Proverbs belongs to the wisdom literature of the Old Testament. Short sayings, longer teaching poems and reflections on wisdom address speech, work, money, relationships, leadership, justice, self-control and the home. Its general principles should be read wisely rather than treated as mechanical guarantees.",
      themes: ["The fear of the LORD as the beginning of knowledge", "Wisdom and foolishness", "The power and responsibility of speech", "Diligence, work and stewardship", "Justice, honesty and care for the vulnerable", "Family, friendship and faithful relationships", "Humility, correction and self-control", "The personification of wisdom"],
      keyVerses: [["Proverbs 1:7","The fear of the LORD is the beginning of knowledge."],["Proverbs 3:5–6","Readers are urged to trust the LORD and acknowledge Him in every path."],["Proverbs 4:23","The heart is to be guarded with diligence."],["Proverbs 9:10","The fear of the LORD is the beginning of wisdom."],["Proverbs 15:1","A gentle answer can turn away wrath."],["Proverbs 31:10–31","The capable woman is praised for wisdom, diligence and care."]],
      outline: ["Chapters 1–9: Extended instructions on wisdom, the fear of the LORD and the contrast between wisdom and folly.","Chapters 10–22:16: Proverbs of Solomon, often arranged as concise contrasts and practical observations.","Chapters 22:17–24:34: Sayings of the wise about discipline, justice and daily conduct.","Chapters 25–29: Proverbs of Solomon collected by the scribes of Hezekiah.","Chapter 30: The sayings of Agur, including reflections on human limits and contentment.","Chapter 31: The sayings associated with King Lemuel and the poem praising a capable woman."]
    },
    Ecclesiastes: {
      testament: "Old Testament", chapters: 12,
      subtitle: "The Search for Meaning Under the Sun",
      author: "The speaker identifies himself as Qoheleth, traditionally rendered 'the Preacher' or 'the Teacher', and describes himself as son of David and king in Jerusalem.",
      authorStudy: "The book's relationship to Solomon is traditionally affirmed in many Jewish and Christian readings, while the identity of Qoheleth and the literary framing of the book remain subjects of scholarly discussion.",
      date: "The setting evokes the wisdom and royal world of Jerusalem.",
      dateStudy: "Proposals for the book's composition range across different periods. The language and literary features are debated, so a precise date should not be presented as certain.",
      place: "Jerusalem is named in the opening description of the speaker.",
      placeStudy: "The reflections range beyond one location, considering work, pleasure, injustice, time, wealth, death and human life under the sun.",
      audience: "Readers wrestling with life's meaning, limits, injustice, work, pleasure, mortality and reverence for God.",
      purpose: "To examine the limits of human achievement and wisdom, expose the frustration of trying to control life, and call readers to receive God's gifts and live in reverence before Him.",
      background: "Ecclesiastes uses observation, reflection, proverb and personal experiment. The repeated phrase 'under the sun' frames life viewed within its earthly limits. The book does not simply dismiss life as worthless; it challenges false certainty and points toward humility, gratitude and accountability before God.",
      themes: ["The limits of human achievement", "The passing nature of earthly life", "Wisdom and its limitations", "Work, pleasure and wealth", "Time, injustice and mortality", "Receiving daily gifts with gratitude", "Reverence for God and accountability"],
      keyVerses: [["Ecclesiastes 1:2","The Teacher introduces the book's searching reflection on life's fleeting character."],["Ecclesiastes 3:1","There is a season and appointed time for every activity."],["Ecclesiastes 3:11","God has made everything fitting in its time, while human understanding remains limited."],["Ecclesiastes 5:10","The love of money does not satisfy."],["Ecclesiastes 7:14","Readers are called to consider both prosperity and adversity."],["Ecclesiastes 12:13–14","The conclusion calls people to fear God, keep His commandments and remember His judgement."]],
      outline: ["Chapter 1: The cycles of life and the limits of human wisdom.","Chapter 2: The Teacher tests pleasure, achievement, possessions and work.","Chapter 3: A time for every purpose; human limits and God's work.","Chapter 4: Oppression, rivalry, loneliness and the value of companionship.","Chapter 5: Reverence in worship, wealth and contentment.","Chapter 6: The frustration of possessions without the ability to enjoy them.","Chapter 7: Wisdom for adversity, moderation and human weakness.","Chapter 8: Wisdom, authority, justice and the limits of observation.","Chapter 9: Mortality, uncertainty and receiving life's portion.","Chapter 10: The contrast between wisdom and folly in public and private life.","Chapter 11: Generosity, courage and action amid uncertainty.","Chapter 12: Remember the Creator; the conclusion calls for reverence and obedience."]
    },
    "Song of Solomon": {
      testament: "Old Testament", chapters: 8,
      subtitle: "Love, Delight and Covenant Faithfulness",
      author: "The title associates the song with Solomon, but the precise meaning of the Hebrew attribution and the identity of its composer are discussed.",
      authorStudy: "The book is a collection of love poetry with dramatic voices and recurring refrains. Interpretations include a celebration of human love, readings connected with wisdom and, in Jewish and Christian traditions, allegorical or theological readings. These approaches should be distinguished rather than collapsed into one claim.",
      date: "The poem evokes royal and rural settings and uses imagery from the natural world of the ancient Near East.",
      dateStudy: "The language includes features that have led scholars to propose different dates and stages of composition. A precise date is uncertain.",
      place: "Jerusalem, vineyards, gardens and pastoral landscapes appear in the poem's imagery.",
      placeStudy: "The poem mentions locations such as Jerusalem, En-gedi, Lebanon, Tirzah and the countryside. Some references are poetic comparisons, not necessarily travel records or exact map coordinates.",
      audience: "The covenant community and readers reflecting on love, desire, commitment, beauty and faithful relationships.",
      purpose: "To celebrate love and mutual delight, portray the dignity of embodied affection and invite thoughtful reflection on commitment and faithful love.",
      background: "Song of Solomon stands among the Bible's poetic and wisdom books. It gives voice to a woman and a man whose affection is expressed through vivid poetry, longing, praise and mutual desire. Its imagery belongs to its ancient setting; responsible interpretation respects the poem's literary form and does not reduce every line to a literal event.",
      themes: ["Mutual love and delight", "Faithfulness and commitment", "The dignity of embodied affection", "Longing, patience and proper timing", "Beauty and poetic imagery", "The strength and value of love"],
      keyVerses: [["Song of Solomon 2:7","The poem warns against awakening love before its proper time."],["Song of Solomon 2:16","The lovers express mutual belonging."],["Song of Solomon 4:7","The beloved is praised in language of beauty and affection."],["Song of Solomon 8:6–7","Love is portrayed as powerful and not purchasable." ]],
      outline: ["Chapters 1–2: The lovers express longing, admiration and the importance of love's proper timing.","Chapters 3–4: Searching, celebration and poetic praise of the beloved.","Chapters 5–6: Separation, renewed seeking and mutual admiration.","Chapters 7–8: Delight, longing, commitment and the enduring strength of love."]
    },

    Isaiah: {
      testament: "Old Testament", chapters: 66,
      subtitle: "The Holy One, Judgment, Comfort and Hope",
      author: "The book opens with the vision of Isaiah son of Amoz, whose prophetic ministry was based in Judah and Jerusalem during the eighth century BC.",
      authorStudy: "Traditional Jewish and Christian readings associate the book with Isaiah son of Amoz. Many modern scholars distinguish the historical prophet's eighth-century messages in chapters 1–39 from later exilic and post-exilic prophetic material in chapters 40–55 and 56–66. Other interpreters argue for greater literary and theological unity. The history of the book's formation remains a subject of study.",
      date: "Isaiah's ministry is associated with the reigns of Uzziah, Jotham, Ahaz and Hezekiah in the eighth century BC.",
      dateStudy: "The book reflects more than one historical horizon: Assyrian pressure in the eighth century, the Babylonian exile, and the restoration period under Persian rule. The date of individual passages and the final form of the book should not be collapsed into a single year.",
      place: "Jerusalem and the kingdom of Judah are central settings in the prophet's ministry and many of the book's messages.",
      placeStudy: "The book also addresses Israel and surrounding nations, and later chapters speak to exiles and the restored community. Cyrus of Persia is named in Isaiah 44:28–45:1.",
      audience: "Judah and Jerusalem in Isaiah's own generation, the wider people of God facing exile, and later communities seeking hope and faithfulness.",
      purpose: "To call God's people away from injustice, idolatry and misplaced political trust; proclaim the holiness and sovereignty of the LORD; announce judgment and restoration; and offer hope through God's promised salvation and servant.",
      background: "Isaiah speaks during a period of Assyrian expansion and political danger. The book confronts the leaders and people of Judah with God's holiness and their responsibility to practise justice. It then opens a horizon of comfort for exiles and hope for a renewed people and creation. Its poetry, historical narratives, oracles and visions form a rich prophetic collection.",
      themes: ["The holiness and glory of the LORD", "Justice, righteousness and care for the vulnerable", "Trust in God rather than political alliances", "Judgment on Judah and the nations", "The remnant and hope of restoration", "The servant and God's saving purpose", "The reign of the promised king", "Comfort, new creation and the nations worshipping God"],
      keyVerses: [["Isaiah 6:1–8","Isaiah's vision of the holy LORD leads to cleansing and a prophetic commission."],["Isaiah 7:14","A sign is given in the setting of the crisis faced by Ahaz."],["Isaiah 9:6–7","A royal child is associated with justice and the enduring reign of David's house."],["Isaiah 40:1–5","The people are comforted with the announcement of God's coming glory."],["Isaiah 53:4–6","The servant's suffering is described in relation to the people's transgressions."],["Isaiah 55:1–3","The thirsty are invited to receive God's abundant provision."],["Isaiah 61:1–3","Good news, liberty and comfort are proclaimed to those in need."]],
      outline: ["Chapters 1–5: Judah's unfaithfulness is exposed and the prophet announces judgment and hope.","Chapter 6: Isaiah sees the LORD enthroned and receives his commission.","Chapters 7–12: The crisis under Ahaz, the sign of Immanuel and promises concerning the coming king.","Chapters 13–23: Oracles concerning Babylon and other nations.","Chapters 24–27: Visions of judgment, deliverance and the LORD's reign.","Chapters 28–35: Warnings against false security and promises of God's saving rule.","Chapters 36–39: Historical accounts of Hezekiah, Assyria and the Babylonian envoys.","Chapters 40–48: Comfort for God's people and the LORD's sovereignty over history and the nations.","Chapters 49–55: The servant's mission, suffering and the invitation to receive God's covenant mercy.","Chapters 56–59: The restored community is called to justice, faithful worship and repentance.","Chapters 60–62: Zion's restoration and the light of God's salvation.","Chapters 63–66: Prayer, judgment, hope and the vision of new heavens and a new earth."]
    },
    Jeremiah: {
      testament: "Old Testament", chapters: 52,
      subtitle: "The Prophet of Warning, Tears and the New Covenant",
      author: "The book is associated with Jeremiah son of Hilkiah, a priest from Anathoth in the land of Benjamin, whom God called to prophetic ministry during the reign of Josiah.",
      authorStudy: "The book preserves Jeremiah's prophetic words, personal experiences and historical narratives. Jeremiah 36 describes Baruch writing and rewriting the prophet's messages. The book's arrangement, editorial growth and relationship between its Hebrew and Greek forms are complex and continue to be studied.",
      date: "Jeremiah's ministry began in the thirteenth year of King Josiah and continued through the final years of Judah and the fall of Jerusalem in 586 BC.",
      dateStudy: "The collection includes messages from several reigns and material from after Jerusalem's destruction. Its present form likely reflects a process of preservation and compilation extending into the exile.",
      place: "Jeremiah's ministry centres on Anathoth and Jerusalem, with later events taking place in Babylon and Egypt.",
      placeStudy: "The book describes Jeremiah's movements within Judah, his imprisonment in Jerusalem, the exile to Babylon, and the forced journey of a group of Judeans to Egypt. These settings should be linked to the passages that name them.",
      audience: "The people of Judah and Jerusalem, their kings and leaders, the exiles in Babylon, and later readers seeking to understand judgment, repentance and hope.",
      purpose: "To call Judah to return to the LORD, explain the coming Babylonian judgment, record the prophet's costly ministry, and proclaim God's promise of restoration and a new covenant.",
      background: "Jeremiah ministers as Judah faces the growing power of Babylon. He warns that the temple and royal institutions cannot protect a people who persist in injustice and covenant unfaithfulness. His messages are resisted by rulers and false prophets. Jerusalem falls, but the book also announces a future in which God will write His instruction on the hearts of His people.",
      themes: ["The call to repentance and covenant faithfulness", "The word of the LORD and the cost of prophetic obedience", "Judgment on injustice, idolatry and false security", "The danger of false prophets", "The fall of Jerusalem and the Babylonian exile", "Lament, grief and faithful perseverance", "The promise of restoration", "The new covenant and a renewed heart"],
      keyVerses: [["Jeremiah 1:4–10","Jeremiah is called and appointed as a prophet to the nations."],["Jeremiah 6:16","The people are urged to seek the good way and walk in it."],["Jeremiah 7:1–11","The temple sermon challenges confidence in religious buildings without obedience."],["Jeremiah 17:7–8","The person who trusts in the LORD is compared to a tree planted by water."],["Jeremiah 29:10–14","The exiles receive a promise of God's purposes and their future return."],["Jeremiah 31:31–34","God promises a new covenant with His law written on the heart."],["Jeremiah 33:14–16","The promise of a righteous Branch from David's line is renewed."]],
      outline: ["Chapter 1: Jeremiah's call and commission.","Chapters 2–6: Judah's unfaithfulness and the warning of invasion from the north.","Chapters 7–10: The temple sermon and the contrast between the living God and idols.","Chapters 11–20: Covenant warnings, opposition and Jeremiah's personal laments.","Chapters 21–29: Messages to Judah's kings, false prophets and the exiles.","Chapters 30–33: The Book of Consolation and promises of restoration and a new covenant.","Chapters 34–38: The final years of Jerusalem, the Rechabites, the scroll and Jeremiah's imprisonment.","Chapters 39–45: Jerusalem falls; events under Gedaliah, the flight to Egypt and a word for Baruch.","Chapters 46–51: Oracles concerning Egypt, Philistia, Moab, Ammon, Edom, Babylon and other nations.","Chapter 52: A historical account of Jerusalem's fall, exile and the later release of Jehoiachin."]
    },
    Lamentations: {
      testament: "Old Testament", chapters: 5,
      subtitle: "Grief, Confession and Hope after Jerusalem's Fall",
      author: "The Hebrew text does not name its author. Jewish and Christian tradition has often associated the poems with Jeremiah.",
      authorStudy: "The book's superscription in the ancient Greek tradition connects it with Jeremiah, but the Hebrew book itself is anonymous. Many readers understand the poems as the work of someone close to the catastrophe; the precise author and compositional history are not known.",
      date: "The poems respond to the destruction of Jerusalem and the temple by Babylon in 586 BC.",
      dateStudy: "The vivid descriptions suggest composition in the aftermath of the city's fall, although the exact date and the sequence in which the five poems were collected are not certain.",
      place: "Jerusalem and its devastated streets, gates, sanctuary and surrounding community are the central setting.",
      placeStudy: "The poems also remember Judah's wider suffering and the displacement of its people. Their geographical language is poetic and should be read as lament rather than a travel account.",
      audience: "The survivors of Jerusalem's destruction, the exiles and later generations who need language for grief, confession and hope.",
      purpose: "To give faithful expression to the suffering caused by Jerusalem's destruction, acknowledge the weight of sin and judgment, and continue to appeal to God's compassion and covenant faithfulness.",
      background: "Lamentations consists of five carefully shaped poems mourning the fall of Jerusalem. The speakers describe hunger, violence, bereavement, humiliation and the loss of worship. The poems do not hide anguish; they bring it before God and preserve a place for hope even amid devastation.",
      themes: ["Grief and communal lament", "The devastation of Jerusalem", "The consequences of injustice and covenant unfaithfulness", "The suffering of the vulnerable", "Honest prayer in the midst of pain", "God's compassion and faithfulness", "The longing for restoration"],
      keyVerses: [["Lamentations 1:1–2","The opening poem portrays Jerusalem as a lonely and grieving city."],["Lamentations 2:17","The poem recognises the fulfilment of the LORD's warning and judgment."],["Lamentations 3:21–24","Hope returns through the remembrance of God's steadfast love and mercies."],["Lamentations 3:40–42","The community is called to examine its ways and return to the LORD."],["Lamentations 5:19–22","The final prayer appeals to God's enduring reign and asks for restoration."]],
      outline: ["Chapter 1: Jerusalem is pictured as a widow grieving her loss and humiliation.","Chapter 2: The poem mourns the destruction of the city, sanctuary and community.","Chapter 3: An individual voice moves through suffering toward hope in God's compassion and faithfulness.","Chapter 4: The former honour of Zion is contrasted with the horror of siege and destruction.","Chapter 5: The community prays for remembrance, mercy and restoration."]
    },
    Ezekiel: {
      testament: "Old Testament", chapters: 48,
      subtitle: "God's Glory, Judgment and the Promise of a Renewed People",
      author: "The book identifies its prophet as Ezekiel son of Buzi, a priest among the Judean exiles in Babylonia.",
      authorStudy: "The book is presented largely through Ezekiel's first-person prophetic experiences and dated messages. Its carefully arranged visions, symbolic actions and oracles have also been studied for their editorial shaping and transmission.",
      date: "Ezekiel's first dated vision is associated with 593 BC, and the latest dated oracle in the book is from 571 BC.",
      dateStudy: "The dated messages provide a framework for Ezekiel's ministry during the Babylonian exile. The dates of the final arrangement and transmission of the whole book are not identical to the dates of every oracle.",
      place: "Ezekiel receives his call among the exiles by the Kebar canal in Babylonia.",
      placeStudy: "The prophet's messages move between the exilic community and visionary scenes of Jerusalem and the future temple. The exact modern identification of every canal and settlement named in the book should not be assumed.",
      audience: "The Judean exiles in Babylonia and later generations seeking to understand God's holiness, judgment, presence and promise of restoration.",
      purpose: "To explain the spiritual significance of Jerusalem's judgment, affirm God's glory among the exiles, call the people to repentance and proclaim the renewal of Israel under God's shepherding care.",
      background: "Ezekiel is called after the deportation of King Jehoiachin and many Judeans to Babylon. His visions portray the glory of God, the seriousness of Jerusalem's idolatry and the departure of divine glory from the temple. After the city's fall, the message turns strongly toward hope: a new heart, a restored people, a renewed land and a vision of God's presence among them.",
      themes: ["The glory and holiness of God", "The responsibility of individuals and leaders", "Judgment on idolatry and injustice", "The departure and return of God's glory", "The watchman and responsibility to warn", "The good shepherd and care for the flock", "A new heart and a new spirit", "The valley of dry bones and restored life", "The renewed temple and God's presence"],
      keyVerses: [["Ezekiel 1:26–28","Ezekiel sees a vision of divine glory beside the Kebar canal."],["Ezekiel 18:30–32","The people are called to turn and receive a new heart and spirit."],["Ezekiel 34:11–16","The LORD promises to seek, gather and shepherd His scattered flock."],["Ezekiel 36:24–28","God promises cleansing, a new heart and His Spirit within His people."],["Ezekiel 37:1–14","The vision of dry bones portrays God's power to restore life to the people."],["Ezekiel 37:24–28","The restored people are promised a shepherd, covenant peace and God's sanctuary among them."],["Ezekiel 47:1–12","Water flows from the temple in a vision of life and healing."]],
      outline: ["Chapters 1–3: The vision of God's glory and Ezekiel's call as watchman.","Chapters 4–7: Symbolic actions and warnings concerning Jerusalem's coming siege.","Chapters 8–11: Visions of temple abominations and the departure of God's glory.","Chapters 12–19: Signs, parables and messages exposing false confidence and failed leadership.","Chapters 20–24: Israel's history, the final warnings and the announcement of Jerusalem's siege.","Chapters 25–32: Oracles against surrounding nations, including Ammon, Moab, Edom, Philistia, Tyre, Sidon and Egypt.","Chapters 33–36: The fall of Jerusalem, the watchman renewed, the good shepherd and promises of restoration.","Chapters 37–39: The valley of dry bones, the reunification of the people and the conflict with Gog.","Chapters 40–48: The vision of a renewed temple, worship, land and the LORD's presence among His people."]
    },
    Daniel: {
      testament: "Old Testament", chapters: 12,
      subtitle: "Faithfulness in Exile and God's Sovereignty over Empires",
      author: "The book presents Daniel as a Judean exile who serves in the courts of Babylonian and Persian rulers and receives visions concerning the kingdoms of the world.",
      authorStudy: "Traditional Jewish and Christian interpretation associates the book with Daniel, a sixth-century BC exile. Many modern scholars distinguish older court tales from the visions and discuss the book's final form in relation to the crisis under Antiochus IV in the second century BC. These positions should be described fairly and not presented as if there were no debate.",
      date: "The narrative setting begins with Daniel's deportation to Babylon in the reign of Nebuchadnezzar and continues through the Persian period.",
      dateStudy: "The book contains Hebrew and Aramaic sections and reflects more than one literary form. Traditional dating places the book in the sixth century BC; many critical scholars date its final apocalyptic form to the second century BC while recognising earlier traditions. The dating question remains important for interpretation.",
      place: "Babylon is the principal setting of the court narratives; later visions name Susa, the Ulai canal and other imperial settings.",
      placeStudy: "Daniel's visions range across symbolic geographical and political landscapes. Some locations are historical places, while beasts, horns and kingdoms also function as symbolic imagery and must not be mapped as ordinary travel destinations.",
      audience: "Jewish readers living under foreign rule and later communities seeking courage, wisdom and hope during political pressure.",
      purpose: "To encourage faithful worship and wise living under foreign empires, proclaim God's sovereignty over rulers and history, and assure God's people that oppression will not have the final word.",
      background: "Daniel and his companions are portrayed as exiles serving in imperial courts while remaining loyal to God. The first six chapters contain court narratives about wisdom, courage and deliverance. Chapters 7–12 contain apocalyptic visions that interpret the rise and fall of kingdoms and encourage endurance and hope.",
      themes: ["God's sovereignty over kings and empires", "Faithfulness under pressure and persecution", "Wisdom, prayer and integrity", "The limits of human power", "The kingdom given to the Son of Man", "God's deliverance and the courage of faithful witnesses", "Resurrection and final hope", "The endurance of God's people"],
      keyVerses: [["Daniel 1:8","Daniel resolves not to defile himself with the royal food."],["Daniel 2:20–22","Daniel praises God as the one who changes times, removes kings and gives wisdom."],["Daniel 3:16–18","The three friends remain faithful even when deliverance is not guaranteed."],["Daniel 4:34–35","Nebuchadnezzar acknowledges God's everlasting dominion."],["Daniel 7:13–14","One like a son of man receives everlasting dominion and a kingdom."],["Daniel 9:3–19","Daniel prays with confession and appeals to God's mercy."],["Daniel 12:2–3","The book speaks of awakening from the dust and the hope of everlasting life."]],
      outline: ["Chapter 1: Daniel and his companions remain faithful in the Babylonian court.","Chapter 2: Nebuchadnezzar's dream reveals the rise and fall of kingdoms and God's enduring kingdom.","Chapter 3: The three friends refuse the golden image and are delivered from the furnace.","Chapter 4: Nebuchadnezzar is humbled and learns that God rules over human kingdoms.","Chapter 5: The writing on the wall announces the fall of Babylon.","Chapter 6: Daniel remains faithful in prayer and is delivered from the lions.","Chapter 7: Daniel sees four beasts and one like a son of man receiving dominion.","Chapter 8: The vision of the ram and goat portrays conflict between kingdoms.","Chapter 9: Daniel prays and receives the vision of the seventy weeks.","Chapters 10–12: A heavenly messenger reveals conflict, suffering, endurance and the final hope of resurrection."]
    },

    Hosea: {
      testament: "Old Testament", chapters: 14,
      subtitle: "Covenant Love and the Call to Return",
      author: "The book identifies its prophet as Hosea son of Beeri, whose ministry took place during the reigns of Uzziah, Jotham, Ahaz and Hezekiah of Judah and Jeroboam II of Israel.",
      authorStudy: "The prophetic messages are associated with Hosea. The book's arrangement and transmission may include later editorial shaping, but the text does not provide a detailed account of its final compilation.",
      date: "Hosea's ministry belongs to the eighth century BC, before the fall of the northern kingdom of Israel to Assyria in 722 BC.",
      dateStudy: "The superscription names several Judean kings and Jeroboam II of Israel. The exact dates of individual oracles and the book's final arrangement are not specified.",
      place: "The northern kingdom of Israel is the main audience, with Samaria, Bethel and other northern centres reflected in the messages.",
      placeStudy: "The prophet's own home is not identified. The book speaks to the northern kingdom and uses place names connected with Israel's worship, history and political life.",
      audience: "The northern kingdom of Israel, especially its leaders and people, and later readers learning about covenant faithfulness and God's enduring love.",
      purpose: "To expose Israel's covenant unfaithfulness and false worship, warn of judgment, and reveal the LORD's persistent love and invitation for His people to return.",
      background: "Hosea ministers during a period of outward prosperity and deep spiritual and social corruption in the northern kingdom. His family life becomes a prophetic sign of Israel's unfaithfulness, while the book repeatedly shows that judgment does not cancel God's desire to heal and restore.",
      themes: ["Covenant faithfulness and spiritual unfaithfulness", "God's steadfast love and compassion", "The pain of betrayal and the call to return", "False worship and misplaced trust", "Justice, mercy and knowledge of God", "Judgment and the possibility of restoration", "The healing love of the LORD"],
      keyVerses: [["Hosea 1:2","Hosea's family life is appointed as a sign concerning Israel's unfaithfulness."],["Hosea 2:19–20","The LORD promises a renewed covenant relationship marked by righteousness, justice and steadfast love."],["Hosea 3:1","Hosea's love for his unfaithful wife becomes a sign of the LORD's love for Israel."],["Hosea 6:6","The LORD desires steadfast love and knowledge of God rather than empty ritual."],["Hosea 11:1–4","God remembers loving Israel and describes His care with parental tenderness."],["Hosea 14:1–4","Israel is invited to return and receive healing and freely given love."]],
      outline: ["Chapters 1–3: Hosea's marriage and family become a sign of Israel's covenant unfaithfulness and God's enduring love.","Chapters 4–7: Charges against Israel's priests, people and leaders; empty worship and political schemes are exposed.","Chapters 8–10: Israel's false security, idolatry and coming judgment are announced.","Chapters 11–13: God's compassion is set alongside the people's rebellion and the consequences of their choices.","Chapter 14: A final invitation to return, receive healing and walk in the ways of the LORD."]
    },
    Joel: {
      testament: "Old Testament", chapters: 3,
      subtitle: "The Day of the LORD and the Promise of His Spirit",
      author: "The book identifies its prophet as Joel son of Pethuel.",
      authorStudy: "The book gives little biographical information about Joel. Its date is debated because it names no reigning king and refers to several historical and religious realities that have been interpreted in different periods.",
      date: "The book addresses Judah and Jerusalem through the imagery of a devastating locust plague and a coming day of the LORD.",
      dateStudy: "Proposals range from the pre-exilic period to the post-exilic period. The text itself does not provide a decisive date, so a specific century should not be stated as certain.",
      place: "Judah and Jerusalem, including the temple and its worship, are the principal settings.",
      placeStudy: "The book also names surrounding peoples and the Valley of Jehoshaphat in its vision of divine judgment. The exact identification of that valley is uncertain and should not be assigned a precise map point without qualification.",
      audience: "The people of Judah, its priests and worshipping community, and later readers awaiting God's restoration and the outpouring of His Spirit.",
      purpose: "To call the people to wholehearted repentance, interpret the locust devastation as a warning about the day of the LORD, and proclaim God's promise to restore His people and pour out His Spirit.",
      background: "Joel begins with a devastating locust invasion that has damaged crops and disrupted worship. The prophet calls the community to lament and return to God. The message then widens to the day of the LORD, judgment among the nations, restoration of Judah and the promise that God's Spirit will be poured out.",
      themes: ["The day of the LORD", "Repentance from the heart", "The mercy and compassion of God", "The restoration of the land", "The outpouring of God's Spirit", "Judgment among the nations", "The LORD dwelling with His people"],
      keyVerses: [["Joel 1:14","The community is called to gather, fast and cry out to the LORD."],["Joel 2:12–13","God calls His people to return with all their heart because He is gracious and compassionate."],["Joel 2:28–29","The LORD promises to pour out His Spirit on all kinds of people."],["Joel 2:32","Those who call on the name of the LORD will find deliverance."],["Joel 3:16","The LORD is described as a refuge and stronghold for His people."]],
      outline: ["Chapter 1: The locust plague devastates the land; the prophet calls the people and priests to lament and seek the LORD.","Chapter 2: The day of the LORD is announced; the people are called to repent; God promises restoration and the outpouring of His Spirit.","Chapter 3: The nations are summoned for judgment, while the LORD becomes a refuge for Judah and dwells with His people."]
    },
    Amos: {
      testament: "Old Testament", chapters: 9,
      subtitle: "Justice, Righteousness and the LORD's Call to Account",
      author: "The book presents Amos as a herdsman and cultivator from Tekoa in Judah, called to prophesy concerning Israel during the reigns of Uzziah and Jeroboam II.",
      authorStudy: "Amos is identified as a shepherd or herdsman from Tekoa. The book preserves his prophetic speeches and visions; the process by which the collection reached its final form is not described in detail.",
      date: "Amos's ministry belongs to the middle of the eighth century BC, before the northern kingdom of Israel fell to Assyria.",
      dateStudy: "The superscription places Amos in the reigns of Uzziah of Judah and Jeroboam II of Israel and refers to an earthquake. The precise date of that earthquake and the book's final editing are not certain.",
      place: "Amos comes from Tekoa in Judah but directs much of his message toward the northern kingdom, especially Bethel and Samaria.",
      placeStudy: "The book also names surrounding nations and uses images from the countryside, royal sanctuary, marketplace and city gate. These settings reveal the social reach of the prophet's message.",
      audience: "The people and leaders of the northern kingdom of Israel, particularly those who benefit from wealth while neglecting justice and the poor.",
      purpose: "To announce the LORD's judgment on injustice, exploitation, corrupt worship and complacent leadership, and to call the people to seek God and practise righteousness.",
      background: "Amos speaks in a period of political strength and economic prosperity for Israel. Beneath the outward success, the prophet sees exploitation, dishonest trade, legal corruption and worship separated from justice. He insists that religious ceremonies cannot substitute for a life shaped by God's righteousness.",
      themes: ["Justice and righteousness", "The LORD's authority over all nations", "Care for the poor and vulnerable", "The danger of religious hypocrisy", "The certainty of accountability", "The call to seek the LORD and live", "Hope beyond judgment"],
      keyVerses: [["Amos 3:7–8","The prophet explains the urgency of speaking when the LORD has revealed His word."],["Amos 4:12","Israel is warned to prepare to meet its God."],["Amos 5:14–15","The people are urged to seek good, hate evil and establish justice."],["Amos 5:21–24","The LORD rejects worship divorced from justice and calls for justice to roll like waters."],["Amos 7:14–15","Amos explains that the LORD took him from his work and commissioned him to prophesy."],["Amos 9:11–15","The book closes with a promise of restoration and renewed abundance."]],
      outline: ["Chapters 1–2: Oracles against surrounding nations culminate in judgment on Judah and Israel.","Chapters 3–6: Israel is confronted with privilege, injustice, false security and empty worship.","Chapters 7–9: Five visions announce judgment; Amos intercedes, confronts opposition and receives a final promise of restoration."]
    },
    Obadiah: {
      testament: "Old Testament", chapters: 1,
      subtitle: "Edom's Pride, the Day of the LORD and Zion's Hope",
      author: "The book identifies its prophet only as Obadiah, a name meaning 'servant of the LORD'. No family or biographical details are supplied.",
      authorStudy: "Several biblical figures bear the name Obadiah, but the book does not identify its prophet with any one of them. The author should therefore be described as the prophet named in the book, without assuming a biography.",
      date: "The book announces judgment on Edom for its pride and its violence against Jacob.",
      dateStudy: "Many interpreters connect the accusations with Edom's conduct during or after Jerusalem's destruction by Babylon in 586 BC. Other proposals place the oracle earlier. The text does not state a date, so the historical setting remains debated.",
      place: "Edom, the mountainous territory southeast of Judah, is the principal target; Jerusalem and Mount Zion are central to the promise of restoration.",
      placeStudy: "The book refers to Edom's highland strongholds and to the plight of Judah. Its brief poetic form does not provide a travel route or a detailed list of archaeological sites.",
      audience: "Judah and the people who have suffered Edom's hostility, as well as readers learning that pride and violence are accountable to God.",
      purpose: "To announce that Edom's pride and betrayal will be judged, affirm God's justice among the nations, and proclaim the restoration of Zion and the LORD's kingdom.",
      background: "Edom and Judah share an ancestral connection through Esau and Jacob. Obadiah condemns Edom for standing by, rejoicing and taking advantage when Jerusalem suffered. The oracle declares that no mountain stronghold can protect a nation from God's justice and that the day of the LORD concerns all nations.",
      themes: ["Pride and false security", "Brotherhood and responsibility", "Violence and betrayal", "The day of the LORD", "Justice among the nations", "The restoration of Zion", "The LORD's kingdom"],
      keyVerses: [["Obadiah 1:3–4","Edom's pride and confidence in its high places are challenged."],["Obadiah 1:10–14","Edom is condemned for violence and for exploiting Judah's disaster."],["Obadiah 1:15","The day of the LORD is announced as a day of accountability among the nations."],["Obadiah 1:17","Deliverance and holiness are promised on Mount Zion."],["Obadiah 1:21","The book concludes with the declaration that the kingdom will belong to the LORD."]],
      outline: ["Verses 1–9: Edom's pride, strongholds and leaders are brought low.","Verses 10–14: Edom is condemned for violence and betrayal against its brother Jacob.","Verses 15–18: The day of the LORD brings judgment to the nations and deliverance to Zion.","Verses 19–21: The restored people inherit their land and the kingdom belongs to the LORD."]
    },
    Jonah: {
      testament: "Old Testament", chapters: 4,
      subtitle: "God's Mercy Beyond Our Boundaries",
      author: "The book centres on Jonah son of Amittai, a prophet also mentioned in 2 Kings 14:25 in connection with Gath-hepher and the reign of Jeroboam II.",
      authorStudy: "The narrative does not name its writer. Jonah is its central character, but the identity and date of the book's composer are not stated. The book's genre and historical interpretation have been discussed in Jewish and Christian scholarship.",
      date: "The story is set in the world of Assyria, whose capital Nineveh is the destination of Jonah's prophetic mission.",
      dateStudy: "Jonah son of Amittai is associated with the eighth century BC in 2 Kings 14:25, but the date when the book of Jonah was composed is debated and cannot be fixed from that reference alone.",
      place: "The narrative moves from the land of Israel toward Joppa, the sea, Nineveh and the area outside the city.",
      placeStudy: "The book names Nineveh as a great Assyrian city and Joppa as the port from which Jonah attempts to flee. The narrative's movement should not be turned into a precise modern travel itinerary without further evidence.",
      audience: "Israel and later readers who need to consider God's compassion toward outsiders and the danger of resenting mercy shown to others.",
      purpose: "To reveal God's freedom to show compassion to a foreign city, expose the prophet's narrow response, and invite readers to share God's concern for people beyond their own community.",
      background: "Jonah receives a mission to proclaim judgment against Nineveh but travels in the opposite direction. A storm, a great fish, the city's repentance and the prophet's anger all become part of a story that challenges assumptions about who deserves mercy. The final question leaves the reader to consider the breadth of God's compassion.",
      themes: ["God's mercy toward the nations", "The limits of human compassion", "Repentance and changed conduct", "The sovereignty of God over creation", "Obedience and resistance to God's call", "Prayer in distress", "The danger of resentment and self-righteousness"],
      keyVerses: [["Jonah 1:1–3","Jonah receives the call to go to Nineveh but attempts to flee."],["Jonah 2:1–9","Jonah prays from the depths and acknowledges that salvation belongs to the LORD."],["Jonah 3:5–10","The people of Nineveh respond to the warning with repentance."],["Jonah 4:2","Jonah acknowledges God's gracious and compassionate character while expressing his anger."],["Jonah 4:10–11","The LORD challenges Jonah's concern for a plant by revealing His concern for the people of Nineveh."]],
      outline: ["Chapter 1: Jonah flees from the LORD's commission; a storm arises and Jonah is thrown into the sea.","Chapter 2: Jonah prays from inside the great fish and is delivered.","Chapter 3: Jonah proclaims judgment in Nineveh and the city responds with repentance.","Chapter 4: Jonah resents God's mercy; the LORD uses a plant to challenge the prophet's narrow compassion."]
    },

    Micah: {
      testament: "Old Testament", chapters: 7,
      subtitle: "Justice, Mercy and the Hope of God's Coming Ruler",
      author: "The book identifies Micah as the Morashtite, a prophet from Moresheth in Judah, who spoke during the reigns of Jotham, Ahaz and Hezekiah.",
      authorStudy: "Micah is presented as a prophet from a rural town in Judah. Jeremiah 26:18 later recalls his message during Hezekiah's reign. The book preserves prophetic oracles and promises arranged in a carefully shaped collection.",
      date: "Micah's ministry belongs to the eighth century BC, during the period of Assyrian expansion and the fall of Samaria in 722 BC.",
      dateStudy: "The superscription names Jotham, Ahaz and Hezekiah. The messages address both Samaria and Jerusalem and reflect more than one stage of the Assyrian crisis.",
      place: "Moresheth in Judah is associated with Micah; Samaria and Jerusalem are the principal cities addressed by his prophecies.",
      placeStudy: "The book also names Bethlehem and other towns of Judah. Bethlehem appears in a promise concerning a ruler whose origins are associated with ancient days.",
      audience: "The people and leaders of Israel and Judah, especially those responsible for injustice, exploitation and corrupt leadership.",
      purpose: "To expose the injustice and false worship of both kingdoms, announce the consequences of covenant unfaithfulness, and proclaim hope for a restored people under God's righteous rule.",
      background: "Micah speaks while Assyria threatens the kingdoms of Israel and Judah. He condemns leaders who exploit the poor, judges who accept bribes and prophets who serve their own interests. Yet the book also promises that God will gather a remnant, establish peace and shepherd His people.",
      themes: ["Justice and care for the vulnerable", "The danger of corrupt leadership", "True worship and covenant faithfulness", "Judgment on Samaria and Jerusalem", "The remnant and restoration", "The ruler from Bethlehem", "God's mercy and forgiveness"],
      keyVerses: [["Micah 4:1–4","The nations are pictured coming to the LORD's instruction and learning the ways of peace."],["Micah 5:2","Bethlehem is named in a promise concerning a ruler for Israel."],["Micah 6:6–8","The prophet calls for justice, steadfast love and humble walking with God."],["Micah 7:7","Micah declares that he will look to the LORD and wait for the God of his salvation."],["Micah 7:18–20","The book closes by celebrating God's mercy and faithfulness to His covenant promises."]],
      outline: ["Chapters 1–2: Judgment is announced against Samaria and Judah; injustice and land-grabbing are condemned.","Chapter 3: Corrupt rulers, judges and prophets are confronted.","Chapters 4–5: Hope is announced for Zion, the gathering of a remnant and the ruler associated with Bethlehem.","Chapter 6: The LORD brings a covenant case against His people and calls them to justice, mercy and humility.","Chapter 7: The prophet laments widespread corruption but ends with trust in God's mercy and faithfulness."]
    },
    Nahum: {
      testament: "Old Testament", chapters: 3,
      subtitle: "The Fall of Nineveh and the Justice of God",
      author: "The book identifies its prophet as Nahum the Elkoshite. The location of Elkosh is uncertain.",
      authorStudy: "Little is known about Nahum beyond the title and his oracle against Nineveh. The book's poetic language and historical focus have been studied in relation to the fall of the Assyrian capital.",
      date: "The prophecy concerns Nineveh, the capital of Assyria, and announces its coming destruction.",
      dateStudy: "Nahum refers to the fall of Thebes (No-Amon) in 663 BC as a past event and predicts Nineveh's fall in 612 BC. This places the book's setting between those events, although the precise date of composition is not stated.",
      place: "Nineveh in Assyria is the principal city addressed; Judah is the community receiving the message of comfort.",
      placeStudy: "The book also refers to Thebes in Egypt as an example of a city that fell. Elkosh, Nahum's home, has not been securely identified.",
      audience: "Judah, which had experienced Assyrian domination, and readers who need assurance that violent imperial power is accountable to God.",
      purpose: "To announce the fall of oppressive Nineveh, affirm the LORD's justice and sovereignty over nations, and comfort those who have suffered under Assyrian violence.",
      background: "Assyria had conquered the northern kingdom of Israel and threatened Judah. Nahum's oracle portrays Nineveh's military power, wealth and fortifications as unable to withstand God's judgment. The message is not a celebration of cruelty but an assurance that oppression and violence do not have the final word.",
      themes: ["The justice and power of God", "The downfall of oppressive empires", "The limits of military strength and wealth", "Judgment on violence and cruelty", "Comfort and hope for Judah", "The LORD's sovereignty over nations"],
      keyVerses: [["Nahum 1:2–3","The LORD is described as just, patient and powerful, not treating guilt as though it did not matter."],["Nahum 1:7","The LORD is a stronghold in the day of trouble and knows those who take refuge in Him."],["Nahum 1:15","Good news of peace is announced to Judah."],["Nahum 2:13","The LORD declares judgment on Nineveh's violence and military power."],["Nahum 3:5–7","Nineveh's pride and shame are exposed before the nations."]],
      outline: ["Chapter 1: A hymn-like announcement of the LORD's justice, power and protection for those who trust Him.","Chapter 2: Nineveh's siege and downfall are portrayed in vivid poetic language.","Chapter 3: The reasons for Nineveh's judgment are exposed, and the city is declared unable to escape."]
    },
    Habakkuk: {
      testament: "Old Testament", chapters: 3,
      subtitle: "Honest Questions, Patient Faith and the Sovereignty of God",
      author: "The book identifies its prophet as Habakkuk, but provides no family background or detailed biography.",
      authorStudy: "Habakkuk is presented as a prophet who brings difficult questions to God. The book's dialogue, oracle and closing prayer form a distinctive literary whole; the prophet's precise life dates are not given.",
      date: "The book reflects a time of injustice in Judah and the rise of Babylon (the Chaldeans) as a threatening imperial power.",
      dateStudy: "Many place the prophecy in the late seventh or early sixth century BC, before Jerusalem's fall in 586 BC. Proposals differ about whether the setting is under Josiah or Jehoiakim; the text does not name a king.",
      place: "Judah is the setting of the prophet's complaint, while Babylon is named as the power God will use in judgment.",
      placeStudy: "The book also contains a poetic prayer that recalls God's appearance from Teman and Mount Paran. These references evoke the southern wilderness region and the imagery of God's mighty acts.",
      audience: "Judah and later readers wrestling with injustice, violence, delayed answers and the apparent success of oppressive powers.",
      purpose: "To bring the problem of evil and injustice into honest prayer, show that God remains sovereign even when His ways are difficult to understand, and call the righteous to live by faithfulness and trust.",
      background: "Habakkuk opens with the prophet asking why violence and injustice continue. God's answer that Babylon will be used as an instrument of judgment creates another question, because Babylon is itself violent. The book moves from complaint to waiting, from waiting to a vision of accountability, and finally to a prayer of trust even when visible circumstances are bleak.",
      themes: ["Honest prayer and lament", "The problem of injustice", "God's sovereignty over nations", "The danger of pride and violence", "Waiting for God's answer", "The righteous living by faithfulness", "Joy and trust in hardship"],
      keyVerses: [["Habakkuk 1:2–4","The prophet asks why violence and injustice seem to go unanswered."],["Habakkuk 2:2–4","The vision is to be written clearly; the proud are contrasted with the righteous who live by faithfulness."],["Habakkuk 2:14","The earth is promised to be filled with the knowledge of the glory of the LORD."],["Habakkuk 2:20","The LORD is in His holy temple; all the earth is called to silence before Him."],["Habakkuk 3:17–19","The prophet declares joy and trust in God even if crops and herds fail."]],
      outline: ["Chapter 1: Habakkuk complains about injustice and questions God's use of Babylon as an instrument of judgment.","Chapter 2: The prophet waits for God's answer; a vision is given and woes are pronounced against arrogance, exploitation and idolatry.","Chapter 3: A poetic prayer recalls God's mighty acts and ends with confident trust amid loss."]
    },
    Zephaniah: {
      testament: "Old Testament", chapters: 3,
      subtitle: "The Day of the LORD and the Joy of Restoration",
      author: "The book identifies Zephaniah as the son of Cushi, son of Gedaliah, son of Amariah, son of Hezekiah, and places his ministry in the days of King Josiah of Judah.",
      authorStudy: "The genealogy is unusually detailed and may connect Zephaniah with the royal house, though the identity of the Hezekiah named in the genealogy is not stated with absolute certainty. The book is attributed to the prophet named in its opening verse.",
      date: "Zephaniah's ministry belongs to the seventh century BC during the reign of Josiah, before or around the period of Judah's religious reform.",
      dateStudy: "The book's warnings against idolatry and injustice are often understood against the background of Josiah's reign (640–609 BC). The exact date of the prophet's messages and their final arrangement are not supplied.",
      place: "Jerusalem and Judah are central to the warnings, while the book also addresses surrounding nations and the wider world.",
      placeStudy: "The prophet names Philistia, Moab, Ammon, Cush and Assyria. These oracles widen the scope from Judah to the nations and present the LORD as judge of all peoples.",
      audience: "Judah and Jerusalem, especially those who have become complacent, practise idolatry or exploit others, and later readers seeking hope beyond judgment.",
      purpose: "To warn of the day of the LORD, call the people to seek righteousness and humility, announce judgment on the nations, and promise that God will preserve and rejoice over a humble, restored people.",
      background: "Zephaniah speaks in a period when Judah is surrounded by the memory of Assyrian domination and the threat of further upheaval. He confronts idolatry, complacency and injustice, but the final movement of the book turns toward purification, gathering and joy.",
      themes: ["The day of the LORD", "Judgment on idolatry and complacency", "Justice and humility", "God's authority over the nations", "The remnant and restoration", "The LORD's presence among His people", "God rejoicing over the restored community"],
      keyVerses: [["Zephaniah 1:14–18","The day of the LORD is described as a day of distress and judgment."],["Zephaniah 2:3","The humble are urged to seek the LORD, righteousness and humility."],["Zephaniah 3:9","The nations are promised purified speech so they may call on the name of the LORD."],["Zephaniah 3:14–17","Zion is called to rejoice because the LORD is present and will rejoice over His people."],["Zephaniah 3:19–20","God promises to gather the outcast and restore the fortunes of His people."]],
      outline: ["Chapter 1: The day of the LORD is announced against Judah and Jerusalem for idolatry and complacency.","Chapter 2: A call to seek the LORD is followed by oracles against surrounding nations.","Chapter 3: Jerusalem's corruption is confronted, then the book promises purified worship, a gathered remnant and the LORD's joy over His people."]
    },
    Haggai: {
      testament: "Old Testament", chapters: 2,
      subtitle: "Putting God's House First and Rebuilding with Hope",
      author: "The book preserves the messages of Haggai the prophet, who spoke to the returned community in Jerusalem during the reign of the Persian king Darius I.",
      authorStudy: "Haggai's dated messages are presented in a concise prophetic collection. The book names Zerubbabel the governor and Joshua the high priest as leaders who respond to the prophet's call.",
      date: "Haggai's four recorded messages are dated to the second year of Darius I, in 520 BC.",
      dateStudy: "The dates in the book span several months in 520 BC. They provide one of the clearest chronological frameworks among the prophetic books.",
      place: "Jerusalem and the site of the temple are the central settings.",
      placeStudy: "The people are rebuilding the temple after the return from Babylonian exile. The book addresses the governor, the high priest and the wider community as they resume the work.",
      audience: "The returned Judean community, especially Zerubbabel, Joshua and those responsible for rebuilding the temple and restoring worship.",
      purpose: "To challenge the community to put God's house and worship first, encourage the rebuilding of the temple, and assure the people that God's presence and future glory are greater than present discouragement.",
      background: "After the return from exile, the rebuilding of the temple had stalled while the community focused on its own houses and daily needs. Haggai's messages call the people to consider their priorities, resume the work and trust God's promise. The prophet also addresses discouragement among those who remember the former temple and announces a future marked by God's presence and peace.",
      themes: ["Worship and faithful priorities", "Obedience and renewed courage", "The presence of God among His people", "The glory of the future temple", "Holiness and communal responsibility", "God's sovereignty over the nations", "Hope and the promise to Zerubbabel"],
      keyVerses: [["Haggai 1:4–8","The people are challenged to consider their priorities and rebuild the house of the LORD."],["Haggai 1:13","The LORD assures the people, 'I am with you,' through His messenger."],["Haggai 2:4–5","The leaders and people are told to be strong and work because God's Spirit remains among them."],["Haggai 2:6–9","The LORD promises that the latter glory of the house will be great and that He will give peace."],["Haggai 2:23","Zerubbabel is named as God's chosen servant and signet ring."]],
      outline: ["Chapter 1: Haggai's first message calls the people to rebuild the temple; Zerubbabel, Joshua and the remnant respond.","Chapter 2: Three further dated messages encourage the builders, address holiness and promise future glory and peace."]
    },

    Zechariah: {
      testament: "Old Testament", chapters: 14,
      subtitle: "The Restored Temple, the Coming King and God's Future Reign",
      author: "The opening chapters identify Zechariah son of Berechiah, son of Iddo, as a prophet who spoke to the returned community in Jerusalem.",
      authorStudy: "Zechariah 1–8 contains dated messages and visions attributed to the prophet who ministered alongside Haggai. The authorship and literary history of chapters 9–14 are debated; some interpreters see a later collection, while others understand the book as a unified prophetic work.",
      date: "Zechariah's dated messages begin in the second year of Darius I, in 520 BC, during the rebuilding of the Jerusalem temple.",
      dateStudy: "The visions in chapters 1–8 are dated to 520–518 BC. The date and formation of chapters 9–14 are less certain and have been interpreted in different ways.",
      place: "Jerusalem and Judah are the main settings, especially the temple, its rebuilding and the leadership of Joshua the high priest and Zerubbabel the governor.",
      placeStudy: "The visions include symbolic scenes involving Jerusalem and the nations. These images should not be converted into literal map locations unless the text names a real place.",
      audience: "The returned Judean community, its priests and leaders, and later readers awaiting God's restoration and righteous king.",
      purpose: "To encourage the returned exiles to rebuild the temple and renew covenant faithfulness, assure them of God's presence, and direct their hope toward the coming king and the LORD's reign over the nations.",
      background: "The community that returned from Babylon faced opposition and discouragement as it rebuilt Jerusalem and the temple. Zechariah's night visions, symbolic actions and later oracles assure the people that God has not abandoned Zion. The book joins immediate encouragement with a wider vision of cleansing, peace and God's future rule.",
      themes: ["Return to the LORD", "The rebuilding and future glory of the temple", "God's presence with His people", "The priest and governor as leaders", "The coming humble king", "Cleansing and forgiveness", "The shepherd and the scattered flock", "The day of the LORD and the nations"],
      keyVerses: [["Zechariah 1:3","The LORD calls the people to return to Him with the promise that He will return to them."],["Zechariah 4:6","Zerubbabel is assured that the work will be accomplished by God's Spirit, not by human strength alone."],["Zechariah 9:9","Zion is called to rejoice because her king comes humble and riding on a donkey."],["Zechariah 12:10","The people look upon the one who has been pierced and mourn."],["Zechariah 13:1","A fountain is opened for cleansing from sin and impurity."],["Zechariah 14:9","The LORD is declared king over all the earth."]],
      outline: ["Chapter 1: A call to return to the LORD and the first night vision.","Chapters 2–6: The remaining visions and symbolic actions concerning Jerusalem, the temple, Joshua and Zerubbabel.","Chapters 7–8: Questions about fasting lead to calls for justice, truth and renewed hope for Zion.","Chapters 9–11: Oracles concerning the nations, the coming king and the rejected shepherd.","Chapters 12–14: Jerusalem's future, mourning and cleansing, the day of the LORD and the LORD's universal kingship."]
    },
    Malachi: {
      testament: "Old Testament", chapters: 4,
      subtitle: "Covenant Faithfulness, True Worship and the Coming Messenger",
      author: "The book is introduced by the name Malachi, commonly understood as the prophet's name and meaning 'my messenger'.",
      authorStudy: "The book gives no family history or biography. Some interpreters have considered 'Malachi' a title meaning 'my messenger' rather than a personal name, so the prophet's identity beyond the book remains unknown.",
      date: "The book addresses the post-exilic community after the Jerusalem temple had been rebuilt and worship had resumed.",
      dateStudy: "The references to a Persian governor and the functioning temple place the book in the Persian period, after 515 BC. A date in the fifth century BC is common, but the exact year and relationship to Ezra and Nehemiah are debated.",
      place: "Jerusalem and the temple are central settings, with the prophet confronting priests, families and the wider Judean community.",
      placeStudy: "The book's disputes concern temple offerings, marriage, justice, tithes and the community's expectations of God's coming judgment.",
      audience: "The returned community of Judah, especially priests and people whose worship and covenant life have become careless or unjust.",
      purpose: "To confront empty worship and covenant unfaithfulness, call the people to honour God in daily life, and announce the coming messenger who prepares the way for the LORD.",
      background: "Generations after the return from exile, the temple stands but the community is spiritually discouraged. Malachi uses a series of questions and answers to expose careless offerings, corrupt priestly practice, broken marriage commitments, injustice and withholding of tithes. The book ends by looking toward the coming day of the LORD and the messenger who prepares the way.",
      themes: ["Honouring God in worship", "Faithful priestly leadership", "Covenant loyalty in marriage and family", "Justice for workers, widows, orphans and strangers", "Tithes and trust in God's provision", "The messenger who prepares the way", "The day of the LORD and healing for those who honour Him"],
      keyVerses: [["Malachi 1:6–8","The prophet challenges priests who offer dishonouring sacrifices."],["Malachi 2:10","The community is reminded that all share one Creator and must not betray the covenant."],["Malachi 3:1","A messenger is promised to prepare the way before the LORD comes to His temple."],["Malachi 3:6","The LORD declares that He does not change, which is why Jacob's descendants are not consumed."],["Malachi 3:8–10","The people are challenged concerning tithes and invited to trust God's provision."],["Malachi 4:2","The sun of righteousness rises with healing for those who fear the LORD."],["Malachi 4:5–6","Elijah is promised before the great and fearful day of the LORD."]],
      outline: ["Chapter 1: God's love for Israel is affirmed; priests are confronted for dishonouring worship.","Chapter 2: Priestly failure, covenant betrayal and unfaithfulness in marriage are addressed.","Chapter 3: The coming messenger, the call to return, justice, tithes and the distinction between the righteous and the wicked.","Chapter 4: The day of the LORD is announced, with healing for those who fear God and the promise of Elijah's coming."]
    },
    Matthew: {
      testament: "New Testament", chapters: 28,
      subtitle: "Jesus the Messiah, King and Teacher of the Kingdom",
      author: "The Gospel is traditionally attributed to Matthew, also called Levi, the tax collector who became one of Jesus' twelve apostles.",
      authorStudy: "The Gospel itself does not name its writer. Early Christian tradition attributes it to Matthew, while modern scholarship continues to discuss its authorship, sources and relationship to Mark. The traditional attribution should be distinguished from what the text explicitly states.",
      date: "The Gospel belongs to the first-century Christian witness to Jesus' life, teaching, death and resurrection.",
      dateStudy: "Many scholars place its composition around 80–90 AD, while proposals vary. Its relationship to Mark and its treatment of Jerusalem's destruction are central to discussions of date.",
      place: "The narrative moves through Bethlehem, Egypt, Galilee, Judea and Jerusalem, with Jesus' ministry focused especially on Galilee and His final days in Jerusalem.",
      placeStudy: "The place where the Gospel was composed is not known. Some proposals connect it with Syria or Antioch, but this remains uncertain.",
      audience: "Readers deeply engaged with Israel's Scriptures and traditions, including Jewish and Gentile followers of Jesus. The exact first community and its location are not stated.",
      purpose: "To present Jesus as the promised Messiah and Son of David, show how His life fulfils Scripture, explain the kingdom of heaven and call disciples to obey His teaching and make disciples of all nations.",
      background: "Matthew opens with a genealogy connecting Jesus with Abraham and David, then presents His birth, teaching, miracles, conflict with religious leaders, death and resurrection. Five major teaching collections give the Gospel a strong instructional shape. Repeated fulfilment references connect Jesus' story with Israel's Scriptures.",
      themes: ["Jesus as Messiah, Son of David and Son of God", "Fulfilment of Israel's Scriptures", "The kingdom of heaven", "The teaching and authority of Jesus", "Righteousness and mercy", "Discipleship and the cost of following Jesus", "The inclusion of the nations", "The death and resurrection of Jesus"],
      keyVerses: [["Matthew 1:1","The Gospel introduces Jesus as Messiah, son of David and son of Abraham."],["Matthew 5:17","Jesus explains His relationship to the Law and the Prophets."],["Matthew 16:16","Peter confesses Jesus as the Messiah, the Son of the living God."],["Matthew 20:28","Jesus describes His mission in terms of service and giving His life as a ransom for many."],["Matthew 28:18–20","The risen Jesus commissions His disciples to make disciples of all nations."]],
      outline: ["Chapters 1–2: Jesus' genealogy, birth, visit of the Magi, flight to Egypt and return to Nazareth.","Chapters 3–4: John the Baptist, Jesus' baptism and testing, and the beginning of His ministry in Galilee.","Chapters 5–7: The Sermon on the Mount and the life of kingdom righteousness.","Chapters 8–10: Jesus' mighty works, authority and the commissioning of the Twelve.","Chapters 11–13: Responses to Jesus, growing opposition and the parables of the kingdom.","Chapters 14–18: Jesus' identity, the disciples' understanding and teaching on life in the community.","Chapters 19–25: The journey toward Jerusalem, conflict in the temple and teaching about the future.","Chapters 26–28: The final meal, arrest, trial, crucifixion, resurrection and the Great Commission."]
    },
    Mark: {
      testament: "New Testament", chapters: 16,
      subtitle: "Jesus the Son of God and the Suffering Servant",
      author: "The Gospel is traditionally associated with John Mark, a Christian known in Acts and the letters of the New Testament and often connected by early tradition with Peter.",
      authorStudy: "The Gospel itself is anonymous. Early Christian writers associate it with Mark and with Peter's preaching, but the exact process by which the Gospel was composed is debated.",
      date: "The Gospel was likely written in the period surrounding the First Jewish–Roman War and the destruction of Jerusalem in 70 AD.",
      dateStudy: "Many scholars place Mark around 65–75 AD. Proposed dates before or after Jerusalem's fall differ, and the text does not provide a precise date.",
      place: "The narrative moves from the Jordan region and Galilee toward Jerusalem, where Jesus is arrested and crucified.",
      placeStudy: "The Gospel's place of composition is unknown. Rome is a traditional proposal, but it should not be treated as certain.",
      audience: "A Christian readership that may include Gentile believers; Mark explains some Jewish customs and Aramaic expressions, but the exact audience and location are debated.",
      purpose: "To proclaim Jesus as the Son of God and Messiah, reveal the meaning of His suffering and death, and call disciples to follow Him through service, faith and the way of the cross.",
      background: "Mark begins with John the Baptist and moves quickly through Jesus' public ministry. Powerful deeds and short, vivid scenes show Jesus' authority, while the disciples struggle to understand the kind of Messiah He is. The turning point comes with Peter's confession and Jesus' teaching that the Son of Man must suffer, die and rise again.",
      themes: ["Jesus' identity as Son of God and Messiah", "The authority of Jesus over sickness, evil and creation", "The kingdom of God", "The disciples' misunderstanding and growth", "The suffering Messiah", "Servanthood and the way of the cross", "Faith, fear and prayer", "The resurrection and the call to proclaim the good news"],
      keyVerses: [["Mark 1:1","The Gospel announces the beginning of the good news of Jesus Christ, the Son of God."],["Mark 8:29","Peter confesses Jesus as the Messiah."],["Mark 8:34–35","Jesus calls His followers to deny themselves, take up their cross and follow Him."],["Mark 10:45","The Son of Man came to serve and give His life as a ransom for many."],["Mark 15:39","The centurion responds to Jesus' death with a confession about His identity."],["Mark 16:6","The young man announces that Jesus has risen and is not in the tomb."]],
      outline: ["Chapter 1: John the Baptist, Jesus' baptism and testing, and the beginning of the Galilean ministry.","Chapters 2–3: Jesus teaches with authority and faces growing opposition.","Chapters 4–5: Parables of the kingdom and demonstrations of authority over nature, demons and sickness.","Chapters 6–8: Mission of the Twelve, feeding miracles and the road toward Peter's confession.","Chapters 9–10: Jesus teaches about His coming suffering, true greatness and costly discipleship.","Chapters 11–13: Jesus enters Jerusalem, confronts the temple leadership and teaches about the future.","Chapters 14–16: The final meal, arrest, trial, crucifixion, empty tomb and resurrection announcement."]
    },
    Luke: {
      testament: "New Testament", chapters: 24,
      subtitle: "The Saviour for All People and the Good News of God's Mercy",
      author: "The Gospel is traditionally attributed to Luke, a companion of Paul and the author traditionally associated with the Acts of the Apostles.",
      authorStudy: "The Gospel does not name its writer. Its preface addresses Theophilus and presents the work as an orderly account based on earlier reports and eyewitness testimony. The same authorial voice and dedication link it with Acts; the traditional identification with Luke is ancient but not stated within the Gospel itself.",
      date: "Luke belongs to the first-century Christian writings and forms the first volume of a two-part work continued in Acts.",
      dateStudy: "Many scholars date Luke to around 80–90 AD, though earlier and later proposals exist. Its relationship to Mark, the destruction of Jerusalem and the date of Acts are part of the discussion.",
      place: "The narrative begins with events in Judea, moves through Galilee and Samaria, and follows Jesus' journey toward Jerusalem, where the Gospel reaches its climax.",
      placeStudy: "The place where Luke composed the Gospel is not known. The narrative's geographical movement is important to its structure, but should not be confused with the author's residence.",
      audience: "Theophilus is the named recipient, while the carefully explained narrative is intended for a wider readership. The precise identity and location of the first audience are uncertain.",
      purpose: "To provide an orderly account that strengthens confidence in the Christian message, proclaim Jesus as the promised Saviour, and show that God's mercy and salvation reach the poor, outsiders and all nations.",
      background: "Luke presents the birth of John the Baptist and Jesus, the beginning of Jesus' ministry, His teaching and healing, and the long journey toward Jerusalem. Special attention is given to prayer, the Holy Spirit, women, the poor, meals, forgiveness and people often overlooked by society. The resurrection leads into the mission that Acts continues.",
      themes: ["The universal reach of God's salvation", "The work of the Holy Spirit", "Prayer and praise", "God's mercy toward the poor and outsiders", "Women and people at the margins", "Repentance, forgiveness and joy", "The journey to Jerusalem", "The resurrection and mission to the nations"],
      keyVerses: [["Luke 1:1–4","The author explains the purpose of an orderly account for Theophilus."],["Luke 4:18–19","Jesus announces His mission to bring good news, freedom and restoration."],["Luke 10:25–37","The parable of the Good Samaritan teaches neighbour-love through action."],["Luke 19:10","Jesus describes His mission as seeking and saving the lost."],["Luke 24:44–49","The risen Jesus opens the Scriptures and commissions the proclamation of repentance and forgiveness to all nations."]],
      outline: ["Chapters 1–2: Announcements and birth narratives of John the Baptist and Jesus.","Chapters 3–4: John prepares the way, Jesus is baptised and tested, and His public ministry begins.","Chapters 5–9: Jesus calls disciples, teaches, heals and reveals His authority.","Chapters 9–19: The long journey toward Jerusalem, with teaching on discipleship, mercy, prayer and the kingdom.","Chapters 19–21: Jesus enters Jerusalem, teaches in the temple and speaks about coming judgment.","Chapters 22–23: The final meal, arrest, trial, crucifixion and burial.","Chapter 24: The empty tomb, appearances of the risen Jesus and His commission to the disciples."]
    },
  };

  const reader = document.getElementById("bibleReader");
  const anchor =
    document.getElementById("zurielNavigation") ||
    document.getElementById("message");

  if (!reader || !anchor) {
    console.error("Zuriel Introductions: Bible reader not found.");
    return;
  }

  const oldPanel = document.getElementById("zurielIntroduction");
  if (oldPanel) oldPanel.remove();

  const oldStyle = document.getElementById("zurielIntroductionStyle");
  if (oldStyle) oldStyle.remove();

  const style = document.createElement("style");
  style.id = "zurielIntroductionStyle";

  style.textContent = `
    #zurielIntroduction {
      background:linear-gradient(145deg,#10213d,#203e68);
      color:#f8f4e9;
      border:1px solid #b99b58;
      border-radius:18px;
      padding:17px;
      margin:18px 0;
      line-height:1.75;
    }

    #zurielIntroduction h3,
    #zurielIntroduction h4 {
      color:#f1d99e;
    }

    #zurielIntroduction h3 {
      font-size:20px;
      margin:5px 0;
    }

    #zurielIntroduction h4 {
      margin:18px 0 5px;
      font-size:16px;
    }

    #zurielIntroduction p,
    #zurielIntroduction li {
      color:#f1f3f7;
      overflow-wrap:anywhere;
    }

    #zurielIntroduction .intro-subtitle {
      color:#dce5f1;
      font-size:13px;
    }

    #zurielIntroduction select {
      width:100%;
      min-height:45px;
      padding:10px;
      border-radius:9px;
      margin:8px 0;
      background:#f8f4e9;
      color:#10213d;
      font-size:15px;
    }

    #zurielIntroduction .intro-button {
      width:100%;
      min-height:46px;
      background:#e8cf91;
      color:#10213d;
      font-weight:bold;
      border:0;
      border-radius:9px;
      margin:12px 0 3px;
    }

    #zurielIntroduction details {
      border-top:1px solid #ffffff35;
      padding:10px 0;
    }

    #zurielIntroduction summary {
      color:#f1d99e;
      font-weight:bold;
      cursor:pointer;
      padding:5px 0;
    }

    #zurielIntroduction .intro-note {
      background:#ffffff12;
      border-left:4px solid #e8cf91;
      padding:12px;
      border-radius:7px;
      margin:10px 0;
    }

    #zurielIntroduction .intro-outline {
      display:flex;
      gap:10px;
      padding:8px 0;
      border-bottom:1px solid #ffffff20;
    }

    #zurielIntroduction .intro-number {
      color:#f1d99e;
      font-weight:bold;
      min-width:27px;
    }

    #zurielIntroduction .intro-list {
      padding-left:21px;
    }

    #zurielIntroduction .intro-figure {
      margin:14px 0 18px;
      padding:8px;
      overflow:hidden;
      border:1px solid #b99b58;
      border-radius:15px;
      background:linear-gradient(145deg,#0b1930,#203e68);
      box-shadow:0 8px 22px #00000030;
    }

    #zurielIntroduction .intro-image {
      display:block;
      width:100%;
      aspect-ratio:16 / 9;
      max-height:300px;
      object-fit:cover;
      object-position:center;
      border-radius:10px;
      background:#203e68;
    }

    #zurielIntroduction .intro-figure figcaption {
      padding:9px 5px 3px;
      color:#f1d99e;
      font-size:13px;
      font-weight:700;
      line-height:1.5;
      text-align:center;
    }

    @media (max-width:420px) {
      #zurielIntroduction .intro-figure { padding:6px; }
      #zurielIntroduction .intro-image { max-height:220px; }
    }
  `;

  document.head.appendChild(style);

  const panel = document.createElement("section");
  panel.id = "zurielIntroduction";

  const heading = document.createElement("h3");
  heading.textContent = "📜 Bible Book Introduction";
  panel.appendChild(heading);

  const subtitle = document.createElement("p");
  subtitle.className = "intro-subtitle";
  subtitle.textContent =
    "Explore authorship, background, message, key verses and chapter outlines.";
  panel.appendChild(subtitle);

  const selectorLabel = document.createElement("label");
  selectorLabel.textContent = "Choose a Bible book";
  selectorLabel.style.fontWeight = "bold";
  panel.appendChild(selectorLabel);

  const selector = document.createElement("select");
  selector.setAttribute("aria-label", "Choose a Bible book");

  Object.keys(introductions).forEach(function (book) {
    const option = document.createElement("option");
    option.value = book;
    option.textContent = book;
    selector.appendChild(option);
  });

  panel.appendChild(selector);

  const bookInfo = document.createElement("p");
  panel.appendChild(bookInfo);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "intro-button";
  panel.appendChild(toggle);

  const content = document.createElement("div");
  content.hidden = true;
  panel.appendChild(content);

  function addSection(titleText, bodyText) {
    const section = document.createElement("section");
    const title = document.createElement("h4");
    title.textContent = titleText;

    const paragraph = document.createElement("p");
    paragraph.textContent = bodyText;

    section.appendChild(title);
    section.appendChild(paragraph);
    content.appendChild(section);
  }

  function addDetails(titleText, bodyText) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = titleText;

    const paragraph = document.createElement("p");
    paragraph.textContent = bodyText;

    details.appendChild(summary);
    details.appendChild(paragraph);
    content.appendChild(details);
  }

  function renderBook(bookName) {
    const book = introductions[bookName];
    if (!book) return;

    content.replaceChildren();
    content.hidden = true;

    bookInfo.textContent =
      book.testament + " • " +
      book.chapters + " Chapters • " +
      book.subtitle;

    toggle.textContent = "Explore " + bookName + " Introduction";

    if (book.image) {
      const figure = document.createElement("figure");
      figure.className = "intro-figure";

      const image = document.createElement("img");
      image.className = "intro-image";
      image.src = book.image;
      image.alt = bookName + " — " + book.subtitle;
      image.loading = "lazy";
      image.decoding = "async";
      image.fetchPriority = "low";

      const caption = document.createElement("figcaption");
      caption.textContent =
        bookName + " • " + book.chapters +
        " chapters • " + book.subtitle;

      figure.appendChild(image);
      figure.appendChild(caption);
      content.appendChild(figure);
    }

    addDetails("Traditional authorship", book.author);
    addDetails("Authorship — further study", book.authorStudy);
    addDetails("Traditional date and setting", book.date);
    addDetails("Date — further study", book.dateStudy);
    addDetails("Traditional place", book.place);
    addDetails("Place — further study", book.placeStudy);

    addSection("Original audience", book.audience);
    addSection("Purpose of the book", book.purpose);
    addSection("Historical and cultural background", book.background);

    const themes = document.createElement("section");
    const themesTitle = document.createElement("h4");
    themesTitle.textContent = "Major themes";
    themes.appendChild(themesTitle);

    const themeList = document.createElement("ul");
    themeList.className = "intro-list";

    book.themes.forEach(function (theme) {
      const item = document.createElement("li");
      item.textContent = theme;
      themeList.appendChild(item);
    });

    themes.appendChild(themeList);
    content.appendChild(themes);

    const verses = document.createElement("section");
    const versesTitle = document.createElement("h4");
    versesTitle.textContent = "Key verses";
    verses.appendChild(versesTitle);

    book.keyVerses.forEach(function (entry) {
      const note = document.createElement("div");
      note.className = "intro-note";

      const reference = document.createElement("strong");
      reference.textContent = entry[0];

      const meaning = document.createElement("p");
      meaning.textContent = entry[1];

      note.appendChild(reference);
      note.appendChild(meaning);
      verses.appendChild(note);
    });

    content.appendChild(verses);

    const outline = document.createElement("section");
    const outlineTitle = document.createElement("h4");
    outlineTitle.textContent =
      "Book outline and chapter guide";
    outline.appendChild(outlineTitle);

    book.outline.forEach(function (description, index) {
      const line = document.createElement("div");
      line.className = "intro-outline";

      const number = document.createElement("span");
      number.className = "intro-number";
      number.textContent = (index + 1) + ".";

      const text = document.createElement("span");
      text.textContent = description;

      line.appendChild(number);
      line.appendChild(text);
      outline.appendChild(line);
    });

    content.appendChild(outline);

    const closing = document.createElement("p");
    closing.className = "intro-note";
    closing.textContent =
      "Study reminder: Read each chapter in context. Compare related Scriptures and distinguish the biblical text from historical interpretations and scholarly proposals.";

    content.appendChild(closing);
  }

  selector.addEventListener("change", function () {
    renderBook(selector.value);
  });

  toggle.addEventListener("click", function () {
    content.hidden = !content.hidden;

    toggle.textContent = content.hidden
      ? "Explore " + selector.value + " Introduction"
      : "Close " + selector.value + " Introduction";
  });

  renderBook("Genesis");
  reader.insertBefore(panel, anchor);

  console.log(
    "Zuriel Book Introduction Centre loaded: " +
    Object.keys(introductions).join(", ")
  );
})();
