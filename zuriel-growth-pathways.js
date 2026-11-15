/* Zuriel Guided Growth Pathways — journeys through the existing topical study index. */
(function () {
  "use strict";
  const DONE = "zuriel_kingdom_life_completed_v1";
  const ROOT = "zurielGrowthPathways";
  const paths = [
    { id:"foundations", title:"Foundations of Faith", level:"Begin here", description:"Build a clear, Scripture-shaped foundation for knowing God and understanding the new life in Christ.", lessons:["God's Character","Creation and the Creator","The Word of God","Grace and Salvation","Life in Christ"] },
    { id:"spiritual-growth", title:"Growing in the Spirit", level:"Daily formation", description:"Develop a prayerful, resilient life shaped by Scripture, the Holy Spirit and Christlike character.", lessons:["The Holy Spirit","Prayer and Communion","Faith and Trust","Renewal of the Mind","Christian Character and Fruit"] },
    { id:"christlike-life", title:"The Life of Christ in Us", level:"Character & relationships", description:"Let the love, humility, forgiveness and servant-hearted way of Jesus shape everyday relationships.", lessons:["The Identity of Jesus Christ","The Teachings of Jesus","Love and Compassion","Forgiveness and Reconciliation","Humility and Servanthood"] },
    { id:"purpose", title:"Purpose, Service & Stewardship", level:"Faith in action", description:"Connect discipleship with calling, work, generosity, service and faithful witness.", lessons:["Discipleship and Obedience","Work and Stewardship","Spiritual Gifts and Service","The Great Commission and Mission","The Church as Christ's Body"] },
    { id:"hope", title:"Hope Through Every Season", level:"Endurance & assurance", description:"Study God's faithfulness, courage, comfort, perseverance and the hope of resurrection.", lessons:["God's Promises and Faithfulness","Courage and Strength","Peace and Anxiety","Hope and Endurance","Resurrection and Eternal Life"] }
  ];
  let root, active = "";
  function readDone() { try { const v=JSON.parse(localStorage.getItem(DONE)||"[]"); return Array.isArray(v)?v:[]; } catch(e) { return []; } }
  function el(tag,cls,txt) { const n=document.createElement(tag); if(cls)n.className=cls; if(txt!==undefined)n.textContent=txt; return n; }
  function btn(txt,fn,cls) { const b=el("button",cls||"",txt); b.type="button"; b.addEventListener("click",fn); return b; }
  function render() {
    if(!root)return;
    const done=readDone(), list=root.querySelector("#zgPathList"), detail=root.querySelector("#zgPathDetail");
    list.replaceChildren(); detail.replaceChildren(); detail.hidden=!active;
    paths.forEach(path=>{
      const completed=path.lessons.filter(x=>done.includes(x)).length, pct=Math.round(completed/path.lessons.length*100);
      const card=el("article","zg-card");
      card.append(el("p","zg-level",path.level),el("h3","",path.title),el("p","zg-copy",path.description),el("p","zg-progress-label",completed+" of "+path.lessons.length+" lessons completed • "+pct+"%"));
      const track=el("div","zg-track"),fill=el("div","zg-fill");fill.style.width=pct+"%";track.appendChild(fill);card.appendChild(track);
      card.appendChild(btn(active===path.id?"Close pathway":"Explore pathway →",()=>{active=active===path.id?"":path.id;render();},"zg-open"));
      list.appendChild(card);
    });
    if(!active)return;
    const path=paths.find(x=>x.id===active); if(!path)return;
    detail.append(btn("← All pathways",()=>{active="";render();},"zg-back"));
    detail.append(el("p","zg-level","YOUR GUIDED JOURNEY"),el("h2","",path.title),el("p","zg-copy",path.description));
    path.lessons.forEach((title,i)=>{
      const isDone=done.includes(title), topic=window.ZurielTopicalIndex&&window.ZurielTopicalIndex.getTopic(title);
      const item=el("article","zg-step");
      const number=el("span","zg-number",String(i+1).padStart(2,"0"));
      const body=el("div","zg-step-body");
      body.append(el("h3","",title),el("p","zg-copy",topic?topic.summary:"A guided Bible study lesson."));
      const actions=el("div","zg-step-actions");
      actions.append(el("span",isDone?"zg-done":"zg-pending",isDone?"✓ Completed":"Next study"));
      actions.append(btn("Open lesson",()=>{
        if(window.ZurielKingdomLife&&typeof window.ZurielKingdomLife.openTopic==="function") window.ZurielKingdomLife.openTopic(title);
        else { const status=root.querySelector("#zgStatus"); if(status)status.textContent="The lesson library is still loading. Please try again."; }
      },"zg-open"));
      body.appendChild(actions);item.append(number,body);detail.appendChild(item);
    });
    detail.append(el("p","zg-note","Move at your own pace. Read every linked passage in context, reflect honestly, and mark each lesson complete when you are ready."));
  }
  function mount(parent) {
    if(!parent||document.getElementById(ROOT))return;
    root=el("section","");root.id=ROOT;root.setAttribute("aria-label","Guided spiritual growth pathways");
    const style=el("style","");
    style.textContent="#zurielGrowthPathways{margin:18px 0 22px;color:#18304a;font-family:Arial,sans-serif}#zurielGrowthPathways *{box-sizing:border-box}#zurielGrowthPathways .zg-heading{font:700 22px/1.25 Georgia,serif;color:#173653;margin:0 0 6px}#zurielGrowthPathways .zg-intro,#zurielGrowthPathways .zg-copy{font-size:14px;line-height:1.65;color:#536174;margin:6px 0 10px}#zurielGrowthPathways .zg-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:13px 0}#zurielGrowthPathways .zg-card,#zurielGrowthPathways .zg-detail{padding:15px;border:1px solid #dfe3e5;border-radius:15px;background:#fff;box-shadow:0 3px 12px #102b460b;min-width:0}#zurielGrowthPathways .zg-level{font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#92764b;margin:0 0 7px}#zurielGrowthPathways h3{font:700 17px/1.3 Georgia,serif;color:#193c56;margin:0 0 7px}#zurielGrowthPathways .zg-progress-label{font-size:12px;color:#526276;margin:10px 0 6px}#zurielGrowthPathways .zg-track{height:7px;border-radius:9px;background:#e9e7e0;overflow:hidden}#zurielGrowthPathways .zg-fill{height:100%;background:linear-gradient(90deg,#315d79,#b49a61);border-radius:9px}#zurielGrowthPathways button{min-height:42px;border-radius:9px;padding:9px 12px;font:700 13px Arial,sans-serif;cursor:pointer}#zurielGrowthPathways .zg-open{background:#173b58;color:#fff;border:1px solid #173b58}#zurielGrowthPathways .zg-back{background:#f1eee6;color:#203b52;border:1px solid #d8d1c2;margin-bottom:12px}#zurielGrowthPathways .zg-step{display:flex;gap:12px;padding:13px 0;border-top:1px solid #ece9e1}#zurielGrowthPathways .zg-number{flex:0 0 34px;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;background:#edf1f3;color:#1b4962;font-weight:800;font-size:12px}#zurielGrowthPathways .zg-step-body{min-width:0;flex:1}#zurielGrowthPathways .zg-step-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}#zurielGrowthPathways .zg-done{font-size:12px;color:#35664d;font-weight:700}#zurielGrowthPathways .zg-pending{font-size:12px;color:#7a6b4f}#zurielGrowthPathways .zg-note{font-size:13px;line-height:1.6;color:#5a6675;padding:12px;background:#f5f4ef;border-radius:10px}@media(max-width:560px){#zurielGrowthPathways .zg-grid{grid-template-columns:1fr}}";
    root.append(style,el("h2","zg-heading","Guided Spiritual-Growth Pathways"),el("p","zg-intro","Choose a journey and grow step by step. Each pathway connects existing Zuriel Bible lessons into a clear progression, with progress based on lessons you mark complete."));
    const list=el("div","zg-grid");list.id="zgPathList";root.appendChild(list);
    const detail=el("section","zg-detail");detail.id="zgPathDetail";detail.hidden=true;root.appendChild(detail);
    const status=el("p","");status.id="zgStatus";root.appendChild(status);
    parent.appendChild(root);render();
  }
  function refresh(){render();}
  window.ZurielGrowthPathways={mount:mount,refresh:refresh,list:paths};
})();