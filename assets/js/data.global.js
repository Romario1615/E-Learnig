// Versión global para uso sin servidor (file://)
// Expone window.COURSE
(function () {
  // Helper para videos de YouTube
  const YT = (id) => `https://www.youtube.com/embed/${id}`;

  // Helper para videos de OneDrive
  // Uso: ONEDRIVE("https://onedrive.live.com/embed?cid=ABC&resid=XYZ&authkey=DEF")
  // O simplemente pasa la URL completa de embed de OneDrive
  const ONEDRIVE = (url) => url;

  // Helper para videos locales (MP4/WEBM)
  // Uso: LOCAL("assets/videos/leccion-1.mp4")
  const LOCAL = (path) => path;

  /* ========================================
     EJEMPLOS DE USO:

     1. YouTube:
        video: YT("aircAruvnKk")

     2. OneDrive (Recomendado para tus propios videos):
        video: ONEDRIVE("https://onedrive.live.com/embed?cid=ABC&resid=XYZ&authkey=DEF")

        Para obtener la URL de OneDrive:
        - Sube tu video a OneDrive
        - Clic derecho → Insertar
        - Copia solo la URL del atributo src del iframe
        - O ve a ONEDRIVE_VIDEOS.md para instrucciones detalladas

     3. Video local:
        video: LOCAL("assets/videos/mi-leccion.mp4")
     ======================================== */

  const COURSE = {
    id: "mini-ia",
    name: "Mini E-Learning IA",
    lessons: [
      {
        id: "leccion-1",
        num: 1,
        title: "Qué es y qué no es IA",
        summary: "Definición, límites y diferencias entre IA débil y fuerte.",
        category: "fundamentos",
        durationMin: 10,
        tags: ["intro", "ia", "conceptos"],
        video: YT("1JcK6vFdv_Y"),
        explanation: `
          <p>La <strong>Inteligencia Artificial (IA)</strong> es como tener un asistente muy especializado: puede hacer tareas específicas increíblemente bien, pero no piensa como un humano.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Imagina un chef experto que solo sabe preparar pizza. Puede hacer las mejores pizzas del mundo, con ingredientes perfectos y técnicas impecables, pero si le pides que prepare sushi, no sabrá por dónde empezar. Así funciona la <em>IA débil</em>: excelente en su especialidad, pero limitada fuera de ella.</p>
          </div>

          <p>La <strong>IA débil</strong> (o IA estrecha) es lo que usamos hoy: sistemas diseñados para tareas específicas como reconocer rostros, traducir idiomas o recomendar películas. Son herramientas muy poderosas pero enfocadas.</p>

          <p>La <strong>IA fuerte</strong> (o IA general) sería como un humano: capaz de aprender cualquier tarea, razonar, adaptarse y tener conciencia. <em>Esto todavía no existe</em> y es tema de investigación y debate.</p>
        `,
        tools: [
          { name: "ChatGPT", description: "Asistente conversacional de OpenAI para múltiples tareas", url: "https://chat.openai.com" },
          { name: "Claude", description: "IA conversacional de Anthropic, excelente para análisis", url: "https://claude.ai" },
          { name: "Google Gemini", description: "Modelo multimodal de Google", url: "https://gemini.google.com" }
        ],
        glossary: [
          { term: "IA (Inteligencia Artificial)", definition: "Sistemas que pueden realizar tareas que normalmente requieren inteligencia humana, como reconocimiento de patrones, toma de decisiones y comprensión del lenguaje." },
          { term: "IA Débil (Narrow AI)", definition: "Sistemas diseñados para realizar tareas específicas de manera excelente, pero sin capacidad de generalización. Es la IA que usamos actualmente." },
          { term: "IA Fuerte (General AI)", definition: "Hipotética inteligencia artificial que podría realizar cualquier tarea intelectual que un humano puede hacer. Aún no existe." },
          { term: "Machine Learning", definition: "Subcampo de la IA donde los sistemas aprenden de datos sin ser explícitamente programados para cada tarea." }
        ]
      },
      {
        id: "leccion-2",
        num: 2,
        title: "Prompting básico",
        summary: "Fundamentos de cómo comunicarte efectivamente con modelos de IA.",
        category: "prompting",
        durationMin: 12,
        tags: ["prompt", "básico", "comunicación"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>El <strong>prompting</strong> es el arte de comunicarte con la IA de manera clara y efectiva. Un buen prompt es como dar instrucciones precisas: mientras más específico seas, mejores resultados obtendrás.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Imagina que le pides a alguien que te traiga "algo de comer". Podrías recibir cualquier cosa: una manzana, pizza, o ensalada. Pero si dices "tráeme una pizza mediana de pepperoni con borde de queso", obtendrás exactamente lo que quieres. <em>Los prompts funcionan igual</em>: la especificidad es clave.</p>
          </div>

          <p><strong>Elementos de un buen prompt:</strong></p>
          <p>• <strong>Contexto:</strong> Explica el escenario o situación<br>
          • <strong>Tarea específica:</strong> Define qué quieres que haga la IA<br>
          • <strong>Formato deseado:</strong> Indica cómo quieres la respuesta<br>
          • <strong>Tono y estilo:</strong> Especifica el estilo de comunicación</p>

          <p><em>Ejemplo:</em> En lugar de "escribe un email", di "escribe un email formal de 150 palabras para solicitar una reunión con un cliente potencial, manteniendo un tono profesional pero cercano".</p>
        `,
        tools: [
          { name: "ChatGPT", description: "Modelo de lenguaje de OpenAI ideal para practicar prompts", url: "https://chat.openai.com" },
          { name: "PromptPerfect", description: "Optimiza automáticamente tus prompts", url: "https://promptperfect.jina.ai" },
          { name: "Anthropic Claude", description: "IA conversacional excelente para prompts complejos", url: "https://claude.ai" },
          { name: "Prompt Library", description: "Biblioteca de ejemplos de prompts efectivos", url: "https://www.mypromptlibrary.com" }
        ],
        glossary: [
          { term: "Prompt", definition: "Instrucción o pregunta que le das a un modelo de IA para obtener una respuesta específica." },
          { term: "Contexto", definition: "Información de fondo que ayuda a la IA a entender mejor tu solicitud y generar respuestas más relevantes." },
          { term: "Few-shot prompting", definition: "Técnica donde proporcionas ejemplos dentro del prompt para que la IA aprenda el patrón deseado." },
          { term: "Chain-of-thought", definition: "Método que pide a la IA que explique su razonamiento paso a paso para obtener mejores resultados." }
        ]
      },
      {
        id: "leccion-3",
        num: 3,
        title: "Prompts para WhatsApp/mostrador",
        summary: "Aplicación práctica de prompts en atención al cliente.",
        category: "prompting",
        durationMin: 8,
        tags: ["whatsapp", "atención", "cliente"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>Los <strong>prompts para atención al cliente</strong> te permiten automatizar respuestas coherentes, amables y útiles sin perder el toque humano.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como tener un manual de respuestas inteligente. Si en un restaurante cada mesero respondiera diferente a "¿tienen opciones vegetarianas?", sería caótico. Un buen prompt asegura que la IA responda <em>consistentemente</em> con el tono de tu marca, como si todos los empleados hubieran recibido la misma capacitación.</p>
          </div>

          <p><strong>Claves para prompts de atención:</strong></p>
          <p>• <strong>Define el rol:</strong> "Eres un asistente de atención al cliente de [empresa]"<br>
          • <strong>Establece el tono:</strong> Amable, profesional, empático<br>
          • <strong>Límites claros:</strong> Qué puede y no puede hacer<br>
          • <strong>Casos comunes:</strong> Instrucciones para consultas frecuentes</p>

          <p><em>Ejemplo práctico:</em> "Eres un asistente de [TiendaX]. Responde consultas sobre horarios, productos y envíos con tono amable. Si no sabes la respuesta, deriva al equipo humano."</p>
        `,
        tools: [
          { name: "ChatGPT API", description: "Integra ChatGPT en WhatsApp Business", url: "https://platform.openai.com" },
          { name: "Chatbot.com", description: "Plataforma para crear chatbots sin código", url: "https://www.chatbot.com" },
          { name: "ManyChat", description: "Automatización de mensajes para WhatsApp y redes", url: "https://manychat.com" },
          { name: "Tidio", description: "Chat en vivo con IA integrada", url: "https://www.tidio.com" }
        ],
        glossary: [
          { term: "Chatbot", definition: "Programa que simula conversaciones humanas para responder preguntas automáticamente." },
          { term: "Prompt del sistema", definition: "Instrucciones base que definen el comportamiento general de la IA en todas las conversaciones." },
          { term: "Fallback", definition: "Respuesta predeterminada cuando la IA no entiende o no puede responder una consulta." },
          { term: "Handoff", definition: "Transferencia de la conversación de la IA a un agente humano cuando es necesario." }
        ]
      },
      {
        id: "leccion-4",
        num: 4,
        title: "Transcripción y resumen de audios",
        summary: "Convertir audio a texto y generar resúmenes automáticos.",
        category: "multimedia",
        durationMin: 10,
        tags: ["audio", "transcripción", "resumen"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La <strong>transcripción automática</strong> convierte audio a texto en segundos, y la IA puede luego resumir lo más importante, ahorrándote horas de trabajo manual.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como tener un asistente que escucha por ti una reunión de 2 horas, toma notas detalladas de todo lo que se dijo, y luego te entrega un resumen de una página con los puntos clave. <em>Lo que antes tomaba horas, ahora toma minutos.</em></p>
          </div>

          <p><strong>Aplicaciones prácticas:</strong></p>
          <p>• <strong>Reuniones:</strong> Transcribe y resume calls o juntas<br>
          • <strong>Entrevistas:</strong> Convierte entrevistas en texto editable<br>
          • <strong>Mensajes de voz:</strong> Lee rápidamente audios largos<br>
          • <strong>Podcasts:</strong> Crea transcripciones para accesibilidad</p>

          <p><em>Ventaja empresarial:</em> Documenta decisiones importantes automáticamente y facilita búsqueda de información en archivos de audio.</p>
        `,
        tools: [
          { name: "Whisper (OpenAI)", description: "Modelo de transcripción de audio gratuito y preciso", url: "https://openai.com/research/whisper" },
          { name: "Otter.ai", description: "Transcripción en tiempo real con resumen automático", url: "https://otter.ai" },
          { name: "Descript", description: "Editor de audio/video basado en texto", url: "https://www.descript.com" },
          { name: "AssemblyAI", description: "API de transcripción con análisis de sentimientos", url: "https://www.assemblyai.com" }
        ],
        glossary: [
          { term: "Transcripción", definition: "Proceso de convertir audio hablado en texto escrito." },
          { term: "ASR (Automatic Speech Recognition)", definition: "Tecnología que reconoce y transcribe el habla humana automáticamente." },
          { term: "Timestamp", definition: "Marcadores de tiempo que indican cuándo se dijo cada frase en el audio." },
          { term: "Diarización", definition: "Identificación de quién habla en cada momento de una conversación." }
        ]
      },
      {
        id: "leccion-5",
        num: 5,
        title: "Mejora de redacción",
        summary: "Técnicas para mejorar textos con ayuda de IA.",
        category: "contenido",
        durationMin: 8,
        tags: ["redacción", "textos", "mejora"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La IA puede <strong>mejorar tu redacción</strong> corrigiendo errores, mejorando claridad, ajustando el tono y haciéndote sonar más profesional sin perder tu voz.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Piensa en la IA como un editor personal que revisa tu borrador. No escribe por ti, pero te dice "esta frase es confusa", "usa una palabra más precisa aquí", o "este párrafo es muy largo". Es como tener un <em>profesor de escritura disponible 24/7</em>.</p>
          </div>

          <p><strong>Tipos de mejora que ofrece:</strong></p>
          <p>• <strong>Gramática y ortografía:</strong> Corrige errores básicos<br>
          • <strong>Estilo:</strong> Sugiere frases más claras y concisas<br>
          • <strong>Tono:</strong> Ajusta formalidad según tu audiencia<br>
          • <strong>Estructura:</strong> Reorganiza ideas para mejor flujo</p>

          <p><em>Tip profesional:</em> Siempre revisa las sugerencias. La IA puede mejorar mucho, pero el criterio final es tuyo.</p>
        `,
        tools: [
          { name: "Grammarly", description: "Asistente de escritura con IA para gramática y estilo", url: "https://www.grammarly.com" },
          { name: "QuillBot", description: "Parafrasea y mejora textos manteniendo el significado", url: "https://quillbot.com" },
          { name: "Hemingway Editor", description: "Simplifica textos complejos y mejora legibilidad", url: "https://hemingwayapp.com" },
          { name: "ChatGPT", description: "Pide mejoras específicas de tono, claridad o estructura", url: "https://chat.openai.com" }
        ],
        glossary: [
          { term: "Parafraseo", definition: "Reescribir un texto manteniendo el mismo significado pero con palabras diferentes." },
          { term: "Tono", definition: "La actitud o emoción que transmite un texto (formal, casual, persuasivo, etc.)." },
          { term: "Legibilidad", definition: "Qué tan fácil es leer y entender un texto. Se mide con índices como Flesch-Kincaid." },
          { term: "Sintaxis", definition: "La estructura y orden de las palabras en las oraciones." }
        ]
      },
      {
        id: "leccion-6",
        num: 6,
        title: "ML sin programación (conceptos)",
        summary: "Introducción al Machine Learning sin necesidad de código.",
        category: "fundamentos",
        durationMin: 12,
        tags: ["ml", "machine-learning", "no-code"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>El <strong>Machine Learning (ML)</strong> permite que las computadoras aprendan patrones de datos. Y lo mejor: <em>ya no necesitas programar</em> para usarlo gracias a herramientas no-code.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como enseñar a un niño a reconocer frutas. No le explicas la química de cada fruta, simplemente le muestras manzanas, naranjas y plátanos hasta que aprende a distinguirlas. El <em>ML funciona igual</em>: le muestras ejemplos (datos) y el modelo aprende los patrones solo.</p>
          </div>

          <p><strong>Conceptos clave sin código:</strong></p>
          <p>• <strong>Entrenamiento:</strong> Mostrarle ejemplos al modelo<br>
          • <strong>Predicción:</strong> El modelo adivina basado en lo aprendido<br>
          • <strong>Precisión:</strong> Qué tan seguido acierta el modelo<br>
          • <strong>Datos de prueba:</strong> Ejemplos que nunca vio para evaluarlo</p>

          <p><em>Aplicación práctica:</em> Predecir ventas, clasificar emails, recomendar productos, detectar fraudes... todo sin escribir una línea de código.</p>
        `,
        tools: [
          { name: "Google Teachable Machine", description: "Crea modelos de ML arrastrando archivos (imágenes, sonidos, poses)", url: "https://teachablemachine.withgoogle.com" },
          { name: "Obviously AI", description: "Predicciones automáticas con hojas de cálculo", url: "https://www.obviously.ai" },
          { name: "Lobe (Microsoft)", description: "Entrena modelos de visión sin código", url: "https://www.lobe.ai" },
          { name: "CreateML (Apple)", description: "Crea modelos de ML para apps iOS sin programar", url: "https://developer.apple.com/machine-learning/create-ml/" }
        ],
        glossary: [
          { term: "Machine Learning", definition: "Campo de la IA donde los sistemas aprenden de datos sin ser programados explícitamente." },
          { term: "Dataset", definition: "Conjunto de datos usado para entrenar un modelo de ML." },
          { term: "Modelo", definition: "El resultado del entrenamiento: el sistema que hace predicciones." },
          { term: "Overfitting", definition: "Cuando un modelo memoriza los datos de entrenamiento pero falla con datos nuevos." },
          { term: "No-code ML", definition: "Plataformas que permiten crear modelos de ML usando interfaces visuales sin programar." }
        ]
      },
      {
        id: "leccion-7",
        num: 7,
        title: "Predicción de demanda (intro)",
        summary: "Cómo usar IA para predecir demanda y tendencias.",
        category: "aplicaciones",
        durationMin: 14,
        tags: ["predicción", "demanda", "análisis"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La <strong>predicción de demanda</strong> usa datos históricos para anticipar cuánto venderás en el futuro, ayudándote a tomar mejores decisiones de inventario y producción.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Imagina una heladería que vende más en verano y menos en invierno. Un vendedor experimentado ya sabe cuánto helado pedir cada mes. La IA hace lo mismo pero <em>analizando años de datos</em> y detectando patrones complejos: días festivos, clima, tendencias, promociones... todo a la vez.</p>
          </div>

          <p><strong>Qué puedes predecir:</strong></p>
          <p>• <strong>Ventas futuras:</strong> Por producto, categoría o tienda<br>
          • <strong>Temporalidad:</strong> Picos y valles de demanda<br>
          • <strong>Impacto de promociones:</strong> Cómo afectan las ofertas<br>
          • <strong>Tendencias:</strong> Productos en crecimiento o declive</p>

          <p><em>Beneficio empresarial:</em> Reduce costos de inventario, evita quiebres de stock y maximiza ingresos.</p>
        `,
        tools: [
          { name: "Google Analytics", description: "Predicción de tráfico y conversiones", url: "https://analytics.google.com" },
          { name: "Tableau", description: "Visualización y predicción de datos empresariales", url: "https://www.tableau.com" },
          { name: "Excel con IA", description: "Funciones de predicción integradas (FORECAST.ETS)", url: "https://www.microsoft.com/microsoft-365/excel" },
          { name: "MonkeyLearn", description: "Análisis de tendencias en feedback de clientes", url: "https://monkeylearn.com" }
        ],
        glossary: [
          { term: "Forecasting", definition: "Predicción de valores futuros basados en datos históricos." },
          { term: "Tendencia", definition: "Patrón general de crecimiento o declive en los datos a lo largo del tiempo." },
          { term: "Estacionalidad", definition: "Patrones que se repiten en períodos específicos (días, meses, años)." },
          { term: "Serie temporal", definition: "Secuencia de datos ordenados cronológicamente." }
        ]
      },
      {
        id: "leccion-8",
        num: 8,
        title: "Métricas simples",
        summary: "Evaluación básica de modelos y resultados.",
        category: "fundamentos",
        durationMin: 10,
        tags: ["métricas", "evaluación"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>Las <strong>métricas</strong> te dicen qué tan bien funciona un modelo de IA. Son como el reporte de calificaciones de la escuela: números que indican el rendimiento.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Imagina un juego de basketball. No basta con decir "jugó bien". Necesitas métricas: puntos anotados, precisión de tiros, asistencias. En IA es igual: <em>necesitas números concretos</em> para saber si tu modelo es "bueno" o necesita mejoras.</p>
          </div>

          <p><strong>Métricas básicas esenciales:</strong></p>
          <p>• <strong>Precisión (Accuracy):</strong> % de predicciones correctas<br>
          • <strong>Recall:</strong> % de casos positivos detectados<br>
          • <strong>F1-Score:</strong> Balance entre precisión y recall<br>
          • <strong>Error medio:</strong> Qué tan lejos están las predicciones</p>

          <p><em>Tip importante:</em> Una precisión del 95% suena genial, pero si tu modelo siempre dice "no hay fraude" en un banco donde solo el 1% de transacciones son fraudulentas, ¡ese 95% no significa nada!</p>
        `,
        tools: [
          { name: "Google Colab", description: "Notebooks gratuitos para calcular métricas", url: "https://colab.research.google.com" },
          { name: "Weights & Biases", description: "Seguimiento de experimentos y métricas de ML", url: "https://wandb.ai" },
          { name: "MLflow", description: "Plataforma para gestionar ciclo de vida de ML", url: "https://mlflow.org" },
          { name: "Scikit-learn Metrics", description: "Biblioteca Python con todas las métricas ML", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" }
        ],
        glossary: [
          { term: "Accuracy (Precisión)", definition: "Porcentaje de predicciones correctas del total." },
          { term: "Precision", definition: "De todas las predicciones positivas, cuántas fueron correctas." },
          { term: "Recall (Sensibilidad)", definition: "De todos los casos positivos reales, cuántos detectó el modelo." },
          { term: "F1-Score", definition: "Media armónica entre precision y recall. Útil cuando hay desbalance en los datos." },
          { term: "Matriz de confusión", definition: "Tabla que muestra aciertos y errores de clasificación del modelo." }
        ]
      },
      {
        id: "leccion-9",
        num: 9,
        title: "Gráficas desde planillas",
        summary: "Visualización de datos con ayuda de IA.",
        category: "aplicaciones",
        durationMin: 12,
        tags: ["gráficas", "visualización", "datos"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La IA puede <strong>crear visualizaciones automáticas</strong> de tus datos, sugiriendo el mejor tipo de gráfica y destacando insights importantes sin que sepas diseño.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como tener un diseñador experto que mira tus números y dice "estos datos se ven mejor en un gráfico de barras", "aquí hay una tendencia interesante", y "esta categoría destaca del resto". La IA hace el <em>trabajo visual pesado</em> para que tú solo interpretes.</p>
          </div>

          <p><strong>Qué puede hacer la IA:</strong></p>
          <p>• <strong>Sugerir gráficas:</strong> El tipo correcto para tus datos<br>
          • <strong>Detectar patrones:</strong> Correlaciones y anomalías<br>
          • <strong>Generar dashboards:</strong> Paneles visuales automáticos<br>
          • <strong>Crear narrativas:</strong> Explicar qué muestran los datos</p>

          <p><em>Caso de uso:</em> Subes tu Excel de ventas mensuales y la IA genera gráficas comparativas, identifica el mejor mes y predice la tendencia.</p>
        `,
        tools: [
          { name: "Microsoft Power BI", description: "Dashboards con análisis inteligente incorporado", url: "https://powerbi.microsoft.com" },
          { name: "Tableau", description: "Visualización de datos empresariales potenciada por IA", url: "https://www.tableau.com" },
          { name: "ChatGPT + Code Interpreter", description: "Genera gráficas desde archivos CSV/Excel", url: "https://chat.openai.com" },
          { name: "Google Data Studio", description: "Dashboards gratuitos con datos de Google Analytics", url: "https://datastudio.google.com" }
        ],
        glossary: [
          { term: "Visualización de datos", definition: "Representación gráfica de información para facilitar comprensión." },
          { term: "Dashboard", definition: "Panel que muestra múltiples visualizaciones y métricas clave en un solo lugar." },
          { term: "KPI (Key Performance Indicator)", definition: "Indicador clave de rendimiento que mide el éxito de un objetivo." },
          { term: "Correlación", definition: "Relación estadística entre dos variables. No implica causalidad." }
        ]
      },
      {
        id: "leccion-10",
        num: 10,
        title: "Descripción desde imagen",
        summary: "Análisis y descripción automática de imágenes.",
        category: "multimedia",
        durationMin: 10,
        tags: ["imágenes", "visión", "descripción"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La <strong>visión por computadora</strong> permite que la IA "vea" y describa imágenes: identifica objetos, personas, textos, emociones y mucho más.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como mostrarle una foto a un amigo y pedirle que la describa. Dirá "veo tres personas en una playa al atardecer, una está haciendo surf". La IA hace lo mismo pero <em>instantáneamente y a escala</em>: puede analizar miles de fotos en minutos.</p>
          </div>

          <p><strong>Aplicaciones prácticas:</strong></p>
          <p>• <strong>E-commerce:</strong> Describir productos automáticamente<br>
          • <strong>Accesibilidad:</strong> Texto alternativo para personas ciegas<br>
          • <strong>Moderación:</strong> Detectar contenido inapropiado<br>
          • <strong>Organización:</strong> Clasificar fotos por contenido</p>

          <p><em>Ejemplo real:</em> Subes fotos de tu tienda y la IA genera descripciones: "Zapatos deportivos negros Nike con suela blanca, talla 42".</p>
        `,
        tools: [
          { name: "Google Vision AI", description: "API de visión por computadora de Google", url: "https://cloud.google.com/vision" },
          { name: "ChatGPT Vision", description: "Analiza imágenes y responde preguntas sobre ellas", url: "https://chat.openai.com" },
          { name: "Claude (Anthropic)", description: "Soporta análisis de imágenes detallado", url: "https://claude.ai" },
          { name: "Microsoft Azure Computer Vision", description: "Reconocimiento de objetos, OCR y análisis facial", url: "https://azure.microsoft.com/services/cognitive-services/computer-vision/" }
        ],
        glossary: [
          { term: "Visión por computadora", definition: "Campo de la IA que permite a las máquinas interpretar y entender imágenes." },
          { term: "OCR (Optical Character Recognition)", definition: "Tecnología que extrae texto de imágenes." },
          { term: "Detección de objetos", definition: "Identificar y localizar objetos específicos dentro de una imagen." },
          { term: "Clasificación de imágenes", definition: "Asignar una categoría a una imagen completa." },
          { term: "Alt text", definition: "Descripción textual de imágenes para accesibilidad." }
        ]
      },
      {
        id: "leccion-11",
        num: 11,
        title: "SKU/OEM y sinonimia",
        summary: "Identificación y relación de productos similares.",
        category: "aplicaciones",
        durationMin: 8,
        tags: ["productos", "catalogación"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La IA puede <strong>identificar productos similares</strong> aunque tengan nombres diferentes, conectando SKUs, códigos OEM y sinónimos automáticamente.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como saber que "refresco", "gaseosa", "soda" y "bebida carbonatada" se refieren a lo mismo. La IA aprende que "iPhone 15 Pro", "A2848", "iPhone15,2" y "iPhone Fifteen Pro" son <em>el mismo producto</em> aunque se escriban diferente.</p>
          </div>

          <p><strong>Casos de uso empresarial:</strong></p>
          <p>• <strong>Unificar catálogos:</strong> Productos de múltiples proveedores<br>
          • <strong>Búsquedas inteligentes:</strong> Encuentra aunque escriban mal<br>
          • <strong>Comparación de precios:</strong> Mismo producto, distintos nombres<br>
          • <strong>Inventario:</strong> Evita duplicados en el sistema</p>

          <p><em>Ahorro real:</em> Reduce tiempo de catalogación manual de horas a minutos.</p>
        `,
        tools: [
          { name: "Algolia", description: "Búsqueda con IA que entiende sinónimos y typos", url: "https://www.algolia.com" },
          { name: "Elasticsearch", description: "Motor de búsqueda con análisis semántico", url: "https://www.elastic.co" },
          { name: "OpenAI Embeddings", description: "Encuentra similitud semántica entre textos", url: "https://platform.openai.com/docs/guides/embeddings" },
          { name: "DataRobot", description: "Matching automático de productos", url: "https://www.datarobot.com" }
        ],
        glossary: [
          { term: "SKU (Stock Keeping Unit)", definition: "Código único que identifica un producto específico en inventario." },
          { term: "OEM (Original Equipment Manufacturer)", definition: "Código del fabricante original del producto." },
          { term: "Sinonimia", definition: "Palabras diferentes que significan lo mismo." },
          { term: "Fuzzy matching", definition: "Búsqueda que tolera errores ortográficos y encuentra coincidencias aproximadas." },
          { term: "Embeddings", definition: "Representación numérica de palabras que captura su significado semántico." }
        ]
      },
      {
        id: "leccion-12",
        num: 12,
        title: "Edición rápida de fotos (móvil)",
        summary: "Herramientas de IA para edición fotográfica en dispositivos móviles.",
        category: "multimedia",
        durationMin: 10,
        tags: ["fotos", "edición", "móvil"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La IA en apps móviles te permite <strong>editar fotos profesionalmente</strong> en segundos: eliminar fondos, mejorar calidad, aplicar estilos y más, sin ser diseñador.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Antes necesitabas un estudio fotográfico y un editor experto. Ahora es como tener un <em>estudio completo en tu bolsillo</em>: tocas un botón y la IA elimina el fondo, otro botón y mejora la iluminación, otro y cambia el cielo. Magia tecnológica.</p>
          </div>

          <p><strong>Capacidades de IA móvil:</strong></p>
          <p>• <strong>Remover fondo:</strong> Aísla sujetos automáticamente<br>
          • <strong>Mejorar calidad:</strong> Aumenta resolución y nitidez<br>
          • <strong>Filtros inteligentes:</strong> Ajustes automáticos perfectos<br>
          • <strong>Retoques:</strong> Elimina imperfecciones con un toque</p>

          <p><em>Uso comercial:</em> Crea fotos de productos profesionales para e-commerce desde tu teléfono.</p>
        `,
        tools: [
          { name: "Remove.bg", description: "Elimina fondos automáticamente desde móvil", url: "https://www.remove.bg" },
          { name: "Photoleap", description: "Editor de fotos con IA generativa", url: "https://www.photoleapapp.com" },
          { name: "Remini", description: "Mejora calidad y resolución de fotos antiguas", url: "https://remini.ai" },
          { name: "Canva", description: "Diseño y edición con herramientas IA integradas", url: "https://www.canva.com" }
        ],
        glossary: [
          { term: "Background removal", definition: "Eliminación automática del fondo de una imagen." },
          { term: "Upscaling", definition: "Aumentar resolución de imagen manteniendo calidad usando IA." },
          { term: "Retoque", definition: "Modificaciones sutiles para mejorar apariencia de fotos." },
          { term: "Filtro", definition: "Efecto visual que se aplica sobre una imagen completa." },
          { term: "Segmentación", definition: "Separar diferentes elementos o regiones en una imagen." }
        ]
      },
      {
        id: "leccion-13",
        num: 13,
        title: "Microvideos promocionales (30-45 s)",
        summary: "Creación de contenido de video corto para marketing.",
        category: "contenido",
        durationMin: 12,
        tags: ["video", "marketing", "contenido"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>Los <strong>microvideos</strong> son el formato rey en redes sociales. La IA te ayuda a crearlos rápidamente: desde scripts hasta edición automática y subtítulos.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como tener una agencia de publicidad miniatura. Antes necesitabas guionista, camarógrafo y editor. Ahora la IA te ayuda: <em>genera ideas de contenido</em>, sugiere escenas, agrega música, corta clips y añade texto... todo en minutos.</p>
          </div>

          <p><strong>Proceso con IA:</strong></p>
          <p>• <strong>Generación de ideas:</strong> Pide a ChatGPT 10 ideas de videos<br>
          • <strong>Script automático:</strong> Guión de 30 segundos<br>
          • <strong>Edición IA:</strong> Cortes y transiciones automáticas<br>
          • <strong>Subtítulos:</strong> Transcripción y timing automático</p>

          <p><em>Plataformas ideales:</em> TikTok, Instagram Reels, YouTube Shorts, Facebook Stories.</p>
        `,
        tools: [
          { name: "CapCut", description: "Editor de video con IA: auto-cortes, efectos y música", url: "https://www.capcut.com" },
          { name: "Descript", description: "Edita video editando el texto transcrito", url: "https://www.descript.com" },
          { name: "Runway ML", description: "Generación y edición de video con IA generativa", url: "https://runwayml.com" },
          { name: "InVideo AI", description: "Crea videos desde prompts de texto", url: "https://invideo.io" }
        ],
        glossary: [
          { term: "Microvideo", definition: "Video corto de 15-60 segundos optimizado para redes sociales." },
          { term: "B-roll", definition: "Metraje secundario que complementa la escena principal." },
          { term: "Auto-captions", definition: "Subtítulos generados automáticamente por IA." },
          { term: "Jump cut", definition: "Corte rápido que elimina pausas y mantiene el ritmo dinámico." },
          { term: "Hook", definition: "Primeros 3 segundos del video diseñados para captar atención." }
        ]
      },
      {
        id: "leccion-14",
        num: 14,
        title: "Uso responsable de IA",
        summary: "Ética, sesgos y mejores prácticas en el uso de IA.",
        category: "fundamentos",
        durationMin: 10,
        tags: ["ética", "responsabilidad", "buenas-prácticas"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>El <strong>uso responsable de IA</strong> implica entender sus limitaciones, sesgos potenciales y el impacto de tus decisiones automatizadas en personas reales.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como manejar un auto potente. El auto te da velocidad y eficiencia, pero tú eres responsable de usarlo con cuidado, seguir las reglas y no dañar a otros. La IA es igual: <em>gran poder requiere gran responsabilidad</em>.</p>
          </div>

          <p><strong>Principios de uso responsable:</strong></p>
          <p>• <strong>Transparencia:</strong> Informa cuándo se usa IA<br>
          • <strong>Verificación:</strong> Revisa resultados antes de usarlos<br>
          • <strong>Privacidad:</strong> Protege datos sensibles<br>
          • <strong>No discriminación:</strong> Monitorea sesgos en resultados<br>
          • <strong>Supervisión humana:</strong> Decisiones finales las toma una persona</p>

          <p><em>Regla de oro:</em> Si el resultado afecta a personas (contratación, créditos, diagnósticos), siempre incluye revisión humana.</p>
        `,
        tools: [
          { name: "AI Ethics Guidelines (EU)", description: "Directrices europeas sobre IA ética", url: "https://digital-strategy.ec.europa.eu/en/policies/expert-group-ai" },
          { name: "Microsoft Responsible AI", description: "Framework de Microsoft para IA responsable", url: "https://www.microsoft.com/ai/responsible-ai" },
          { name: "Google AI Principles", description: "Principios de Google para desarrollo ético de IA", url: "https://ai.google/principles/" },
          { name: "OpenAI Usage Policies", description: "Políticas de uso aceptable de OpenAI", url: "https://openai.com/policies/usage-policies" }
        ],
        glossary: [
          { term: "Ética de IA", definition: "Conjunto de principios morales que guían el desarrollo y uso de inteligencia artificial." },
          { term: "Sesgo algorítmico", definition: "Preferencias injustas en los resultados de IA debido a datos o diseño sesgados." },
          { term: "Transparencia", definition: "Claridad sobre cómo funciona un sistema de IA y cuándo se usa." },
          { term: "Accountability", definition: "Responsabilidad de las personas y organizaciones por las decisiones tomadas por IA." },
          { term: "Fairness", definition: "Equidad en los resultados de IA para todos los grupos demográficos." }
        ]
      },
      {
        id: "leccion-15",
        num: 15,
        title: "Sesgos y verificación humana",
        summary: "Identificación de sesgos y la importancia de la supervisión humana.",
        category: "fundamentos",
        durationMin: 12,
        tags: ["sesgos", "verificación", "supervisión"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>Los <strong>sesgos en IA</strong> ocurren cuando los modelos reflejan prejuicios presentes en sus datos de entrenamiento. La verificación humana es esencial para detectarlos y corregirlos.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Si le enseñas a un niño solo con libros antiguos donde todos los médicos son hombres, pensará que las mujeres no pueden ser médicas. La IA aprende igual: <em>reproduce los sesgos</em> de sus datos. Por eso necesitamos humanos que revisen y corrijan.</p>
          </div>

          <p><strong>Tipos comunes de sesgos:</strong></p>
          <p>• <strong>Sesgo de datos:</strong> Datos de entrenamiento no representativos<br>
          • <strong>Sesgo de confirmación:</strong> El modelo refuerza estereotipos<br>
          • <strong>Sesgo de selección:</strong> Algunos grupos están subrepresentados<br>
          • <strong>Sesgo histórico:</strong> Perpetúa desigualdades del pasado</p>

          <p><em>Solución:</em> Siempre incluye revisión humana diversa en decisiones importantes y audita regularmente los resultados de tus sistemas de IA.</p>
        `,
        tools: [
          { name: "Fairlearn", description: "Herramientas de Microsoft para evaluar y mitigar sesgos", url: "https://fairlearn.org" },
          { name: "AI Fairness 360 (IBM)", description: "Kit de herramientas open source para detectar sesgos", url: "https://aif360.mybluemix.net" },
          { name: "Google What-If Tool", description: "Visualiza y analiza modelos de ML para detectar sesgos", url: "https://pair-code.github.io/what-if-tool/" },
          { name: "Aequitas", description: "Toolkit para auditar sesgos en sistemas de ML", url: "http://aequitas.dssg.io" }
        ],
        glossary: [
          { term: "Sesgo", definition: "Preferencia sistemática e injusta hacia o en contra de ciertos grupos." },
          { term: "Diversidad de datos", definition: "Representación equilibrada de diferentes grupos en los datos de entrenamiento." },
          { term: "Auditoría de IA", definition: "Revisión sistemática de un sistema de IA para detectar problemas éticos o de equidad." },
          { term: "Human-in-the-loop", definition: "Enfoque donde humanos supervisan y validan decisiones de IA." },
          { term: "Paridad demográfica", definition: "Principio de equidad donde todos los grupos reciben resultados positivos en igual proporción." }
        ]
      },
      {
        id: "leccion-16",
        num: 16,
        title: "Asistentes para reuniones",
        summary: "Herramientas de IA para optimizar y documentar reuniones.",
        category: "aplicaciones",
        durationMin: 8,
        tags: ["reuniones", "productividad"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>Los <strong>asistentes de IA para reuniones</strong> transcriben, resumen, extraen tareas y documentan decisiones automáticamente mientras tú te enfocas en la conversación.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Es como tener un asistente personal silencioso en cada junta. Mientras tú discutes y tomas decisiones, este asistente <em>toma notas perfectas</em>, identifica quién prometió qué, y te envía un resumen estructurado. Nunca más "¿qué decidimos sobre...?"</p>
          </div>

          <p><strong>Funciones de asistentes IA:</strong></p>
          <p>• <strong>Transcripción en tiempo real:</strong> Texto de todo lo hablado<br>
          • <strong>Resumen ejecutivo:</strong> Puntos clave y decisiones<br>
          • <strong>Extracción de tareas:</strong> Lista de to-dos automática<br>
          • <strong>Búsqueda:</strong> Encuentra rápido temas de reuniones pasadas</p>

          <p><em>Productividad:</em> Reduce tiempo de documentación de 30 minutos a 2 minutos por reunión.</p>
        `,
        tools: [
          { name: "Otter.ai", description: "Transcripción y resumen de reuniones en tiempo real", url: "https://otter.ai" },
          { name: "Fireflies.ai", description: "Asistente que se une a tus calls y documenta todo", url: "https://fireflies.ai" },
          { name: "Fathom", description: "Graba, transcribe y resume reuniones de Zoom", url: "https://fathom.video" },
          { name: "Microsoft Teams Premium", description: "Resúmenes inteligentes y recap de reuniones", url: "https://www.microsoft.com/microsoft-teams" }
        ],
        glossary: [
          { term: "Transcripción", definition: "Conversión de audio hablado a texto escrito." },
          { term: "Action items", definition: "Tareas específicas asignadas durante una reunión." },
          { term: "Meeting minutes", definition: "Acta o resumen oficial de lo discutido y decidido en una reunión." },
          { term: "Speaker diarization", definition: "Identificación automática de quién habla en cada momento." },
          { term: "Recap", definition: "Resumen ejecutivo de los puntos principales de una reunión." }
        ]
      },
      {
        id: "leccion-17",
        num: 17,
        title: "IA generativa hoy",
        summary: "Estado actual y tendencias de la IA generativa.",
        category: "fundamentos",
        durationMin: 14,
        tags: ["generativa", "tendencias", "actualidad"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La <strong>IA generativa</strong> crea contenido nuevo (texto, imágenes, audio, video, código) que antes solo humanos podían crear. Estamos en medio de una revolución creativa.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Imagina una máquina que <em>no solo copia</em> arte existente, sino que crea obras originales. Es como tener un colaborador creativo infinito: le describes una idea y la materializa. Desde logos hasta canciones completas, la IA generativa es el <em>asistente creativo del siglo 21</em>.</p>
          </div>

          <p><strong>Capacidades actuales:</strong></p>
          <p>• <strong>Texto:</strong> Artículos, código, scripts, emails<br>
          • <strong>Imágenes:</strong> Diseños, ilustraciones, fotos sintéticas<br>
          • <strong>Audio:</strong> Música, voces, efectos de sonido<br>
          • <strong>Video:</strong> Clips generados desde descripciones<br>
          • <strong>3D:</strong> Modelos tridimensionales para juegos/metaverso</p>

          <p><em>Tendencia 2024:</em> Modelos multimodales que combinan todo: texto+imagen+audio en un solo sistema.</p>
        `,
        tools: [
          { name: "ChatGPT", description: "Generación de texto conversacional y creativo", url: "https://chat.openai.com" },
          { name: "DALL-E 3", description: "Generación de imágenes desde descripciones", url: "https://openai.com/dall-e-3" },
          { name: "Midjourney", description: "Arte e ilustraciones de alta calidad con IA", url: "https://www.midjourney.com" },
          { name: "ElevenLabs", description: "Generación de voces ultra-realistas", url: "https://elevenlabs.io" },
          { name: "Runway Gen-2", description: "Generación de video con IA", url: "https://runwayml.com" }
        ],
        glossary: [
          { term: "IA Generativa", definition: "Modelos de IA que crean contenido nuevo en lugar de solo analizar o clasificar." },
          { term: "Prompt engineering", definition: "Habilidad de escribir instrucciones efectivas para modelos generativos." },
          { term: "Difusión", definition: "Técnica de ML que genera imágenes refinándolas gradualmente desde ruido." },
          { term: "LLM (Large Language Model)", definition: "Modelo de lenguaje masivo entrenado con billones de palabras." },
          { term: "Multimodal", definition: "Modelo que trabaja con múltiples tipos de datos (texto, imagen, audio, etc.)." }
        ]
      },
      {
        id: "leccion-18",
        num: 18,
        title: "Computación cuántica (intro)",
        summary: "Introducción a la computación cuántica y su relación con IA.",
        category: "fundamentos",
        durationMin: 12,
        tags: ["cuántica", "futuro"],
        video: YT("aircAruvnKk"),
        explanation: `
          <p>La <strong>computación cuántica</strong> usa principios de física cuántica para resolver problemas que las computadoras tradicionales tardarían millones de años en resolver.</p>

          <div class="analogy-box">
            <strong>💡 Analogía</strong>
            <p>Una computadora normal es como buscar la salida de un laberinto probando cada camino uno por uno. Una computadora cuántica <em>explora todos los caminos simultáneamente</em>. Es como tener millones de versiones paralelas de ti mismo probando cada opción al mismo tiempo.</p>
          </div>

          <p><strong>Qué hace especial a la computación cuántica:</strong></p>
          <p>• <strong>Superposición:</strong> Un qubit puede ser 0 y 1 al mismo tiempo<br>
          • <strong>Entrelazamiento:</strong> Qubits conectados instantáneamente<br>
          • <strong>Paralelismo:</strong> Procesa millones de posibilidades a la vez<br>
          • <strong>Velocidad:</strong> Resuelve ciertos problemas exponencialmente más rápido</p>

          <p><em>Impacto en IA:</em> Acelerará entrenamiento de modelos gigantes, optimización y descubrimiento de nuevos materiales/medicinas.</p>

          <p><strong>Nota:</strong> Aún está en etapas tempranas. La mayoría de empresas no la necesitan hoy, pero es importante conocer el futuro.</p>
        `,
        tools: [
          { name: "IBM Quantum Experience", description: "Acceso gratuito a computadoras cuánticas reales en la nube", url: "https://quantum-computing.ibm.com" },
          { name: "Google Quantum AI", description: "Investigación y herramientas de Google en computación cuántica", url: "https://quantumai.google" },
          { name: "Microsoft Azure Quantum", description: "Plataforma cloud para desarrollo cuántico", url: "https://azure.microsoft.com/solutions/quantum-computing/" },
          { name: "Qiskit", description: "Framework open source de IBM para programación cuántica", url: "https://qiskit.org" }
        ],
        glossary: [
          { term: "Qubit", definition: "Unidad básica de información cuántica (análogo cuántico del bit clásico)." },
          { term: "Superposición", definition: "Propiedad cuántica donde una partícula existe en múltiples estados simultáneamente." },
          { term: "Entrelazamiento", definition: "Fenómeno donde dos qubits están correlacionados instantáneamente sin importar la distancia." },
          { term: "Supremacía cuántica", definition: "Punto donde una computadora cuántica resuelve un problema imposible para computadoras clásicas." },
          { term: "Algoritmo cuántico", definition: "Procedimiento específicamente diseñado para ejecutarse en computadoras cuánticas." }
        ]
      },
      { id: "examen-final", num: 19, title: "Examen final", summary: "Responde el examen para obtener tu certificado.", category: "evaluacion", durationMin: 20, tags: ["examen", "certificado"], exam: true },
    ],
  };
  window.COURSE = COURSE;
})();
