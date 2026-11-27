/* Zuriel navigation recovery: repair the single navigation bar owned by index.html. */
(function(){
 "use strict";
 var repairObserver=null;
 function mount(){
  var nav=document.getElementById("zurielBottomNavigation");
  var main=document.querySelector("main");
  if(!nav||!main)return false;

  var safetyStyle=document.getElementById("zurielNavigationRecoveryStyle");
  if(!safetyStyle){
   safetyStyle=document.createElement("style");
   safetyStyle.id="zurielNavigationRecoveryStyle";
   safetyStyle.textContent="#zurielBottomNavigation{display:grid!important;position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:2147482000!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:none!important}#zurielBottomNavigation[hidden]{display:grid!important}#zurielBottomNavigation button{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;min-width:0!important;max-width:100%!important}";
   (document.head||document.documentElement).appendChild(safetyStyle);
  }

  /* Remove duplicate destinations, retaining the copy with its live handler. */
  function deduplicateDestinations(){
   var byKey=new Map();
   Array.from(nav.querySelectorAll("button[data-section]")).forEach(function(button){
    var key=button.dataset.section;
    if(!key)return;
    var prior=byKey.get(key);
    if(!prior){byKey.set(key,button);return;}
    var score=function(node){
     return Number(!!node.dataset.zurielSettingsBound)+
       Number(!!node.dataset.zurielHomeBound)+
       Number(!!node.dataset.zurielRecoveryBound);
    };
    if(score(button)>score(prior)){prior.remove();byKey.set(key,button);}
    else button.remove();
   });
  }
  deduplicateDestinations();

  var destinations=[
   ["home","🏠","Home"],["read","📖","Read"],["study","🔍","Study"],
   ["library","📚","Library"],["kingdom","🌱","Grow"],
   ["personal","📝","My Space"],["settings","⚙️","Settings"]
  ];
  destinations.forEach(function(item){
   var button=nav.querySelector('[data-section="'+item[0]+'"]');
   if(!button){
    button=document.createElement("button");
    button.type="button";button.dataset.section=item[0];
    button.innerHTML="<span>"+item[1]+"</span>"+item[2];nav.appendChild(button);
   }
   if(item[0]==="settings"&&!button.dataset.zurielSettingsBound&&!button.dataset.zurielRecoveryBound){
    button.dataset.zurielRecoveryBound="1";
    button.addEventListener("click",function(){
     if(window.ZurielSettings&&typeof window.ZurielSettings.open==="function")window.ZurielSettings.open();
    });
   }else if(item[0]!=="settings"&&!button.dataset.zurielRecoveryBound&&!button.dataset.zurielHomeBound){
    button.dataset.zurielRecoveryBound="1";
    button.addEventListener("click",function(){
     if(typeof window.ZurielHomeNavigate==="function")window.ZurielHomeNavigate(item[0]);
    });
   }
  });

  nav.hidden=false;nav.removeAttribute("hidden");nav.removeAttribute("aria-hidden");
  nav.style.display="grid";nav.style.visibility="visible";nav.style.opacity="1";nav.style.pointerEvents="auto";
  nav.style.gridTemplateColumns="repeat(7,minmax(0,1fr))";nav.style.minHeight="70px";nav.style.zIndex="2147482000";
  nav.style.bottom="0";nav.style.paddingBottom="calc(7px + env(safe-area-inset-bottom, 0px))";
  nav.style.background="#ffffff";nav.style.color="#202a35";nav.style.boxSizing="border-box";
  if(!nav._zurielDestinationObserver){
   nav._zurielDestinationObserver=new MutationObserver(deduplicateDestinations);
   nav._zurielDestinationObserver.observe(nav,{childList:true,subtree:true});
  }
  nav.querySelectorAll("button").forEach(function(button){
   button.style.visibility="visible";button.style.opacity="1";button.style.pointerEvents="auto";
   button.style.display="flex";button.style.flexDirection="column";button.style.alignItems="center";
   button.style.justifyContent="center";button.style.minWidth="0";button.style.maxWidth="100%";
  });
  return true;
 }
 function start(){
  if(mount())return;
  if(repairObserver)return;
  repairObserver=new MutationObserver(function(){
   if(mount()){repairObserver.disconnect();repairObserver=null;}
  });
  repairObserver.observe(document.documentElement,{childList:true,subtree:true});
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
 window.addEventListener("pageshow",start);
})();
