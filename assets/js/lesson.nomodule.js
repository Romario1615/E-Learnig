// Versión sin módulos para lesson.html (file://)
(function(){
  const COURSE = window.COURSE || { lessons: [] };
  const LS_COMPLETED_KEY = 'ai-learning:completed';
  const LS_NOTES_PREFIX = 'ai-learning:notes:';

  function readCompleted(){ try { return JSON.parse(localStorage.getItem(LS_COMPLETED_KEY) || '{}'); } catch { return {}; } }
  function writeCompleted(map){ localStorage.setItem(LS_COMPLETED_KEY, JSON.stringify(map)); }
  function setYear(){ const y=document.getElementById('year'); if(y) y.textContent=String(new Date().getFullYear()); }
  function setupBack(){ const btn=document.getElementById('btn-back'); if(!btn) return; btn.addEventListener('click', ()=>{ if(history.length>1) history.back(); else window.location.href='index.html'; }); }
  function setupHome(){ const btn=document.getElementById('btn-home'); if(!btn) return; btn.addEventListener('click', ()=>{ window.location.href='index.html'; }); }
  function getLessonById(id){ const idx=COURSE.lessons.findIndex(l=>l.id===id); return { idx, lesson: COURSE.lessons[idx] }; }
  function renderExam(){
    const wrap=document.getElementById('video-wrapper'); if(!wrap) return; wrap.classList.add('exam-mode');
    const q=[
      { t:'¿Qué es un LLM?', o:['Un modelo de lenguaje grande','Una base de datos','Un algoritmo de compresión'], a:0 },
      { t:'¿Qué ayuda a mejorar respuestas?', o:['Más emojis','Mejor contexto','Tiempo de espera'], a:1 },
      { t:'RAG significa…', o:['Random AI Generator','Retrieval Augmented Generation','Rapid Answer Guide'], a:1 },
      { t:'Few-shot es…', o:['Dar pocos ejemplos','Hacer pocas preguntas','Reducir tokens'], a:0 },
      { t:'CoT ayuda a…', o:['Formatear JSON','Razonar paso a paso','Traducir idiomas'], a:1 },
    ];
    const TOTAL_SECONDS = 10*60; // 10 minutos
    let startTime = null;
    let remaining = TOTAL_SECONDS;
    let locked = false;
    let started = false;

    wrap.innerHTML=`
      <div class="exam">
        <div class="row space-between wrap" style="gap:10px; align-items:flex-end;">
          <div>
            <h3 style="margin:0 0 6px;">Examen final</h3>
            <label>Nombre completo<br/>
              <input id="exam-name" class="input" placeholder="Escribe tu nombre completo" style="width:min(420px, 90vw); padding:12px; border-radius:12px; border:1px solid #1d2a3a; background:#0e151f; color:var(--text);">
            </label>
          </div>
          <div class="row gap" style="align-items:center;">
            <div class="exam-timer" id="exam-timer" aria-live="polite">10:00</div>
            <button id="btn-start" class="btn btn-success">Iniciar examen</button>
          </div>
        </div>
        <form id="exam-form" class="exam-form"></form>
        <div class="exam-actions row gap">
          <button id="btn-grade" class="btn btn-primary">Calificar examen</button>
          <small id="exam-status" class="muted"></small>
        </div>
        <div id="cert-block" class="cert-block" style="display:none;">
          <h3>¡Aprobado! Genera tu certificado</h3>
          <div class="row gap" style="margin-top:10px;">
            <button id="btn-show-cert" class="btn btn-success">Ver certificado</button>
          </div>
        </div>
      </div>
      <div id="cert-modal" class="modal" style="display:none;">
        <div class="modal-backdrop" data-close></div>
        <div class="modal-card">
          <img id="cert-img" alt="Certificado" style="max-width:100%; height:auto; border-radius:12px; border:1px solid #142030;">
          <div class="row gap" style="justify-content:center; margin-top:12px;">
            <button id="btn-download" class="btn btn-primary">Descargar PNG</button>
            <button id="btn-close" class="btn btn-ghost" data-close>Cerrar</button>
          </div>
        </div>
      </div>`;
    const form=wrap.querySelector('#exam-form');
    form.innerHTML=q.map((qq,idx)=>{
      const name=`q${idx}`;
      return `<fieldset class="exam-q"><legend>${idx+1}. ${qq.t}</legend>${qq.o.map((opt,i)=>`<label class="row gap"><input type="radio" name="${name}" value="${i}"><span>${opt}</span></label>`).join('')}</fieldset>`;
    }).join('');
    const status=wrap.querySelector('#exam-status');

    function disableExam(){ locked = true; form.querySelectorAll('input').forEach(el=>el.disabled=true); const btn=wrap.querySelector('#btn-grade'); if(btn) btn.disabled=true; }
    function fmt(sec){ const m=String(Math.floor(sec/60)).padStart(2,'0'); const s=String(sec%60).padStart(2,'0'); return `${m}:${s}`; }
    const timerEl = wrap.querySelector('#exam-timer');
    const startBtn = wrap.querySelector('#btn-start');
    const nameInput = wrap.querySelector('#exam-name');
    // Disable questions and grade until start
    form.querySelectorAll('input').forEach(el=> el.disabled = true);
    wrap.querySelector('#btn-grade').disabled = true;
    // Enable start only if name present
    function toggleStart(){ startBtn.disabled = !((nameInput.value||'').trim()); }
    toggleStart();
    nameInput.addEventListener('input', toggleStart);
    let t = null;
    const tick = () => { if (locked || !started) return; remaining--; if (timerEl) timerEl.textContent = fmt(Math.max(remaining,0)); if (remaining<=0){ disableExam(); grade(true); } else { t = setTimeout(tick, 1000); } };
    startBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      if (started) return;
      if (!((nameInput.value||'').trim())) { alert('Escribe tu nombre completo'); return; }
      started = true; startTime = Date.now();
      form.querySelectorAll('input').forEach(el=> el.disabled = false);
      wrap.querySelector('#btn-grade').disabled = false;
      startBtn.disabled = true; nameInput.disabled = true;
      t = setTimeout(tick, 1000);
    });

    function grade(auto=false){
      let score=0; q.forEach((qq,idx)=>{ const v=form.querySelector(`input[name=q${idx}]:checked`); if(v&&Number(v.value)===qq.a) score++; });
      const pct=Math.round((score/q.length)*100); const pass=pct>=70; const usedSec = Math.min(TOTAL_SECONDS, Math.floor(((startTime?Date.now():0)- (startTime||Date.now()))/1000));
      status.textContent=`Resultado: ${score}/${q.length} (${pct}%) ${pass?'✅ Aprobado':'❌ No aprobado'}${auto?' • Tiempo agotado':''}`;
      const block=wrap.querySelector('#cert-block'); block.style.display= pass?'block':'none';
      return { pass, usedSec, pct };
    }

    wrap.querySelector('#btn-grade').addEventListener('click',(e)=>{
      e.preventDefault(); if (locked) return; if (!started) { alert('Primero inicia el examen'); return; } const result = grade(false); if (result.pass) disableExam();
      const puntaje = Math.round((result.pct/100)*10);
      status.textContent += ` • Puntaje: ${puntaje}/10`;
      if (!result.pass) status.textContent += ' • No aprobado, vuelve a intentarlo';
    });

    wrap.querySelector('#btn-show-cert').addEventListener('click',(e)=>{
      e.preventDefault(); const name=(wrap.querySelector('#exam-name').value||'').trim(); if(!name){ alert('Escribe tu nombre completo'); return; }
      const { usedSec, pct } = grade(false); if (pct < 70) { alert('No aprobado, vuelve a intentarlo.'); return; }
      const d=new Date();
      // Calcular tiempo total usado = suma( video mins ) + 10 mins por lección con video + tiempo del examen
      const lessons = (window.COURSE && Array.isArray(window.COURSE.lessons)) ? window.COURSE.lessons : [];
      const contentLessons = lessons.filter(l => !l.exam);
      const videoMins = contentLessons.reduce((acc,l)=> acc + (Number(l.durationMin)||0), 0);
      const practiceMins = contentLessons.length * 10;
      const baseSec = (videoMins + practiceMins) * 60;
      const totalSec = baseSec + usedSec;
      const dataURL = buildCertificatePNG({
        name,
        institute: 'AI Learning Institute',
        course: 'Introducción práctica a la Inteligencia Artificial',
        usedSec: totalSec,
        date: d,
        code: genCode(name, d),
      });
      const modal = document.getElementById('cert-modal');
      const img = document.getElementById('cert-img');
      img.src = dataURL;
      modal.style.display = 'block';
      const dl = document.getElementById('btn-download');
      dl.onclick = () => {
        const a = document.createElement('a');
        a.href = dataURL; a.download = `certificado_${name.replace(/\s+/g,'_')}.png`; a.click();
      };
      const closeEls = modal.querySelectorAll('[data-close]');
      closeEls.forEach(el=> el.onclick = ()=>{ modal.style.display='none'; });
    });

    function genCode(name, date){
      const src = `${name}|${date.toISOString()}|${Math.random().toString(36).slice(2)}`;
      let h = 0; for (let i=0;i<src.length;i++){ h = (h*31 + src.charCodeAt(i)) >>> 0; }
      return h.toString(16).toUpperCase().padStart(8,'0');
    }

    function buildCertificatePNG({ name, institute, course, usedSec, date, code }){
      const W = 1400, H = 900; const canvas = document.createElement('canvas'); canvas.width=W; canvas.height=H; const ctx = canvas.getContext('2d');
      // Background
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,W,H);
      // Frame
      ctx.strokeStyle = '#1f3b5a'; ctx.lineWidth = 8; ctx.strokeRect(30,30,W-60,H-60);
      // Logo circle
      const cx=120, cy=120, r=70; const grad = ctx.createLinearGradient(cx-r, cy-r, cx+r, cy+r); grad.addColorStop(0,'#00e5ff'); grad.addColorStop(1,'#00ffa3'); ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#00121a'; ctx.font = 'bold 46px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('AI', cx, cy+4);
      // Institute
      ctx.fillStyle = '#0b0f14'; ctx.textAlign='left'; ctx.textBaseline='alphabetic'; ctx.font='700 42px Arial'; ctx.fillText(institute, 220, 120);
      // Title
      ctx.font='700 64px Arial'; ctx.textAlign='center'; ctx.fillText('Certificado', W/2, 260);
      // Texts
      ctx.font='400 28px Arial'; ctx.fillStyle='#333'; ctx.fillText('Se certifica que', W/2, 320);
      ctx.font='800 46px Arial'; ctx.fillStyle='#000'; ctx.fillText(name, W/2, 380);
      ctx.font='400 28px Arial'; ctx.fillStyle='#333'; ctx.fillText('ha completado satisfactoriamente el curso', W/2, 430);
      ctx.font='600 32px Arial'; ctx.fillStyle='#0b0f14'; ctx.fillText(course, W/2, 475);
      // Meta (horas y minutos)
      const totalMin = Math.floor(usedSec/60); const hh = Math.floor(totalMin/60); const mm = totalMin%60;
      const timeStr = hh ? `${hh}h ${String(mm).padStart(2,'0')}m` : `${mm}m`;
      ctx.font='400 24px Arial'; ctx.fillStyle='#444'; ctx.fillText(`Tiempo utilizado: ${timeStr}`, W/2, 520);
      // Footer
      ctx.font='700 26px Arial'; ctx.fillStyle='#00a56b'; ctx.fillText('Emitido por: AI Learning', W/2, 580);
      ctx.font='400 22px Arial'; ctx.fillStyle='#555'; ctx.fillText(`Código: ${code}`, W/2, 620);
      ctx.fillText(date.toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'}), W/2, 650);
      return canvas.toDataURL('image/png');
    }
  }
  function renderPlayer(lesson){ if(lesson && lesson.exam){ renderExam(); return; } const wrap=document.getElementById('video-wrapper'); if(!wrap) return; const url=lesson.video||''; if(url.includes('youtube.com')||url.includes('youtu.be')){ wrap.innerHTML=`<iframe src="${url}" allowfullscreen title="${lesson.title}"></iframe>`; } else if(url.endsWith('.mp4')||url.endsWith('.webm')){ wrap.innerHTML=`<video controls src="${url}"></video>`; } else { wrap.innerHTML='<div class="row center" style="height:100%;justify-content:center;">Sin video definido</div>'; } }
  function renderInfo(lesson, idx){ const title=document.getElementById('title'); const summary=document.getElementById('summary'); const breadcrumb=document.getElementById('breadcrumb'); if(title) title.textContent=`${lesson.num}. ${lesson.title}`; if(summary) summary.textContent=lesson.summary||''; if(breadcrumb) breadcrumb.textContent=`Lección ${lesson.num} de ${COURSE.lessons.length} • ${lesson.category}`; }
  function renderPlaylist(activeId, completed){ const aside=document.getElementById('playlist'); if(!aside) return; aside.innerHTML=COURSE.lessons.map(l=>{ const href=`lesson.html?id=${encodeURIComponent(l.id)}`; const active=l.id===activeId?'active':''; const done=completed[l.id]?'done':''; return `<a class="item ${active}" href="${href}"><span class="num">${l.num}.</span><span class="name">${l.title}</span><span class="dur">${l.durationMin}m</span><span class="check ${done}" aria-hidden="true"></span></a>`; }).join(''); }
  function navigateTo(idx){ const target=COURSE.lessons[idx]; if(!target) return; const url=new URL(window.location.href); url.searchParams.set('id', target.id); window.location.href=url.toString(); }
  function setupControls(idx){ const prevBtn=document.getElementById('btn-prev'); const nextBtn=document.getElementById('btn-next'); if(prevBtn){ prevBtn.disabled = idx<=0; prevBtn.addEventListener('click', ()=>navigateTo(idx-1)); } if(nextBtn){ nextBtn.disabled = idx>=COURSE.lessons.length-1; nextBtn.addEventListener('click', ()=>navigateTo(idx+1)); } }
  function setupCompletion(lesson, completed){ const btn=document.getElementById('btn-complete'); if(!btn) return; function setLabel(){ btn.textContent= completed[lesson.id] ? 'Marcar como pendiente' : 'Marcar como completada'; } setLabel(); btn.addEventListener('click', ()=>{ if(completed[lesson.id]) delete completed[lesson.id]; else completed[lesson.id]=true; writeCompleted(completed); setLabel(); renderPlaylist(lesson.id, completed); }); }
  function setupNotes(lessonId){ const textarea=document.getElementById('notes'); const clearBtn=document.getElementById('btn-clear-notes'); const status=document.getElementById('notes-status'); if(!textarea) return; const key=LS_NOTES_PREFIX+lessonId; textarea.value=localStorage.getItem(key)||''; let t; function setSaved(){ if(status) status.textContent='Guardado'; } function setSaving(){ if(status) status.textContent='Guardando…'; } textarea.addEventListener('input', ()=>{ setSaving(); clearTimeout(t); t=setTimeout(()=>{ localStorage.setItem(key, textarea.value); setSaved(); }, 400); }); if(clearBtn){ clearBtn.addEventListener('click', ()=>{ textarea.value=''; localStorage.removeItem(key); setSaved(); }); } setSaved(); }

  document.addEventListener('DOMContentLoaded', ()=>{
    const url=new URL(window.location.href);
    const id=url.searchParams.get('id') || (COURSE.lessons[0] && COURSE.lessons[0].id);
    const { idx, lesson }= getLessonById(id);
    const completed= readCompleted();
    if(!lesson){ window.location.replace(`lesson.html?id=${encodeURIComponent(COURSE.lessons[0].id)}`); return; }
    renderInfo(lesson, idx);
    renderPlayer(lesson);
    renderPlaylist(lesson.id, completed);
    if (lesson.exam) {
      const controls = document.querySelector('.controls'); if (controls) controls.style.display = 'none';
      const notes = document.querySelector('.notes'); if (notes) notes.style.display = 'none';
    } else {
      setupControls(idx);
      setupCompletion(lesson, completed);
      setupNotes(lesson.id);
    }
    setYear();
    setupBack();
    setupHome();
  });
})();
