<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Backend Development — Lab Report</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#080B1A;
    --line:rgba(227,179,65,.18);
    --line-v:rgba(139,107,255,.22);
    --text:#EAE7DE;
    --muted:#8B93B8;
    --gold:#E3B341;
    --violet:#8B6BFF;
    --serif:"Fraunces",Georgia,"Times New Roman",serif;
    --sans:"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  }
  *{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%}
  body{
    margin:0;
    background:
      radial-gradient(1100px 620px at 12% -12%, rgba(139,107,255,.22), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(227,179,65,.10), transparent 55%),
      var(--ink);
    color:var(--text);
    font-family:var(--sans);
    font-size:17px;
    line-height:1.6;
    min-height:100vh;
  }
  .wrap{max-width:880px;margin:0 auto;padding:clamp(40px,7vw,96px) clamp(20px,5vw,40px) 80px}

  /* ---------- masthead ---------- */
  .mast{border-bottom:1px solid var(--line);padding-bottom:36px}
  .course{
    font-family:var(--serif);
    font-weight:300;
    font-size:clamp(44px,9vw,86px);
    line-height:.96;
    letter-spacing:-.02em;
    margin:0;
    color:#fff;
  }
  .course em{font-style:italic;color:var(--gold);font-weight:500}
  .sub{margin:22px 0 0;color:var(--muted);max-width:52ch}
  .meta{
    margin-top:26px;
    display:flex;
    flex-wrap:wrap;
    gap:10px 28px;
    font-family:var(--mono);
    font-size:13.5px;
    color:var(--muted);
  }
  .meta b{color:var(--gold);font-weight:500}

  /* ---------- sections ---------- */
  .section{margin-top:64px}
  .section-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px}
  .section h2{
    font-family:var(--serif);
    font-weight:500;
    font-size:28px;
    letter-spacing:-.01em;
    margin:0;
    color:#fff;
  }
  .count{font-family:var(--mono);font-size:12.5px;color:var(--muted)}
  .section p.note{margin:6px 0 22px;color:var(--muted);font-size:15px}
  .theory h2{color:#fff}
  .theory .count{color:var(--violet)}

  /* ---------- entry list ---------- */
  .list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
  .theory .list{border-top-color:var(--line-v)}
  .entry{border-bottom:1px solid var(--line)}
  .theory .entry{border-bottom-color:var(--line-v)}
  .entry a{
    display:grid;
    grid-template-columns:92px 1fr auto;
    align-items:baseline;
    gap:4px 20px;
    padding:20px 14px;
    margin:0 -14px;
    text-decoration:none;
    color:inherit;
    border-radius:10px;
    transition:background .18s ease, transform .18s ease;
  }
  .entry a:hover,.entry a:focus-visible{background:rgba(139,107,255,.12);transform:translateX(4px)}
  .entry a:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
  .idx{
    font-family:var(--mono);
    font-size:12px;
    letter-spacing:.06em;
    color:var(--gold);
    border:1px solid var(--line);
    border-radius:999px;
    padding:4px 0;
    text-align:center;
    white-space:nowrap;
  }
  .theory .idx{color:var(--violet);border-color:rgba(139,107,255,.35)}
  .name{font-weight:500;font-size:18px;color:#fff}
  .path{
    grid-column:2;
    font-family:var(--mono);
    font-size:12.5px;
    color:var(--muted);
    word-break:break-all;
  }
  .host{
    font-family:var(--mono);
    font-size:12px;
    color:var(--muted);
    justify-self:end;
  }
  .entry a:hover .host,.entry a:focus-visible .host{color:var(--gold)}

  footer{
    margin-top:72px;
    padding-top:22px;
    border-top:1px solid var(--line);
    font-family:var(--mono);
    font-size:12.5px;
    color:var(--muted);
  }
  footer a{color:var(--gold)}

  @media (prefers-reduced-motion:no-preference){
    .reveal{opacity:0;transform:translateY(12px);animation:rise .7s cubic-bezier(.2,.7,.3,1) forwards}
    .reveal:nth-child(2){animation-delay:.08s}
    .reveal:nth-child(3){animation-delay:.16s}
    .reveal:nth-child(4){animation-delay:.24s}
    @keyframes rise{to{opacity:1;transform:none}}
  }

  @media (max-width:560px){
    .entry a{grid-template-columns:80px 1fr;padding:18px 12px}
    .host{display:none}
    .path{grid-column:1/-1}
  }
</style>
</head>
<body>
<div class="wrap">

  <header class="mast reveal">
    <h1 class="course">Backend <em>Development</em></h1>
    <p class="sub">Lab experiments and theory lectures, collected in one place. Every entry links to the source or the live output.</p>
    <div class="meta">
      <span>Roll no. <b>590015728</b></span>
      <span>Kabir Chaudhary</span>
      <span>UPES · B.Tech CSE</span>
    </div>
  </header>

  <section class="section lab reveal">
    <div class="section-head">
      <h2>Lab</h2>
      <span class="count">3 experiments</span>
    </div>
    <p class="note">Hands-on work, submitted per experiment.</p>
    <ul class="list">

      <li class="entry">
        <a href="https://kaveerchaudhary-cpu.github.io/kabirchaudhary.github.io/backend%20deveploment/lab/Exp%201/parta/index.html">
          <span class="idx">Exp 01</span>
          <span class="name">Part A</span>
          <span class="host">live page</span>
          <span class="path">lab / Exp 1 / parta</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/lab/Exp%2012">
          <span class="idx">Exp 12</span>
          <span class="name">Source files</span>
          <span class="host">github</span>
          <span class="path">lab / Exp 12</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/lab/Exp%2012B">
          <span class="idx">Exp 12B</span>
          <span class="name">Source files</span>
          <span class="host">github</span>
          <span class="path">lab / Exp 12B</span>
        </a>
      </li>

    </ul>
  </section>

  <section class="section theory reveal">
    <div class="section-head">
      <h2>Theory</h2>
      <span class="count">7 lectures</span>
    </div>
    <p class="note">Lecture notes, reports, and accompanying code.</p>
    <ul class="list">

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%203">
          <span class="idx">Lec 03</span>
          <span class="name">Lecture notes</span>
          <span class="host">github</span>
          <span class="path">theory / lecture 3</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%204">
          <span class="idx">Lec 04</span>
          <span class="name">Lecture notes</span>
          <span class="host">github</span>
          <span class="path">theory / lecture 4</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%205/FastAPI/fastapi-project">
          <span class="idx">Lec 05</span>
          <span class="name">FastAPI project</span>
          <span class="host">github</span>
          <span class="path">theory / lecture 5 / FastAPI / fastapi-project</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%206">
          <span class="idx">Lec 06</span>
          <span class="name">Lecture notes</span>
          <span class="host">github</span>
          <span class="path">theory / lecture 6</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%207">
          <span class="idx">Lec 07</span>
          <span class="name">Lecture notes</span>
          <span class="host">github</span>
          <span class="path">theory / lecture 7</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%208">
          <span class="idx">Lec 08</span>
          <span class="name">Lecture notes</span>
          <span class="host">github</span>
          <span class="path">theory / lecture 8</span>
        </a>
      </li>

      <li class="entry">
        <a href="https://github.com/kaveerchaudhary-cpu/kabirchaudhary.github.io/tree/main/backend%20deveploment/theory/lecture%2013">
          <span class="idx">Lec 13</span>
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

</div>
</body>
</html>

