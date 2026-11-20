/* Zuriel Reading Plans — curated, sequential and offline-first progress. */
(function () {
  "use strict";

  const STORAGE_KEY = "zuriel_reading_plan_progress_v1";
  const PLANS = [
    {
      id: "meet-jesus-7",
      title: "Meet Jesus",
      duration: 7,
      description: "Walk through key moments in the life, words and resurrection of Jesus.",
      days: [
        ["John 1:1-18", "See how John introduces Jesus as the living Word.", "What does John say about the identity of the Word, and how does the passage connect Jesus with creation and life?", "Lord Jesus, help me receive You as the living Word. Let Your light guide my understanding and shape the way I live today."],
        ["Mark 1:14-20", "Notice Jesus' call to follow Him.", "What did Jesus announce, and what did the first disciples leave behind to follow Him? What might faithful response look like in my circumstances?", "Jesus, give me a willing heart to follow You. Show me one practical way to put Your call ahead of distraction today."],
        ["Luke 5:1-11", "Reflect on trust and responding to Jesus.", "How does Peter respond after a disappointing night of fishing? Where might Jesus be inviting me to trust His word and act wisely?", "Lord, meet me in the ordinary work of my day. Teach me to trust Your word and respond with humility and courage."],
        ["John 3:1-17", "Consider the new birth and God's love.", "What does Jesus teach Nicodemus about new birth? How does verse 16 fit within Jesus' explanation rather than standing alone?", "Father, thank You for Your love shown in the giving of Your Son. Help me understand the new life Jesus offers and respond to Him in faith."],
        ["John 4:1-26", "Listen to Jesus speak about living water.", "How does Jesus move the conversation from ordinary thirst to worship and spiritual need? What does He teach about worship in spirit and truth?", "Jesus, meet me with the truth that gives life. Teach me to worship You sincerely and to bring my real questions into Your light."],
        ["Mark 4:35-41", "Reflect on Jesus' authority in the storm.", "What do the disciples fear, and what does Jesus reveal through His response? How can I bring fear honestly to Him without ignoring practical responsibility?", "Lord Jesus, be near when I feel overwhelmed. Give me courage, clear thinking and trust in Your authority as I take the next wise step."],
        ["John 20:1-18", "Read the resurrection account and Mary's encounter.", "What details help establish the movement from the empty tomb to Mary's encounter with the risen Jesus? How does her response change?", "Risen Lord, deepen my understanding of Your resurrection. Help me live with grounded hope and share what is true about You with love and humility."]
      ]
    },
    {
      id: "growing-in-faith-7",
      title: "Growing in Faith",
      duration: 7,
      description: "Build a steady foundation in faith, grace, wisdom and Christian living.",
      days: [
        ["Hebrews 11:1-6", "Explore the meaning and response of faith.", "How does Hebrews describe faith, and what do the examples teach about trusting God without controlling every outcome?", "Faithful God, deepen my trust in You. Help me seek You sincerely, obey what I understand from Your Word and remain patient where I cannot yet see the outcome."],
        ["Romans 10:8-17", "Reflect on hearing and responding to God's Word.", "How does Paul connect hearing the message, believing and calling on the Lord? What responsibility does this give the Christian community in sharing the good news?", "Lord, make me attentive to Your Word and sincere in my response. Give me opportunities to share the good news clearly, respectfully and with love."],
        ["Ephesians 2:1-10", "Remember salvation by grace through faith.", "What does Paul say God has done for people who were spiritually dead? How do grace, faith and good works relate in this passage?", "Father, thank You for the gift of salvation through Christ. Keep me humble and grateful, and guide me into the good works You have prepared for me."],
        ["James 1:2-8", "Consider perseverance and asking God for wisdom.", "Why does James connect trials with perseverance? What does he encourage believers to ask God for, and what does he say about divided loyalty?", "God of wisdom, help me face trials with endurance. Give me clarity for the decisions before me and a steady heart that seeks You rather than being pulled in every direction."],
        ["2 Corinthians 5:14-21", "Reflect on new life and reconciliation in Christ.", "How does Christ's love shape Paul's understanding of life and ministry? What does being a new creation mean in the context of reconciliation?", "Lord Jesus, let Your love shape my motives and relationships. Help me live as one reconciled to God and become a faithful messenger of reconciliation."],
        ["Galatians 5:16-26", "Consider walking by the Spirit and His fruit.", "Compare the works of the flesh with the fruit of the Spirit. Which attitudes or habits need to give way to love, patience, self-control and the Spirit's leading?", "Holy Spirit, form Your fruit in my daily life. Help me respond to others with love, patience and self-control, and make choices that reflect Christ."],
        ["Colossians 3:1-17", "Reflect on the character and conduct of the new life.", "What does Paul tell believers to put off and put on? How should the peace of Christ, the Word and gratitude shape ordinary relationships?", "Father, renew my thoughts and conduct. Help me put away harmful patterns, practise forgiveness and let the message of Christ dwell richly in my words and actions."]
      ]
    },
    {
      id: "prayer-and-trust-7",
      title: "Prayer & Trust",
      duration: 7,
      description: "Spend a week with passages about prayer, peace, guidance and confidence in God.",
      days: [
        ["Matthew 6:5-15", "Read Jesus' teaching on prayer.", "What does Jesus contrast with sincere prayer? Notice the pattern of the Lord's Prayer and what it teaches about God's name, provision, forgiveness and deliverance.", "Father, teach me to pray with sincerity rather than performance. Help me seek Your will, depend on You for daily needs and extend forgiveness as I receive Your mercy."],
        ["Philippians 4:4-9", "Bring requests to God and consider His peace.", "How does Paul connect prayer, thanksgiving and peace? What kinds of things does he encourage believers to dwell on and practise?", "God of peace, I bring my concerns honestly before You. Guide my thoughts toward what is true and worthy, and help me practise the good I have learned."],
        ["Psalm 23", "Reflect on the Lord as Shepherd.", "How does the shepherd image describe God's care in both restful and threatening places? What does the psalm say about God's presence in the valley?", "Lord, shepherd me through changing circumstances. Give me courage in difficult places, gratitude for Your provision and confidence in Your faithful presence."],
        ["Proverbs 3:1-12", "Consider trusting the Lord in every path.", "What does it mean to trust the Lord rather than rely only on one's own understanding? How do humility, wisdom and correction fit the passage?", "Father, guide my decisions and correct me when I need it. Help me seek wise counsel, act responsibly and acknowledge You in all my ways."],
        ["Psalm 27:1-8", "Reflect on courage and seeking God's presence.", "What grounds the psalmist's courage, and what does he desire above all else? How do confidence and honest seeking appear together?", "God, when fear rises, remind me of Your presence. Give me courage to seek You honestly and to take the next faithful step."],
        ["1 Thessalonians 5:12-24", "Notice the instructions about prayer and thanksgiving.", "How do the instructions about community life, prayer, gratitude and discernment belong together? What does Paul ask God to do for the believers?", "Lord, shape my life with gratitude, patience and prayer. Help me test what I hear carefully, hold to what is good and live in peace with others."],
        ["Jeremiah 29:11-14", "Read the promise in its chapter context and seek the Lord.", "Who first received this message, and what does the wider chapter say about the exiles' long season in Babylon? How does the promise of seeking God fit that setting?", "Faithful God, teach me to seek You wholeheartedly through long seasons of waiting. Help me read Your promises in context and trust Your faithfulness without demanding an easy or immediate outcome."]
      ]
    },
    {
      id: "walk-with-jesus-30",
      title: "Walk with Jesus",
      duration: 30,
      description: "A month-long journey through the birth, ministry, teachings, compassion, cross and resurrection of Jesus.",
      days: [
        ["Luke 1:26-38","Receive the angel's announcement of Jesus' birth and consider Mary's response of faith.","What does the angel reveal about Jesus' identity and mission? How does Mary combine honest questions with trust?","Father, help me receive Your word with humility. Give me courage to ask honestly and respond faithfully."],
        ["Matthew 1:18-25","Reflect on the name Jesus and the promise of Immanuel.","What does the angel say about Jesus' name and purpose? How does Immanuel shape the meaning of God's presence?","God with us, thank You for drawing near in Jesus. Help me trust Your presence and walk in obedience."],
        ["Luke 2:1-20","Read the birth of Jesus and the good news announced to the shepherds.","What good news do the angels announce, and how do the shepherds respond? What can their response teach about sharing the message?","Lord Jesus, fill me with joy in the good news. Help me worship sincerely and share truth with humility."],
        ["Matthew 2:1-12","Consider the wise men who came to worship the newborn King.","What do the visitors seek, and how do their gifts express honour? Contrast their response with Herod's fear. What is wholehearted worship?","King Jesus, receive my worship. Free me from jealousy and self-interest, and help me honour You in my choices."],
        ["Luke 2:41-52","See Jesus as a boy in the temple, devoted to His Father's purpose.","What does this account show about Jesus' growth and His awareness of the Father's purpose? How do His parents respond when they do not understand?","Father, help me grow in wisdom and patience. Teach me to seek Your purposes and care for those around me."],
        ["Matthew 3:13-17","Witness Jesus' baptism and the Father's testimony.","What happens at Jesus' baptism, and what does the Father's voice declare? How does this moment introduce Jesus' mission?","Father, thank You for revealing Jesus as Your beloved Son. Help me listen to Him and follow in humble obedience."],
        ["Matthew 4:1-11","Reflect on Jesus' faithfulness during temptation.","How does Jesus answer the tempter? What do the temptations reveal about provision, power and worship?","Jesus, strengthen me to choose obedience over shortcuts. Keep my worship centred on God and my choices shaped by truth."],
        ["Mark 1:14-20","Hear Jesus announce the Kingdom and call His first disciples.","What good news does Jesus proclaim, and what does His call ask of the first disciples? What might following Him change in your priorities?","Lord, help me hear Your call. Guide me to follow You in my responsibilities, relationships and daily decisions."],
        ["John 1:35-51","Follow the first disciples as they come to know Jesus.","What questions lead the disciples to Jesus, and what do they discover? How does personal invitation appear in this passage?","Jesus, draw me into deeper knowledge of You. Help me invite others to seek You with honesty and love."],
        ["John 2:1-11","Read the sign at Cana and the first public manifestation of Jesus' glory.","What does the sign at Cana reveal about Jesus, and how do the servants participate? What does Mary's instruction teach about listening to Him?","Lord Jesus, help me trust Your wisdom and obey what You say. May my life point others toward Your goodness."],
        ["John 3:1-17","Consider Jesus' teaching about the new birth and God's love.","Why does Nicodemus come to Jesus, and what does Jesus teach about new birth? How does God's love explain the gift of the Son?","Father, help me understand the new life You offer through Jesus. Keep my faith rooted in Your love and truth."],
        ["John 4:1-26","Listen as Jesus offers living water and reveals true worship.","How does Jesus move from physical water to spiritual thirst? What does He teach about worship, and how does He treat the woman?","Jesus, meet my deepest needs with Your truth. Teach me to worship sincerely and treat every person with dignity."],
        ["Luke 5:1-11","Reflect on the miraculous catch and the call to follow Jesus.","What happens when Peter obeys Jesus' instruction? How does his response reveal both human limitation and Jesus' call?","Lord, help me trust Your word while remaining humble. Guide me to use my gifts faithfully and serve others."],
        ["Matthew 5:1-16","Study the Beatitudes and Jesus' call to be salt and light.","Who is included in the blessings Jesus describes? How do salt and light connect discipleship with visible good works?","Jesus, form Your character in me. Let my actions bring good to others and direct praise to the Father."],
        ["Matthew 5:17-30","Consider Jesus' teaching on the Law, reconciliation and the heart.","How does Jesus move from outward conduct to the heart? What do His teachings about anger and reconciliation ask of His followers?","Lord, search my heart and guide my relationships. Help me address anger honestly and pursue reconciliation wisely."],
        ["Matthew 6:5-15","Learn the pattern of prayer Jesus gave His disciples.","What does Jesus warn against in prayer, and what pattern does He give? Which parts challenge your priorities?","Father, teach me sincere prayer. Help me honour Your name, seek Your will, depend on You and practise forgiveness."],
        ["Matthew 6:25-34","Hear Jesus teach freedom from anxiety and trust in the Father's care.","What reasons does Jesus give for trusting the Father? How does seeking God's kingdom shape practical planning and responsibility?","Father, help me bring anxiety to You without neglecting wise action. Teach me to seek Your kingdom today."],
        ["Matthew 7:7-27","Reflect on asking, seeking, the narrow way and putting Jesus' words into practice.","What contrasts does Jesus make between hearing and doing? How can you test a choice against His teaching rather than appearances?","Jesus, make me a faithful doer of Your words. Give me discernment and courage to practise what is right."],
        ["Mark 4:35-41","See Jesus calm the storm and consider His authority.","What do the disciples fear, and what does Jesus do? How does the account invite honest questions and deeper trust?","Lord Jesus, meet me in fearful moments. Give me calm, practical wisdom and growing confidence in Your authority."],
        ["Mark 5:21-43","Read two accounts of healing and restoration through Jesus.","How do Jairus and the woman each approach Jesus? What do their stories reveal about faith, compassion and His attention to people?","Jesus, help me bring my needs to You and show compassion to others. Give me patience when answers are delayed."],
        ["Luke 10:25-37","Learn neighbour-love through the parable of the Good Samaritan.","Who acts as a neighbour in Jesus' story, and what does compassion cost? How might love cross social or personal boundaries?","Father, open my eyes to someone who needs help. Give me courage to show practical mercy without seeking recognition."],
        ["Luke 15:11-32","Reflect on the Father's mercy in the parable of the lost son.","How do the two brothers respond to the father's actions? What does the story reveal about repentance, mercy and resentment?","Father, help me receive Your mercy and resist resentment. Teach me to welcome restoration while pursuing truth and responsibility."],
        ["John 6:1-14","Witness Jesus feed the multitude and provide beyond what seemed possible.","What does Jesus do with the available food, and how do the disciples participate? What does the account teach about gratitude and sharing?","Lord, thank You for what is in my hands. Help me share generously and serve others with gratitude."],
        ["John 10:1-18","Hear Jesus describe Himself as the Good Shepherd.","What contrasts does Jesus make between the shepherd and the hired hand? How does His care shape the way leaders should treat people?","Good Shepherd, help me recognise Your voice and follow You. Teach me to care for others with responsibility and love."],
        ["John 11:17-27","Consider Jesus' words: the resurrection and the life.","What does Martha confess about Jesus, and what does He reveal about resurrection and life? How does the passage hold grief and hope together?","Jesus, meet those who grieve with compassion. Strengthen hope in You and help me care tenderly for people in pain."],
        ["Luke 19:1-10","See Jesus seek and save the lost in the encounter with Zacchaeus.","How does Jesus approach Zacchaeus, and what changes follow their encounter? What does repentance look like in the actions described?","Lord, help me respond to grace with honest change. Give me courage to make restitution and treat others fairly."],
        ["John 13:1-17","Learn humility and servant-hearted love from Jesus washing His disciples' feet.","Why does Jesus wash His disciples' feet, and what does He ask them to learn? How can service be practised without seeking status?","Jesus, give me a servant's heart. Help me serve quietly, respect others and lead through humility."],
        ["John 14:1-14","Receive Jesus' comfort and His teaching about the way to the Father.","What fears are the disciples carrying, and what comfort does Jesus give? How does His teaching direct their trust toward the Father?","Lord Jesus, steady my heart when I feel uncertain. Help me trust You and walk in the truth You have revealed."],
        ["Luke 22:14-23","Reflect on the Last Supper and Jesus' words about the new covenant.","What does Jesus say about the covenant, and what does the meal mean within the approaching cross? Why should remembrance shape Christian life?","Jesus, thank You for giving Yourself. Help me remember Your sacrifice with gratitude and live in faithful love."],
        ["John 20:1-18","Read the resurrection account and Mary's encounter with the risen Jesus.","What details show that Jesus is risen, and how does Mary move from grief to recognition? What does her encounter teach about hope and witness?","Risen Lord, ground my hope in the truth of Your resurrection. Help me share the good news with humility and love."]
      ]
    },
    {
      id:"spiritual-warfare-7",
      title:"Standing Firm: Spiritual Warfare",
      duration:7,
      description:"A balanced, Christ-centred week on truth, the armour of God, resisting temptation and the hope of Christ's victory.",
      days:[
        ["Ephesians 6:10-18","Study the whole armour of God and the repeated call to stand in the Lord's strength.","How do truth, righteousness, faith, salvation and prayer work together in Paul's picture of standing firm?","Lord, strengthen me in Your grace. Help me stand in truth, live rightly, trust You and pray faithfully."],
        ["James 4:1-10","Notice how humility, submission to God and resistance to evil belong together.","How does submitting to God come before resisting evil? What does humility look like in the conflicts James describes?","God, expose desires that lead me away from You. Teach me to submit my choices to Your wisdom and resist temptation."],
        ["1 Peter 5:6-11","Read the call to sober watchfulness, humility and confidence in God's care.","Why does Peter connect humility with watchfulness? What does he say about suffering, the believing community and God's promise to restore?","Father, help me stay alert without fear and humble without despair. Strengthen those who suffer and establish me in Your grace."],
        ["Matthew 4:1-11","Observe how Jesus answers temptation with Scripture in its proper context.","How does Jesus answer each temptation? What do His answers teach about testing impulses against Scripture and refusing disobedient shortcuts?","Jesus, teach me to answer temptation with truth. Give me discernment and strength to choose what honours the Father."],
        ["1 Corinthians 10:1-13","Consider warning, faithfulness and the way God provides endurance in temptation.","How does Paul balance the reality of temptation with God's faithfulness and the way of escape? What warning does Israel's history provide?","Faithful God, keep me from presumption. Help me recognise temptation early, seek the way of faithfulness and accept wise support."],
        ["Romans 8:31-39","Rest in the assurance that nothing can separate believers from God's love in Christ.","What hardships does Paul acknowledge before declaring confidence in God's love? How does this assurance encourage perseverance without promising a trouble-free life?","Father, anchor me in Your love through hardship. Give me courage to endure and compassion toward others who suffer."],
        ["Colossians 2:8-15","Reflect on the sufficiency of Christ and the triumph of the cross.","What does Paul say about the fullness of Christ and the triumph of the cross? How does Christ's victory shape a grounded, non-fearful response to spiritual opposition?","Lord Jesus, keep my confidence centred on Your finished work. Guard me from fear and misleading teaching, and help me grow in truth."]
      ]
    },
    {
      id:"new-life-in-christ-7",
      title:"Your New Life in Christ",
      duration:7,
      description:"Explore grace, adoption, identity, renewal and the daily practice of following Jesus.",
      days:[
        ["2 Corinthians 5:14-21","Read about new creation and reconciliation through Christ.","How does Christ's love reshape Paul's view of life? What does the passage say God has done to reconcile the world through Christ?","Lord Jesus, thank You for reconciling me to God. Let Your love reshape my priorities and help me become a truthful, humble ambassador of reconciliation."],
        ["Romans 8:1-17","Study life in the Spirit, adoption and belonging to God.","What does Paul mean by no condemnation for those in Christ? How does the Spirit's work relate to adoption and belonging to God's family?","Father, thank You that life in Christ is not defined by condemnation. Help me follow the Spirit, grow in holiness and live in the assurance of being Your child."],
        ["Ephesians 1:3-14","Trace the blessings and hope believers receive in Christ.","List the blessings Paul attributes to God in Christ. How do adoption, redemption and the promised Spirit shape the believer's hope and identity?","God of grace, help me understand the blessings You give in Christ. Keep my identity grounded in Your love and teach me to live with gratitude and hope."],
        ["Ephesians 2:1-10","Remember salvation by grace and the good works God prepares.","How does Paul describe the change from death to life? Why does he say salvation is God's gift, and what place do good works have afterward?","Father, keep me rooted in grace rather than pride or fear. Show me the good work before me today and help me serve from gratitude for what You have done."],
        ["Colossians 3:1-17","Consider the character and conduct of the new life.","What does Paul tell believers to put away and put on? How should Christ's peace and word shape relationships, speech and gratitude?","Lord, renew my habits and attitudes. Help me put away what harms others and practise compassion, forgiveness, love and thankfulness."],
        ["Galatians 2:15-21","Reflect on living by faith in the Son of God.","What point is Paul making about justification and the law? What does it mean in context to say Christ lives in me and that I live by faith?","Jesus, help me rely on Your grace rather than trying to earn acceptance. Let my faith shape my choices and keep my life centred on Your love."],
        ["1 Peter 2:1-10","Explore the identity and calling of God's people.","What images does Peter use for believers and for Christ? How does this identity lead to a public calling to declare God's goodness?","Father, build my life on Christ, the living cornerstone. Help me turn from harmful patterns and reflect Your goodness through my words and actions."]
      ]
    },
    {
      id:"praying-through-scripture-7",
      title:"Learning to Pray through Scripture",
      duration:7,
      description:"A practical journey through the Lord's Prayer, thanksgiving, intercession, lament and perseverance.",
      days:[
        ["Matthew 6:5-15","Follow the pattern Jesus gives for prayer.","What does Jesus warn against in public performance, and what pattern does He give for prayer? How do the requests shape your priorities?","Father, teach me to pray sincerely. Help me honour Your name, seek Your will, depend on You daily and extend forgiveness."],
        ["Psalm 23:1-6","Turn the Shepherd's care into honest prayer and trust.","How does the shepherd image describe God's care in both restful and threatening places? What does the psalm say about His presence in the valley?","Lord, shepherd me through changing circumstances. Give me courage in difficult places, gratitude for provision and trust in Your presence."],
        ["Philippians 4:4-9","Bring requests to God with thanksgiving and practise what is true.","How does Paul connect prayer, thanksgiving and peace? What does he encourage believers to think about and practise?","God of peace, I bring my concerns honestly before You. Guide my thoughts toward what is true and help me practise what is good."],
        ["Colossians 4:2-6","Consider watchful prayer, gratitude and gracious speech.","What does Paul ask believers to devote themselves to? How do watchfulness, gratitude and gracious speech belong together?","Lord, make me faithful in prayer and grateful in every season. Give my words grace and help me speak with wisdom to each person."],
        ["1 Timothy 2:1-8","Study prayer for all people and those in authority.","Who does Paul urge believers to pray for, and why? What does the passage reveal about God's desire and the place of peaceable conduct?","Father, widen my prayers beyond my own needs. Help me pray for all people and those in authority, seeking peace and godliness."],
        ["Psalm 13:1-6","Learn how lament can express pain and still turn toward trust.","What honest questions does the psalmist bring to God? Where does the prayer turn, and what does this teach about lament and trust?","God, receive my honest sorrow and questions. Help me remember Your steadfast love without pretending pain is not real."],
        ["Luke 18:1-8","Reflect on persistence in prayer and confidence in God's justice.","What contrast does Jesus draw between the unjust judge and God? What does persistence mean here, and what question does Jesus leave His hearers?","Righteous Father, keep me faithful in prayer. Give me patience, courage and enduring faith while I wait for Your justice."]
      ]
    },
    {
      id:"wisdom-for-daily-life-7",
      title:"Wisdom for Everyday Decisions",
      duration:7,
      description:"Seek biblical wisdom for speech, relationships, work, choices and a life shaped by God's Word.",
      days:[
        ["Proverbs 3:1-12","Consider trust, humility and acknowledging God in every path.","Which decision needs prayer, wise counsel and careful action rather than impulse? What do trust and humility mean in this passage?","Lord, guide my decisions. Help me trust You, seek sound counsel, accept correction and take responsible steps."],
        ["James 1:1-18","Study perseverance, asking for wisdom and resisting temptation.","How does James distinguish asking God for wisdom from divided loyalty? What does the passage teach about desire, temptation and God's good gifts?","God of wisdom, steady my heart. Help me ask You sincerely, recognise temptation and choose what is good."],
        ["James 3:1-18","Reflect on the power of speech and the character of wisdom from above.","What images does James use for the tongue? How is wisdom from above recognised by its conduct, and which conversation needs gentleness?","Father, guide my speech. Make me quick to listen, slow to react and sincere in pursuing peace."],
        ["Proverbs 15:1-17","Notice how gentle answers, listening and contentment shape daily life.","How do gentle answers, attentive listening and contentment shape home or work life? Which proverb challenges your usual response under pressure?","Lord, make my words gentle and truthful. Help me listen carefully, avoid needless conflict and value faithfulness over comparison."],
        ["Micah 6:6-8","Consider justice, mercy and walking humbly with God.","What does Micah reject about empty religious display, and what does he call God's people to practise? How can justice, mercy and humility become concrete this week?","God, teach me to act justly, love mercy and walk humbly with You. Show me a practical way to treat someone fairly."],
        ["Matthew 7:12-27","Read Jesus' teaching about the narrow way and putting His words into practice.","Why does Jesus compare hearing His words with building on rock? What would putting His teaching into practice look like in a current decision?","Jesus, help me do more than hear Your words. Give me courage to obey them wisely and build my choices on Your teaching."],
        ["Colossians 3:12-17","Practise compassion, forgiveness, love and gratitude.","Which qualities are believers told to put on? How do forgiveness, love and gratitude guide a difficult relationship while respecting healthy boundaries?","Lord, clothe me with compassion and patience. Help me forgive, speak truth with love and pursue peace with wisdom."]
      ]
    },
    {
      id:"hope-in-hard-seasons-7",
      title:"Hope in Difficult Seasons",
      duration:7,
      description:"Read honestly about suffering, comfort, endurance and the hope God gives in Christ.",
      days:[
        ["Psalm 34:1-18","Notice God's nearness to the brokenhearted.","What does the psalm invite the worshipper to do in the opening verses, and how does it describe God's care for the brokenhearted?","God of compassion, draw near to those who are hurting. Help me seek You honestly, receive wise support and show gentleness to someone who is suffering."],
        ["Isaiah 40:27-31","Reflect on the Creator who gives strength to the weary.","Why does the prophet remind the people of God's everlasting power? What is the difference between waiting on the Lord and giving up responsibility?","Creator God, renew my strength when I feel weary. Teach me patient trust, and guide me to take the next faithful step rather than lose heart."],
        ["2 Corinthians 1:3-11","Study God's comfort and the call to comfort others.","How does Paul connect the comfort he receives from God with the responsibility to comfort others? What does he say about relying on God rather than ourselves?","Father of mercies, comfort those who are distressed. Let the comfort I receive from You make me more attentive and compassionate toward others."],
        ["Romans 5:1-11","Consider hope, endurance and God's love poured into believers' hearts.","How does Paul connect peace with God through Christ to hope amid suffering? What does God's love demonstrated in Christ assure believers?","God of hope, help me understand the peace made possible through Jesus. Give me endurance in difficulty and keep my confidence rooted in Your love."],
        ["John 14:1-14","Hear Jesus comfort His disciples and direct them to the Father.","What troubles the disciples, and how does Jesus direct their trust? Read His words about the way to the Father in the context of His coming departure.","Lord Jesus, steady my heart with Your words. Help me trust You when the future feels unclear and follow You in truth and love."],
        ["1 Peter 1:3-9","Reflect on living hope through the resurrection of Jesus.","What makes the hope Peter describes living hope? How does he speak about faith and joy while believers face trials?","Father, thank You for the living hope given through the resurrection of Jesus. Strengthen my faith through trials and keep my hope fixed on Christ."],
        ["Revelation 21:1-7","Look toward God's promised renewal and the end of death and sorrow.","What does John see in the vision of new creation? Which forms of sorrow are promised to end, and how does this hope shape faithful life now?","God who makes all things new, help me hold fast to Your promised future. Give me compassion for those who grieve and faithfulness as I wait for Your renewal."]
      ]
    },
    {
      id:"forgiveness-and-peace-7",
      title:"Forgiveness, Peace and Healthy Relationships",
      duration:7,
      description:"Study forgiveness, reconciliation, boundaries, truthful speech and the peace that grows from Christ.",
      days:[
        ["Matthew 18:15-35","Read Jesus' teaching about addressing wrong and the seriousness of forgiveness.","How does Jesus describe a process for addressing wrongdoing, and what does the parable teach about receiving and extending mercy?","Lord, make me willing to seek truth and practise mercy. Give me wisdom to address harm honestly, forgive without pretending wrong did not happen, and seek safe, just paths toward peace."],
        ["Ephesians 4:25-32","Practise truthfulness, constructive speech and kindness.","Which old patterns of speech and behaviour are to be put away? What does Paul say should replace them in the community?","God, help my words be truthful and constructive. Remove bitterness and malice from my responses, and teach me kindness that does not excuse injustice."],
        ["Romans 12:9-21","Consider sincere love and refusing revenge.","How does Paul describe sincere love? What does it mean to refuse personal revenge while leaving room for what is right?","Father, guide me in sincere love. Keep me from retaliation, give me courage to establish wise boundaries, and help me pursue what is good."],
        ["Colossians 3:12-17","Study compassion, patience, forgiveness and love.","What qualities are believers called to put on? How does love hold these qualities together, and what role does gratitude play?","Lord Jesus, clothe my actions with compassion, patience and humility. Help me forgive as You teach, and let Your peace shape my choices."],
        ["Matthew 5:21-26","Reflect on anger, reconciliation and making peace.","How does Jesus address anger alongside outward actions? What urgency does He place on seeking reconciliation, and what practical wisdom does that require?","Jesus, show me where anger needs honest attention. Help me take responsible steps toward peace while respecting safety, truth and appropriate boundaries."],
        ["Proverbs 15:1-4","Notice the effect of gentle speech and truthful words.","How do gentle answers and harmful words affect others? What does the proverb teach about speech that brings healing?","God, set a guard over my words. Help me speak with gentleness and honesty, listen before reacting, and use my speech to encourage rather than wound."],
        ["Romans 14:13-19","Pursue what makes for peace and mutual strengthening.","How does Paul ask believers to handle differences of conscience? What matters more than winning an argument, and how can I strengthen rather than trip up another person?","Lord, give me humility when believers differ. Help me seek peace, respect conscience and choose actions that build others up without compromising truth."]
      ]
    }

  ];

  function emptyState() {
    return { schemaVersion: 1, activePlanId: null, plans: {} };
  }

  function readState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return emptyState();
    let value;
    try {
      value = JSON.parse(stored);
    } catch (error) {
      throw new Error("Saved reading-plan progress is unreadable. It has not been changed.");
    }
    if (!validateProgress(value)) {
      throw new Error("Saved reading-plan progress has an unsupported or invalid structure. It has not been changed.");
    }
    const clean = emptyState();
    clean.activePlanId = typeof value.activePlanId === "string" ? value.activePlanId : null;
    PLANS.forEach(plan => {
      const item = value.plans[plan.id];
      if (!item) return;
      clean.plans[plan.id] = {
        startedAt: typeof item.startedAt === "string" ? item.startedAt.slice(0, 50) : null,
        completedDays: [...new Set(item.completedDays)]
      };
    });
    return clean;
  }

  function writeState(state) {
    try {
      readState();
      if (!validateProgress(state)) return false;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      return false;
    }
  }

  function element(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text !== undefined) item.textContent = text;
    return item;
  }

  function button(label, handler, className) {
    const item = element("button", className || "", label);
    item.type = "button";
    item.addEventListener("click", handler);
    return item;
  }

  function referenceParts(reference) {
    const match = String(reference).match(/^(.+?)\s+(\d+)(?::(\d+))?(?:-(\d+))?$/);
    if (!match) return null;
    const book = match[1] === "Psalm" ? "Psalms" : match[1];
    const chapter = Number(match[2]);
    const wholeChapter = !match[3];
    const verse = match[3] ? Number(match[3]) : 1;
    const endVerse = match[4] ? Number(match[4]) : verse;
    if (!Number.isInteger(chapter) || chapter < 1 ||
        !Number.isInteger(verse) || verse < 1 ||
        !Number.isInteger(endVerse) || endVerse < verse) return null;
    return {
      book: book, chapter: chapter, verse: verse,
      endVerse: endVerse, wholeChapter: wholeChapter
    };
  }

  async function openPassage(reference, onStatus) {
    const parts = referenceParts(reference);
    if (!parts || typeof window.openChapter !== "function") {
      onStatus("This passage could not be opened. Please use the Bible reader to find " + reference + ".");
      return;
    }
    if (window.ZurielHomeNavigate) window.ZurielHomeNavigate("read");
    try {
      await window.openChapter(parts.book, parts.chapter);
      const verses = document.querySelectorAll("#message .verse");
      const target = verses[parts.verse - 1];
      if (!target || typeof window.selectBibleVerse !== "function" ||
          !window.selectBibleVerse(parts.verse)) {
        throw new Error("The reading-plan verse could not be selected in the Bible reader.");
      }
      try {
        localStorage.setItem("zurielLastReadingPosition", JSON.stringify({
          book: parts.book, chapter: parts.chapter, verse: parts.verse
        }));
      } catch (storageError) {
        // The passage still opens when local progress storage is unavailable.
      }
      target.classList.add("zuriel-nav-highlight");
      window.setTimeout(() => target.classList.remove("zuriel-nav-highlight"), 2200);
      onStatus(reference + " opened in the Bible reader. Read the full passage in its chapter context.");
    } catch (error) {
      onStatus("Zuriel could not open " + reference + ". Please try again from the Bible reader.");
    }
  }

  function render(container, onStatus) {
    if (!container) return;
    const report = typeof onStatus === "function" ? onStatus : function () {};
    let state;
    try {
      state = readState();
    } catch (error) {
      container.appendChild(element("p", "zrp-intro", error.message || "Saved reading-plan progress could not be read. No progress has been changed."));
      report(error.message || "Saved reading-plan progress could not be read. No progress has been changed.");
      return;
    }
    const active = PLANS.find(plan => plan.id === state.activePlanId) || null;
    const activeProgress = active ? (state.plans[active.id] || { completedDays: [] }) : null;
    const completed = activeProgress ? activeProgress.completedDays : [];
    const nextIndex = active ? active.days.findIndex((day, index) => !completed.includes(index + 1)) : -1;

    const style = element("style", "");
    style.textContent = ".zrp-intro{font:14px/1.6 Arial,sans-serif;color:#596879}.zrp-card{padding:13px;margin:12px 0;border:1px solid #dce1e2;border-radius:12px;background:#fff}.zrp-card h3{margin:0 0 6px;color:#1c405b;font:700 17px Georgia,serif}.zrp-card p{margin:5px 0;color:#5d6976;font:13px/1.55 Arial,sans-serif}.zrp-meta{font-weight:700;color:#8a7140!important}.zrp-progress{height:7px;overflow:hidden;border-radius:10px;background:#e7e8e5;margin:9px 0}.zrp-progress span{display:block;height:100%;background:#315b48}.zrp-actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.zrp-actions button{margin:0;flex:1 1 130px}.zrp-primary{background:#193e5a!important;color:#fff!important}.zrp-secondary{background:#f1f3f3!important;color:#24475e!important;border:1px solid #d5dfe3!important}.zrp-day{padding:10px 0;border-top:1px solid #edf0ed}.zrp-day strong{display:block;color:#27485e;font:700 14px Arial,sans-serif}.zrp-day p{margin:4px 0}.zrp-reflection{color:#284b63!important}.zrp-prayer{color:#315b48!important;font-style:italic}.zrp-complete{color:#315b48!important;font-weight:700!important}.zrp-foot{font:12px/1.55 Arial,sans-serif;color:#687582;margin-top:14px}";

    const heading = element("h2", "zps-heading", "Bible Reading Plans");
    const intro = element("p", "zrp-intro", "Choose a guided journey and move through its passages at your own pace. Your progress is saved privately on this device and works offline.");
    container.append(style, heading, intro);

    if (active) {
      const card = element("section", "zrp-card");
      const doneCount = completed.length;
      const percent = Math.round(doneCount / active.duration * 100);
      card.append(
        element("p", "zrp-meta", "YOUR ACTIVE PLAN"),
        element("h3", "", active.title),
        element("p", "", doneCount + " of " + active.duration + " days completed · " + percent + "%")
      );
      const track = element("div", "zrp-progress");
      const fill = element("span", "");
      fill.style.width = percent + "%";
      track.appendChild(fill);
      card.appendChild(track);

      if (nextIndex < 0) {
        card.append(element("p", "zrp-complete", "You have completed this plan. You can revisit its passages or begin it again."));
        card.appendChild(button("Restart this plan", function () {
          if (!window.confirm("Restart this reading plan and clear its completed days on this device?")) return;
          state.plans[active.id] = { startedAt: new Date().toISOString(), completedDays: [] };
          if (!writeState(state)) { report("Device storage is unavailable. Your plan was not changed."); return; }
          render(container, report);
          report("Reading plan restarted.");
        }, "zrp-secondary"));
      } else {
        const day = active.days[nextIndex];
        card.append(
          element("p", "zrp-meta", "NEXT · DAY " + (nextIndex + 1) + " OF " + active.duration),
          element("h3", "", day[0]),
          element("p", "", day[1])
        );
        if (day[2]) card.append(element("p", "zrp-reflection", "Reflect: " + day[2]));
        if (day[3]) card.append(element("p", "zrp-prayer", "Pray: " + day[3]));
        const actions = element("div", "zrp-actions");
        actions.append(
          button("Read this passage", () => openPassage(day[0], report), "zrp-primary"),
          button("Mark day complete", function () {
            const latest = readState();
            const record = latest.plans[active.id] || { startedAt: new Date().toISOString(), completedDays: [] };
            if (!record.completedDays.includes(nextIndex + 1)) record.completedDays.push(nextIndex + 1);
            latest.plans[active.id] = record;
            latest.activePlanId = active.id;
            if (!writeState(latest)) { report("Device storage is unavailable. Your progress was not saved."); return; }
            render(container, report);
            report("Day " + (nextIndex + 1) + " marked complete.");
          }, "zrp-secondary")
        );
        card.appendChild(actions);
      }
      const listTitle = element("h3", "zps-subheading", "Plan passages");
      card.appendChild(listTitle);
      active.days.forEach((day, index) => {
        const line = element("div", "zrp-day");
        const isDone = completed.includes(index + 1);
        line.append(
          element("strong", isDone ? "zrp-complete" : "", "Day " + (index + 1) + (isDone ? " · Completed" : "")),
          element("p", "", day[0] + " — " + day[1])
        );
        if (day[2]) line.appendChild(element("p", "zrp-reflection", "Reflect: " + day[2]));
        if (day[3]) line.appendChild(element("p", "zrp-prayer", "Pray: " + day[3]));
        line.appendChild(button("Open passage", () => openPassage(day[0], report), "zrp-secondary"));
        card.appendChild(line);
      });
      container.appendChild(card);
    }

    const available = element("h3", "zps-subheading", active ? "Explore another plan" : "Choose your first plan");
    container.appendChild(available);
    PLANS.filter(plan => !active || plan.id !== active.id).forEach(plan => {
      const record = state.plans[plan.id];
      const done = record ? record.completedDays.length : 0;
      const card = element("article", "zrp-card");
      card.append(
        element("h3", "", plan.title),
        element("p", "zrp-meta", plan.duration + " days" + (done ? " · " + done + " completed" : "")),
        element("p", "", plan.description)
      );
      card.appendChild(button(record ? "Continue this plan" : "Start this plan", function () {
        const latest = readState();
        if (!latest.plans[plan.id]) latest.plans[plan.id] = { startedAt: new Date().toISOString(), completedDays: [] };
        latest.activePlanId = plan.id;
        if (!writeState(latest)) { report("Device storage is unavailable. Your plan was not saved."); return; }
        render(container, report);
        report(plan.title + " is now your active reading plan.");
      }, "zrp-primary"));
      container.appendChild(card);
    });
    container.appendChild(element("p", "zrp-foot", "Reading plans are optional guides, not a measure of spiritual worth. Mark a day complete only when you have read its passage. Zuriel opens the passage in the Bible reader; the full chapter remains available for context."));
  }

  function validateProgress(value) {
    if (!value || typeof value !== "object" || Array.isArray(value) || value.schemaVersion !== 1 ||
        !value.plans || typeof value.plans !== "object" || Array.isArray(value.plans) ||
        Object.keys(value.plans).length > 50) return false;
    if (value.activePlanId !== null && value.activePlanId !== undefined &&
        !PLANS.some(plan => plan.id === value.activePlanId)) return false;
    return Object.keys(value.plans).every(id => {
      const plan = PLANS.find(item => item.id === id);
      const record = value.plans[id];
      return !!plan && !!record && typeof record === "object" && !Array.isArray(record) &&
        (record.startedAt === null || record.startedAt === undefined || typeof record.startedAt === "string") &&
        Array.isArray(record.completedDays) && record.completedDays.length <= plan.duration &&
        record.completedDays.every(day => Number.isInteger(day) && day >= 1 && day <= plan.duration);
    });
  }

  window.ZurielReadingPlans = {
    render: render,
    list: function () { return PLANS.map(plan => ({ id: plan.id, title: plan.title, duration: plan.duration, passages: plan.days.map(day => day[0]), days: plan.days.map(day => ({ reference: day[0], focus: day[1], reflection: day[2] || "", prayer: day[3] || "" })) })); },
    validateProgress: validateProgress,
    readState: readState,
    writeState: writeState,
    parseReference: referenceParts
  };
})();