// Versión global para uso sin servidor (file://)
// Expone window.COURSE
(function () {
  const YT = (id) => `https://www.youtube.com/embed/${id}`;
  const COURSE = {
    id: "mini-ia",
    name: "Mini E-Learning IA",
    lessons: [
      { id: "leccion-1", num: 1, title: "Introducción a la IA", summary: "Panorama general, casos de uso y límites actuales.", category: "basics", durationMin: 8, tags: ["intro", "ia", "conceptos"], video: YT("weREZImevmA") },
      { id: "leccion-2", num: 2, title: "Tipos de modelos", summary: "LLMs, visión, audio y cómo combinarlos.", category: "basics", durationMin: 12, tags: ["modelos", "llm", "visión", "audio"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-3", num: 3, title: "Fundamentos de prompting", summary: "Roles, contexto y salidas estructuradas.", category: "prompting", durationMin: 10, tags: ["prompt", "contexto", "estructura"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-4", num: 4, title: "Patrones de prompting", summary: "Ejemplos de cadenas, plantillas y few-shot.", category: "prompting", durationMin: 12, tags: ["patrones", "few-shot"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-5", num: 5, title: "Estructuras de prompts", summary: "Separadores, formato y validación de entradas.", category: "prompting", durationMin: 12, tags: ["formato", "validación"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-6", num: 6, title: "Razonamiento paso a paso", summary: "CoT, verificación y auto-corrección.", category: "prompting", durationMin: 10, tags: ["razonamiento", "cot"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-7", num: 7, title: "Recuperación de contexto (RAG)", summary: "Indexado, embeddings y chunking efectivo.", category: "aplicaciones", durationMin: 12, tags: ["rag", "embeddings", "chunks"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-8", num: 8, title: "Agentes y herramientas", summary: "Funciones, herramientas y planificación.", category: "aplicaciones", durationMin: 12, tags: ["agentes", "tools"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-9", num: 9, title: "Automatización con APIs", summary: "Integraciones y flujos serverless.", category: "aplicaciones", durationMin: 14, tags: ["api", "serverless", "integraciones"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-10", num: 10, title: "Generación de imágenes", summary: "Prompts visuales y variaciones.", category: "aplicaciones", durationMin: 10, tags: ["imágenes", "generación"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-11", num: 11, title: "Audio y transcripción", summary: "STT, TTS y edición básica.", category: "aplicaciones", durationMin: 10, tags: ["audio", "stt", "tts"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-12", num: 12, title: "Evaluación y pruebas", summary: "Métricas, golden sets y trazas.", category: "basics", durationMin: 12, tags: ["evaluación", "pruebas", "métricas"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-13", num: 13, title: "Ética y seguridad", summary: "Sesgos, privacidad y abuso.", category: "basics", durationMin: 10, tags: ["ética", "seguridad"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-14", num: 14, title: "Tu primer chatbot", summary: "Diseño de conversación y memoria.", category: "aplicaciones", durationMin: 14, tags: ["chatbot", "memoria"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-15", num: 15, title: "Flujos con Zapier/Make", summary: "Orquestación sin código con IA.", category: "aplicaciones", durationMin: 12, tags: ["automatización", "zapier", "make"], video: YT("dQw4w9WgXcQ") },
      { id: "leccion-16", num: 16, title: "Examen final", summary: "Responde el examen para obtener tu certificado.", category: "aplicaciones", durationMin: 15, tags: ["examen", "certificado"], exam: true },
    ],
  };
  window.COURSE = COURSE;
})();
