/* Zuriel navigation recovery — enforce one navigation bar and one button per destination. */
(function(){
 "use strict";
 const items=[
  ["home","🏠","Home"],["read","📖","Read"],["study","🔍","Study"],
  ["library","📚","Library"],["kingdom","🌱","Grow"],
  ["personal","📝","My Space"],["settings","⚙️","Settings"]
 ];
 let observer=null;
 function clean(){
  const navs=Array.from(document.querySelectorAll("#zurielBottomNavigation"));
  if(!navs.length)return null;
  const nav=navs[0];
  navs.slice(1).forEach(node=>node.remove());
  const byKey=new Map();
  Array.from(nav.querySelectorAll("button[data-section]")).forEach(button=>{
   const key=button.dataset.section;
   if(!key)return;
   const prior=byKey.get(key);
   if(!prior){byKey.set(key,button);return;}
   const score=node=>Number(!!node.dataset.zurielSettingsBound)+Number(!!node.dataset.zurielHomeBound)+Number(!!node.dataset.zurielRecoveryBound);
   if(score(button)>score(prior)){prior.remove();byKey.set(key,button);}else button.remove();
  });
  items.forEach(([key,emoji,label])=>{
   let button=nav.querySelector('button[data-section="'+key+'"]');
   if(!button){
    button=document.createElement("button");
    button.type="button";button.dataset.section=key;
    button.innerHTML="<span>"+emoji+"</span>"+label;
    nav.appendChild(button);
   }
   if(key==="settings"&&!button.dataset.zurielRecoveryRoute){
    button.dataset.zurielRecoveryRoute="1";
    button.addEventListener("click",function(){
     if(window.ZurielSettings&&typeof window.ZurielSettings.open==="function")window.ZurielSettings.open();
     else{
      const panel=document.getElementById("zurielSettingsPanel");
      if(panel){panel.hidden=false;panel.style.display="block";panel.scrollIntoView({behavior:"auto",block:"start"});}
     }
    },true);
   }else if(key!=="settings"&&!button.dataset.zurielHomeBound&&!button.dataset.zurielRecoveryBound){
    button.dataset.zurielRecoveryBound="1";
    button.addEventListener("click",function(){
     if(typeof window.ZurielHomeNavigate==="function")window.ZurielHomeNavigate(key);
    });
   }
  });
  nav.hidden=false;nav.removeAttribute("hidden");nav.removeAttribute("aria-hidden");
  Object.assign(nav.style,{
   display:"grid",visibility:"visible",opacity:"1",pointerEvents:"auto",
   gridTemplateColumns:"repeat(7,minmax(0,1fr))",minHeight:"70px",
   zIndex:"2147482000",bottom:"0",paddingBottom:"calc(7px + env(safe-area-inset-bottom, 0px))",
   background:"#ffffff",color:"#202a35",boxSizing:"border-box"
  });
  nav.querySelectorAll("button").forEach(button=>{
   Object.assign(button.style,{
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    minWidth:"0",width:"100%",maxWidth:"100%",minHeight:"54px",padding:"4px 1px",
    color:"inherit",fontSize:"clamp(8px,2.35vw,10px)",lineHeight:"1.12",
    textAlign:"center",whiteSpace:"normal"
   });
  });
  return nav;
 }
 function start(){
  clean();
  if(observer)return;
  observer=new MutationObserver(()=>clean());
  observer.observe(document.documentElement,{childList:true,subtree:true});
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
 window.addEventListener("pageshow",clean);
})();
