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
    // Banco completo de preguntas (4 por cada lección = 72 total)
    const questionBank=[
      // Lección 1: Qué es y qué no es IA
      { t:'¿Qué caracteriza a la IA débil?', o:['Tiene consciencia propia','Está diseñada para tareas específicas','Puede resolver cualquier problema','Tiene emociones reales'], a:1 },
      { t:'La IA fuerte (o IA general):', o:['Ya existe y se usa diariamente','Todavía no existe','Es menos poderosa que la débil','Solo funciona en smartphones'], a:1 },
      { t:'Un ejemplo de IA débil es:', o:['Un robot con consciencia','Sistema de reconocimiento facial','Una persona inteligente','Un cerebro humano artificial'], a:1 },
      { t:'¿Qué puede hacer bien la IA actual?', o:['Tener emociones reales','Tareas específicas como traducir','Razonar como humanos','Tener conciencia propia'], a:1 },

      // Lección 2: Prompting básico
      { t:'En prompting básico, ¿qué es lo más importante?', o:['Usar muchas palabras','Ser específico y claro','Usar emojis','Escribir en mayúsculas'], a:1 },
      { t:'Un elemento clave de un buen prompt es:', o:['Ser ambiguo','Definir la tarea específica','Usar lenguaje complicado','Escribir poco'], a:1 },
      { t:'¿Por qué es importante el contexto en un prompt?', o:['No es importante','Ayuda a la IA a entender mejor','Solo decora el mensaje','Confunde a la IA'], a:1 },
      { t:'Un buen prompt debe incluir:', o:['Solo palabras técnicas','Contexto, tarea, formato y tono','Muchos emojis','Texto en mayúsculas'], a:1 },

      // Lección 3: Prompts para WhatsApp/mostrador
      { t:'¿Para qué sirve un prompt en atención al cliente?', o:['Decorar mensajes','Automatizar respuestas coherentes','Enviar spam','Crear imágenes'], a:1 },
      { t:'Al crear prompts de atención al cliente, debes:', o:['Ignorar el tono','Definir el rol y límites claros','Usar lenguaje informal siempre','No especificar nada'], a:1 },
      { t:'Un prompt de atención debe establecer:', o:['Solo respuestas técnicas','Tono, límites y casos comunes','Respuestas agresivas','Información confidencial'], a:1 },
      { t:'¿Qué debe hacer la IA si no sabe una respuesta?', o:['Inventar información','Derivar al equipo humano','Ignorar al cliente','Cerrar la conversación'], a:1 },

      // Lección 4: Transcripción y resumen de audios
      { t:'La transcripción de audio convierte:', o:['Audio a texto','Texto a audio','Imágenes a video','Video a imágenes'], a:0 },
      { t:'¿Qué ventaja ofrece la transcripción automática?', o:['Es más cara','Ahorra horas de trabajo manual','Solo funciona en inglés','Requiere equipos especiales'], a:1 },
      { t:'La IA puede usar transcripciones para:', o:['Solo guardarlas','Generar resúmenes automáticos','Borrar el audio','Traducir a emojis'], a:1 },
      { t:'Un caso de uso de transcripción es:', o:['Lavar ropa','Documentar reuniones importantes','Cocinar','Hacer ejercicio'], a:1 },

      // Lección 5: Mejora de redacción
      { t:'¿Qué puede hacer la IA en mejora de redacción?', o:['Solo corregir ortografía','Mejorar estilo y claridad','Eliminar todo el texto','Traducir a emojis'], a:1 },
      { t:'La IA puede ajustar el tono de un texto para:', o:['Confundir al lector','Adaptarlo a la audiencia','Hacerlo ilegible','Agregar errores'], a:1 },
      { t:'¿Quién debe tomar la decisión final sobre el texto?', o:['Solo la IA','El usuario humano','Nadie','Un programa automático'], a:1 },
      { t:'La IA ayuda en redacción al:', o:['Escribir todo por ti','Sugerir mejoras de claridad','Borrar tus ideas','Complicar el texto'], a:1 },

      // Lección 6: ML sin programación (conceptos)
      { t:'ML sin programación se refiere a:', o:['No usar computadoras','Herramientas no-code para ML','Machine Learning manual','Escribir código a mano'], a:1 },
      { t:'En ML, el entrenamiento significa:', o:['Ejercicio físico','Mostrar ejemplos al modelo','Borrar datos','Apagar la computadora'], a:1 },
      { t:'¿Qué es un dataset en ML?', o:['Un juego de datos','Conjunto de datos para entrenar','Una computadora','Un tipo de robot'], a:1 },
      { t:'La precisión de un modelo indica:', o:['Su tamaño','Qué tan seguido acierta','Su color','Su precio'], a:1 },

      // Lección 7: Predicción de demanda
      { t:'¿Qué permite la predicción de demanda?', o:['Adivinar el futuro','Anticipar tendencias de ventas','Crear productos','Borrar datos'], a:1 },
      { t:'La predicción de demanda usa:', o:['Magia','Datos históricos y patrones','Solo intuición','Números aleatorios'], a:1 },
      { t:'Un beneficio de predecir demanda es:', o:['Aumentar costos','Reducir quiebres de stock','Complicar inventario','Vender menos'], a:1 },
      { t:'¿Qué puede detectar la IA en predicción?', o:['Solo números','Patrones de temporalidad','Colores','Sonidos'], a:1 },

      // Lección 8: Métricas simples
      { t:'Las métricas en IA sirven para:', o:['Decorar reportes','Evaluar rendimiento de modelos','Aumentar costos','Complicar procesos'], a:1 },
      { t:'¿Qué mide la accuracy (precisión)?', o:['El tamaño del modelo','% de predicciones correctas','La velocidad','El color'], a:1 },
      { t:'El F1-Score es útil cuando:', o:['No importa nada','Hay desbalance en los datos','Sobran recursos','Solo hay un dato'], a:1 },
      { t:'¿Por qué 95% de precisión puede ser engañoso?', o:['Nunca lo es','Depende del contexto y balance de datos','Siempre es perfecto','Es un número mágico'], a:1 },

      // Lección 9: Gráficas desde planillas
      { t:'¿Qué ventaja tiene generar gráficas con IA?', o:['Son más coloridas','Automatiza la visualización de datos','Usa más papel','Solo funciona en tablets'], a:1 },
      { t:'La IA puede sugerir:', o:['Solo colores','El mejor tipo de gráfica para tus datos','Números aleatorios','Borrar datos'], a:1 },
      { t:'Un dashboard es:', o:['Un tablero de auto','Panel con múltiples visualizaciones','Una aplicación de música','Un tipo de gráfica'], a:1 },
      { t:'¿Qué puede detectar la IA en datos?', o:['Solo errores','Correlaciones y anomalías','Colores','Sentimientos'], a:1 },

      // Lección 10: Descripción desde imagen
      { t:'La descripción desde imagen usa:', o:['Modelos de visión por computadora','Solo texto','Audífonos','Teclados especiales'], a:0 },
      { t:'La visión por computadora permite:', o:['Mejorar la vista humana','Que la IA identifique objetos en imágenes','Crear anteojos','Limpiar pantallas'], a:1 },
      { t:'Un caso de uso de visión IA es:', o:['Cocinar','Generar descripciones de productos','Planchar','Conducir sin auto'], a:1 },
      { t:'OCR significa:', o:['Ordenar Colores Rápido','Reconocimiento óptico de caracteres','Optimizar Computadoras Rápidas','Organizar Código Real'], a:1 },

      // Lección 11: SKU/OEM y sinonimia
      { t:'SKU/OEM se relaciona con:', o:['Códigos de productos','Recetas de cocina','Música','Deportes'], a:0 },
      { t:'La IA puede identificar productos aunque:', o:['Sean invisibles','Tengan nombres diferentes','No existan','Sean líquidos'], a:1 },
      { t:'Sinonimia se refiere a:', o:['Palabras inventadas','Palabras diferentes con mismo significado','Códigos secretos','Números primos'], a:1 },
      { t:'¿Para qué sirve unificar catálogos?', o:['Complicar ventas','Evitar duplicados de productos','Aumentar precios','Borrar información'], a:1 },

      // Lección 12: Edición rápida de fotos (móvil)
      { t:'¿Qué permiten las herramientas de edición de fotos con IA?', o:['Solo filtros básicos','Mejoras automáticas inteligentes','Borrar la cámara','Imprimir en 3D'], a:1 },
      { t:'La IA puede eliminar fondos:', o:['Solo en computadoras grandes','Automáticamente desde móvil','Nunca','Solo con Photoshop'], a:1 },
      { t:'Upscaling con IA significa:', o:['Subir escaleras','Aumentar resolución manteniendo calidad','Bajar calidad','Borrar imágenes'], a:1 },
      { t:'¿Qué puedes hacer con fotos desde tu móvil?', o:['Solo verlas','Crear fotos profesionales para e-commerce','Nada','Solo borrarlas'], a:1 },

      // Lección 13: Microvideos promocionales
      { t:'Los microvideos promocionales suelen durar:', o:['2 horas','30-45 segundos','10 minutos','Todo el día'], a:1 },
      { t:'La IA puede ayudar a crear videos con:', o:['Solo ideas','Scripts, edición y subtítulos automáticos','Cámaras físicas','Actores reales'], a:1 },
      { t:'El hook de un video es:', o:['Un anzuelo de pesca','Los primeros 3 segundos para captar atención','El final','La música de fondo'], a:1 },
      { t:'Plataformas ideales para microvideos son:', o:['Solo televisión','TikTok, Instagram Reels, YouTube Shorts','Radio','Periódicos'], a:1 },

      // Lección 14: Uso responsable de IA
      { t:'El uso responsable de IA implica:', o:['Usarla sin límites','Considerar ética y sesgos','Ignorar consecuencias','Solo pensar en ganancias'], a:1 },
      { t:'¿Qué principio es clave en IA responsable?', o:['Ocultar que se usa IA','Transparencia e informar su uso','Mentir sobre resultados','Ignorar errores'], a:1 },
      { t:'En decisiones que afectan personas debes:', o:['Confiar solo en IA','Incluir revisión humana','Automatizar todo','Ignorar impactos'], a:1 },
      { t:'¿Qué debes hacer antes de usar resultados de IA?', o:['Publicarlos inmediatamente','Verificarlos y revisarlos','Ignorarlos','Borrarlos'], a:1 },

      // Lección 15: Sesgos y verificación humana
      { t:'¿Por qué es importante la verificación humana?', o:['Es innecesaria','La IA puede tener sesgos y errores','Solo para perder tiempo','Para complicar procesos'], a:1 },
      { t:'Un sesgo en IA es:', o:['Un error de hardware','Preferencia injusta en los datos o modelo','Un tipo de computadora','Una métrica de velocidad'], a:1 },
      { t:'¿De dónde provienen los sesgos en IA?', o:['De la electricidad','De datos de entrenamiento no representativos','Del color de la computadora','De la marca'], a:1 },
      { t:'Human-in-the-loop significa:', o:['Personas en círculo','Humanos supervisan y validan decisiones de IA','Solo robots','Computadoras solas'], a:1 },

      // Lección 16: Asistentes para reuniones
      { t:'Los asistentes para reuniones pueden:', o:['Solo tomar fotos','Transcribir y resumir reuniones','Preparar café','Limpiar la sala'], a:1 },
      { t:'¿Qué extraen automáticamente estos asistentes?', o:['Café','Tareas y decisiones','Papeles','Sillas'], a:1 },
      { t:'Action items son:', o:['Acciones de película','Tareas específicas asignadas en reunión','Juegos','Deportes'], a:1 },
      { t:'¿Cuánto tiempo ahorran en documentación?', o:['Ninguno','De 30 minutos a 2 minutos por reunión','Horas extra','Todo el día'], a:1 },

      // Lección 17: IA generativa hoy
      { t:'La IA generativa puede crear:', o:['Solo números','Texto, imágenes, audio y video','Solo emails','Únicamente código'], a:1 },
      { t:'¿Qué es un LLM?', o:['Un juego','Modelo de lenguaje masivo','Una computadora pequeña','Un robot'], a:1 },
      { t:'Modelos multimodales combinan:', o:['Solo texto','Texto, imagen, audio en un sistema','Solo imágenes','Solo números'], a:1 },
      { t:'La IA generativa es útil para:', o:['Solo borrar archivos','Crear contenido original nuevo','Hacer café','Limpiar pantallas'], a:1 },

      // Lección 18: Computación cuántica
      { t:'¿Qué es la computación cuántica?', o:['Computadoras muy pequeñas','Procesamiento basado en qubits','Internet rápido','Un videojuego'], a:1 },
      { t:'Un qubit puede estar:', o:['Solo en 0','Solo en 1','En 0 y 1 simultáneamente','Apagado siempre'], a:2 },
      { t:'La computación cuántica explorará:', o:['Solo un camino','Múltiples caminos simultáneamente','Ningún camino','Caminos pasados'], a:1 },
      { t:'¿Cuál es el estado actual de computación cuántica?', o:['Tecnología madura y común','En etapas tempranas de desarrollo','No existe','Solo en ciencia ficción'], a:1 },
    ];
    // Seleccionar 10 preguntas aleatorias
    const shuffled = questionBank.sort(() => Math.random() - 0.5);
    const q = shuffled.slice(0, 10);
    const TOTAL_SECONDS = 10*60; // 10 minutos
    let startTime = null;
    let remaining = TOTAL_SECONDS;
    let locked = false;
    let started = false;

    // Pantalla inicial - solo nombre y botón iniciar
    wrap.innerHTML=`
      <div class="exam">
        <div id="exam-start-screen" style="text-align:center; padding:40px 20px;">
          <h2 style="margin:0 0 16px; font-size:32px;">Examen Final</h2>
          <p style="color:var(--muted); margin:0 0 24px; font-size:18px;">Antes de comenzar, por favor ingresa tu nombre completo</p>
          <div style="max-width:500px; margin:0 auto 24px;">
            <label style="display:block; text-align:left; margin-bottom:8px; font-weight:600;">Nombre completo</label>
            <input id="exam-name" type="text" placeholder="Ej: Juan Pérez González" style="width:100%; padding:14px; border-radius:12px; border:1px solid #1d2a3a; background:#0e151f; color:var(--text); font-size:16px;">
          </div>
          <div style="background:rgba(255,255,255,0.05); border:1px solid #1d2a3a; border-radius:12px; padding:20px; margin:0 auto 24px; max-width:500px;">
            <h3 style="margin:0 0 12px; font-size:18px;">Instrucciones</h3>
            <ul style="text-align:left; color:var(--muted); line-height:1.8; margin:0; padding-left:20px;">
              <li>El examen consta de 10 preguntas de selección múltiple</li>
              <li>Tienes <strong style="color:var(--primary);">10 minutos</strong> para completarlo</li>
              <li>Necesitas <strong style="color:var(--primary);">70%</strong> o más para aprobar</li>
              <li>Las preguntas son seleccionadas aleatoriamente</li>
              <li>Una vez iniciado, el tiempo no se puede pausar</li>
            </ul>
          </div>
          <button id="btn-start" class="btn btn-success" style="padding:14px 32px; font-size:18px;" disabled>Iniciar Examen</button>
        </div>
        <div id="exam-questions-screen" style="display:none;">
          <div class="row space-between wrap" style="gap:10px; align-items:center; margin-bottom:20px; padding:16px; background:rgba(255,255,255,0.05); border-radius:12px; border:1px solid #1d2a3a;">
            <div>
              <h3 style="margin:0; font-size:20px;">Examen en progreso</h3>
              <p id="exam-participant" style="margin:4px 0 0; color:var(--muted); font-size:14px;"></p>
            </div>
            <div class="row gap" style="align-items:center;">
              <span style="color:var(--muted); font-size:14px;">Tiempo restante:</span>
              <div class="exam-timer" id="exam-timer" aria-live="polite" style="font-size:24px; font-weight:800;">10:00</div>
            </div>
          </div>
          <form id="exam-form" class="exam-form"></form>
          <div class="exam-actions row gap" style="margin-top:20px;">
            <button id="btn-grade" class="btn btn-primary" style="padding:12px 24px;">Enviar examen</button>
            <small id="exam-status" class="muted"></small>
          </div>
          <div id="cert-block" class="cert-block" style="display:none; margin-top:20px; padding:20px; background:rgba(0,255,163,0.1); border:1px solid rgba(0,255,163,0.3); border-radius:12px;">
            <h3 style="margin:0 0 12px; color:var(--success);">¡Felicitaciones! Has aprobado el examen</h3>
            <p style="margin:0 0 16px; color:var(--muted);">Ahora puedes generar tu certificado de finalización del curso</p>
            <button id="btn-show-cert" class="btn btn-success">Generar Certificado</button>
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

    const startScreen = wrap.querySelector('#exam-start-screen');
    const questionsScreen = wrap.querySelector('#exam-questions-screen');
    const form = wrap.querySelector('#exam-form');
    const status = wrap.querySelector('#exam-status');
    const startBtn = wrap.querySelector('#btn-start');
    const nameInput = wrap.querySelector('#exam-name');
    const timerEl = wrap.querySelector('#exam-timer');
    const participantEl = wrap.querySelector('#exam-participant');

    function disableExam(){ locked = true; form.querySelectorAll('input').forEach(el=>el.disabled=true); const btn=wrap.querySelector('#btn-grade'); if(btn) btn.disabled=true; }
    function fmt(sec){ const m=String(Math.floor(sec/60)).padStart(2,'0'); const s=String(sec%60).padStart(2,'0'); return `${m}:${s}`; }

    // Enable start only if name present
    function toggleStart(){ startBtn.disabled = !((nameInput.value||'').trim()); }
    toggleStart();
    nameInput.addEventListener('input', toggleStart);

    let t = null;
    const tick = () => { if (locked || !started) return; remaining--; if (timerEl) timerEl.textContent = fmt(Math.max(remaining,0)); if (remaining<=0){ disableExam(); grade(true); } else { t = setTimeout(tick, 1000); } };

    startBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      if (started) return;
      const name = (nameInput.value||'').trim();
      if (!name) { alert('Por favor, escribe tu nombre completo'); return; }

      // Generar preguntas
      form.innerHTML=q.map((qq,idx)=>{
        const qname=`q${idx}`;
        return `<fieldset class="exam-q"><legend>${idx+1}. ${qq.t}</legend>${qq.o.map((opt,i)=>`<label class="row gap"><input type="radio" name="${qname}" value="${i}"><span>${opt}</span></label>`).join('')}</fieldset>`;
      }).join('');

      // Cambiar a pantalla de preguntas
      startScreen.style.display = 'none';
      questionsScreen.style.display = 'block';
      participantEl.textContent = `Participante: ${name}`;

      // Iniciar timer
      started = true;
      startTime = Date.now();
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

    wrap.querySelector('#btn-show-cert').addEventListener('click', async (e)=>{
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
      const dataURL = await buildCertificatePNG({
        name,
        institute: 'Instituto Tecnológico Superior Japón',
        course: 'Introducción práctica a la Inteligencia Artificial',
        usedSec: totalSec,
        date: d,
        code: genCode(name, d),
        score: pct,
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

    async function buildCertificatePNG({ name, institute, course, usedSec, date, code, score }){
      const W = 1400, H = 900; const canvas = document.createElement('canvas'); canvas.width=W; canvas.height=H; const ctx = canvas.getContext('2d');

      // Background - Gradiente moderno
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#0a0e27');
      bgGrad.addColorStop(1, '#1a1f3a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Elementos geométricos decorativos
      ctx.globalAlpha = 0.1;
      // Círculo superior derecha
      const circGrad1 = ctx.createRadialGradient(W-100, 100, 0, W-100, 100, 300);
      circGrad1.addColorStop(0, '#00e5ff');
      circGrad1.addColorStop(1, 'transparent');
      ctx.fillStyle = circGrad1;
      ctx.fillRect(0, 0, W, H);

      // Círculo inferior izquierda
      const circGrad2 = ctx.createRadialGradient(100, H-100, 0, 100, H-100, 300);
      circGrad2.addColorStop(0, '#2563eb');
      circGrad2.addColorStop(1, 'transparent');
      ctx.fillStyle = circGrad2;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1.0;

      // Panel central con glassmorphism
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      const panelPadding = 80;
      ctx.fillRect(panelPadding, panelPadding, W - panelPadding*2, H - panelPadding*2);
      ctx.strokeRect(panelPadding, panelPadding, W - panelPadding*2, H - panelPadding*2);

      // Línea decorativa superior con gradiente
      const lineGrad = ctx.createLinearGradient(150, 130, W-150, 130);
      lineGrad.addColorStop(0, 'transparent');
      lineGrad.addColorStop(0.2, '#00e5ff');
      lineGrad.addColorStop(0.5, '#00ffa3');
      lineGrad.addColorStop(0.8, '#2563eb');
      lineGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(150, 130);
      ctx.lineTo(W-150, 130);
      ctx.stroke();

      // Institute - Header
      ctx.fillStyle = '#e8edf4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.font = '600 24px Arial, sans-serif';
      ctx.fillText(institute, W/2, 110);

      // Title con gradiente
      ctx.font = '800 70px Arial, sans-serif';
      const titleGrad = ctx.createLinearGradient(W/2 - 400, 200, W/2 + 400, 200);
      titleGrad.addColorStop(0, '#00e5ff');
      titleGrad.addColorStop(0.5, '#00ffa3');
      titleGrad.addColorStop(1, '#00e5ff');
      ctx.fillStyle = titleGrad;
      ctx.fillText('CERTIFICADO DE', W/2, 200);
      ctx.fillText('PARTICIPACIÓN', W/2, 270);

      // Línea decorativa inferior del título
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(W/2 - 300, 290);
      ctx.lineTo(W/2 + 300, 290);
      ctx.stroke();

      // Texto "Se certifica que"
      ctx.font = '400 26px Arial, sans-serif';
      ctx.fillStyle = '#9aa5b8';
      ctx.fillText('Se certifica que', W/2, 360);

      // Nombre del participante - Destacado
      ctx.font = '800 56px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(name.toUpperCase(), W/2, 440);

      // Línea bajo el nombre
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W/2 - 350, 460);
      ctx.lineTo(W/2 + 350, 460);
      ctx.stroke();

      // Texto participación
      ctx.font = '400 26px Arial, sans-serif';
      ctx.fillStyle = '#9aa5b8';
      ctx.fillText('ha participado exitosamente en el curso', W/2, 520);

      // Nombre del curso
      ctx.font = '700 38px Arial, sans-serif';
      ctx.fillStyle = '#e8edf4';
      ctx.fillText(course, W/2, 580);

      // Box con detalles
      ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
      ctx.lineWidth = 2;
      const boxY = 620;
      const boxH = 80;
      ctx.fillRect(200, boxY, W-400, boxH);
      ctx.strokeRect(200, boxY, W-400, boxH);

      // Tiempo de dedicación
      const totalMin = Math.floor(usedSec/60);
      const hh = Math.floor(totalMin/60);
      const mm = totalMin%60;
      const timeStr = hh ? `${hh}h ${String(mm).padStart(2,'0')}m` : `${mm}m`;
      ctx.font = '600 24px Arial, sans-serif';
      ctx.fillStyle = '#00ffa3';
      ctx.fillText(`⏱ Tiempo de dedicación: ${timeStr}`, W/2, boxY + 50);

      // Footer
      ctx.font = '700 26px Arial, sans-serif';
      ctx.fillStyle = '#00e5ff';
      ctx.fillText('AI LEARNING', W/2, 760);

      // Código y fecha
      ctx.font = '400 20px Arial, sans-serif';
      ctx.fillStyle = '#6b7a8f';
      ctx.fillText(`Código: ${code}`, W/2, 800);
      ctx.fillText(date.toLocaleDateString('es-ES', {year:'numeric', month:'long', day:'numeric'}), W/2, 830);

      // Puntos decorativos en las esquinas
      const drawCornerDot = (x, y) => {
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCornerDot(panelPadding + 20, panelPadding + 20);
      drawCornerDot(W - panelPadding - 20, panelPadding + 20);
      drawCornerDot(panelPadding + 20, H - panelPadding - 20);
      drawCornerDot(W - panelPadding - 20, H - panelPadding - 20);

      return canvas.toDataURL('image/png');
    }
  }
  function renderPlayer(lesson){
    if(lesson && lesson.exam){ renderExam(); return; }
    const wrap=document.getElementById('video-wrapper');
    if(!wrap) return;
    const url=lesson.video||'';

    // YouTube videos
    if(url.includes('youtube.com')||url.includes('youtu.be')){
      wrap.innerHTML=`<iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${lesson.title}" style="width:100%;height:100%;border:0;"></iframe>`;
    }
    // OneDrive videos
    else if(url.includes('onedrive.live.com')||url.includes('1drv.ms')){
      wrap.innerHTML=`<iframe src="${url}" frameborder="0" allowfullscreen title="${lesson.title}" style="width:100%;height:100%;border:0;"></iframe>`;
    }
    // Local videos (MP4/WEBM)
    else if(url.endsWith('.mp4')||url.endsWith('.webm')){
      wrap.innerHTML=`<video controls src="${url}" style="width:100%;height:100%;"></video>`;
    }
    // No video
    else {
      wrap.innerHTML='<div class="row center" style="height:100%;justify-content:center;">Sin video definido</div>';
    }
  }
  function renderInfo(lesson, idx){ const title=document.getElementById('title'); const summary=document.getElementById('summary'); const breadcrumb=document.getElementById('breadcrumb'); if(title) title.textContent=`${lesson.num}. ${lesson.title}`; if(summary) summary.textContent=lesson.summary||''; if(breadcrumb) breadcrumb.textContent=`Lección ${lesson.num} de ${COURSE.lessons.length} • ${lesson.category}`; }
  function renderPlaylist(activeId, completed){ const aside=document.getElementById('playlist'); if(!aside) return; aside.innerHTML=COURSE.lessons.map(l=>{ const href=`lesson.html?id=${encodeURIComponent(l.id)}`; const active=l.id===activeId?'active':''; const done=completed[l.id]?'done':''; return `<a class="item ${active}" href="${href}"><span class="num">${l.num}.</span><span class="name">${l.title}</span><span class="dur">${l.durationMin}m</span><span class="check ${done}" aria-hidden="true"></span></a>`; }).join(''); }
  function navigateTo(idx){ const target=COURSE.lessons[idx]; if(!target) return; const url=new URL(window.location.href); url.searchParams.set('id', target.id); window.location.href=url.toString(); }
  function setupControls(idx){ const prevBtn=document.getElementById('btn-prev'); const nextBtn=document.getElementById('btn-next'); if(prevBtn){ prevBtn.disabled = idx<=0; prevBtn.addEventListener('click', ()=>navigateTo(idx-1)); } if(nextBtn){ nextBtn.disabled = idx>=COURSE.lessons.length-1; nextBtn.addEventListener('click', ()=>navigateTo(idx+1)); } }
  function setupCompletion(lesson, completed){ const btn=document.getElementById('btn-complete'); if(!btn) return; function setLabel(){ btn.textContent= completed[lesson.id] ? 'Marcar como pendiente' : 'Marcar como completada'; } setLabel(); btn.addEventListener('click', ()=>{ if(completed[lesson.id]) delete completed[lesson.id]; else completed[lesson.id]=true; writeCompleted(completed); setLabel(); renderPlaylist(lesson.id, completed); }); }
  function setupNotes(lessonId){ const textarea=document.getElementById('notes'); const clearBtn=document.getElementById('btn-clear-notes'); const status=document.getElementById('notes-status'); if(!textarea) return; const key=LS_NOTES_PREFIX+lessonId; textarea.value=localStorage.getItem(key)||''; let t; function setSaved(){ if(status) status.textContent='Guardado'; } function setSaving(){ if(status) status.textContent='Guardando…'; } textarea.addEventListener('input', ()=>{ setSaving(); clearTimeout(t); t=setTimeout(()=>{ localStorage.setItem(key, textarea.value); setSaved(); }, 400); }); if(clearBtn){ clearBtn.addEventListener('click', ()=>{ textarea.value=''; localStorage.removeItem(key); setSaved(); }); } setSaved(); }

  function renderLessonContent(lesson) {
    // Renderizar explicación
    const explanationEl = document.getElementById('content-explanation');
    if (explanationEl && lesson.explanation) {
      explanationEl.innerHTML = lesson.explanation;
    } else if (explanationEl) {
      const parent = document.getElementById('lesson-content');
      if (parent) parent.style.display = 'none';
    }

    // Renderizar herramientas
    const toolsListEl = document.getElementById('tools-list');
    if (toolsListEl && lesson.tools && lesson.tools.length > 0) {
      toolsListEl.innerHTML = lesson.tools.map(tool => `
        <div class="tool-item">
          <div class="tool-info">
            <div class="tool-name">${tool.name}</div>
            <div class="tool-description">${tool.description}</div>
          </div>
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-link">Visitar</a>
        </div>
      `).join('');
    } else if (toolsListEl) {
      const parent = document.getElementById('ai-tools');
      if (parent) parent.style.display = 'none';
    }

    // Renderizar glosario
    const glossaryEl = document.getElementById('glossary-terms');
    if (glossaryEl && lesson.glossary && lesson.glossary.length > 0) {
      glossaryEl.innerHTML = lesson.glossary.map(item => `
        <div class="glossary-item">
          <span class="glossary-term">${item.term}</span>
          <p class="glossary-definition">${item.definition}</p>
        </div>
      `).join('');
    } else if (glossaryEl) {
      const parent = document.getElementById('glossary');
      if (parent) parent.style.display = 'none';
    }
  }

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
      const lessonContent = document.querySelector('.lesson-content'); if (lessonContent) lessonContent.style.display = 'none';
      const aiTools = document.querySelector('.ai-tools'); if (aiTools) aiTools.style.display = 'none';
      const glossary = document.querySelector('.glossary'); if (glossary) glossary.style.display = 'none';
    } else {
      setupControls(idx);
      setupCompletion(lesson, completed);
      setupNotes(lesson.id);
      renderLessonContent(lesson);
    }
    setYear();
    setupBack();
    setupHome();
  });
})();
