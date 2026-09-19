---
layout: none
---

{::nomarkdown}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Backend Development — Lab Report</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#07091A;
    --panel:#0D1128;
    --line:rgba(227,179,65,.16);
    --line-v:rgba(155,127,255,.20);
    --gold:#E7B33E;
    --violet:#9B7FFF;
    --text:#ECE8DD;
    --muted:#8991B4;
    --serif:"Fraunces",Georgia,"Times New Roman",serif;
    --sans:"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  }
  *{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
  body{
    margin:0;
    background:var(--ink);
    color:var(--text);
    font-family:var(--sans);
    font-size:17px;
    line-height:1.65;
  }

  /* ---------- ambient backdrop (one signature moment) ---------- */
  .backdrop{
    position:fixed;inset:0;z-index:0;pointer-events:none;
    background:
      radial-gradient(900px 560px at 8% -8%, rgba(155,127,255,.22), transparent 60%),
      radial-gradient(760px 480px at 105% 8%, rgba(231,179,62,.12), transparent 55%);
  }
  @media (prefers-reduced-motion:no-preference){
    .backdrop{animation:drift 26s ease-in-out infinite alternate}
  }
  @keyframes drift{
    from{background-position:0 0, 0 0}
    to{background-position:40px 60px, -30px -40px}
  }

  /* ---------- reading progress ---------- */
  .progress{position:fixed;top:0;left:0;height:3px;width:100%;z-index:50;background:transparent}
  .progress::after{
    content:"";display:block;height:100%;width:var(--p,0%);
    background:linear-gradient(90deg,var(--gold),var(--violet));
    transition:width .1s linear;
  }

  .frame{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,48px)}
  .grid{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);gap:clamp(32px,6vw,80px);padding:clamp(48px,8vw,88px) 0 100px}

  /* ---------- cover / rail ---------- */
  .cover{position:sticky;top:56px;align-self:start}
  .cover h1{
    font-family:var(--serif);
    font-style:italic;
    font-weight:300;
    font-size:clamp(42px,4.6vw,58px);
    line-height:.98;
    letter-spacing:-.01em;
    margin:0 0 20px;
    color:#fff;
  }
  .rule{width:64px;height:2px;border:0;margin:0 0 22px;background:linear-gradient(90deg,var(--gold),transparent)}
  .dek{color:var(--muted);font-size:15px;max-width:34ch;margin:0 0 34px}

  .facts{display:flex;flex-direction:column;gap:16px;margin-bottom:38px}
  .fact-label{font-size:12.5px;color:var(--muted)}
  .fact-value{font-size:16.5px;color:var(--text);font-weight:500;margin-top:2px}

  .jump{display:flex;flex-direction:column;gap:2px;border-left:2px solid var(--line);padding-left:0}
  .jump a{
    position:relative;
    display:flex;justify-content:space-between;align-items:center;
    padding:10px 0 10px 18px;margin-left:-2px;border-left:2px solid transparent;
    color:var(--muted);text-decoration:none;font-size:15px;
    transition:color .18s ease, border-color .18s ease;
  }
  .jump a .n{font-family:var(--mono);font-size:12px;color:var(--muted)}
  .jump a.active{color:#fff;border-left-color:var(--gold)}
  .jump a.active .n{color:var(--gold)}
  .jump a:hover{color:#fff}

  /* ---------- content ---------- */
  .section{scroll-margin-top:56px;padding-top:8px}
  .section + .section{margin-top:64px}
  .section-head{display:flex;align-items:baseline;gap:14px;margin-bottom:6px}
  .section-head h2{
    font-family:var(--serif);font-weight:500;font-style:italic;
    font-size:30px;letter-spacing:-.01em;margin:0;color:#fff;
  }
  .section-head .tally{font-size:13px;color:var(--muted)}
  .theory .section-head h2{color:#fff}
  .section-note{color:var(--muted);font-size:15px;margin:0 0 20px;max-width:60ch}

  .list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
  .theory .list{border-top-color:var(--line-v)}
  .entry{border-bottom:1px solid var(--line)}
  .theory .entry{border-bottom-color:var(--line-v)}
  .entry a{
    display:grid;grid-template-columns:64px 1fr auto;align-items:baseline;gap:4px 20px;
    padding:19px 12px;margin:0 -12px;text-decoration:none;color:inherit;border-radius:8px;
    transition:background .18s ease, transform .18s ease;
  }
  .entry a:hover,.entry a:focus-visible{background:rgba(155,127,255,.10);transform:translateX(4px)}
  .entry a:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
  .idx{font-family:var(--mono);font-size:13px;color:var(--gold)}
  .theory .idx{color:var(--violet)}
  .name{font-weight:500;font-size:17.5px;color:#fff}
  .path{grid-column:2;font-family:var(--mono);font-size:12px;color:var(--muted);word-break:break-all}
  .host{font-family:var(--mono);font-size:11.5px;color:var(--muted);justify-self:end;white-space:nowrap}
  .entry a:hover .host,.entry a:focus-visible .host{color:var(--gold)}

  footer{margin-top:72px;padding-top:22px;border-top:1px solid var(--line);font-size:13.5px;color:var(--muted)}
  footer a{color:var(--gold);text-decoration:none}
  footer a:hover{text-decoration:underline}

  /* one page-load reveal, not repeated on scroll */
  @media (prefers-reduced-motion:no-preference){
    .rise{opacity:0;transform:translateY(14px);animation:up .7s cubic-bezier(.2,.7,.3,1) forwards}
    .rise:nth-child(1){animation-delay:.02s}
    .rise:nth-child(2){animation-delay:.10s}
    .rise:nth-child(3){animation-delay:.18s}
    .rise:nth-child(4){animation-delay:.26s}
    @keyframes up{to{opacity:1;transform:none}}
  }

  @media (max-width:880px){
    .grid{grid-template-columns:1fr}
    .cover{position:static}
    .jump{flex-direction:row;flex-wrap:wrap;border-left:0;border-top:1px solid var(--line);padding-top:14px}
    .jump a{border-left:0;border-top:2px solid transparent;margin-left:0;padding:8px 14px 8px 0}
    .jump a.active{border-top-color:var(--gold)}
  }
  @media (max-width:560px){
    .entry a{grid-template-columns:52px 1fr;padding:16px 10px}
    .host{display:none}
    .path{grid-column:1/-1}
  }

  @media print{
    .backdrop,.progress{display:none}
    body{background:#fff;color:#111}
    .cover{position:static}
    .fact-value,.name,h1,h2{color:#111}
    .entry a{color:#111}
    a[href]::after{content:" (" attr(href) ")";font-size:11px;color:#555}
  }
</style>
</head>
<body>

<div class="backdrop" aria-hidden="true"></div>
<div class="progress" id="progress" aria-hidden="true"></div>

<div class="frame">
  <div class="grid">

    <!-- ---------- left: cover ---------- -->
    <aside class="cover">
      <h1 class="rise">Backend<br>Development</h1>
      <hr class="rule">
      <p class="dek rise">Lab experiments and theory lectures, indexed in one place — each entry links to its source or live output.</p>

      <div class="facts rise">
        <div>
          <div class="fact-label">Student</div>
          <div class="fact-value">Kabir Chaudhary</div>
        </div>
        <div>
          <div class="fact-label">Roll number</div>
          <div class="fact-value">590015728</div>
        </div>
        <div>
          <div class="fact-label">Programme</div>
          <div class="fact-value">B.Tech CSE, UPES</div>
        </div>
      </div>

      <nav class="jump rise" id="jump">
        <a href="#lab" data-target="lab"><span>Lab</span><span class="n">03</span></a>
        <a href="#theory" data-target="theory"><span>Theory</span><span class="n">07</span></a>
      </nav>
    </aside>

    <!-- ---------- right: content ---------- -->
    <main>

      <section class="section lab" id="lab">
        <div class="section-head">
          <h2>Lab</h2>
          <span class="tally">3 experiments</span>
        </div>
        <p class="section-note">Hands-on work, submitted per experiment.</p>
        <ul class="list">

          <li class="entry">
            <a href="https://kaveerchaudhary-cpu.github.io/kabirchaudhary.github.io/backend%20deveploment/lab/Exp%201/parta/index.html">
              <span class="idx">01</span>
              <span class="name">Part A</span>
              <span class="host">live page</span>
              <span class="path">lab / Exp 1 / parta</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/lab/Exp%2012">
              <span class="idx">12</span>
              <span class="name">Source files</span>
              <span class="host">github</span>
              <span class="path">lab / Exp 12</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/lab/Exp%2012B">
              <span class="idx">12B</span>
              <span class="name">Source files</span>
              <span class="host">github</span>
              <span class="path">lab / Exp 12B</span>
            </a>
          </li>

        </ul>
      </section>

      <section class="section theory" id="theory">
        <div class="section-head">
          <h2>Theory</h2>
          <span class="tally">7 lectures</span>
        </div>
        <p class="section-note">Lecture notes, reports, and accompanying code.</p>
        <ul class="list">

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%203">
              <span class="idx">03</span>
              <span class="name">Lecture notes</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 3</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%204">
              <span class="idx">04</span>
              <span class="name">Lecture notes</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 4</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%205/FastAPI/fastapi-project">
              <span class="idx">05</span>
              <span class="name">FastAPI project</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 5 / FastAPI / fastapi-project</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%206">
              <span class="idx">06</span>
              <span class="name">Lecture notes</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 6</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%207">
              <span class="idx">07</span>
              <span class="name">Lecture notes</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 7</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%208">
              <span class="idx">08</span>
              <span class="name">Lecture notes</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 8</span>
            </a>
          </li>

          <li class="entry">
            <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%2013">
              <span class="idx">13</span>
              <span class="name">MongoDB</span>
              <span class="host">github</span>
              <span class="path">theory / lecture 13</span>
            </a>
          </li>

        </ul>
      </section>

      <footer>
        Maintained by Kabir Chaudhary ·
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io">repository on GitHub</a>
      </footer>

    </main>
  </div>
</div>

<script>
(function(){
  var bar = document.getElementById('progress');
  function onScroll(){
    var h = document.documentElement;
    var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.setProperty('--p', (isFinite(pct) ? pct : 0) + '%');
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  var links = document.querySelectorAll('#jump a');
  var sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          links.forEach(function(l){
            l.classList.toggle('active', l.dataset.target === e.target.id);
          });
        }
      });
    }, {rootMargin:'-20% 0px -70% 0px'});
    sections.forEach(function(s){ obs.observe(s); });
  }
})();
</script>

</body>
</html>
{:/nomarkdown}