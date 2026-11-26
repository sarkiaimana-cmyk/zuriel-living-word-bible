/* Zuriel navigation recovery: repair the single navigation bar owned by zuriel-home.js.
   Wait for delayed creation and recover if it is replaced; never create a duplicate nav. */
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
  var destinations=[["home","🏠","Home"],["read","📖","Read"],["study","🔍","Study"],["library","📚","Library"],["kingdom","🌱","Grow"],["personal","📝","My Space"]];
  destinations.forEach(function(item){
   var button=nav.querySelector('[data-section="'+item[0]+'"]');
   if(!button){
    button=document.createElement("button");button.type="button";
    button.dataset.section=item[0];button.innerHTML="<span>"+item[1]+"</span>"+item[2];nav.appendChild(button);
   }
   button.style.cssText+=";display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;width:100%;max-width:100%;min-height:54px;padding:4px 1px;color:inherit;background:transparent;border:0;font-size:clamp(8px,2.35vw,10px);line-height:1.12;text-align:center;white-space:normal";
   if(!button.dataset.zurielRecoveryBound && !button.dataset.zurielHomeBound && !button.dataset.zurielSettingsBound){
    button.dataset.zurielRecoveryBound="1";
    button.addEventListener("click",function(){if(typeof window.ZurielHomeNavigate==="function")window.ZurielHomeNavigate(item[0]);});
   }
  });
  nav.hidden=false;nav.removeAttribute("hidden");nav.removeAttribute("aria-hidden");
  nav.style.display="grid";nav.style.visibility="visible";nav.style.opacity="1";nav.style.pointerEvents="auto";
  nav.style.gridTemplateColumns="repeat(7,minmax(0,1fr))";nav.style.minHeight="70px";nav.style.zIndex="2147482000";
  nav.style.bottom="0";nav.style.paddingBottom="calc(7px + env(safe-area-inset-bottom, 0px))";
  nav.style.background="#10213d";nav.style.color="#ffffff";nav.style.boxSizing="border-box";
  nav.querySelectorAll("button").forEach(function(button){button.style.visibility="visible";button.style.opacity="1";button.style.pointerEvents="auto";});
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