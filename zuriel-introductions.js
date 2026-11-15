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
    }

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
