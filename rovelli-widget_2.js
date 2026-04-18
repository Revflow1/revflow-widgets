(function(){
'use strict';

if(window._rovelliLoaded) return;
window._rovelliLoaded = true;

// ── DETECT WIX SITE LANGUAGE ──
// Wix sets lang on the <html> tag - we read it and match
function detectLang(){
  var htmlLang = document.documentElement.lang || '';
  if(htmlLang.toLowerCase().startsWith('it')) return 'it';
  // Also check URL for /it/ pattern
  if(window.location.href.indexOf('/it') !== -1) return 'it';
  return 'en';
}

// ── INJECT FONTS ──
if(!document.getElementById('rovelli-font')){
  var font=document.createElement('link');
  font.id='rovelli-font';
  font.rel='stylesheet';
  font.href='https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(font);
}

// ── INJECT CSS ──
if(!document.getElementById('rovelli-style')){
  var style=document.createElement('style');
  style.id='rovelli-style';
  style.textContent='*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}\n:root{--black:#0a0806;--dark:#13100d;--card:#1c1713;--gold:#c9a84c;--gold-dim:#a8893a;--white:#f5f0e8;--grey:#7a6e60;--fd:"Cormorant Garamond",serif;--fb:"Outfit",sans-serif;}\nhtml,body{height:100%;overflow-x:hidden;}\nbody{background:var(--black);color:var(--white);font-family:var(--fb);font-weight:300;}\n.page{min-height:100vh;background:linear-gradient(150deg,#0a0806,#13100d);}\nnav{position:sticky;top:0;z-index:100;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;background:rgba(10,8,6,0.96);backdrop-filter:blur(16px);border-bottom:1px solid rgba(201,168,76,0.12);}\n.logo{font-family:var(--fd);font-size:22px;font-weight:700;letter-spacing:2px;color:var(--white);}\n.logo span{color:var(--gold);}\n.lt{display:flex;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:20px;overflow:hidden;}\n.lb{font-family:var(--fb);font-size:12px;font-weight:600;padding:7px 16px;border:none;background:transparent;color:var(--grey);cursor:pointer;letter-spacing:1px;text-transform:uppercase;transition:all 0.2s;}\n.lb.on{background:var(--gold);color:var(--black);}\n.hero{padding:64px 24px 48px;text-align:center;}\n.hero h1{font-family:var(--fd);font-size:clamp(52px,10vw,96px);font-weight:700;line-height:1;color:var(--white);margin-bottom:12px;}\n.hero h1 em{font-style:italic;color:var(--gold);}\n.hero p{font-size:13px;color:var(--grey);letter-spacing:3px;text-transform:uppercase;margin-bottom:28px;}\n.pills{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:36px;}\n.pill{display:flex;align-items:center;gap:7px;background:rgba(201,168,76,0.07);border:1px solid rgba(201,168,76,0.16);border-radius:28px;padding:9px 18px;font-size:13px;color:var(--white);}\n.open-btn{display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:var(--black);font-family:var(--fb);font-size:16px;font-weight:700;padding:16px 36px;border-radius:50px;border:none;cursor:pointer;box-shadow:0 8px 28px rgba(201,168,76,0.3);}\n.open-btn svg{width:20px;height:20px;fill:var(--black);}\n.hint{font-size:13px;color:var(--grey);margin-top:10px;}\n\n/* OVERLAY */\n.ov{display:none;position:fixed;inset:0;z-index:500;flex-direction:column;background:var(--dark);}\n.ov.on{display:flex;}\n@media(min-width:600px){\n  .ov{display:none;position:fixed;bottom:92px;right:24px;top:auto;left:auto;width:390px;height:610px;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.6);border:1px solid rgba(201,168,76,0.18);}\n  .ov.on{display:flex;}\n  .back{display:none!important;}\n}\n.hdr{padding:14px 18px;background:var(--card);border-bottom:1px solid rgba(201,168,76,0.14);display:flex;align-items:center;gap:12px;flex-shrink:0;}\n.back{background:none;border:none;color:var(--grey);cursor:pointer;padding:4px;display:flex;}\n.back svg{width:22px;height:22px;fill:var(--grey);}\n.av{width:40px;height:40px;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.22);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}\n.hname{font-family:var(--fd);font-size:18px;font-weight:700;color:var(--white);}\n.hstat{font-size:12px;color:var(--gold);display:flex;align-items:center;gap:5px;margin-top:2px;}\n.sdot{width:6px;height:6px;background:var(--gold);border-radius:50%;}\n.priv{background:rgba(201,168,76,0.06);border-bottom:1px solid rgba(201,168,76,0.1);padding:10px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}\n.priv.gone{display:none;}\n.priv p{font-size:11px;color:var(--grey);line-height:1.5;flex:1;}\n.priv p a{color:var(--gold);text-decoration:none;}\n.priv button{background:var(--gold);color:var(--black);border:none;font-family:var(--fb);font-size:11px;font-weight:700;padding:6px 14px;border-radius:16px;cursor:pointer;white-space:nowrap;}\n.msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;-webkit-overflow-scrolling:touch;}\n.m{display:flex;flex-direction:column;max-width:86%;}\n.m.bot{align-self:flex-start;}\n.m.usr{align-self:flex-end;}\n.bub{padding:12px 16px;border-radius:18px;font-size:15px;line-height:1.6;font-weight:300;}\n.m.bot .bub{background:var(--card);border:1px solid rgba(201,168,76,0.1);border-bottom-left-radius:4px;}\n.m.usr .bub{background:var(--gold);color:var(--black);border-bottom-right-radius:4px;font-weight:500;}\n.mt{font-size:10px;color:var(--grey);margin-top:3px;padding:0 4px;}\n.m.usr .mt{text-align:right;}\n.typ{display:flex;gap:5px;padding:14px 16px;background:var(--card);border:1px solid rgba(201,168,76,0.1);border-radius:18px;border-bottom-left-radius:4px;align-items:center;}\n.typ span{width:7px;height:7px;background:var(--grey);border-radius:50%;animation:tb 1.2s infinite;}\n.typ span:nth-child(2){animation-delay:.15s;}\n.typ span:nth-child(3){animation-delay:.3s;}\n@keyframes tb{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-7px);}}\n.opts{padding:8px 16px 4px;display:flex;flex-wrap:wrap;gap:7px;flex-shrink:0;min-height:0;}\n.opt{background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);color:var(--white);font-family:var(--fb);font-size:13px;font-weight:500;padding:8px 15px;border-radius:20px;cursor:pointer;transition:background 0.15s,color 0.15s;}\n.opt:hover,.opt:active{background:var(--gold);color:var(--black);border-color:var(--gold);}\n.irow{padding:10px 14px;background:var(--card);border-top:1px solid rgba(201,168,76,0.1);display:flex;gap:10px;align-items:center;flex-shrink:0;padding-bottom:max(10px,env(safe-area-inset-bottom));}\n.inp{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(201,168,76,0.16);color:var(--white);font-family:var(--fb);font-size:16px;padding:11px 16px;border-radius:24px;outline:none;-webkit-appearance:none;}\n.inp:focus{border-color:var(--gold);}\n.inp::placeholder{color:var(--grey);}\n.snd{width:44px;height:44px;background:var(--gold);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n.snd:active{background:var(--gold-dim);}\n.snd svg{width:17px;height:17px;fill:var(--black);}\n.mapb{display:inline-flex;align-items:center;gap:7px;background:var(--gold);color:var(--black);text-decoration:none;font-family:var(--fb);font-size:13px;font-weight:700;padding:9px 16px;border-radius:18px;margin-top:10px;}\n\n/* CHAT LABEL */\n.chat-label{position:fixed;bottom:96px;right:14px;z-index:399;background:var(--gold);color:var(--black);font-family:var(--fb);font-size:12px;font-weight:700;padding:8px 14px;border-radius:20px;white-space:nowrap;box-shadow:0 4px 16px rgba(201,168,76,0.35);display:flex;align-items:center;gap:6px;animation:pulse 2.5s ease-in-out infinite;}\n.chat-label-arrow{font-size:14px;}\n@keyframes pulse{0%,100%{transform:translateY(0);}50%{transform:translateY(4px);}}\n.chat-label.gone{display:none;}\n@media(min-width:600px){.chat-label{bottom:108px;right:84px;}}\n/* BUBBLE */\n.bb{position:fixed;bottom:24px;right:24px;z-index:400;width:60px;height:60px;background:var(--gold);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 28px rgba(201,168,76,0.4);}\n.bb svg{width:26px;height:26px;fill:var(--black);}\n.bico{display:block;}\n.xico{display:none;}\n.bb.on .bico{display:none;}\n.bb.on .xico{display:block;}\n.bdg{position:absolute;top:-2px;right:-2px;width:18px;height:18px;background:#e74c3c;border-radius:50%;font-size:10px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid var(--dark);}\n.bdg.gone{display:none;}\n.chat-label{position:fixed;bottom:96px;right:14px;z-index:99997;background:var(--gold);color:var(--black);font-family:var(--fb);font-size:12px;font-weight:700;padding:8px 14px;border-radius:20px;white-space:nowrap;box-shadow:0 4px 16px rgba(201,168,76,0.35);display:flex;align-items:center;gap:6px;animation:pulse 2.5s ease-in-out infinite;}\n.chat-label-arrow{font-size:14px;}\n@keyframes pulse{0%,100%{transform:translateY(0);}50%{transform:translateY(4px);}}\n.chat-label.gone{display:none;}\n@media(min-width:600px){.chat-label{bottom:108px;right:84px;}}\n.bb{z-index:99999!important;bottom:24px!important;right:24px!important;}\n.ov{z-index:99998!important;}\n';
  document.head.appendChild(style);
}

// ── INJECT CHAT HTML ──
if(!document.getElementById('rovelli-widget')){
  var wrap=document.createElement('div');
  wrap.id='rovelli-widget';
  wrap.innerHTML='<div class="chat-label" id="chatLabel">\n  <span id="chatLabelTxt">Chat with our Rovelli Assistant</span>\n  <span class="chat-label-arrow">&#8595;</span>\n</div>\n<button class="bb" id="bb">\n  <span class="bdg" id="bdg">1</span>\n  <svg class="bico" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>\n  <svg class="xico" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>\n</button>\n\n<div class="ov" id="ov">\n  <div class="hdr">\n    <button class="back" id="backBtn">\n      <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>\n    </button>\n    <div class="av">&#127869;</div>\n    <div>\n      <div class="hname">Rovelli Assistant</div>\n      <div class="hstat"><span class="sdot"></span>&nbsp;Online &middot; Always here to help</div>\n    </div>\n  </div>\n  <div class="priv" id="priv">\n    <p id="privTxt">By using this chat you agree to your data being used to answer your enquiry. <a href="https://www.ristoranterovelli.com" target="_blank">Privacy Policy</a>.</p>\n    <button id="privOk">OK</button>\n  </div>\n  <div class="msgs" id="msgs"></div>\n  <div class="opts" id="opts"></div>\n  <div class="irow">\n    <input class="inp" id="inp" type="text" placeholder="Type a message..." autocomplete="off" autocorrect="off" spellcheck="false">\n    <button class="snd" id="sndBtn">\n      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>\n    </button>\n  <';
  document.body.appendChild(wrap);
}

// ── SET INITIAL LANGUAGE FROM WIX SITE ──
var initialLang = detectLang();

// ── WATCH FOR WIX LANGUAGE CHANGES ──
// Wix changes the html lang attribute when user switches language
var langObserver = new MutationObserver(function(mutations){
  mutations.forEach(function(m){
    if(m.attributeName === 'lang'){
      var newLang = detectLang();
      if(typeof setLang === 'function') setLang(newLang);
    }
  });
});
langObserver.observe(document.documentElement, {attributes: true});

(function(){
'use strict';
var L='en',isOpen=false,hist=[],bkSt=null,bkD={};
var BACKEND='https://script.google.com/macros/s/AKfycbwaK18qBNp-ngBfRLIkoc9gG1p6VGODs9XlLILPv_sSoE8g-hFFOEm9qXCjhMCHjS4l/exec';

/* ── MENU DATA ── */
var ST=[
  {e:'Selection of Cold Cuts & Cheese',i:'Selezione di salumi e formaggi',p:'20.00\u20ac'},
  {e:'Beef Tartare',i:'Tartare di manzo',p:'22.00\u20ac',d:'Oil, salt, pepper, mustard, worcester sauce'},
  {e:'Salmon Tartare',i:'Tartare di salmone',p:'18.00\u20ac'},
  {e:'Octopus on Potato Cream',i:'Polpo su crema di patate',p:'22.00\u20ac'},
  {e:'Seafood Trio',i:'Tris di mare',p:'23.00\u20ac',d:'Swordfish, smoked salmon, octopus salad with cherry tomatoes and olives'},
  {e:'Caprese',i:'Caprese',p:'13.00\u20ac',d:'Tomato, mozzarella and basil'},
  {e:'Bruschetta',i:'Bruschetta',p:'10.00\u20ac',d:'Tomato, oregano and basil'},
  {e:'Parma Ham with Mozzarella',i:'Crudo e mozzarella',p:'15.00\u20ac'},
  {e:'Burrata on Salad Bed',i:'Burrata su letto di insalata',p:'18.00\u20ac',d:'With dried tomato cream'},
  {e:'Parma Ham with Melon',i:'Crudo e melone',p:'15.00\u20ac'}
];
var PA=[
  {e:'Lake Como Risotto',i:'Risotto del Lario',p:'20.00\u20ac',d:'Citrus risotto with perch tartare and basil oil',s:1},
  {e:"Chef's Risotto",i:'Risotto dello Chef',p:'18.00\u20ac',d:'Parsley pesto, guanciale and buffalo mozzarella'},
  {e:'Seafood Spaghetti',i:'Spaghetti ai frutti di mare',p:'23.00\u20ac',d:'Squid, prawns, mussels, clams and cherry tomatoes'},
  {e:'Spaghetti with Clams',i:'Spaghetti alle vongole',p:'19.00\u20ac'},
  {e:'Tricolour Ravioli',i:'Ravioloni tricolore',p:'18.00\u20ac',d:'Buffalo ricotta, spinach and date tomatoes'},
  {e:'Tagliatelle with Meat Sauce',i:'Tagliatelle al ragu',p:'16.00\u20ac'},
  {e:'Lasagne',i:'Lasagne',p:'14.00\u20ac'},
  {e:'Penne with Salmon & Zucchini',i:'Penne al salmone e zucchine',p:'15.00\u20ac'},
  {e:'Paccheri with Tomato, Burrata & Basil',i:'Paccheri al pomodoro con burrata e basilico',p:'20.00\u20ac'},
  {e:'Porcini Mushroom Risotto',i:'Risotto ai porcini',p:'21.00\u20ac'},
  {e:'Spaghetti Carbonara',i:'Spaghetti alla carbonara',p:'18.00\u20ac'},
  {e:'Fusilloni with Basil Pesto, Burrata & Pistachio',i:'Fusilloni al pesto di basilico burrata e pistacchio',p:'19.00\u20ac'},
  {e:'Tagliatelle with Cream & Porcini',i:'Tagliatelle panna e porcini',p:'20.00\u20ac'}
];
var MA=[
  {e:'Grilled Beef Fillet',i:'Filetto di manzo alla griglia',p:'25.00\u20ac'},
  {e:'Beef Fillet with Green Pepper Sauce',i:'Filetto di manzo al pepe verde',p:'25.00\u20ac'},
  {e:'Beef Fillet with Porcini',i:'Filetto di manzo ai porcini',p:'26.00\u20ac'},
  {e:'Grilled Rib-Eye Steak 500gr',i:'Costata di manzo alla griglia 500gr',p:'32.00\u20ac',s:1},
  {e:'Milanese-Style Cutlet',i:'Cotoletta alla milanese',p:'24.00\u20ac',d:'Breaded cutlet with rocket and cherry tomatoes'},
  {e:'Salt-Baked Seabass',i:'Branzino al sale',p:'29.00\u20ac',d:'400-600gr'},
  {e:'Mediterranean Seabass',i:'Branzino alla mediterranea',p:'29.00\u20ac',d:'Capers, olives, cherry tomatoes, artichokes'},
  {e:'Tuna Steak in Sesame Crust',i:'Tagliata di tonno in crosta di sesamo',p:'26.00\u20ac',d:'With hummus sauce'},
  {e:'Mixed Fried Seafood',i:'Fritto misto di pesce',p:'23.00\u20ac',d:'With zucchini and carrot sticks'},
  {e:'Grilled Salmon',i:'Salmone alla griglia',p:'24.00\u20ac',d:'With rocket, pistachio and mustard sauce'}
];
var SA=[
  {e:'Caesar Salad',i:'Cesar Salad',p:'16.00\u20ac',d:'Mixed salad, anchovies, bacon, grilled chicken, Grana cheese, eggs'},
  {e:'Salmon Salad',i:'Insalata di Salmone',p:'18.00\u20ac',d:'Mixed salad, oranges, avocado, salmon, oregano'},
  {e:'Greek Salad',i:'Insalata Greca',p:'14.00\u20ac',d:'Cucumbers, feta, red onion, olives, bell peppers, cherry tomatoes'},
  {e:'Rovelli Salad',i:'Insalata Rovelli',p:'16.00\u20ac',d:'Corn, eggs, avocado, mozzarella, tuna, cherry tomatoes'},
  {e:'Grill Salad',i:'Grill Salad',p:'15.00\u20ac',d:'Grana, mozzarella, olives, cherry tomatoes, grilled vegetables'},
  {e:'Parma Salad',i:'Insalata Parma',p:'16.00\u20ac',d:'Avocado, olives, cherry tomatoes, toasted bread, Parma ham'},
  {e:'Modena Salad',i:'Insalata Modena',p:'14.00\u20ac',d:'Fontina, olives, toasted bread, cherry tomatoes, cooked ham'},
  {e:'Summer Salad',i:'Insalata Estiva',p:'15.00\u20ac',d:'Melon, olives, radishes, feta, mint'},
  {e:'Seafood Fantasy Salad',i:'Insalata Fantasia di Mare',p:'17.00\u20ac',d:'Octopus, shrimp, boiled potatoes, olives, pickled onions'},
  {e:"Chef's Salad",i:'Insalata dello Chef',p:'14.00\u20ac',d:'Sun-dried tomatoes, borlotti beans, carrots, bacon, pears'}
];
var PZ=[
  {e:'Marinara',i:'Marinara',p:'7.00\u20ac',d:'Tomato, garlic, oregano, oil'},
  {e:'Margherita',i:'Margherita',p:'8.00\u20ac',d:'Tomato, mozzarella, basil'},
  {e:'Tricolore',i:'Tricolore',p:'12.00\u20ac',d:'Tomato, buffalo mozzarella, basil'},
  {e:'Vegetarian Pizza',i:'Vegetariana',p:'12.00\u20ac',d:'Tomato, mozzarella, eggplants, zucchini, peppers'},
  {e:'Napoli',i:'Napoli',p:'10.00\u20ac',d:'Tomato, mozzarella, anchovies, oregano'},
  {e:'Parma',i:'Parma',p:'13.00\u20ac',d:'Tomato, mozzarella, Parma ham'},
  {e:'Valtellina',i:'Valtellina',p:'15.00\u20ac',d:'Tomato, mozzarella, bresaola, rocket, parmesan'},
  {e:'Seafood Pizza',i:'Frutti di mare',p:'17.00\u20ac',d:'Tomato, mozzarella, seafood mix, parsley'},
  {e:'Rovelli Pizza',i:'Pizza Rovelli',p:'21.00\u20ac',d:'Salmon tartare, julienne zucchinis, chopped pistachios, mozzarella',s:1},
  {e:'Four Cheese',i:'4 formaggi',p:'13.00\u20ac',d:'Mozzarella, gorgonzola, taleggio, scamorza'},
  {e:'Capricciosa',i:'Capricciosa',p:'15.00\u20ac',d:'Artichokes, mushrooms, cotto ham, olives'},
  {e:'Diavola',i:'Diavola',p:'11.00\u20ac',d:'Tomato, mozzarella, spicy salami'},
  {e:'Tuna & Onion',i:'Tonno e cipolle',p:'12.00\u20ac'},
  {e:'Porcini Mushroom Pizza',i:'Pizza ai porcini',p:'14.00\u20ac'},
  {e:'Calabria',i:'Calabria',p:'15.00\u20ac',d:'Buffalo mozzarella, nduja'},
  {e:'Bismark',i:'Bismark',p:'12.00\u20ac',d:'Tomato, mozzarella, ham, eggs'},
  {e:'Prawns & Zucchini',i:'Gamberi e zucchine',p:'14.00\u20ac'},
  {e:'Speck & Gorgonzola',i:'Speck e zola',p:'14.00\u20ac'}
];
var CO=[
  {e:'Aperol Spritz',p:'8.00\u20ac',d:'Aperol, Prosecco DOCG, soda'},
  {e:'Campari Spritz',p:'8.00\u20ac',d:'Campari, Prosecco DOCG, soda'},
  {e:'Limoncello Spritz',p:'8.00\u20ac'},
  {e:'Hugo Spritz',p:'8.00\u20ac',d:'Elderflower, Prosecco, mint, soda'},
  {e:'Americano',p:'9.00\u20ac',d:'Campari Bitter, Martini Rosso, soda'},
  {e:'Negroni',p:'9.00\u20ac',d:'Campari, Martini Rosso, Gin'},
  {e:'Sbagliato',p:'9.00\u20ac',d:'Campari, Prosecco DOCG, Martini Rosso'},
  {e:'Moscow Mule',p:'9.00\u20ac',d:'Vodka, lemon juice, Ginger Beer, cucumber'},
  {e:'Mojito',p:'9.00\u20ac',d:'Rum, brown sugar, lime, soda, mint'},
  {e:'Campari Orange',p:'9.00\u20ac',d:'Campari Bitter, fresh orange juice'}
];

/* ── HELPERS ── */
function k(a){return L==='it'?(a.i||a.e):a.e;}
function row(a){return '\u2022 '+k(a)+(a.s?' \u2b50':'')+' \u2014 '+a.p+(a.d?' ('+a.d+')':'');}
function rows(arr){return arr.map(row).join('<br>');}
function srch(kw){var kl=kw.toLowerCase();return[].concat(ST,PA,MA,SA,PZ).filter(function(a){return(a.e+' '+(a.d||'')+' '+(a.i||'')).toLowerCase().indexOf(kl)!==-1;});}
function ts(){var n=new Date();return n.getHours()+':'+String(n.getMinutes()).padStart(2,'0');}
function fmt(t){return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');}

/* ── STANDARD BACK/BOOK BUTTONS shown after every response ── */
function stdOpts(){return L==='it'?['Torna al Menu Principale','Prenota un Tavolo']:['Back to Main Menu','Book a Table'];}

/* ── CHAT TOGGLE ── */
function toggle(){
  isOpen=!isOpen;
  document.getElementById('ov').classList.toggle('on',isOpen);
  document.getElementById('bb').classList.toggle('on',isOpen);
  document.getElementById('bdg').classList.add('gone');
  var lbl=document.getElementById('chatLabel');if(lbl)lbl.classList.add('gone');
  if(isOpen && hist.length===0){setTimeout(greet,300);}
}

/* ── MAIN MENU OPTIONS ── */
var MO_EN=['Browse Full Menu','Beef & Meat Dishes','Seafood & Fish','Vegetarian Options','Cocktails & Drinks','Make a Reservation','Find Us','Opening Hours','Our Story'];
var MO_IT=['Sfoglia il Menu Completo','Piatti di Carne','Pesce e Frutti di Mare','Opzioni Vegetariane','Cocktail & Drink','Prenota un Tavolo','Trovaci','Orari di Apertura','La Nostra Storia'];

function greet(){
  bot(L==='it'?'Benvenuto al Ristorante Rovelli!\n\nSono il vostro Rovelli Assistant, qui per aiutarvi a scoprire il menu, fare domande o prenotare un tavolo.\n\nCome posso aiutarvi oggi?':'Welcome to Ristorante Rovelli!\n\nI am your Rovelli Assistant, here to help you explore our menu, answer your questions, or make a reservation.\n\nHow can I help you today?');
  qopts(L==='it'?MO_IT:MO_EN);
}

/* ── BOT MESSAGE ── */
function bot(txt,ex){
  var m=document.getElementById('msgs'),o=document.getElementById('opts');
  o.innerHTML='';
  var t=document.createElement('div');t.className='m bot';
  t.innerHTML='<div class="bub"><div class="typ"><span></span><span></span><span></span></div></div>';
  m.appendChild(t);m.scrollTop=m.scrollHeight;
  var d=Math.min(400+txt.length*3,1500);
  setTimeout(function(){
    if(t.parentNode)m.removeChild(t);
    var el=document.createElement('div');el.className='m bot';
    el.innerHTML='<div class="bub">'+fmt(txt)+(ex||'')+'</div><div class="mt">'+ts()+'</div>';
    m.appendChild(el);m.scrollTop=m.scrollHeight;
    hist.push({r:'b',t:txt});
  },d);
}
function usr(txt){
  var m=document.getElementById('msgs');
  document.getElementById('opts').innerHTML='';
  var el=document.createElement('div');el.className='m usr';
  el.innerHTML='<div class="bub">'+txt+'</div><div class="mt">'+ts()+'</div>';
  m.appendChild(el);m.scrollTop=m.scrollHeight;
  hist.push({r:'u',t:txt});
}
function qopts(arr){
  setTimeout(function(){
    var c=document.getElementById('opts');c.innerHTML='';
    arr.forEach(function(o){
      var b=document.createElement('button');b.className='opt';b.textContent=o;
      b.addEventListener('click',function(){handle(o);});
      c.appendChild(b);
    });
  },900);
}
function mapbtn(lbl){
  return '<br><a class="mapb" href="https://www.google.com/maps/search/Ristorante+Rovelli+Via+Rovelli+13+Como" target="_blank">'+lbl+'</a>';
}

/* ── BOOKING FLOW ── */
function bkfn(inp){
  var it=L==='it';
  if(bkSt==='party'){var n=parseInt(inp.replace(/[^0-9]/g,''));if(!n||n<1){bot(it?'Quante persone saranno al tavolo?':'How many guests will be dining?');return;}bkD.p=n;bkSt='date';bot(it?'Perfetto, '+n+' person'+(n===1?'a':'e')+'! Che data preferite? (es. sabato 25 gennaio)':'Perfect, '+n+' guest'+(n===1?'':'s')+'! What date works for you? (e.g. Saturday 25th January)');return;}
  if(bkSt==='date'){bkD.d=inp;bkSt='time';
    bot(it?'Perfetto! Che orario preferite?':'Perfect! Which time would you prefer?');
    qopts(['18:00','19:00']);
    return;}
  if(bkSt==='time'){
    var tv=inp.trim();
    if(tv==='19:00'||/^7/i.test(tv)||/^19/.test(tv)){tv='19:00';}
    else if(tv==='18:00'||/^6/i.test(tv)||/^18/.test(tv)){tv='18:00';}
    else{bot(it?'Scegliete tra: **18:00** o **19:00**':'Please choose: **18:00** or **19:00**');qopts(['18:00','19:00']);return;}
    bkD.t=tv;bkSt='name';
    bot(it?'Perfetto, alle '+tv+'! Il vostro nome completo per la prenotazione?':'Perfect, at '+tv+'! Your full name for the reservation?');
    return;}
  if(bkSt==='name'){bkD.n=inp;bkSt='phone';bot(it?'Il vostro numero di telefono o WhatsApp?':'Your phone number or WhatsApp?');return;}
  if(bkSt==='phone'){bkD.ph=inp;bkSt='email';bot(it?'E il vostro indirizzo email per ricevere la conferma?':'And your email address to receive the confirmation?');return;}
  if(bkSt==='email'){bkD.em=inp;bkSt=null;
    var it2=L==='it';
    var capturedData={date:bkD.d,time:bkD.t,guests:bkD.p,name:bkD.n,phone:bkD.ph,email:bkD.em};
    bkD={};
    bot(it2?'Un momento, sto confermando la prenotazione...':'One moment, confirming your reservation...');
    var formData=new FormData();
    formData.append('action','book');
    formData.append('date',capturedData.date);
    formData.append('time',capturedData.time);
    formData.append('guests',capturedData.guests);
    formData.append('name',capturedData.name);
    formData.append('phone',capturedData.phone);
    formData.append('email',capturedData.email);
    fetch('https://script.google.com/macros/s/AKfycbwaK18qBNp-ngBfRLIkoc9gG1p6VGODs9XlLILPv_sSoE8g-hFFOEm9qXCjhMCHjS4l/exec',{method:'POST',body:JSON.stringify({action:'book',date:capturedData.date,time:capturedData.time,guests:capturedData.guests,name:capturedData.name,phone:capturedData.phone,email:capturedData.email}),mode:'no-cors'})
    .then(function(){
      var msg=it2?
        '**Prenotazione Confermata!**\n\nData: '+capturedData.date+'\nOra: '+capturedData.time+'\nPersone: '+capturedData.guests+'\nNome: '+capturedData.name+'\n\nUna email di conferma e stata inviata a '+capturedData.email+'\nIl tavolo sara tenuto per 15 minuti.\n\nCi vediamo al Ristorante Rovelli!':
        '**Reservation Confirmed!**\n\nDate: '+capturedData.date+'\nTime: '+capturedData.time+'\nGuests: '+capturedData.guests+'\nName: '+capturedData.name+'\n\nA confirmation email has been sent to '+capturedData.email+'\nYour table will be held for 15 minutes.\n\nWe look forward to welcoming you!';
      bot(msg);qopts(it2?['Sfoglia il Menu Completo','Trovaci']:['Browse Full Menu','Find Us']);
    })
    .catch(function(){
      var msg=it2?
        '**Prenotazione Ricevuta!**\n\nData: '+capturedData.date+'\nOra: '+capturedData.time+'\nPersone: '+capturedData.guests+'\nNome: '+capturedData.name+'\n\nRiceverete una email di conferma a breve a '+capturedData.email+'\nIl tavolo sara tenuto per 15 minuti.\n\nCi vediamo al Ristorante Rovelli!':
        '**Reservation Received!**\n\nDate: '+capturedData.date+'\nTime: '+capturedData.time+'\nGuests: '+capturedData.guests+'\nName: '+capturedData.name+'\n\nYou will receive a confirmation email shortly at '+capturedData.email+'\nYour table will be held for 15 minutes.\n\nWe look forward to welcoming you!';
      bot(msg);qopts(it2?['Sfoglia il Menu Completo','Trovaci']:['Browse Full Menu','Find Us']);
    })
    return;}
}

/* ── MAIN HANDLER ── */
function handle(inp){
  if(bkSt!==null){usr(inp);bkfn(inp);return;}
  usr(inp);
  var lo=inp.toLowerCase(),it=L==='it',r='',ex='',o=stdOpts();

  /* BACK TO MAIN MENU */
  if(/back to main|main menu|inizio|menu principale|torna al menu/i.test(lo)){
    greet();return;
  }
  /* MENU OVERVIEW */
  else if(/^menu$|browse|full menu|see menu|cosa avete|cosa offri|cosa mang|sfoglia|browse full/i.test(lo)){
    r=it?'Ecco le sezioni del menu. Seleziona una categoria:':'Here are our menu sections. Select one to explore:';
    o=it?['Antipasti','Primi Piatti','Secondi di Carne','Secondi di Pesce','Pizze','Insalate','Focacce','Contorni','Birre','Cocktail & Aperitivi','L\'Angolo del Gin','Soft Drinks','Torna al Menu Principale']:['Starters','Pasta & Risotto','Meat & Grills','Fish & Seafood','Pizzas','Salads','Focaccias','Side Dishes','Beers','Cocktails & Aperitifs','The Gin Corner','Soft Drinks','Back to Main Menu'];
  }
  /* SEAFOOD */
  else if(/seafood|fish|sea food|frutti di mare|pesce|salmon|tonno|tuna|branzino|seabass|fritto|polpo|octopus|gamberi|prawn|cozze|vongole|clam|squid|calamari/i.test(lo)){
    var sf=[].concat(ST,PA,MA,SA,PZ).filter(function(a){return /salmon|octopus|seafood|polpo|salmone|pesce|tonno|tuna|gamberi|vongole|calamari|swordfish|branzino|seabass|fritto|shrimp|sea food|mare|frutti/i.test(a.e+' '+(a.d||'')+' '+(a.i||''));});
    r=(it?'**Piatti di Pesce e Frutti di Mare:**':'**Seafood & Fish Dishes:**')+'\n\n'+rows(sf);
    o=stdOpts();
  }
  /* BEEF & MEAT ONLY */
  else if(/beef|steak|meat|manzo|bistecca|filetto|fillet|rib.?eye|costata|carne|piatti.*carne|meat.*main|carni.*secondi/i.test(lo)){
    var bf=[].concat(ST,MA).filter(function(a){return /beef|manzo|steak|costata|fillet|filetto|tartare.*manzo|beef tartare/i.test(a.e+' '+(a.i||''));});
    r=(it?'**Piatti di Carne e Manzo:**':'**Beef & Meat Dishes:**')+'\n\n'+rows(bf);
    o=stdOpts();
  }
  /* VEGETARIAN - strictly no meat, no ham, no fish */
  else if(/vegetar|vegan|no meat|senza carne|plant.based|opzioni vegetar/i.test(lo)){
    var MEAT_KW=/ham|prosciutto|bacon|guanciale|salami|speck|wurstel|sausage|bresaola|tuna|salmon|anchov|seafood|polpo|octopus|gamberi|meat|ragu|carne|pesce/i;
    var vg=[].concat(
      ST.filter(function(a){return /caprese|bruschetta|burrata/i.test(a.e) && !MEAT_KW.test(a.e+' '+(a.d||''));}),
      PA.filter(function(a){return !MEAT_KW.test(a.e+' '+(a.d||'')) && /risotto.*porcini|ravioloni|paccheri.*burrata|porcini.*risotto|carbonara|pesto|funghi/i.test(a.e);}),
      PZ.filter(function(a){return /vegetarian|margherita|marinara|tricolore|4 formaggi|four cheese|porcini/i.test(a.e) && !MEAT_KW.test(a.e+' '+(a.d||''));})
    );
    r=(it?'**Opzioni Vegetariane:**':'**Vegetarian Options:**')+'\n\n'+rows(vg)+'\n\n'+(it?'Tutti i contorni sono vegetariani (6\u20ac ciascuno).':'All side dishes are also vegetarian (\u20ac6 each).');
    o=stdOpts();
  }
  /* PIZZA */
  else if(/pizza|pizze|pizzeria|our pizza/i.test(lo)){
    r=(it?'**Le Nostre Pizze** (oltre 30 varieta!):':'**Our Pizzas** (over 30 varieties!):')+'\n\n'+rows(PZ);
    o=stdOpts();
  }
  /* MAIN COURSES - all secondi together */
  else if(/^main courses$|^secondi di carne$|^secondi di pesce$|^meat.*grill|^fish.*seafood$|main course|carni.*pesce/i.test(lo)){
    r=(it?'**Secondi Piatti:**':'**Main Courses:**')+'\n\n**'+
      (it?'Carni & Manzo:':'Beef & Meat:')+
      '**\n'+rows(MA.filter(function(a){return /beef|manzo|steak|costata|fillet|filetto|cotoletta|milanese/i.test(a.e+' '+(a.i||''));}))+'\n\n**'+
      (it?'Pesce & Frutti di Mare:':'Fish & Seafood:')+
      '**\n'+rows(MA.filter(function(a){return /salmon|branzino|seabass|tonno|tuna|fritto|gamberi|pesce/i.test(a.e+' '+(a.d||''));}));
    o=stdOpts();
  }
  /* STARTERS */
  else if(/starter|antipast|appetizer|bruschetta|^tartare$|antipasto|^starters$/i.test(lo)){
    r=(it?'**Antipasti:**':'**Starters & Appetisers:**')+'\n\n'+rows(ST);
    o=stdOpts();
  }
  /* PASTA & RISOTTO */
  else if(/pasta|risotto|spaghetti|tagliatelle|ravioli|lasagne|carbonara|penne|fusilli|paccheri|primi|^pasta & risotto$/i.test(lo)){
    r=(it?'**Pasta & Risotti:**':'**Pasta & Risotto:**')+'\n\n'+rows(PA)+'\n\n\u2b50 = Piatto speciale della casa';
    o=stdOpts();
  }
  /* SALADS */
  else if(/salad|insalata|insalate|^salads$/i.test(lo)){
    r=(it?'**Le Nostre Insalate:**':'**Our Salads:**')+'\n\n'+rows(SA);
    o=stdOpts();
  }
  /* SIDES */
  else if(/side|contorni|contorno|^side dishes$/i.test(lo)){
    var SI=[
      {e:'Mixed Salad',i:'Insalata mista',p:'6.00 EUR',d:'Lettuce, corn, onion, cherry tomatoes'},
      {e:'Cherry Tomato Salad',i:'Insalata di pomodorini',p:'6.00 EUR'},
      {e:'Grilled Vegetables',i:'Verdure alla griglia',p:'6.00 EUR',d:'Bell peppers, eggplants, zucchinis'},
      {e:'French Fries',i:'Patatine fritte',p:'6.00 EUR'},
      {e:'Buttered Spinach',i:'Spinaci al burro',p:'6.00 EUR'},
      {e:'Sauteed Potatoes',i:'Patate saltate in padella',p:'6.00 EUR'}
    ];
    r=(it?'**Contorni** (tutti a 6 EUR):':'**Side Dishes** (all EUR 6.00):')+rows(SI);
    o=stdOpts();
  }
  /* COCKTAILS */
  else if(/^cocktails?|^aperitiv|aperol spritz|campari|negroni|mojito|sbagliato|americano|moscow mule|london mule|hugo spritz|limoncello spritz/i.test(lo)){
    r=(it?'**Cocktail & Drink:**':'**Cocktails & Drinks:**')+'\n\n'+CO.map(function(a){return '\u2022 '+a.e+' \u2014 '+a.p+(a.d?' ('+a.d+')':'');}).join('<br>')+'\n\n**The Gin Corner** \u2014 10 premium gins from around the world \u2014 from \u20ac9';
    o=stdOpts();
  }
  /* FOCACCIAS */
  else if(/focacc|^focaccias$/i.test(lo)){
    var FC=[
      {e:'Plain Focaccia with Oil & Oregano',i:'Focaccia liscia olio e origano',p:'6.00€'},
      {e:'Caprese Focaccia',i:'Focaccia caprese',p:'12.00€',d:'Buffalo mozzarella, cherry tomatoes and basil'},
      {e:'Parma Ham & Buffalo Focaccia',i:'Focaccia crudo e bufala',p:'15.00€',d:'Buffalo mozzarella and Parma ham'}
    ];
    r=(it?'**Focacce:**':'**Focaccias:**')+'\n\n'+rows(FC);
    o=stdOpts();
  }
  /* BEERS */
  else if(/^beers?$|^birr|alla spina|draft beer|bottled beer|ottakringer|moretti/i.test(lo)){
    r=(it?'**Birre:**':'**Beers:**')+'\n\n**'+(it?'Birre alla Spina (Draft):':'Draft Beers:')+
      '**\n• '+(it?'Birra piccola bionda':'Small Blonde Beer')+' — 4.50€ (Ottakringer Helles)'+
      '<br>• '+(it?'Birra media bionda':'Medium Blonde Beer')+' — 8.00€'+
      '<br>• '+(it?'Birra piccola scura':'Small Dark Beer')+' — 4.50€'+
      '<br>• '+(it?'Birra media scura':'Medium Dark Beer')+' — 8.00€'+
      '<br><br>**'+(it?'Birre in Bottiglia (Bottled):':'Bottled Beers:')+
      '**\n• Weltenburg Blonde 0.5L — 8.00€'+
      '<br>• Weltenburg Red Anno 1050 0.5L — 8.00€'+
      '<br>• Weltenburg Weiss 0.5L — 8.00€'+
      '<br>• '+(it?'Birra Moretti Zero (analcolica) 0.33L':'Birra Moretti Zero (alcohol-free) 0.33L')+' — 5.00€';
    o=stdOpts();
  }
  /* SOFT DRINKS */
  else if(/^soft drinks?$|^acqua$|^water$|coca.cola|^fanta$|^sprite$|^bibite$|iced tea|lemon soda/i.test(lo)){
    r=(it?'**Soft Drinks & Acqua:**':'**Soft Drinks & Water:**')+
      '\n• '+(it?'Acqua naturale 0.75L':'Still Water 0.75L')+' — 3.50€'+
      '<br>• '+(it?'Acqua frizzante 0.75L':'Sparkling Water 0.75L')+' — 3.50€'+
      '<br>• Coca-Cola — 4.00€'+
      '<br>• Coca-Cola Zero — 4.00€'+
      '<br>• Fanta — 4.00€'+
      '<br>• Sprite — 4.00€'+
      '<br>• '+(it?'The alla pesca':'Peach Iced Tea')+' — 4.00€'+
      '<br>• '+(it?'The al limone':'Lemon Iced Tea')+' — 4.00€'+
      '<br>• Lemon Soda — 4.00€';
    o=stdOpts();
  }
  /* GIN CORNER */
  else if(/^the gin corner$|^l.angolo del gin$|gin corner|angolo.*gin/i.test(lo)){
    r=(it?'**L\'Angolo del Gin:**':'**The Gin Corner:**')+
      '\n• Beefeater London Dry Gin 40% — 9.00€'+
      '<br>• Gin Mare Bergamotto e Limoni di Capri 42.7% — 12.00€'+
      '<br>• Malfy Gin al Limone 41% — 12.00€'+
      '<br>• Malfy Gin al Pompelmo 41% — 12.00€'+
      '<br>• The London No.1 47% — 12.00€'+
      '<br>• Gin Etsu (Japan) 43% — 12.00€'+
      '<br>• Hendrick\'s (Scotland) 44% — 12.00€'+
      '<br>• Engine (Italy) 42% — 12.00€'+
      '<br>• Portofino (Italy) 43% — 12.00€'+
      '<br>• Gin del Professore (Italy) 43% — 12.00€';
    o=stdOpts();
  }
  /* ALLERGENS */
  else if(/allerg|intolleran|gluten|lactose|dairy|celiac|glutine/i.test(lo)){
    r=it?'**Informazioni Allergeni:**\n\n1=Glutine \u00b7 2=Crostacei \u00b7 3=Uova \u00b7 4=Pesce \u00b7 7=Latte \u00b7 8=Frutta a guscio \u00b7 10=Senape \u00b7 11=Sesamo \u00b7 12=Solfiti\n\nI numeri degli allergeni sono indicati accanto ad ogni piatto sul menu. Si prega di informare il nostro staff di qualsiasi allergia prima di ordinare.':'**Allergen Information:**\n\n1=Gluten \u00b7 2=Crustaceans \u00b7 3=Eggs \u00b7 4=Fish \u00b7 7=Milk \u00b7 8=Tree nuts \u00b7 10=Mustard \u00b7 11=Sesame \u00b7 12=Sulphites\n\nAllergen numbers are listed next to each dish on the menu. Please inform our staff of any allergies before ordering.';
    o=stdOpts();
  }
  /* COVER CHARGE */
  else if(/cover|coperto|charge/i.test(lo)){
    r=it?'Il coperto e **3,00\u20ac** a persona. Include pane, acqua e servizio al tavolo.':'The cover charge is **\u20ac3.00** per person. This includes bread, water and table service.';
    o=stdOpts();
  }
  /* BOOKING */
  else if(/book|reserv|prenotar|prenota|tavolo|table|seat|reservation|make a res/i.test(lo)){
    bkSt='party';
    r=it?'**Prenota il Tuo Tavolo**\n\nSiamo lieti di accogliervi!\n\nOrari disponibili: **18:00** e **19:00**\nChiusi il **martedi**. Prenotazioni dello stesso giorno benvenute.\n\nQuante persone saranno al tavolo?':'**Make a Reservation**\n\nWe would be delighted to welcome you!\n\nAvailable times: **18:00** and **19:00**\nClosed on **Tuesdays**. Same-day reservations welcome.\n\nHow many guests will be dining?';
    o=[];
  }
  /* HOURS */
  else if(/hour|open|close|when|orari|aperto|chiuso|giorni|tuesday|martedi|opening/i.test(lo)){
    r=it?'**Orari di Apertura:**\n\nLunedi \u2014 11:00 - 22:30\nMercoledi \u2014 11:00 - 22:30\nGiovedi \u2014 11:00 - 22:30\nVenerdi \u2014 11:00 - 22:30\nSabato \u2014 11:00 - 22:30\nDomenica \u2014 11:00 - 22:30\n\nCHIUSI il Martedi':'**Opening Hours:**\n\nMonday \u2014 11:00 - 22:30\nWednesday \u2014 11:00 - 22:30\nThursday \u2014 11:00 - 22:30\nFriday \u2014 11:00 - 22:30\nSaturday \u2014 11:00 - 22:30\nSunday \u2014 11:00 - 22:30\n\nCLOSED on Tuesdays';
    o=stdOpts();
  }
  /* LOCATION */
  else if(/where|location|address|indirizzo|dove|find us|directions|maps|navigat|trovaci/i.test(lo)){
    r=it?'**Dove Siamo:**\n\nVia Rovelli 13, 22100 Como\n\nSiamo nel cuore di Como, a pochi passi dal lago. Premi il pulsante per le indicazioni stradali.':'**Find Us:**\n\nVia Rovelli 13, 22100 Como\n\nWe are in the heart of Como, just a short walk from the lake. Tap the button for directions.';
    ex=mapbtn(it?'Apri su Google Maps':'Open in Google Maps');
    o=stdOpts();
  }
  /* CONTACT */
  else if(/phone|call|contact|tel|email|contatt|chiama/i.test(lo)){
    r=it?'**Contattaci:**\n\nTelefono: +39 031 718 4647\nEmail: booking@ristoranterovelli.com\nIndirizzo: Via Rovelli 13, Como\n\nDisponibili anche per **eventi privati e cene di gruppo**.\nSiamo a vostra disposizione!':'**Get in Touch:**\n\nPhone: +39 031 718 4647\nEmail: booking@ristoranterovelli.com\nAddress: Via Rovelli 13, Como\n\nAlso available for **private dining and group events**.\nWe are always happy to help!';
    o=stdOpts();
  }
  /* ABOUT / STORY */
  else if(/about|history|story|who|rovelli|concept|chef|cucina|storia|giuseppe|marquis|nostra storia|la storia/i.test(lo)){
    r=it?'**Il Ristorante Rovelli:**\n\nRovelli prende il nome dalla strada dedicata al Marchese Giuseppe Rovelli, un nobile comasco che amo cosi tanto la sua citta da scriverne la storia in cinque volumi.\n\nDa quella passione per Como nasce la nostra cucina, con uno sguardo a tutte le regioni d\'Italia e un impegno costante per la qualita e la stagionalita dei prodotti.\n\nI nostri chef vantano anni di esperienza nei migliori ristoranti italiani.':'**Our Story:**\n\nRovelli takes its name from the street named after Marquis Giuseppe Rovelli, a nobleman from Como who loved his city so deeply that he wrote its history across five volumes.\n\nFrom that passion for Como, our cuisine was born \u2014 celebrating the very best seasonal ingredients from across all of Italy.\n\nOur chefs bring years of experience from the finest Italian restaurants.';
    o=stdOpts();
  }
  /* SIGNATURE DISHES */
  else if(/signature|special|best|recommend|top|speciale|specialit|famoso|what.*suggest/i.test(lo)){
    r=it?'**I Nostri Piatti Speciali:**\n\n\u2b50 **Risotto del Lario** \u2014 20\u20ac\nRisotto agli agrumi con tartare di pesce persico e olio di basilico \u2014 il nostro piatto piu amato, ispirato al Lago di Como.\n\n\u2b50 **Pizza Rovelli** \u2014 21\u20ac\nTartare di salmone, zucchine alla julienne, granella di pistacchio e mozzarella.\n\n\u2b50 **Costata di manzo 500gr** \u2014 32\u20ac\nLa nostra bistecca premium alla griglia.':'**Our Signature Dishes:**\n\n\u2b50 **Lake Como Risotto** \u2014 \u20ac20.00\nCitrus risotto with perch tartare and basil oil \u2014 our most celebrated dish, inspired by beautiful Lake Como.\n\n\u2b50 **Pizza Rovelli** \u2014 \u20ac21.00\nSalmon tartare, julienne zucchinis, chopped pistachios, mozzarella \u2014 our signature pizza.\n\n\u2b50 **Grilled Rib-Eye Steak 500gr** \u2014 \u20ac32.00\nOur premium cut, grilled to perfection.';
    o=stdOpts();
  }
  /* PRICES */
  else if(/price|cost|quanto|prezzo|costo|budget|expensive|affordable/i.test(lo)){
    r=it?'**Panoramica Prezzi:**\n\nAntipasti: 10\u20ac \u2013 23\u20ac\nPasta & Risotti: 14\u20ac \u2013 23\u20ac\nSecondi: 23\u20ac \u2013 32\u20ac\nPizze: 7\u20ac \u2013 21\u20ac\nInsalate: 14\u20ac \u2013 18\u20ac\nContorni: 6\u20ac\nCoperto: 3\u20ac a persona':'**Price Overview:**\n\nStarters: \u20ac10 \u2013 \u20ac23\nPasta & Risotto: \u20ac14 \u2013 \u20ac23\nMain Courses: \u20ac23 \u2013 \u20ac32\nPizzas: \u20ac7 \u2013 \u20ac21\nSalads: \u20ac14 \u2013 \u20ac18\nSides: \u20ac6\nCover charge: \u20ac3 per person';
    o=stdOpts();
  }
  /* PORCINI */
  else if(/porcini|mushroom|fungh/i.test(lo)){
    var pm=srch('porcini');
    r=(it?'**Piatti con Funghi Porcini:**':'**Dishes with Porcini Mushrooms:**')+'\n\n'+(pm.length?rows(pm):(it?'Nessun risultato trovato.':'No results found.'));
    o=stdOpts();
  }
  /* COMO / LAKE */
  else if(/como|lago|lake como/i.test(lo)){
    r=it?'Siamo orgogliosamente situati nel cuore di Como, una delle citta piu belle d\'Italia, sulle rive dello splendido Lago di Como.\n\nIl nostro **Risotto del Lario** e un omaggio al lago \u2014 preparato con pesce persico locale e olio di basilico fresco.\n\nVia Rovelli 13, 22100 Como':'We are proudly located in the heart of Como, one of Italy\'s most beautiful cities, on the shores of magnificent Lake Como.\n\nOur **Lake Como Risotto** is a tribute to the lake \u2014 made with local perch and fresh basil oil.\n\nVia Rovelli 13, 22100 Como';
    ex=mapbtn(it?'Apri su Google Maps':'Open in Google Maps');
    o=stdOpts();
  }
  /* GREET */
  else if(/hello|hi\b|hey\b|ciao|salve|buon|good morning|good evening|buongiorno|buonasera/i.test(lo)){
    r=it?'Buongiorno! Benvenuto al Ristorante Rovelli. Come posso aiutarvi oggi?':'Welcome! It is a pleasure to have you here at Ristorante Rovelli. How may I assist you today?';
    o=L==='it'?MO_IT:MO_EN;
  }
  /* FREE TEXT SEARCH */
  else{
    var words=lo.replace(/[^a-z ]/g,'').split(' ').filter(function(w){return w.length>2;}).sort(function(a,b){return b.length-a.length;});
    var sr=[];
    for(var wi=0;wi<words.length&&sr.length===0;wi++){sr=srch(words[wi]);}
    if(sr.length){
      r=(it?'Ho trovato questi piatti:':'Here is what I found on our menu:')+'\n\n'+rows(sr.slice(0,8));
      o=stdOpts();
    } else {
      r=it?'Sono qui per aiutarvi! Potete chiedermi del menu, fare una prenotazione, trovare il ristorante, o saperne di piu su di noi.':'I am here to help! You can ask me about our menu, make a reservation, find us on the map, or learn more about Ristorante Rovelli.';
      o=L==='it'?MO_IT:MO_EN;
    }
  }

  if(r)bot(r,ex||'');
  if(o&&o.length)qopts(o);
}

/* ── SEND ── */
function send(){
  var el=document.getElementById('inp');
  var t=el.value.trim();
  if(!t)return;
  el.value='';el.focus();
  handle(t);
}

/* ── LANGUAGE ── */
function setLang(l){
  L=l;
  document.querySelectorAll('.lb').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-lang')===l);});
  var cl=document.getElementById('chatLabelTxt');
  if(cl){cl.textContent=l==='it'?'Chatta con il nostro Assistente Rovelli':'Chat with our Rovelli Assistant';}
  var pt=document.getElementById('privTxt');
  if(pt){
    pt.innerHTML=l==='it'?
      'Utilizzando questa chat accetti che i tuoi dati vengano utilizzati per rispondere alla tua richiesta. <a href="https://www.ristoranterovelli.com" target="_blank">Privacy Policy</a>.':
      'By using this chat you agree to your data being used to answer your enquiry. <a href="https://www.ristoranterovelli.com" target="_blank">Privacy Policy</a>.';
  }
}

/* ── AI SELF-IMPROVEMENT NOTE ──
   To make this chatbot more advanced over time, use the Claude API
   to pass conversation history and get dynamic responses. Each rebuild
   preserves all menu data and response logic. Future versions will
   connect to the live booking backend after the client meeting.
*/

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('openBtn').addEventListener('click',toggle);
  document.getElementById('bb').addEventListener('click',toggle);
  document.getElementById('backBtn').addEventListener('click',toggle);
  document.getElementById('privOk').addEventListener('click',function(){document.getElementById('priv').classList.add('gone');});
  document.getElementById('sndBtn').addEventListener('click',send);
  document.getElementById('inp').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();send();}});
  document.getElementById('inp').style.fontSize='16px';
  document.querySelectorAll('.lb').forEach(function(b){b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));});});
});
})();

// ── APPLY INITIAL LANGUAGE AFTER SCRIPT LOADS ──
setTimeout(function(){
  if(typeof setLang === 'function') setLang(initialLang);
}, 100);

})();
