/* Minimal white Bible-first home view */
(function(){
"use strict";
function apply(){
 const style=document.createElement("style");style.id="zurielMinimalHomeStyle";
 style.textContent=`
 html,body{background:#fff!important;color:#202020!important;font-family:Arial,sans-serif!important}
 header{background:#fff!important;color:#202020!important;text-align:left!important;padding:12px 16px!important;border-bottom:1px solid #eee!important}
 header h1{font-size:20px!important;color:#202020!important;margin:4px 0!important;font-weight:600!important}
 header p{display:none!important}
 main{max-width:900px!important;padding:12px!important;background:#fff!important}
 main>.card:not(#bibleReader):not(.continue-card){display:none!important}
 main>.continue-card{background:#fff!important;box-shadow:none!important;border:0!important;margin:0!important;padding:8px 0!important}
 #bibleReader{background:#fff!important;color:#202020!important;border:0!important;box-shadow:none!important;padding:8px 0!important}
 #bibleReader h2{display:none!important}
 #zurielHomeDashboard{background:#fff!important;padding:0!important;margin:0!important}
 #zurielHomeDashboard>.home-card,#zurielHomeDashboard>.home-hero{display:none!important}
 #zurielHomeTranslationsSection{display:block!important;background:#fff!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important}
 #zurielHomeTranslationsSection h2,#zurielHomeTranslationsSection .home-section-note,#zurielHomeTranslationsSection .translation-shortcuts,#zurielHomeTranslationsSection .translation-access-note{display:none!important}
 #zurielHomeTranslations{margin:0!important;padding:0!important}
 #zurielTranslationCompare{background:#fff!important;color:#222!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:0!important}
 #zurielTranslationCompare summary{color:#222!important;font-weight:600!important}
 #zurielTranslationCompare select,#zurielTranslationCompare button{border-radius:5px!important}
 #message{background:#fff!important;color:#202020!important}
 #message .verse{background:#fff!important;color:#202020!important;border-bottom:1px solid #eee!important}
 #zurielReadingTools,#bibleSearch,#chapterButtons,#readerStatus,#zurielReadingProgress{background:#fff!important;color:#222!important;box-shadow:none!important}
 #zurielBottomNavigation{background:#fff!important;border-top:1px solid #eee!important;box-shadow:none!important}
 footer{background:#fff!important;color:#444!important}
 `;
 if(!document.getElementById(style.id))document.head.appendChild(style);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();
