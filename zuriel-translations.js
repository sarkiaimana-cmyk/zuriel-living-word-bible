/* Zuriel offline translation selector.
   Only editions with a verified bundled corpus are enabled. */
(function () {
  "use strict";
  const reader = document.getElementById("bibleReader");
  if (!reader || document.getElementById("zurielOfflineVersions")) return;
  const editions = [
    {id:"KJV",label:"KJV",name:"King James Version",available:true},
    {id:"GNT",label:"GNT",name:"Good News Translation"},
    {id:"AMP",label:"AMP",name:"Amplified Bible"},
    {id:"LB-LT",label:"LB/LT",name:"Living Bible / Living Translation"},
    {id:"TPT",label:"TPT",name:"The Passion Translation"},
    {id:"NLT",label:"NLT",name:"New Living Translation"},
    {id:"NET",label:"NET",name:"New English Translation"},
    {id:"NIV",label:"NIV",name:"New International Version"},
    {id:"ESV",label:"ESV",name:"English Standard Version"},
    {id:"NASB",label:"NASB",name:"New American Standard Bible"},
    {id:"CSB",label:"CSB",name:"Christian Standard Bible"},
    {id:"NKJV",label:"NKJV",name:"New King James Version"}
  ];
  let selected="KJV";
  const style=document.createElement("style");
  style.textContent="#zurielOfflineVersions{margin:0 0 14px;padding:12px;border-radius:14px;background:#10213d;border:1px solid #b99b58;color:#fff}#zurielOfflineVersions .zov-heading{margin:0 0 9px;font:700 13px/1.3 Arial,sans-serif;letter-spacing:.04em;color:#f0d99f}#zurielOfflineVersions .zov-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}#zurielOfflineVersions .zov-choice{min-width:0;min-height:38px;padding:5px 1px;border:1px solid #7f91a8;border-radius:7px;background:#203653;color:#fff;font:700 11px/1.1 Arial,sans-serif}#zurielOfflineVersions .zov-choice[aria-pressed=true]{background:#e8cf91;border-color:#e8cf91;color:#10213d}#zurielOfflineVersions .zov-choice[data-available="false"]{opacity:.72;border-style:dashed}#zurielOfflineVersions .zov-status{margin:9px 0 0;color:#e6edf5;font:12px/1.45 Arial,sans-serif}@media(max-width:380px){#zurielOfflineVersions{padding:9px}#zurielOfflineVersions .zov-grid{gap:4px}#zurielOfflineVersions .zov-choice{font-size:10px;min-height:36px}}";
  document.head.appendChild(style);
  const bar=document.createElement("section");bar.id="zurielOfflineVersions";bar.setAttribute("aria-label","Offline Bible translation selection");
  const heading=document.createElement("p");heading.className="zov-heading";heading.textContent="OFFLINE BIBLE VERSIONS";
  const grid=document.createElement("div");grid.className="zov-grid";
  const status=document.createElement("p");status.className="zov-status";status.setAttribute("role","status");status.setAttribute("aria-live","polite");
  status.textContent="KJV is installed and available offline. Other editions activate when their verified offline text is included.";
  editions.forEach(function(edition){const button=document.createElement("button");button.type="button";button.className="zov-choice";button.textContent=edition.label;button.title=edition.name+(edition.available?" — available offline":" — offline text not installed");button.setAttribute("aria-label",button.title);button.setAttribute("aria-pressed",edition.id===selected?"true":"false");button.dataset.available=edition.available?"true":"false";button.addEventListener("click",function(){if(!edition.available){status.textContent=edition.name+" is not installed for offline reading yet. KJV remains selected; no online text will be substituted.";return;}selected=edition.id;grid.querySelectorAll("button").forEach(function(item){item.setAttribute("aria-pressed",item===button?"true":"false");});status.textContent=edition.name+" selected. Reading from the bundled offline Bible.";window.dispatchEvent(new CustomEvent("zuriel:offline-version-changed",{detail:{id:selected,name:edition.name}}));});grid.appendChild(button);});
  bar.append(heading,grid,status);reader.insertBefore(bar,reader.firstChild);
  window.ZurielTranslations={get configured(){return true;},get selectedVersion(){return selected;},get availableVersions(){return editions.filter(function(item){return item.available;}).map(function(item){return item.id;});},refreshVersions:function(){return Promise.resolve({offline:true,available:["KJV"]});}};
})();
