/* Screenshot-led home dashboard refresh for Zuriel Living Word Bible */
(function(){
"use strict";
function mount(){
 const main=document.querySelector("main"), dash=document.getElementById("zurielHomeDashboard");
 if(!main||!dash||document.getElementById("zurielScreenshotHome"))return;
 const css=document.createElement("style"); css.id="zurielScreenshotHomeStyle";
 css.textContent=`
 body{background:#080909!important;color:#eee!important;font-family:Arial,sans-serif!important}
 body>header,main>section.card[data-zuriel-hidden],footer{display:none!important}
 #zurielHomeDashboard{padding:0 0 100px!important;margin:0!important;max-width:100%!important}
 #zurielHomeDashboard>.home-card,#zurielHomeDashboard>.home-hero{display:none!important}
 #zurielScreenshotHome{display:block!important}
 #zurielScreenshotHome .streak{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin:0 2px 27px;text-align:center}
 #zurielScreenshotHome .streak-day{color:#a7a7a7;font-size:11px}
 #zurielScreenshotHome .streak-circle{width:min(12vw,56px);height:min(12vw,56px);margin:8px auto 0;border:1.5px solid #6e6e6e;border-radius:50%;display:grid;place-items:center;color:#aaa;font-size:19px}
 #zurielScreenshotHome .streak-circle.done{background:#35291b;border-color:#c6a45a;color:#e4bd66}
 #zurielScreenshotHome .streak-circle.today{border-color:#f2e7d0;color:#f2e7d0;font-weight:bold}
 #zurielScreenshotHome .greeting{font-size:clamp(22px,6vw,31px);font-weight:700;margin:0 0 23px}
 #zurielScreenshotHome .verse-card{position:relative;isolation:isolate;overflow:hidden;border-radius:30px;border:1px solid #252525;padding:22px 20px 18px;min-height:570px;background:#121719;display:flex;flex-direction:column}
 #zurielScreenshotHome .verse-card:before{content:"";position:absolute;inset:0;z-index:-2;background-image:var(--zuriel-home-photo);background-position:center;background-size:cover;opacity:.6}
 #zurielScreenshotHome .verse-card:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(0,0,0,.52),rgba(0,0,0,.82))}
 #zurielScreenshotHome .votd-label{color:#bcbcbc;font-size:15px;margin:0 0 7px}
 #zurielScreenshotHome .votd-ref{font-weight:bold;font-size:17px;margin:0}
 #zurielScreenshotHome .votd-copy{font:clamp(25px,7vw,34px)/1.55 Georgia,serif;color:#fff5e6;margin:30px 0 25px;white-space:pre-wrap}
 #zurielScreenshotHome .actions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:auto}
 #zurielScreenshotHome .actions button{margin:0;min-width:0;min-height:92px;border:1px solid #292929;border-radius:24px;background:rgba(10,10,10,.75);color:#eee;padding:8px 3px;font-size:13px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:9px}
 #zurielScreenshotHome .actions button span{font-size:21px}
 #zurielBottomNavigation{position:fixed!important;left:3.5%!important;right:3.5%!important;bottom:calc(8px + env(safe-area-inset-bottom))!important;z-index:9999!important;width:93%!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;border:1px solid #2a2a2a!important;border-radius:42px!important;background:rgba(18,19,19,.97)!important;padding:8px!important;box-shadow:0 10px 28px #0008!important}
 #zurielBottomNavigation button{min-height:62px!important;border-radius:30px!important;color:#aaa!important;font-size:11px!important}
 #zurielBottomNavigation button.active{background:#35291b!important;color:#d7b15d!important}
 #zurielBottomNavigation button span{font-size:20px!important}
 #zurielTopReturnBar{display:none!important}
 main{padding:18px 5.5% 115px!important}
 @media(max-width:390px){#zurielScreenshotHome .verse-card{min-height:520px;padding:19px 16px}#zurielScreenshotHome .votd-copy{font-size:26px}}
 `;
 document.head.appendChild(css);
 const home=document.createElement("section");home.id="zurielScreenshotHome";
 home.innerHTML='<div class="streak" id="zurielHomeStreak"></div><h1 class="greeting">☀️ Good morning</h1><div class="verse-card"><p class="votd-label">Verse of the Day</p><p class="votd-ref" id="zsrRef">Loading Scripture…</p><p class="votd-copy" id="zsrText">Loading the King James Version…</p><div class="actions"><button id="zsrStudy"><span>📖</span>Study</button><button id="zsrZuriel"><span>🔥</span>Zuriel</button><button id="zsrListen"><span>🎧</span>Listen</button><button id="zsrCard"><span>♧</span>Card</button></div></div>';
 dash.prepend(home);
 const greeting=home.querySelector(".greeting");
 try{const stored=localStorage.getItem("zurielGreetingName");if(stored)greeting.textContent="☀️ Good morning, "+stored;}catch(e){}
 const today=new Date(),start=new Date(today);start.setDate(today.getDate()-((today.getDay()+6)%7));
 const dayNames=["MON","TUE","WED","THU","FRI","SAT","SUN"],streak=home.querySelector("#zurielHomeStreak");
 let count=0;try{count=Number(localStorage.getItem("zurielReadingStreak")||0);}catch(e){}
 let readingDates=new Set();try{const history=JSON.parse(localStorage.getItem("zurielReadingHistory_v1")||"[]");if(Array.isArray(history))history.forEach(x=>{if(x&&x.openedAt)readingDates.add(new Date(x.openedAt).toDateString());});const saved=JSON.parse(localStorage.getItem("zurielLastReadingPosition")||"null");if(saved)readingDates.add(today.toDateString());}catch(e){} dayNames.forEach((d,i)=>{const actual=new Date(start);actual.setDate(start.getDate()+i);const isToday=actual.toDateString()===today.toDateString(),done=readingDates.has(actual.toDateString());const day=document.createElement("div");day.className="streak-day";const label=document.createElement("div");label.textContent=d;const circle=document.createElement("div");circle.className="streak-circle";if(done)circle.classList.add("done");if(isToday)circle.classList.add("today");circle.textContent=done?"✓":isToday?today.getDate():"·";day.append(label,circle);streak.appendChild(day);});\n const images=["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85","https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=85"];
 home.querySelector(".verse-card").style.setProperty("--zuriel-home-photo",'url("'+images[Math.floor(Date.now()/86400000)%images.length]+'")');
 const verses=["Romans 5:17","Psalm 119:105","Isaiah 41:10","Philippians 4:13","John 14:27","Psalm 23:1","Romans 8:28"];
 const reference=verses[Math.floor(Date.now()/86400000)%verses.length];
 home.querySelector("#zsrRef").textContent=reference+" (KJV)";
 if(typeof window.getBibleVerseText==="function")window.getBibleVerseText(reference).then(p=>home.querySelector("#zsrText").textContent=String(p.text||"").replace(/^\d+\.\s*/,"")).catch(()=>home.querySelector("#zsrText").textContent="Open Scripture to read today's passage.");
 function openRef(){const m=reference.match(/^(.+) (\d+):(\d+)$/);if(!m||!window.openChapter)return;window.ZurielHomeNavigate("read");const sel=document.getElementById("book");if(sel)sel.value=m[1]==="Psalm"?"Psalms":m[1];window.openChapter(m[1]==="Psalm"?"Psalms":m[1],Number(m[2])).then(()=>window.selectBibleVerse&&window.selectBibleVerse(Number(m[3])));}
 home.querySelector("#zsrStudy").onclick=()=>window.ZurielHomeNavigate("study");
 home.querySelector("#zsrZuriel").onclick=()=>window.ZurielHomeNavigate("kingdom");
 home.querySelector("#zsrListen").onclick=()=>{if(window.ZurielAudio&&typeof window.ZurielAudio.open==="function")window.ZurielAudio.open(reference);else openRef();};
 home.querySelector("#zsrCard").onclick=async()=>{try{const p=await window.getBibleVerseText(reference);if(window.ZurielLibrary&&window.ZurielLibrary.openGloryVerse){window.ZurielHomeNavigate("library");window.ZurielLibrary.openGloryVerse(reference,String(p.text||"").replace(/^\d+\.\s*/,""),"KJV",window.ZurielFaithContent?.find(reference)||{});}else openRef();}catch(e){openRef();}};
 const nav=document.getElementById("zurielBottomNavigation");
 if(nav){const items=[["home","🏠","Home"],["explore","🧭","Explore"],["kingdom","🔥","Zuriel"],["read","📖","Bible"],["community","👥","Community"]];nav.replaceChildren();items.forEach(([key,icon,label])=>{const b=document.createElement("button");b.type="button";b.dataset.section=key;b.innerHTML="<span>"+icon+"</span>"+label;b.addEventListener("click",()=>{if(key==="home")window.ZurielHomeNavigate("home");else if(key==="explore")window.ZurielHomeNavigate("study");else if(key==="community")window.ZurielHomeNavigate("personal");else window.ZurielHomeNavigate(key==="kingdom"?"kingdom":"read");});nav.appendChild(b);});}
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
})();
