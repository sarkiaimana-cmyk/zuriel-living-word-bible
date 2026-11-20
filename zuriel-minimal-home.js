/* Reader-only white presentation. Main Zuriel dashboard is intentionally untouched. */
(function(){
"use strict";
function apply(){
 const style=document.createElement("style");
 style.id="zurielReaderWhiteStyle";
 style.textContent=`
 #bibleReader{background:#fff!important;color:#202020!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:12px 0!important}
 #bibleReader h2,#bibleReader h3,#bibleReader p,#bibleReader label,#bibleReader span{color:#202020}
 #bibleReader select,#bibleReader input,#bibleReader textarea{background:#fff!important;color:#202020!important;border:1px solid #ddd!important;box-shadow:none!important}
 #bibleReader button{box-shadow:none!important}
 #bibleReader #message{background:#fff!important;color:#202020!important}
 #bibleReader #message .verse{background:#fff!important;color:#202020!important;border:0!important;border-bottom:1px solid #eee!important;border-radius:0!important;box-shadow:none!important;padding:10px 4px!important}
 #bibleReader #readerStatus,#bibleReader #zurielReadingProgress,#bibleReader #chapterButtons,#bibleReader #bibleSearch,#bibleReader #zurielReadingTools{background:#fff!important;color:#333!important;box-shadow:none!important}
 #zurielHomeDashboard{ }
 `;
 if(!document.getElementById(style.id))document.head.appendChild(style);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();