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

    #zurielIntroduction .intro-image {
      display:block;
      width:100%;
      max-height:230px;
      object-fit:cover;
      border-radius:12px;
      margin:12px 0;
      background:#203e68;
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
      const image = document.createElement("img");
      image.className = "intro-image";
      image.src = book.image;
      image.alt = bookName + " biblical illustration";
      image.loading = "lazy";
      image.decoding = "async";
      content.appendChild(image);
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
      "Complete " + book.chapters + "-chapter outline";
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
