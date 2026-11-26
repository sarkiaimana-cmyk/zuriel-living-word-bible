/* Zuriel navigation recovery: repairs the navigation bar if a module fails to mount it. */
(function(){
 "use strict";
 function mount(){
  var safetyStyle=document.getElementById("zurielNavigationRecoveryStyle");
  if(!safetyStyle){
   safetyStyle=document.createElement("style");
   safetyStyle.id="zurielNavigationRecoveryStyle";
   safetyStyle.textContent="#zurielBottomNavigation{display:grid!important;position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:2147482000!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:none!important}#zurielBottomNavigation[hidden]{display:grid!important}#zurielBottomNavigation button{visibility:visible!important;opacity:1!important;pointer-events:auto!important}";
   (document.head||document.documentElement).appendChild(safetyStyle);
  }
  var main=document.querySelector("main");
  if(!main)return;
  var nav=document.getElementById("zurielBottomNavigation");
  var destinations=[["home","🏠","Home"],["read","📖","Read"],["study","🔍","Study"],["library","📚","Library"],["kingdom","🌱","Grow"],["personal","📝","My Space"],["settings","⚙️","Settings"]];
  if(!nav){nav=document.createElement("nav");nav.id="zurielBottomNavigation";nav.setAttribute("aria-label","Main navigation");document.body.appendChild(nav);}
  nav.style.cssText+=";display:grid;position:fixed;left:0;right:0;bottom:0;z-index:2147482000;visibility:visible;opacity:1;background:#10213d;color:#fff;box-sizing:border-box;padding:6px max(4px,env(safe-area-inset-left)) calc(7px + env(safe-area-inset-bottom)) max(4px,env(safe-area-inset-right));grid-template-columns:repeat(7,minmax(0,1fr));min-height:70px";
  destinations.forEach(function(item){
   var button=nav.querySelector('[data-section="'+item[0]+'"]');
   if(!button){button=document.createElement("button");button.type="button";button.dataset.section=item[0];button.innerHTML="<span>"+item[1]+"</span>"+item[2];nav.appendChild(button);}
   button.style.cssText+=";display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;width:100%;min-height:54px;padding:4px 1px;color:inherit;background:transparent;border:0;font-size:clamp(8px,2.35vw,10px);line-height:1.12;text-align:center";
   if(!button.dataset.zurielRecoveryBound){button.dataset.zurielRecoveryBound="1";button.addEventListener("click",function(){
    if(item[0]==="settings"){if(window.ZurielSettings&&window.ZurielSettings.open)window.ZurielSettings.open();return;}
    if(typeof window.ZurielHomeNavigate==="function"){window.ZurielHomeNavigate(item[0]);return;}
    var sectionMap={home:"zurielHomeDashboard",read:"bibleReader",study:"zurielStudyPanel",library:"zurielLibrary",kingdom:"zurielKingdomLife",personal:"zurielPersonalSpace"};
    var target=document.getElementById(sectionMap[item[0]]);
    if(target){Array.from(main.children).forEach(function(child){child.hidden=child!==target&&child.id!=="zurielTopReturnBar";});target.hidden=false;target.style.display="block";}
   });}
  });
  var label=document.getElementById("zurielTopSection");if(label&& !label.textContent.trim())label.textContent="Zuriel Bible";
  nav.hidden=false;nav.removeAttribute("aria-hidden");
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
 window.addEventListener("pageshow",mount);
})();
