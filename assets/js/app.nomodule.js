// Versión sin módulos para index.html (file://)
(function(){
  const COURSE = window.COURSE || { lessons: [] };
  const LS_COMPLETED_KEY = 'ai-learning:completed';

  function readCompleted() { try { return JSON.parse(localStorage.getItem(LS_COMPLETED_KEY) || '{}'); } catch { return {}; } }
  function writeCompleted(map) { localStorage.setItem(LS_COMPLETED_KEY, JSON.stringify(map)); }
  function minutesToPretty(mins){ if(mins<60) return `${mins}m`; const h=Math.floor(mins/60),m=mins%60; return m?`${h}h ${m}m`:`${h}h`; }
  function sumDuration(ls){ return ls.reduce((a,l)=>a+(l.durationMin||0),0); }
  function renderStats(lessons, completed){ const total=lessons.length; const done=lessons.filter(l=>completed[l.id]).length; const pct= total? Math.round((done/total)*100):0; const mins=sumDuration(lessons); const elL=document.getElementById('stat-lessons'); const elP=document.getElementById('stat-progress'); const elT=document.getElementById('stat-time'); if(elL) elL.textContent=String(total); if(elP) elP.textContent=`${pct}%`; if(elT) elT.textContent=minutesToPretty(mins); }
  function cardTemplate(lesson, completed){ const catLabel={ basics:'Básicos', prompting:'Prompting', aplicaciones:'Apps' }[lesson.category]||lesson.category; const doneClass=completed?'done':''; const width=completed?'100%':'0%'; const href=`lesson.html?id=${encodeURIComponent(lesson.id)}`; return `
    <article class="card">
      <div class="top">
        <span class="badge ${doneClass}">${catLabel}</span>
        <span class="muted">${lesson.durationMin}m</span>
      </div>
      <h3 class="title"><a href="${href}" class="nav-link" style="padding:0">${lesson.num}. ${lesson.title}</a></h3>
      <p class="muted">${lesson.summary}</p>
      <div class="progress-bar"><span style="width:${width}"></span></div>
      <div class="actions">
        <a class="btn btn-ghost" href="${href}">Ver lección</a>
        <small class="muted">${completed ? 'Completada' : 'Pendiente'}</small>
      </div>
    </article>`; }
  function renderGrid(lessons, completed){ const grid=document.getElementById('grid'); if(!grid) return; grid.innerHTML=lessons.map(l=>cardTemplate(l, !!completed[l.id])).join(''); }
  function setupSearchAndFilters(allLessons, completed){ let activeFilter='all'; let term=''; const input=document.getElementById('search'); const chips=Array.from(document.querySelectorAll('[data-filter]')); function apply(){ const t=term.trim().toLowerCase(); const filtered=allLessons.filter(l=>{ const byCat= activeFilter==='all' || l.category===activeFilter; if(!byCat) return false; if(!t) return true; const hay=[l.title,l.summary,(l.tags||[]).join(' ')].join(' ').toLowerCase(); return hay.includes(t); }); renderGrid(filtered, completed); } if(input){ input.addEventListener('input', (e)=>{ term=e.target.value||''; apply(); }); } chips.forEach(chip=>{ chip.addEventListener('click',()=>{ chips.forEach(c=>c.classList.remove('is-active')); chip.classList.add('is-active'); activeFilter= chip.getAttribute('data-filter')||'all'; apply(); }); }); apply(); }
  function setYear(){ const y=document.getElementById('year'); if(y) y.textContent=String(new Date().getFullYear()); }

  document.addEventListener('DOMContentLoaded', ()=>{
    const completed=readCompleted();
    renderStats(COURSE.lessons, completed);
    renderGrid(COURSE.lessons, completed);
    setupSearchAndFilters(COURSE.lessons, completed);
    setYear();
    // sin login/logout
  });
})();
