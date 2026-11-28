/* Focused corrections for the reported reader overlay and contrast defects. */
(function () {
  "use strict";
  if (document.getElementById("zurielAcceptanceFixes")) return;
  const style = document.createElement("style");
  style.id = "zurielAcceptanceFixes";
  style.textContent = String.raw\`\`
    /* Keep verse tools compact and anchored away from the top reading controls. */
    #zurielVerseActions:not([hidden]) {
      top:auto !important;
      bottom:calc(82px + env(safe-area-inset-bottom, 0px)) !important;
      left:8px !important; right:8px !important;
      width:auto !important; max-width:620px !important;
      max-height:min(64vh, 560px) !important;
      margin:0 auto !important;
      background:#fff !important; color:#182435 !important;
      border:1px solid #d8dee7 !important;
      box-shadow:0 8px 30px rgba(16,33,61,.18) !important;
    }
    #zurielVerseActions :is(p,h1,h2,h3,h4,label,span,summary,li,strong) {
      color:#182435 !important; text-shadow:none !important;
    }
    #zurielVerseActions .zuriel-verse-action,
    #zurielVerseActions .zuriel-action-group,
    #zurielVerseActions .zuriel-action-group-items {
      background:#f7f8fa !important; color:#182435 !important;
      border-color:#d8dee7 !important;
    }
    #zurielVerseActions .zuriel-verse-action { min-height:44px !important; }
    #zurielVerseActions .zuriel-action-close,
    #zurielVerseActions .zuriel-overlay-back {
      background:#17324f !important; color:#fff !important;
    }
    #zurielVerseActions .zuriel-action-close { color:#fff !important; }
    #zurielVerseActions #zurielStudyPanel,
    #zurielVerseActions #zurielStudyPanel :is(p,h1,h2,h3,h4,li,span,strong,label,summary) {
      background-color:transparent !important; color:#182435 !important;
    }
    #zurielVerseActions #zurielStudyPanel > h2 {
      background:#17324f !important; color:#f5e7c5 !important;
    }
    #zurielVerseActions #zurielStudyPanel :is(button,a) {
      color:#17324f !important; background:#fff !important;
    }
    #zurielVerseActions #zurielStudyPanel > h2 { color:#f5e7c5 !important; }
    @media(max-width:420px) {
      #zurielVerseActions:not([hidden]) {
        bottom:calc(78px + env(safe-area-inset-bottom, 0px)) !important;
        max-height:58vh !important;
      }
    }
  \`\`;
  document.head.appendChild(style);
})();
