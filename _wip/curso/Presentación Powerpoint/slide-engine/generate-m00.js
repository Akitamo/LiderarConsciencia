// generate-m00.js — Módulo 0: El Momento que Nos Convoca
// Generates 29 slides matching Manus PPTX extraction exactly

const PptxGenJS = require("pptxgenjs");
const {
  slidePortada,
  slideHojaRuta,
  slideSeparador,
  slideContenido,
  slideDatoImpacto,
  slideEvidenceGrid,
  slideQuote,
  slideSecuencia,
  slideComparativa,
  slideReflexion,
  slideResumenCierre,
  slidePractica,
  slideRecorrido,
  slidePrincipios,
  slideClaim,
} = require("./engine");
const { addImagePlaceholder } = require("./components");
const { COLORS } = require("./tokens");

function generateM00() {
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Liderar con Consciencia";
  pres.title = "Módulo 0 — El Momento que Nos Convoca";

  // SLIDE 1 — Portada del módulo
  slidePortada(pres, {
    moduleNum: "0",
    moduleName: "APERTURA",
    title: "El Momento que\nNos Convoca",
    quote: "La consciencia se entrena, no se enseña",
    notes: "Dejemos que esta imagen hable por un momento. Es una invitación a reconocer el contexto que nos rodea, no como una abstracción, sino como algo que ya sentimos. Este módulo no es uno más; es el pórtico, el lugar donde situamos el contexto antes de iniciar nuestro trabajo interior. Cumple tres funciones clave: diagnosticar la realidad, explorar nuestras respuestas naturales y comprometernos con una forma diferente de estar. Este es el inicio de un arco que se cerrará al final del programa, presentando la metáfora del líder semilla que desarrollaremos a lo largo de nuestro viaje.",
  });

  // SLIDE 2 — Hoja de Ruta
  slideHojaRuta(pres, {
    tag: "Hoja de Ruta",
    title: "Estructura del módulo",
    blocks: [
      {
        num: "01",
        title: "Diagnóstico",
        desc: "La tormenta perfecta: cuatro fuerzas que convergen.",
      },
      {
        num: "02",
        title: "Transición",
        desc: "La tentación de la impotencia y las respuestas naturales.",
      },
      {
        num: "03",
        title: "Compromiso",
        desc: "El líder semilla: una elección consciente.",
      },
      {
        num: "04",
        title: "Mapa",
        desc: "El viaje de 7 módulos: del interior al sistema.",
      },
    ],
    pageNum: 2,
    totalPages: 29,
    notes: "Ahora que hemos sentido la atmósfera, veamos cómo navegaremos este módulo. Nuestra hoja de ruta es clara y estructurada para llevarnos desde el diagnóstico hasta el compromiso. Primero, haremos un diagnóstico de la 'tormenta perfecta' que enfrentamos, identificando las fuerzas convergentes. Luego, pasaremos a la transición, donde exploraremos las respuestas naturales que surgen ante la impotencia. Después, nos centraremos en el compromiso, definiendo qué significa ser un 'líder semilla'. Finalmente, trazaremos el mapa de los siete módulos, mostrando cómo este viaje nos llevará del interior al sistema.",
  });

  // SLIDE 3 — Separador Tema 01
  slideSeparador(pres, {
    num: "01",
    title: "La tormenta perfecta",
    subtitle: "¿Qué está pasando que hace liderar tan difícil?",
    pageNum: 3,
    totalPages: 29,
    notes: "Con esa estructura en mente, entramos de lleno en la primera parte: la tormenta perfecta. Aquí nos preguntaremos qué está sucediendo en el mundo que hace que liderar sea tan desafiante hoy. No se trata de una pregunta retórica, sino de una exploración profunda de las presiones y cambios que nos afectan a todos. Es crucial entender este panorama para poder liderar con consciencia. Ahora, vamos a profundizar en lo que significa liderar con consciencia en este entorno.",
  });

  // SLIDE 4 — Contenido: Apertura
  const slide4 = pres.addSlide();
  slide4.background = { fill: COLORS.cream };
  slide4.addNotes("Antes de sumergirnos en el trabajo personal, es fundamental que miremos el contexto en el que lideramos. No es información abstracta; es un reconocimiento de lo que probablemente ya experimentan. Este módulo es el punto de partida, el espacio donde establecemos el escenario antes de iniciar el trabajo interior. Nos ayuda a diagnosticar la realidad, entender nuestras reacciones y elegir un camino diferente. Y con esto, estamos listos para identificar las fuerzas que componen esta tormenta.");

  const components4 = require("./components");
  components4.addLogoLockup(slide4, "light");
  components4.addContentHeader(slide4, "Apertura", "¿Qué significa liderar con consciencia?");

  slide4.addText("Antes de empezar a trabajar sobre nosotros mismos, necesitamos mirar al contexto en el que estamos liderando. No como información abstracta, sino como un reconocimiento de lo que probablemente ya sientes.", {
    x: 0.60, y: 1.95,
    w: 8.80, h: 0.70,
    fontFace: "Montserrat", fontSize: 12,
    color: COLORS.textSecondary,
    valign: "top",
    lineSpacingMultiple: 1.5,
  });

  slide4.addText("Este módulo es el pórtico: el espacio donde situamos el contexto antes de empezar el trabajo interior.", {
    x: 0.60, y: 2.70,
    w: 8.80, h: 0.45,
    fontFace: "Montserrat", fontSize: 12,
    color: COLORS.textSecondary,
    valign: "top",
    lineSpacingMultiple: 1.5,
  });

  addImagePlaceholder(slide4, "img-m00-00-lider-ante-tormenta.png", 0.60, 3.30, 8.80, 1.20);

  components4.addPageNumber(slide4, 4, 29);

  // SLIDE 5 — Secuencia: Cuatro fuerzas convergentes
  const slide5 = slideSecuencia(pres, {
    tag: "Diagnóstico",
    title: "Cuatro fuerzas convergentes",
    steps: [
      {
        title: "Fragmentación digital",
        desc: "La atención profunda ha\ndesaparecido.\n47s de atención sostenida",
      },
      {
        title: "Crisis de legitimidad",
        desc: "Desconfianza estructural en el\nliderazgo.\n7 de cada 10 desconfían",
      },
      {
        title: "Irrupción de la IA",
        desc: "Obsolescencia acelerada de\nhabilidades.\n39% competencias cambiarán",
      },
      {
        title: "Epidemia de agotamiento",
        desc: "Estrés crónico como norma\nlaboral.\n82% en riesgo de burnout",
      },
    ],
    pageNum: 5,
    totalPages: 29,
    notes: "Aquí vemos las cuatro fuerzas que convergen, creando lo que llamamos la 'tormenta perfecta'. Lo realmente nuevo no es cada fuerza por separado, sino su interacción y convergencia. Tenemos la fragmentación digital, que ha reducido nuestra atención profunda a solo 47 segundos. Luego, la crisis de legitimidad, donde la desconfianza en el liderazgo es estructural, afectando el compromiso de los equipos. La irrupción de la IA acelera la obsolescencia de habilidades, cambiando el 39% de las competencias necesarias. Y finalmente, la epidemia de agotamiento, con el estrés crónico como norma laboral. Estas fuerzas no actúan de forma aislada, sino que se refuerzan mutuamente, creando un ciclo que exploraremos a continuación.",
  });

  const components5 = require("./components");
  components5.addInsightBox(slide5, "Lo nuevo no es cada fuerza. Lo nuevo es su convergencia.");

  // SLIDE 6 — Dato Impacto: 47 seg
  const slide6 = slideDatoImpacto(pres, {
    number: "47 seg",
    description: "de atención sostenida\nen una pantalla\n\nEn 2004 eran 2.5 minutos.\n Hemos perdido dos tercios de nuestra capacidad de foco.",
    source: "Gloria Mark, UC Irvine — Attention Span (2023)",
    dark: true,
    pageNum: 6,
    totalPages: 29,
    notes: "Aquí vemos un dato impactante: nuestra capacidad de atención sostenida en una pantalla ha caído drásticamente. En solo veinte años, hemos perdido dos tercios de nuestro foco. Esto no es solo una estadística; es una realidad que todos sentimos en nuestro día a día. Nos cuesta concentrarnos más que nunca. Y esto tiene implicaciones serias para cómo lideramos y cómo nos relacionamos con nuestros equipos. Esta fragmentación digital es una de las fuerzas que nos asedian.",
  });

  // Note: Manus had a decorative image here, but DatoImpacto slides use centered layout.
  // Image placeholder would overlap centered text. Omitted by design.

  // SLIDE 7 — Evidence Grid: Fragmentación digital
  slideEvidenceGrid(pres, {
    tag: "Evidencia",
    title: "Fragmentación digital",
    items: [
      {
        number: "47 seg",
        desc: "Promedio de atención sostenida en pantalla.",
        source: "Gloria Mark, UC Irvine (2023)",
      },
      {
        number: "25 min",
        desc: "Tiempo necesario para recuperar el foco tras una interrupción.",
        source: "Gloria Mark, UC Irvine (2023)",
      },
      {
        number: "6x",
        desc: "Velocidad a la que viajan las noticias falsas vs. la verdad.",
        source: "MIT (Vosoughi et al., 2018)",
      },
      {
        number: "39%",
        desc: "De las competencias laborales cambiarán para 2030.",
        source: "WEF Future of Jobs (2025)",
      },
    ],
    pageNum: 7,
    totalPages: 29,
    notes: "Continuando con la idea de la fragmentación, estos datos nos dan una imagen más clara de la realidad digital. No solo tenemos 47 segundos de atención, sino que recuperar el foco después de una interrupción nos lleva 25 minutos. Imaginen el impacto en la productividad y la calidad del trabajo. Además, las noticias falsas viajan mucho más rápido que la verdad, lo que complica aún más la toma de decisiones. Y el ritmo de cambio en las competencias laborales es vertiginoso. Esta es la realidad en la que operamos, y es crucial entenderla para poder adaptarnos.",
  });

  // SLIDE 8 — Dato Impacto: 70%
  slideDatoImpacto(pres, {
    number: "70%",
    description: "de la varianza en el compromiso de un equipo depende de su líder directo.",
    source: "Gallup, State of the Global Workplace (2025)",
    dark: true,
    pageNum: 8,
    totalPages: 29,
    notes: "En medio de toda esta fragmentación y cambio, hay un dato que nos devuelve al centro de nuestro impacto: el 70% de la varianza en el compromiso de un equipo depende de su líder directo. Este número es una declaración de su relevancia. No es una estadística abstracta; es una medida directa de la influencia que tienen. Su presencia, o ausencia, marca una diferencia radical en la experiencia de su equipo. Y esto nos lleva a la siguiente fuerza que nos afecta.",
  });

  // SLIDE 9 — Evidence Grid: Agotamiento global
  slideEvidenceGrid(pres, {
    tag: "Epidemia",
    title: "Agotamiento global",
    items: [
      {
        number: "82%",
        desc: "de los líderes están en riesgo de burnout.",
        source: "Microsoft Work Trend Index",
      },
      {
        number: "41%",
        desc: "de los empleados reportan \"renuncia silenciosa\".",
        source: "Gallup Global Report",
      },
      {
        number: "58%",
        desc: "siente estrés diario en el trabajo.",
        source: "State of the Global Workplace",
      },
      {
        number: "OMS:",
        desc: "\"El burnout ya no se clasifica como condición médica, sino como fenómeno ocupacional resultado de estrés crónico no gestionado.\"",
        source: "",
      },
    ],
    pageNum: 9,
    totalPages: 29,
    notes: "Y esta es la cuarta fuerza: el agotamiento global. Los líderes están en riesgo de burnout, muchos empleados experimentan la 'renuncia silenciosa' y el estrés diario es una constante. La OMS ya reconoce el burnout como un fenómeno ocupacional, no una condición médica. Esto no es una debilidad individual; es una epidemia que afecta a todos. Y este agotamiento no es un problema aislado.",
  });

  // SLIDE 10 — Contenido: Sistema
  const slide10 = pres.addSlide();
  slide10.background = { fill: COLORS.cream };
  slide10.addNotes("Porque no son cuatro problemas aislados; es un sistema que se refuerza mutuamente. La fragmentación digital nos agota, el agotamiento nos hace menos presentes, la falta de presencia genera desconfianza, y la desconfianza aumenta la necesidad de control. Es un ciclo vicioso. Pero la buena noticia es que este ciclo no se rompe con más información. Se rompe estando más presente. Y ese es el punto de partida de nuestro programa.");

  const components10 = require("./components");
  components10.addLogoLockup(slide10, "light");
  components10.addContentHeader(slide10, "Sistema", "No son cuatro problemas. Es un sistema.");

  slide10.addText("Se retroalimentan mutuamente:", {
    x: 0.60, y: 1.95,
    w: 8.80, h: 0.30,
    fontFace: "Montserrat", fontSize: 12, bold: true,
    color: COLORS.textSecondary,
  });

  const bullets10 = [
    "La fragmentación reduce la capacidad de foco.",
    "Sin foco, aumenta la reactividad y el estrés.",
    "La reactividad erosiona la calidad de la presencia.",
    "La mala presencia genera desconfianza en el equipo.",
    "La desconfianza aumenta la necesidad de control.",
  ];

  bullets10.forEach((bullet, i) => {
    slide10.addText("\u2022 " + bullet, {
      x: 0.70, y: 2.32 + i * 0.35,
      w: 4.10, h: 0.30,
      fontFace: "Montserrat", fontSize: 11,
      color: COLORS.textSecondary,
      valign: "top",
    });
  });

  addImagePlaceholder(slide10, "ppt-m00-01-ciclo-retroalimentacion.png", 5.00, 2.10, 4.40, 2.50);

  components10.addInsightBox(slide10, "El ciclo no se rompe informándose más. Se rompe estando más presente.");
  components10.addPageNumber(slide10, 10, 29);

  // SLIDE 11 — Quote: Byung-Chul Han
  slideQuote(pres, {
    quote: "Ahora uno se explota a sí mismo y cree que se está realizando.",
    author: "Byung-Chul Han",
    source: "La sociedad del cansancio (2010)",
    pageNum: 11,
    totalPages: 29,
    notes: "Esta cita de Byung-Chul Han nos golpea con una verdad incómoda: a menudo, nos autoexplotamos creyendo que estamos logrando algo. Es un reflejo de la sociedad del rendimiento que él describe, donde la presión por ser productivos nos lleva a un agotamiento disfrazado de realización. Nos invita a cuestionar si el esfuerzo constante realmente nos acerca a nuestros objetivos o si solo nos consume. Y esto nos lleva a la siguiente pregunta: ¿qué hacemos cuando nos sentimos impotentes ante esta realidad?",
  });

  // SLIDE 12 — Separador Tema 02
  slideSeparador(pres, {
    num: "02",
    title: "La tentación de la impotencia",
    subtitle: "¿Qué hacemos con la sensación de que no podemos hacer nada?",
    pageNum: 12,
    totalPages: 29,
    notes: "Después de reconocer la tormenta y la trampa de la autoexplotación, surge una pregunta fundamental: ¿qué hacemos con la sensación de que no podemos hacer nada? Esta es la tentación de la impotencia, un sentimiento que puede paralizarnos. Es fácil caer en la idea de que los problemas son demasiado grandes para nuestra influencia individual. Pero esta sensación, aunque natural, puede ser una trampa que nos impide actuar. Entonces, ¿cómo respondemos a esta tentación de la impotencia?",
  });

  // SLIDE 13 — Secuencia: Respuestas Naturales
  slideSecuencia(pres, {
    tag: "Respuestas Naturales",
    title: "Cuando el problema parece más grande que nosotros",
    steps: [
      {
        title: "Desconexión",
        desc: "\"Esto no va conmigo.\"\nProtege, pero aísla.",
      },
      {
        title: "Cinismo",
        desc: "\"No tiene sentido.\"\nSe siente como lucidez, pero paraliza.",
      },
      {
        title: "Agotamiento",
        desc: "\"Si me esfuerzo más, podré.\"\nParece compromiso, pero destruye.",
      },
    ],
    pageNum: 13,
    totalPages: 29,
    notes: "Ante esa sensación de impotencia, nuestra mente y cuerpo tienen tres respuestas naturales, casi automáticas. La desconexión nos protege del dolor, pero nos aísla de la realidad y de los demás. El cinismo, por su parte, nos da una falsa sensación de lucidez, pero nos paraliza, impidiéndonos actuar. Y el agotamiento, la respuesta que a menudo el sistema recompensa, parece compromiso, pero en realidad nos destruye. Estas respuestas, aunque buscan protegernos, tienen un coste muy alto. Y ese coste es la desconexión con nosotros mismos.",
  });

  // SLIDE 14 — Comparativa: Patrón Común
  const slide14 = slideComparativa(pres, {
    tag: "Patrón Común",
    title: "Nos separan de nuestros propios actos",
    left: {
      title: "Quién eres",
      items: [
        "Tus valores",
        "Tu intención",
        "Tu propósito",
      ],
    },
    right: {
      title: "Cómo lideras",
      items: [
        "Tus decisiones",
        "Tus reacciones",
        "Tu impacto real",
      ],
    },
    pageNum: 14,
    totalPages: 29,
    notes: "El patrón común en estas tres respuestas es que nos separan de nuestros propios actos. Perdemos la conexión entre quiénes somos, nuestros valores y nuestra intención, y cómo lideramos, nuestras decisiones y nuestro impacto real. No es que no sepamos liderar, es que no estamos presentes cuando lo hacemos. Esta desconexión es sutil, pero profunda, y nos impide alinear nuestro ser con nuestro hacer. Entonces, ¿cuál de estas respuestas resuena más contigo?",
  });

  const components14 = require("./components");
  components14.addInsightBox(slide14, "El problema no es que no sepamos liderar. Es que no estamos presentes cuando lo hacemos.");

  // SLIDE 15 — Reflexión
  const slide15 = slideReflexion(pres, {
    tag: "Reflexión",
    question: "¿Cuál de las tres respuestas reconoces más en ti últimamente?",
    subtitle: "Una pausa para la honestidad.",
    pageNum: 15,
    totalPages: 29,
    notes: "Ahora, les invito a una breve pausa para la honestidad. De las tres respuestas que hemos visto —la desconexión, el cinismo o el agotamiento— ¿cuál reconoces más en ti últimamente? No hay respuestas correctas o incorrectas, solo un espacio para la autoobservación. Esta reflexión es el primer paso para entender dónde estamos y cómo podemos empezar a cambiar. Y es el punto de partida para explorar una forma diferente de liderar.",
  });

  // Add options below subtitle
  slide15.addText("Desconexión", {
    x: 2.00, y: 4.40,
    w: 2.00, h: 0.30,
    fontFace: "Montserrat", fontSize: 11,
    color: COLORS.textDimmed, align: "center",
  });
  slide15.addText("Cinismo", {
    x: 4.00, y: 4.40,
    w: 2.00, h: 0.30,
    fontFace: "Montserrat", fontSize: 11,
    color: COLORS.textDimmed, align: "center",
  });
  slide15.addText("Agotamiento", {
    x: 6.00, y: 4.40,
    w: 2.00, h: 0.30,
    fontFace: "Montserrat", fontSize: 11,
    color: COLORS.textDimmed, align: "center",
  });

  // SLIDE 16 — Separador Tema 03
  slideSeparador(pres, {
    num: "03",
    title: "El líder semilla",
    subtitle: "¿Qué tipo de líder puedo ser en medio de esta tormenta?",
    pageNum: 16,
    totalPages: 29,
    notes: "Después de reflexionar sobre nuestras respuestas naturales, ahora nos preguntamos qué tipo de líder podemos ser en medio de esta tormenta. Este módulo introduce una metáfora central para nuestro programa: el líder semilla. Es una elección consciente sobre cómo queremos operar en un mundo complejo. No se trata de una aspiración lejana, sino de una decisión activa. Nos invita a pensar más allá de las reacciones automáticas. Ahora, exploremos la esencia de esta metáfora.",
  });

  // SLIDE 17 — Principios: La naturaleza de la semilla
  const slide17 = slidePrincipios(pres, {
    tag: "Metáfora",
    title: "La naturaleza de la semilla",
    items: [
      {
        title: "No elige el clima",
        desc: "Acepta las condiciones dadas sin resignación.",
      },
      {
        title: "Echa raíces",
        desc: "Trabaja en lo invisible antes de mostrar resultados.",
      },
      {
        title: "Transforma su entorno",
        desc: "Convierte lo que encuentra en nutriente.",
      },
      {
        title: "Crea condiciones",
        desc: "Su crecimiento facilita que otros también crezcan.",
      },
    ],
    pageNum: 17,
    totalPages: 29,
    notes: "Una semilla no elige el clima en el que le toca germinar, pero hace lo que está en su naturaleza. No controla la sequía ni la helada, pero echa raíces y crece. El líder semilla opera de la misma manera. Acepta las condiciones dadas sin resignación, trabajando en lo invisible antes de mostrar resultados. Su crecimiento facilita que otros también crezcan. Esta es la esencia de su impacto. Y esto nos lleva a definirlo con mayor claridad.",
  });

  addImagePlaceholder(slide17, "img-m00-03-semilla-bajo-tierra.png", 0.60, 4.80, 2.50, 0.60);

  // SLIDE 18 — Comparativa: Definición
  const slide18 = slideComparativa(pres, {
    tag: "Definición",
    title: "Lo que define al líder semilla",
    left: {
      title: "Lo que NO lo define",
      items: [
        "Conocimiento técnico",
        "Autoridad formal",
        "Resultados visibles inmediatos",
      ],
    },
    right: {
      title: "Lo que SÍ lo define",
      items: [
        "Calidad de su presencia",
        "Capacidad de no reaccionar automáticamente",
        "Poder sostener incertidumbre sin transmitir ansiedad",
        "Ver a las personas como personas, no como recursos",
      ],
    },
    pageNum: 18,
    totalPages: 29,
    notes: "En un mundo donde el conocimiento técnico caduca rápidamente, lo que define al líder semilla no es lo que sabe o su posición. La autoridad formal genera cumplimiento, no compromiso. Lo que realmente lo distingue es la calidad de su presencia. Es su capacidad de no reaccionar automáticamente, de sostener la incertidumbre sin transmitir ansiedad. Y, fundamentalmente, de ver a las personas como personas, no como recursos. El líder semilla ha descubierto que ser buena persona y buen profesional son la misma cosa. Pero, ¿qué capacidades exige esta forma de liderazgo?",
  });

  const components18 = require("./components");
  components18.addInsightBox(slide18, "El líder semilla no elige entre ser buena persona y ser buen profesional. Ha descubierto que son la misma cosa.");

  // SLIDE 19 — Principios: Nuevas Capacidades
  const slide19 = slidePrincipios(pres, {
    tag: "Nuevas Capacidades",
    title: "Lo que la tormenta exige",
    items: [
      {
        title: "Discernimiento",
        desc: "Ver lo que es, no lo que temes.",
      },
      {
        title: "Foco sostenido",
        desc: "Mantener la atención en medio del ruido.",
      },
      {
        title: "Lectura del presente",
        desc: "Entender el contexto antes de actuar.",
      },
      {
        title: "Espacio interior",
        desc: "Crear una pausa entre estímulo y respuesta.",
      },
      {
        title: "Humanidad",
        desc: "Conectar con el otro como persona, no como recurso.",
      },
    ],
    pageNum: 19,
    totalPages: 29,
    notes: "La tormenta que hemos descrito exige capacidades que van más allá de lo tradicional. Necesitamos discernimiento para ver la realidad tal cual es, no como la tememos. Un foco sostenido para mantener la atención en medio del ruido constante. Una lectura profunda del presente para entender el contexto antes de actuar. Y un espacio interior para crear una pausa entre el estímulo y la respuesta. Finalmente, la humanidad para conectar con el otro como persona. Estas no son habilidades blandas; son habilidades críticas y, lo más importante, son entrenables. Y aquí es donde la presencia se vuelve clave.",
  });

  const components19 = require("./components");
  components19.addInsightBox(slide19, "No son habilidades blandas. Son habilidades críticas —y entrenables.");

  // SLIDE 20 — Claim
  slideClaim(pres, {
    concept: "La presencia no es solo ética.\nEs eficacia.",
    definition: "Ve más, porque no está cegado por la prisa.\n Escucha mejor, porque no prepara su respuesta.\n Decide con precisión, porque observa lo que pasa.",
    subtext: "Liderar con Consciencia — El líder semilla",
    pageNum: 20,
    totalPages: 29,
    notes: "La presencia no es solo una cuestión ética; es una herramienta de eficacia. Un líder presente ve más, porque no está cegado por la prisa. Escucha mejor, porque no prepara su respuesta mientras el otro habla. Decide con más precisión, porque observa lo que pasa en lugar de confirmar lo que esperaba. Esta capacidad de estar plenamente en el momento le permite tomar mejores decisiones y leer las situaciones con mayor exactitud. Ahora, la pregunta clave es si estamos dispuestos a cultivar esta presencia.",
  });

  // SLIDE 21 — Reflexión
  slideReflexion(pres, {
    question: "¿Estás dispuesto a trabajar en ti mismo?",
    subtitle: "\"No hace falta una respuesta segura. Un sí tentativo es suficiente.\"",
    pageNum: 21,
    totalPages: 29,
    notes: "Ahora, después de todo lo que hemos visto, llega la pregunta central de este programa. Esta es la invitación que te hacemos. No necesitas una respuesta segura, ni un sí rotundo. Un sí tentativo, un sí con dudas, es más que suficiente para empezar este viaje. Si esa respuesta tiene algo de sí, entonces este camino tiene sentido para ti. Ahora, vamos a ver el mapa de este viaje.",
  });

  // SLIDE 22 — Separador Tema 04
  slideSeparador(pres, {
    num: "04",
    title: "El mapa del viaje",
    subtitle: "¿Qué voy a aprender y cómo se conecta todo?",
    pageNum: 22,
    totalPages: 29,
    notes: "Ya hemos planteado la pregunta clave. Ahora, vamos a desglosar cómo se estructura este programa. Es importante entender la lógica y la progresión de cada etapa. Este es el mapa que nos guiará a través de los próximos módulos.",
  });

  // SLIDE 23 — Contenido: Recorrido (tres fases)
  const slide23 = pres.addSlide();
  slide23.background = { fill: COLORS.cream };
  slide23.addNotes("Este viaje se organiza en tres fases claras, que van desde tu interior hacia el sistema. La primera fase, Consciencia Activada, se enfoca en ti mismo. No puedes aplicar la consciencia si no sabes de qué ser consciente. Luego, la Consciencia Aplicada te lleva a interactuar con tu equipo. Finalmente, la Consciencia Dirigida te permite impactar el sistema. El orden importa, porque cada fase construye sobre la anterior.");

  const components23 = require("./components");
  components23.addLogoLockup(slide23, "light");
  components23.addContentHeader(slide23, "Recorrido", "Tres fases: del interior al sistema");

  const phases = [
    { title: "Fase 1 (M1-M3)", subtitle: "Consciencia Activada", desc: "El líder consigo mismo." },
    { title: "Fase 2 (M4-M5)", subtitle: "Consciencia Aplicada", desc: "El líder con el equipo." },
    { title: "Fase 3 (M6-M7)", subtitle: "Consciencia Dirigida", desc: "El líder con el sistema." },
  ];

  phases.forEach((phase, i) => {
    const y = 1.88 + i * 0.90;
    slide23.addText(phase.title, {
      x: 0.60, y,
      w: 3.00, h: 0.25,
      fontFace: "Montserrat", fontSize: 11, bold: true,
      color: COLORS.coral,
    });
    slide23.addText(phase.subtitle, {
      x: 0.60, y: y + 0.25,
      w: 3.00, h: 0.25,
      fontFace: "Montserrat", fontSize: 13, bold: true,
      color: COLORS.midTeal,
    });
    slide23.addText(phase.desc, {
      x: 0.60, y: y + 0.50,
      w: 3.00, h: 0.25,
      fontFace: "Montserrat", fontSize: 11,
      color: COLORS.textSecondary,
    });
  });

  addImagePlaceholder(slide23, "graf-m00-04-tres-fases-v3.png", 4.50, 1.88, 4.50, 2.50);

  components23.addPageNumber(slide23, 23, 29);

  // SLIDE 24 — Recorrido: El viaje de 7 módulos
  slideRecorrido(pres, {
    tag: "Recorrido",
    title: "El viaje de 7 módulos",
    modules: [
      { num: 0, name: "El momento", desc: "" },
      { num: 1, name: "Lo que soy", desc: "" },
      { num: 2, name: "Cómo estoy", desc: "" },
      { num: 3, name: "Lo que pienso", desc: "" },
      { num: 4, name: "Lo que necesito", desc: "" },
      { num: 5, name: "Lo que necesitamos", desc: "" },
      { num: 6, name: "Lo que quiero", desc: "" },
      { num: 7, name: "Lo que está bien", desc: "" },
    ],
    phases: [
      { name: "Consciencia Activada", range: "M1-M3" },
      { name: "Consciencia Aplicada", range: "M4-M5" },
      { name: "Consciencia Dirigida", range: "M6-M7" },
    ],
    pageNum: 24,
    totalPages: 29,
    notes: "Aquí vemos el recorrido completo de los siete módulos, integrados en esas tres fases. Cada módulo tiene un propósito específico, una transformación que te invitamos a experimentar. No es solo entender, es entrenar. Este es un itinerario de transformación, no un conjunto de talleres sueltos. Y cada módulo incluye una práctica meditativa específica, diseñada para la competencia de liderazgo que estamos desarrollando. Ahora, veamos cómo se relaciona esto con la metáfora del líder semilla.",
  });

  // SLIDE 25 — Contenido: Arco del Programa
  const slide25 = pres.addSlide();
  slide25.background = { fill: COLORS.cream };
  slide25.addNotes("Esta es la metáfora del líder semilla, que hemos introducido al principio, y que se cierra al final del programa. Cada módulo desarrolla una capacidad clave, como la semilla que echa raíces, discierne la luz, o crea un ecosistema. La promesa del líder semilla se completa a medida que avanzamos. Cada paso te acerca a ser ese líder que no espera a que el sistema cambie, sino que actúa desde su propia naturaleza. Con esto, cerramos la introducción al programa.");

  const components25 = require("./components");
  components25.addLogoLockup(slide25, "light");
  components25.addContentHeader(slide25, "Arco del Programa", "La semilla y sus capacidades");

  const capacidades = [
    { m: "M1", cap: "Presencia", desc: "La semilla acepta su naturaleza y su lugar." },
    { m: "M2", cap: "Estabilidad", desc: "La semilla echa raíces para sostenerse." },
    { m: "M3", cap: "Discernimiento", desc: "La semilla distingue la luz de la oscuridad." },
    { m: "M4", cap: "Sostenibilidad", desc: "La semilla absorbe los nutrientes que necesita." },
    { m: "M5", cap: "Conexión", desc: "La semilla crea un ecosistema con otras." },
    { m: "M6", cap: "Voluntad", desc: "La semilla crece con fuerza hacia su propósito." },
    { m: "M7", cap: "Integridad", desc: "La semilla da fruto y completa su ciclo." },
  ];

  capacidades.forEach((item, i) => {
    const y = 1.88 + i * 0.42;
    slide25.addText(item.m, {
      x: 0.60, y,
      w: 0.50, h: 0.35,
      fontFace: "Montserrat", fontSize: 10, bold: true,
      color: COLORS.coral,
      valign: "middle",
    });
    slide25.addText(item.cap, {
      x: 1.20, y,
      w: 2.00, h: 0.35,
      fontFace: "Montserrat", fontSize: 11, bold: true,
      color: COLORS.midTeal,
      valign: "middle",
    });
    slide25.addText(item.desc, {
      x: 3.30, y,
      w: 5.50, h: 0.35,
      fontFace: "Montserrat", fontSize: 10,
      color: COLORS.textSecondary,
      valign: "middle",
    });
  });

  components25.addInsightBox(slide25, "La promesa del líder semilla se cierra al final del programa.");
  components25.addPageNumber(slide25, 25, 29);

  // SLIDE 26 — Resumen y Cierre
  slideResumenCierre(pres, {
    tag: "Resumen y Cierre",
    title: "Ideas clave del módulo",
    items: [
      {
        num: 1,
        title: "El agotamiento actual es sistémico, no un fallo individual.",
      },
      {
        num: 2,
        title: "Las defensas habituales (cinismo, desconexión) solo agravan el aislamiento.",
      },
      {
        num: 3,
        title: "El líder semilla transforma su entorno a través de la calidad de su presencia.",
      },
      {
        num: 4,
        title: "No necesitamos certezas para empezar, solo la intención de trabajar en nosotros mismos.",
      },
    ],
    pageNum: 26,
    totalPages: 29,
    notes: "Hemos recorrido un camino intenso en este módulo, y es importante destilar las ideas clave que nos llevamos. No se trata de memorizar, sino de integrar lo que hemos descubierto juntos. Primero, entendemos que el agotamiento que sentimos no es un fallo personal, sino una respuesta a un sistema complejo. Segundo, las formas en que solemos protegernos, como el cinismo o la desconexión, en realidad nos aíslan más. Tercero, la clave está en nuestra presencia: el líder semilla transforma su entorno simplemente por la calidad de cómo está. Y finalmente, no necesitamos tener todas las respuestas para empezar; solo la intención de trabajar en nosotros mismos. Estas ideas nos preparan para ver cómo este módulo nos transforma.",
  });

  // SLIDE 27 — Contenido: Transformación M0
  const slide27 = pres.addSlide();
  slide27.background = { fill: COLORS.cream };
  slide27.addNotes("Este módulo no es solo información; es una invitación a un cambio de perspectiva fundamental. Pasamos de sentirnos abrumados por la magnitud de la tormenta a reconocer nuestro poder. De la impotencia, a la certeza de que nuestra presencia es la primera y más poderosa herramienta de cambio. Es un giro de 180 grados en cómo nos posicionamos ante los desafíos. Y ahora, vamos a anclar esa certeza con una práctica.");

  const components27 = require("./components");
  components27.addLogoLockup(slide27, "light");

  // Tag only (no title for this transformation layout)
  slide27.addText("TRANSFORMACIÓN M0", {
    x: 0.60, y: 0.80,
    w: 8.80, h: 0.25,
    fontFace: "Montserrat", fontSize: 11, bold: true,
    color: COLORS.coral, charSpacing: 1.5,
    valign: "bottom",
  });

  slide27.addText("De:", {
    x: 0.60, y: 1.50,
    w: 1.00, h: 0.40,
    fontFace: "Montserrat", fontSize: 14, bold: true,
    color: COLORS.textSecondary,
  });

  slide27.addText("La sensación de impotencia ante la magnitud de la tormenta.", {
    x: 1.70, y: 1.50,
    w: 7.50, h: 0.40,
    fontFace: "Montserrat", fontSize: 13,
    color: COLORS.textSecondary,
    valign: "middle",
  });

  // Coral accent separator
  slide27.addShape("rect", {
    x: 0.60, y: 2.30,
    w: 8.80, h: 0.04,
    fill: { color: COLORS.coral },
  });

  slide27.addText("\u2192", {
    x: 4.60, y: 2.50,
    w: 0.80, h: 0.50,
    fontFace: "Montserrat", fontSize: 24,
    color: COLORS.coral,
    align: "center", valign: "middle",
  });

  slide27.addText("A:", {
    x: 0.60, y: 3.20,
    w: 1.00, h: 0.40,
    fontFace: "Montserrat", fontSize: 14, bold: true,
    color: COLORS.midTeal,
  });

  slide27.addText("La certeza de que nuestra presencia es la primera herramienta de cambio.", {
    x: 1.70, y: 3.20,
    w: 7.50, h: 0.40,
    fontFace: "Montserrat", fontSize: 13,
    color: COLORS.midTeal,
    valign: "middle",
    bold: true,
  });

  components27.addPageNumber(slide27, 27, 29);

  // SLIDE 28 — Práctica: Meditación de intención
  slidePractica(pres, {
    tag: "Práctica",
    title: "Meditación de intención",
    subtitle: "Conectar con el propósito de estar aquí.",
    duration: "~ 5 min",
    steps: [],
    pageNum: 28,
    totalPages: 29,
    notes: "Ahora, vamos a hacer nuestra primera práctica juntos, una meditación de intención. Es un momento para conectar con el propósito profundo de por qué estamos aquí. Cierren los ojos, tomen tres respiraciones profundas y permitan que su cuerpo se asiente. Traigan a su mente la razón por la que están aquí, lo que los trajo a este programa. No necesitan una respuesta elaborada, solo noten lo que surge. Luego, pregúntense: ¿Qué tipo de líder quiero ser? No qué quiero lograr, sino quién quiero ser en mi liderazgo. Establezcan una intención simple para este programa, una dirección, una cualidad que quieren cultivar. Guarden esa intención; volveremos a ella al final del programa. Cuando estén listos, abran los ojos. Esta intención es la semilla que vamos a plantar.",
  });

  // SLIDE 29 — Cierre final
  const slide29 = pres.addSlide();
  slide29.background = { fill: COLORS.darkTeal };
  slide29.addNotes("Las semillas no necesitan certezas para germinar; solo necesitan empezar. Este es el espíritu con el que cerramos este módulo. Han entrado por el pórtico, y ahora el camino se abre ante ustedes. En el Módulo 1, descubrirán que su mente no percibe la realidad, la construye, y que operan en piloto automático mucho más de lo que creen. La respuesta los sorprenderá. Nos vemos en el próximo módulo.");

  const components29 = require("./components");
  components29.addLogoLockup(slide29, "dark");

  slide29.addText("Las semillas no necesitan certezas para germinar", {
    x: 0.60, y: 1.80,
    w: 5.50, h: 0.80,
    fontFace: "Montserrat", fontSize: 24, bold: true,
    color: COLORS.white,
    valign: "top",
    lineSpacingMultiple: 1.2,
  });

  slide29.addText("Solo necesitan empezar.", {
    x: 0.60, y: 2.70,
    w: 5.50, h: 0.40,
    fontFace: "Montserrat", fontSize: 14,
    color: COLORS.textLight,
  });

  slide29.addShape("rect", {
    x: 0.60, y: 3.40,
    w: 5.50, h: 0.02,
    fill: { color: COLORS.coral },
  });

  slide29.addText("Siguiente paso", {
    x: 0.60, y: 3.55,
    w: 5.50, h: 0.25,
    fontFace: "Montserrat", fontSize: 11, bold: true,
    color: COLORS.textLight,
  });

  slide29.addText("Módulo 1: Lo que soy \u2192", {
    x: 0.60, y: 3.80,
    w: 5.50, h: 0.30,
    fontFace: "Montserrat", fontSize: 13, bold: true,
    color: COLORS.coral,
  });

  addImagePlaceholder(slide29, "img-m00-00-lider-semilla-brote.png", 6.50, 1.50, 2.80, 3.00);

  components29.addPageNumber(slide29, 29, 29, "dark");

  return pres;
}

// Generate and save
const pres = generateM00();
const path = require("path");
const outDir = path.resolve(__dirname, "../curso/Presentación Powerpoint/ppts CLAUDE CODE");
pres.writeFile({ fileName: path.join(outDir, "M00-El-Momento-que-Nos-Convoca.pptx") })
  .then(() => {
    console.log("✓ M00 presentation generated: M00-El-Momento-que-Nos-Convoca.pptx");
    console.log("  29 slides total");
  })
  .catch(err => console.error("Error generating M00:", err));

module.exports = { generateM00 };
