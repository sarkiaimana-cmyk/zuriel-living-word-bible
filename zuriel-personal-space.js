/* Zuriel Personal Study Space — private, on-device notes, insights, prayer journal and reading history. */
(function () {
  "use strict";
  const ROOT="zurielPersonalSpace", NOTES="zuriel_personal_notes_v1", PRAYERS="zuriel_prayer_journal_v1", HISTORY="zurielReadingHistory_v1";
  let root, tab="insights";
  function read(key){
    const raw=localStorage.getItem(key);
    if(raw===null)return [];
    let value;
    try{value=JSON.parse(raw);}catch(e){throw new Error("Zuriel could not read saved personal data ("+key+"). Your records have not been changed.");}
    if(!Array.isArray(value))throw new Error("Zuriel found an unexpected saved-data format ("+key+"). Your records have not been changed.");
    return value;
  }
  function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){return false;}}
  function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;}
  function btn(label,fn,cls){const b=el("button",cls||"",label);b.type="button";b.addEventListener("click",fn);return b;}
  function dateLabel(value){try{return new Date(value).toLocaleString();}catch(e){return "Saved entry";}}
  function status(message){const n=root&&root.querySelector("#zpsStatus");if(n)n.textContent=message;}
  function addEntry(key,entry){let all;try{all=read(key);}catch(error){status(error.message);return false;}all.unshift(entry);if(!write(key,all.slice(0,300))){status("Device storage is unavailable. Your entry was not saved.");return false;}return true;}
  function render(){
    if(!root)return;
    const panel=root.querySelector("#zpsPanel");panel.replaceChildren();
    root.querySelectorAll("[data-zps-tab]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.zpsTab===tab)));
    if(tab==="insights")renderInsights(panel);
    if(tab==="prayer")renderPrayer(panel);
    if(tab==="progress")renderProgress(panel);
    if(tab==="plans"&&window.ZurielReadingPlans)window.ZurielReadingPlans.render(panel,status);
    if(tab==="bookmarks")renderBookmarks(panel);
    if(tab==="testimonies")renderTestimonies(panel);
  }
  function entryCard(item,key){
    const card=el("article","zps-entry");
    card.append(el("p","zps-date",dateLabel(item.createdAt)),el("h3","",item.title||"Personal note"));
    if(item.reference)card.append(el("p","zps-reference",item.reference));
    card.append(el("p","zps-copy",item.text||""));
    card.appendChild(btn("Delete",()=>{if(!confirm("Delete this saved entry from this device?"))return;let all;try{all=read(key);}catch(error){status(error.message);return;}const next=all.filter(x=>x.id!==item.id);if(!write(key,next)){status("Device storage is unavailable. Your entry was not deleted.");return;}render();status("Entry deleted from this device.");},"zps-delete"));
    return card;
  }
  function renderInsights(panel){
    panel.append(el("h2","zps-heading","Saved insights & study notes"),el("p","zps-copy","Keep observations, questions, discoveries and personal study notes together on this device."));
    const form=el("form","zps-form"),title=el("input","");title.placeholder="Note title";title.maxLength=100;title.required=true;
    const reference=el("input","");reference.placeholder="Scripture reference (optional)";reference.maxLength=100;
    const text=el("textarea","");text.placeholder="Write your insight or study note…";text.rows=5;text.maxLength=5000;text.required=true;
    const save=btn("Save insight",()=>{}, "zps-save");save.type="submit";
    form.append(title,reference,text,save);
    form.addEventListener("submit",e=>{e.preventDefault();if(!title.value.trim()||!text.value.trim())return;const ok=addEntry(NOTES,{id:String(Date.now())+"-"+Math.random().toString(36).slice(2),title:title.value.trim(),reference:reference.value.trim(),text:text.value.trim(),createdAt:new Date().toISOString()});if(ok){status("Insight saved on this device.");render();}});
    panel.appendChild(form);
    let items;try{items=read(NOTES);}catch(error){panel.append(el("p","zps-empty",error.message));status(error.message);return;}panel.append(el("h3","zps-subheading","Your saved insights ("+items.length+")"));
    if(!items.length)panel.append(el("p","zps-empty","Your personal study space is ready. Save your first insight above."));
    items.forEach(item=>panel.appendChild(entryCard(item,NOTES)));
  }
  function renderPrayer(panel){
    panel.append(el("h2","zps-heading","Prayer journal"),el("p","zps-copy","Record prayer points, gratitude, answered prayers and faith reflections. Entries remain in this browser on this device."));
    const form=el("form","zps-form"),title=el("input","");title.placeholder="Prayer focus or title";title.maxLength=100;title.required=true;
    const category=el("select","");
    category.setAttribute("aria-label","Journal entry category");
    [["prayer","Prayer"],["thanksgiving","Thanksgiving"],["answered-prayer","Answered prayer"],["reflection","Faith reflection"]].forEach(([value,label])=>{const option=el("option","",label);option.value=value;category.appendChild(option);});
    const reference=el("input","");reference.placeholder="Related Scripture (optional)";reference.maxLength=100;
    const text=el("textarea","");text.placeholder="Write your prayer, thanksgiving, answered prayer or reflection…";text.rows=6;text.maxLength=6000;text.required=true;
    const save=btn("Save journal entry",()=>{},"zps-save");save.type="submit";form.append(title,category,reference,text,save);
    form.addEventListener("submit",e=>{e.preventDefault();if(!title.value.trim()||!text.value.trim())return;const ok=addEntry(PRAYERS,{id:String(Date.now())+"-"+Math.random().toString(36).slice(2),entryType:category.value,title:title.value.trim(),reference:reference.value.trim(),text:text.value.trim(),createdAt:new Date().toISOString()});if(ok){status(category.options[category.selectedIndex].text+" entry saved on this device.");render();}});
    panel.appendChild(form);
    let items;try{items=read(PRAYERS);}catch(error){panel.append(el("p","zps-empty",error.message));status(error.message);return;}
    const journalItems=items.filter(item=>!item.entryType||["prayer","thanksgiving","answered-prayer","reflection"].includes(item.entryType));
    panel.append(el("h3","zps-subheading","Journal entries ("+journalItems.length+")"));
    if(!journalItems.length)panel.append(el("p","zps-empty","Your journal is ready whenever you want to write."));
    journalItems.forEach(item=>panel.appendChild(entryCard(item,PRAYERS)));
  }
  function renderBookmarks(panel){
    panel.append(el("h2","zps-heading","Bookmarked Scriptures & saved declarations"),el("p","zps-copy","Your saved verses, declarations, teachings and study resources from the Zuriel Library."));
    let library;
    try{
      const raw=localStorage.getItem("zuriel_personal_library_v1");
      library=raw===null?{bookmarks:[]}:JSON.parse(raw);
      if(!library||typeof library!=="object"||Array.isArray(library)||!Array.isArray(library.bookmarks))throw new Error("Saved bookmark data has an unexpected format. Your records have not been changed.");
    }catch(error){panel.append(el("p","zps-empty",error.message||"Zuriel could not read your saved bookmarks."));status(error.message||"Could not read saved bookmarks.");return;}
    const items=library.bookmarks;
    panel.append(el("h3","zps-subheading","Saved items ("+items.length+")"));
    if(!items.length){panel.append(el("p","zps-empty","No bookmarks yet. Save a Scripture, declaration or teaching from the Bible and Study Library."));return;}
    items.slice().reverse().forEach(item=>{
      const card=el("article","zps-entry");
      card.append(el("h3","",item.title||"Saved item"));
      if(item.reference)card.append(el("p","zps-reference",item.reference));
      if(item.text)card.append(el("p","zps-copy",item.text));
      if(item.reference)card.appendChild(btn("Open Scripture",async()=>{
        const match=String(item.reference).match(/^(.+?)\s+(\d+)(?::(\d+))?/);
        if(!match){status("This saved item has no directly openable chapter reference.");return;}
        try{
          if(window.ZurielHomeNavigate)window.ZurielHomeNavigate("read");
          await window.openChapter(match[1].trim(),Number(match[2]));
          if(match[3]&&window.selectBibleVerse)window.selectBibleVerse(Number(match[3]));
          status("Opened "+item.reference+".");
        }catch(error){status("Could not open "+item.reference+".");}
      },"zps-small"));
      panel.appendChild(card);
    });
  }
  function renderTestimonies(panel){
    panel.append(el("h2","zps-heading","My Testimonies"),el("p","zps-copy","Record answered prayer, God's faithfulness and moments you want to remember. These entries are kept on this device and included in your encrypted personal backup."));
    const form=el("form","zps-form"),title=el("input","");
    title.placeholder="Testimony title";title.maxLength=100;title.required=true;
    const reference=el("input","");reference.placeholder="Related Scripture (optional)";reference.maxLength=100;
    const text=el("textarea","");text.placeholder="Write what happened, how you prayed, and what you are thankful for…";text.rows=6;text.maxLength=6000;text.required=true;
    const save=btn("Save testimony",()=>{},"zps-save");save.type="submit";form.append(title,reference,text,save);
    form.addEventListener("submit",e=>{
      e.preventDefault();if(!title.value.trim()||!text.value.trim())return;
      const ok=addEntry(PRAYERS,{id:String(Date.now())+"-"+Math.random().toString(36).slice(2),entryType:"testimony",title:title.value.trim(),reference:reference.value.trim(),text:text.value.trim(),createdAt:new Date().toISOString()});
      if(ok){status("Testimony saved on this device and included in encrypted backup.");render();}
    });
    panel.appendChild(form);
    let items;try{items=read(PRAYERS);}catch(error){panel.append(el("p","zps-empty",error.message));status(error.message);return;}
    const testimonies=items.filter(item=>item.entryType==="testimony");
    panel.append(el("h3","zps-subheading","Saved testimonies ("+testimonies.length+")"));
    if(!testimonies.length)panel.append(el("p","zps-empty","Your testimony journal is ready. Save your first testimony above."));
    testimonies.forEach(item=>panel.appendChild(entryCard(item,PRAYERS)));
  }
  function mergeChapterHistory(legacyItems){
    const currentItems=window.ZurielRecentlyOpened&&typeof window.ZurielRecentlyOpened.list==="function"
      ?window.ZurielRecentlyOpened.list():[];
    const merged=[],seen=new Set();
    [currentItems,legacyItems].forEach(items=>{
      if(!Array.isArray(items))return;
      items.forEach(item=>{
        if(!item||typeof item.book!=="string"||!item.book.trim()||
          !Number.isInteger(Number(item.chapter))||Number(item.chapter)<1)return;
        const book=item.book.trim().replace(/\s+/g," ");
        const chapter=Number(item.chapter);
        const key=book.toLowerCase()+"|"+chapter;
        if(seen.has(key))return;
        seen.add(key);
        merged.push({book:book,chapter:chapter,openedAt:typeof item.openedAt==="string"?item.openedAt:""});
      });
    });
    return merged.slice(0,500);
  }
  function renderProgress(panel){
    panel.append(el("h2","zps-heading","Your reading & growth progress"),el("p","zps-copy","A simple record of the chapters you have opened and lessons you have marked complete."));
    let position=null;try{const raw=localStorage.getItem("zurielLastReadingPosition");position=raw===null?null:JSON.parse(raw);if(position!==null&&(!position||typeof position!=="object"||Array.isArray(position)))throw new Error("Unexpected reading-position format.");}catch(e){const message="Zuriel could not safely read your saved reading position. Your records have not been changed.";panel.append(el("p","zps-empty",message));status(message);return;}
    let history,done,saved,notes,prayers;try{const legacyHistory=read(HISTORY);history=mergeChapterHistory(legacyHistory);done=read("zuriel_kingdom_life_completed_v1");saved=read("zuriel_kingdom_life_saved_v1");notes=read(NOTES);prayers=read(PRAYERS);}catch(e){panel.append(el("p","zps-empty",e.message));status(e.message);return;}
    const current=position&&position.book&&position.chapter?position.book+" "+position.chapter+(position.verse?":"+position.verse:""):"No reading position saved yet";
    const stats=el("div","zps-stats");
    [[history.length,"Chapters opened"],[done.length,"Lessons completed"],[saved.length,"Lessons saved"],[notes.length,"Study notes"],[prayers.length,"Journal entries"]].forEach(([n,label])=>{const item=el("div","zps-stat");item.append(el("strong","",String(n)),el("span","",label));stats.appendChild(item);});
    panel.append(el("p","zps-current","Continue from: "+current),stats);
    panel.appendChild(btn("Continue reading",()=>{if(!position||!position.book||!position.chapter){status("Open a Bible chapter first; Zuriel will remember your position.");return;}if(window.ZurielHomeNavigate)window.ZurielHomeNavigate("read");if(window.openChapter)window.openChapter(position.book,position.chapter).then(()=>{if(position.verse){const v=document.querySelector('#message .verse[data-verse-number="'+position.verse+'"]');if(v)v.scrollIntoView({behavior:"smooth",block:"center"});else status("The saved verse is not present in the loaded chapter. The chapter is open; choose the verse from the reader.");}}).catch(()=>status("Could not reopen the saved chapter. Please try again."));},"zps-save"));
    panel.append(el("h3","zps-subheading","Recently opened chapters"));
    if(!history.length)panel.append(el("p","zps-empty","Your chapter history will appear here as you read."));
    const historySearch=el("input","");
    historySearch.type="search";
    historySearch.placeholder="Search opened books or chapters";
    historySearch.setAttribute("aria-label","Search all recently opened Bible chapters");
    const historyList=el("div","");
    let showAllHistory=false;
    function renderHistoryList(){
      historyList.replaceChildren();
      const query=historySearch.value.trim().toLowerCase();
      const filtered=history.filter(item=>(item.book+" "+item.chapter).toLowerCase().includes(query));
      const visible=filtered.slice(0,showAllHistory?500:20);
      if(!visible.length){historyList.appendChild(el("p","zps-empty","No opened chapters match this search."));return;}
      visible.forEach(item=>{
        const line=el("div","zps-history");
        line.append(el("span","",item.book+" "+item.chapter),btn("Open",async()=>{
          if(typeof window.openChapter!=="function"){status("The Bible reader is not ready yet.");return;}
          if(window.ZurielHomeNavigate)window.ZurielHomeNavigate("read");
          try{await window.openChapter(item.book,item.chapter);status("Opened "+item.book+" "+item.chapter+".");}
          catch(error){status("Could not reopen "+item.book+" "+item.chapter+". Please try again.");}
        },"zps-small"));
        historyList.appendChild(line);
      });
      historyList.appendChild(el("p","zps-footnote","Showing "+visible.length+" of "+filtered.length+" matching chapters."));
      if(filtered.length>20){
        historyList.appendChild(btn(showAllHistory?"Show recent 20":"Show all "+filtered.length+" chapters",()=>{
          showAllHistory=!showAllHistory;
          renderHistoryList();
        },"zps-small"));
      }
    }
    historySearch.addEventListener("input",function(){showAllHistory=true;renderHistoryList();});
    panel.append(historySearch,historyList);
    renderHistoryList();
    panel.append(el("p","zps-footnote","Reading progress is based on chapters opened, not a claim that every verse has been read. Notes and journal entries are stored locally and are not synced or backed up automatically."));
  }
  function mount(main){
    if(!main||document.getElementById(ROOT))return;
    root=el("section","");root.id=ROOT;root.setAttribute("aria-label","Personal study space");
    const style=el("style","");
    style.textContent="#zurielPersonalSpace{max-width:900px;margin:0 auto;padding:12px 0 28px;color:#20364b;font-family:Arial,sans-serif}#zurielPersonalSpace *{box-sizing:border-box}#zurielPersonalSpace .zps-hero{padding:23px 18px;border-radius:18px;background:linear-gradient(140deg,#10213d,#254c68);color:#fff;margin-bottom:14px}#zurielPersonalSpace .zps-hero h1{font:700 27px/1.2 Georgia,serif;margin:0 0 8px;color:#f2dfb3}#zurielPersonalSpace .zps-hero p{font-size:14px;line-height:1.6;color:#e4eaf0;margin:0}#zurielPersonalSpace .zps-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:12px 0}#zurielPersonalSpace button{min-height:42px;padding:9px 11px;border-radius:9px;font:700 13px Arial,sans-serif;cursor:pointer}#zurielPersonalSpace .zps-tab{background:#f1eee6;color:#233e55;border:1px solid #d8d1c2}#zurielPersonalSpace .zps-tab[aria-pressed=true],#zurielPersonalSpace .zps-save{background:#183e5a;color:#fff;border:1px solid #183e5a}#zurielPersonalSpace .zps-panel{padding:16px;background:#fff;border:1px solid #e2dfd7;border-radius:15px}#zurielPersonalSpace .zps-heading{font:700 22px/1.25 Georgia,serif;color:#193c56;margin:0 0 7px}#zurielPersonalSpace .zps-subheading{font:700 17px Georgia,serif;color:#244b60;margin:20px 0 10px}#zurielPersonalSpace .zps-copy{font-size:14px;line-height:1.65;color:#586779}#zurielPersonalSpace .zps-form{display:grid;gap:9px;margin:14px 0 18px}#zurielPersonalSpace input,#zurielPersonalSpace textarea,#zurielPersonalSpace select{width:100%;min-width:0;border:1px solid #cfd4d7;border-radius:9px;padding:12px;font:15px Arial,sans-serif;color:#24394c;background:#fff}#zurielPersonalSpace textarea{resize:vertical;line-height:1.6}#zurielPersonalSpace .zps-entry{padding:13px 0;border-top:1px solid #ece9e1}#zurielPersonalSpace .zps-entry h3{font:700 16px Georgia,serif;color:#23475f;margin:4px 0}#zurielPersonalSpace .zps-date,#zurielPersonalSpace .zps-reference{font-size:11px;color:#78818a;margin:4px 0}#zurielPersonalSpace .zps-delete{background:#f5f1ed;border:1px solid #ded6ce;color:#754d42;min-height:36px}#zurielPersonalSpace .zps-empty,#zurielPersonalSpace .zps-footnote{font-size:13px;line-height:1.6;color:#667383}#zurielPersonalSpace .zps-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:14px 0}#zurielPersonalSpace .zps-stat{padding:12px;border-radius:11px;background:#f3f4f2;border:1px solid #e1e5e1;display:flex;flex-direction:column;gap:4px}#zurielPersonalSpace .zps-stat strong{font:700 24px Georgia,serif;color:#1d4963}#zurielPersonalSpace .zps-stat span{font-size:12px;color:#5d6874}#zurielPersonalSpace .zps-current{padding:12px;background:#f6f3ea;border-radius:10px;font-weight:700;color:#334b60}#zurielPersonalSpace .zps-history{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid #ece9e1;font-size:14px;color:#344c60}#zurielPersonalSpace .zps-small{min-height:34px;background:#edf2f4;color:#1d4963;border:1px solid #d7e0e4}@media(max-width:460px){#zurielPersonalSpace .zps-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}";
    const hero=el("header","zps-hero");hero.append(el("h1","","My Study Space"),el("p","","A quiet place for your discoveries, prayers, notes and growing walk through Scripture."));
    const tabs=el("div","zps-tabs");
    [["insights","✍️ Notes"],["bookmarks","🔖 Bookmarks"],["prayer","🙏 Prayer"],["testimonies","🌿 Testimonies"],["progress","📖 Progress"],["plans","🗓️ Reading Plans"]].forEach(([key,label])=>{const b=btn(label,()=>{tab=key;render();},"zps-tab");b.dataset.zpsTab=key;b.setAttribute("aria-pressed",String(tab===key));tabs.appendChild(b);});
    const panel=el("div","zps-panel");panel.id="zpsPanel";
    const live=el("p","");live.id="zpsStatus";live.setAttribute("role","status");live.setAttribute("aria-live","polite");
    root.append(style,hero,tabs,panel,live);main.appendChild(root);if(window.ZurielBackup&&typeof window.ZurielBackup.mount==="function")window.ZurielBackup.mount(root);render();
  }
  function open(){if(root){root.hidden=false;render();}}
  function openProgress(){tab="progress";open();}
  window.ZurielPersonalSpace={mount:mount,open:open,openProgress:openProgress,saveInsight:function(item){if(!item||!item.text)return false;const ok=addEntry(NOTES,{id:String(Date.now())+"-"+Math.random().toString(36).slice(2),title:item.title||"Saved insight",reference:item.reference||"",text:item.text,createdAt:new Date().toISOString()});if(ok)status("Insight saved from your study.");return ok;}};
})();