import React, { useState } from 'react';

// PALETA v5: Con transición coral → índigo
const colors = {
  // Principal: Índigo
  primary: '#4338CA',
  primaryDark: '#3730A3',
  primaryLight: '#6366F1',
  primaryMuted: '#E0E7FF',
  primarySubtle: '#EEF2FF',
  
  // Acento: Coral/Terracota
  accent: '#E07A5F',
  accentDark: '#C85A42',
  accentLight: '#F4A990',
  accentMuted: '#FEF2F0',
  
  // Transición coral → índigo (para logo y elementos de irradiación)
  blend1: '#C46B78',  // Coral oscuro / rosa
  blend2: '#A85D91',  // Rosa-violeta
  blend3: '#8B50AA',  // Violeta
  blend4: '#6E44C0',  // Violeta-índigo
  
  // Neutros cálidos
  white: '#FFFFFF',
  background: '#FDFCFB',
  backgroundAlt: '#F9F7F5',
  border: '#E8E4E0',
  
  // Textos
  textPrimary: '#1E1B2E',
  textSecondary: '#524D5F',
  textMuted: '#8C8697',
};

// ============================================
// SISTEMA DE ICONOGRAFÍA - 7 MÓDULOS
// ============================================
const ModuleIcons = {
  // M1: Cerebro - "Lo que soy"
  1: ({ size = 24, color = colors.primary }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4C11 4 7 8 7 13c0 3 1.5 5.5 4 7v8h10v-8c2.5-1.5 4-4 4-7 0-5-4-9-9-9z" 
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 15c0-2 2-4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 28h10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="13" r="2" fill={color} opacity="0.3"/>
    </svg>
  ),
  
  // M2: Cuerpo con pulso - "Cómo estoy"
  2: ({ size = 24, color = colors.primary }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="8" r="4" stroke={color} strokeWidth="2"/>
      <path d="M8 28v-6a8 8 0 0116 0v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 18h3l2-3 2 6 2-3h3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // M3: Corazón-mente - "Lo que pienso-siento"
  3: ({ size = 24, color = colors.primary }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 28l-9-9c-2.5-2.5-2.5-6.5 0-9s6.5-2.5 9 0c2.5-2.5 6.5-2.5 9 0s2.5 6.5 0 9l-9 9z" 
            stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="16" cy="15" r="3" stroke={color} strokeWidth="1.5"/>
      <path d="M16 12v-2M16 20v2M12 15h-2M22 15h-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  // M4: Escudo con check - "Lo que necesito"
  4: ({ size = 24, color = colors.primary }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3L5 8v7c0 7 5 13 11 15 6-2 11-8 11-15V8L16 3z" 
            stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M11 16l3 3 7-7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // M5: Personas conectadas - "Lo que necesitamos"
  5: ({ size = 24, color = colors.primary }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="10" cy="9" r="3.5" stroke={color} strokeWidth="2"/>
      <circle cx="22" cy="9" r="3.5" stroke={color} strokeWidth="2"/>
      <path d="M4 24v-3a6 6 0 016-6h0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 24v-3a6 6 0 00-6-6h0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="14" r="3.5" stroke={color} strokeWidth="2"/>
      <path d="M10 28v-2a6 6 0 0112 0v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  // M6: Brújula - "Lo que quiero"
  6: ({ size = 24, color = colors.primary }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2"/>
      <polygon points="16,6 18,14 16,16 14,14" fill={color}/>
      <polygon points="16,26 14,18 16,16 18,18" fill={color} opacity="0.4"/>
      <circle cx="16" cy="16" r="2" fill={color}/>
      <path d="M16 2v2M16 28v2M2 16h2M28 16h2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  // M7: Estrella/Semilla radiante - "Lo que está bien"
  7: ({ size = 24, color = colors.accent }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4l2.5 8h8l-6.5 5 2.5 8-6.5-5-6.5 5 2.5-8-6.5-5h8L16 4z" 
            fill={color} opacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="16" cy="16" r="4" fill={color}/>
    </svg>
  )
};

// Helper para renderizar icono con color de transición
const ModuleIcon = ({ module, size = 24, color, active = false }) => {
  const IconComponent = ModuleIcons[module];
  
  // Colores de transición según módulo
  const transitionColors = {
    1: colors.accent,
    2: colors.blend1,
    3: colors.blend2,
    4: colors.blend3,
    5: colors.blend4,
    6: colors.primaryLight,
    7: colors.primary
  };
  
  const iconColor = active ? transitionColors[module] : (color || colors.textMuted);
  return IconComponent ? <IconComponent size={size} color={iconColor} /> : null;
};

// ============================================
// CÍRCULOS CONCÉNTRICOS - 7 NIVELES CON TRANSICIÓN
// ============================================
const SevenCircles = ({ size = 200, showLabels = false, style = {} }) => {
  // Cada círculo representa un nivel con transición coral → índigo
  // Centro coral, transición por blend1-4, exterior índigo
  
  const levels = [
    { r: 12, color: colors.blend1, opacity: 0.7 },      // 1 - cerca del coral
    { r: 22, color: colors.blend2, opacity: 0.6 },      // 2
    { r: 32, color: colors.blend3, opacity: 0.5 },      // 3
    { r: 42, color: colors.blend4, opacity: 0.45 },     // 4
    { r: 52, color: colors.primaryLight, opacity: 0.4 },// 5
    { r: 62, color: colors.primary, opacity: 0.35 },    // 6
    { r: 75, color: colors.primary, opacity: 0.25, dashed: true }, // 7 - exterior
  ];
  
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={style}>
      {levels.map((level, i) => (
        <circle
          key={i}
          cx="80"
          cy="80"
          r={level.r}
          fill="none"
          stroke={level.color}
          strokeWidth={i === 0 ? 2.5 : i === 6 ? 1 : 1.5}
          opacity={level.opacity}
          strokeDasharray={level.dashed ? "4 2" : "none"}
        />
      ))}
      {/* Centro - la semilla coral */}
      <circle cx="80" cy="80" r="6" fill={colors.accent} />
      <circle cx="80" cy="80" r="3" fill={colors.white} opacity="0.4" />
    </svg>
  );
};

// Versión decorativa más sutil
const DecorativeCircles = ({ size = 300, opacity = 0.12, position = {} }) => (
  <div style={{
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 0,
    ...position
  }}>
    <SevenCircles size={size} style={{ opacity }} />
  </div>
);

// ============================================
// LOGO - GRADIENTE ESPECTRO (coral → índigo)
// ============================================

// Logo principal - Transición coral → rosa → violeta → índigo
const Logo = ({ size = 48, variant = 'light' }) => {
  const isDark = variant === 'dark';
  
  // En fondo oscuro, usamos blanco con opacidades para los círculos externos
  // pero mantenemos la transición de color en los internos
  const outerStroke = isDark ? '#FFFFFF' : colors.primary;
  const outerOpacity = isDark ? 0.3 : 0.4;
  
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* Círculo exterior - índigo/blanco punteado */}
      <circle cx="24" cy="24" r="22" fill="none" stroke={outerStroke} strokeWidth="1" opacity={outerOpacity} strokeDasharray="4 2"/>
      {/* Transición de colores hacia el centro */}
      <circle cx="24" cy="24" r="18" fill="none" stroke={isDark ? '#FFFFFF' : colors.blend4} strokeWidth="1.5" opacity={isDark ? 0.35 : 0.5}/>
      <circle cx="24" cy="24" r="14" fill="none" stroke={isDark ? '#FFFFFF' : colors.blend3} strokeWidth="1.5" opacity={isDark ? 0.45 : 0.6}/>
      <circle cx="24" cy="24" r="10" fill="none" stroke={isDark ? colors.blend2 : colors.blend2} strokeWidth="2" opacity={isDark ? 0.6 : 0.7}/>
      <circle cx="24" cy="24" r="6" fill="none" stroke={colors.blend1} strokeWidth="2.5" opacity={isDark ? 0.75 : 0.85}/>
      {/* Semilla coral */}
      <circle cx="24" cy="24" r="3.5" fill={colors.accent}/>
      <circle cx="24" cy="24" r="2" fill="#FFFFFF" opacity="0.4"/>
    </svg>
  );
};

// ============================================
// COMPONENTES UI
// ============================================
const Badge = ({ children, variant = 'primary' }) => {
  const styles = {
    primary: { bg: colors.primaryMuted, color: colors.primary, border: `1px solid ${colors.primaryLight}40` },
    accent: { bg: colors.accentMuted, color: colors.accentDark, border: `1px solid ${colors.accent}40` },
    outline: { bg: 'transparent', color: colors.textSecondary, border: `1px solid ${colors.border}` }
  };
  const style = styles[variant];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 14px',
      backgroundColor: style.bg,
      color: style.color,
      border: style.border,
      borderRadius: '9999px',
      fontSize: '13px',
      fontWeight: '600'
    }}>
      {children}
    </span>
  );
};

const Card = ({ children, variant = 'default', style = {} }) => {
  const variants = {
    default: { backgroundColor: colors.white, border: `1px solid ${colors.border}` },
    elevated: { backgroundColor: colors.white, boxShadow: '0 4px 24px rgba(30, 27, 46, 0.08)' },
    accent: { backgroundColor: colors.accentMuted, border: `1px solid ${colors.accent}20` },
    primary: { backgroundColor: colors.primarySubtle, border: `1px solid ${colors.primary}15` }
  };
  
  return (
    <div style={{ ...variants[variant], borderRadius: '20px', padding: '28px', ...style }}>
      {children}
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function IdentidadVisualV4() {
  const [activeModule, setActiveModule] = useState(1);
  
  const modules = [
    { num: 1, name: "Lo que soy", subtitle: "El GPS interno del líder", phase: "Fundación" },
    { num: 2, name: "Cómo estoy", subtitle: "El radar corporal", phase: "Fundación" },
    { num: 3, name: "Lo que pienso-siento", subtitle: "El espacio de elección", phase: "Fundación" },
    { num: 4, name: "Lo que necesito", subtitle: "Resiliencia consciente", phase: "Aplicación" },
    { num: 5, name: "Lo que necesitamos", subtitle: "Liderazgo relacional", phase: "Aplicación" },
    { num: 6, name: "Lo que quiero", subtitle: "La brújula interior", phase: "Aplicación" },
    { num: 7, name: "Lo que está bien", subtitle: "Semilla de cambio", phase: "Trascendencia" }
  ];

  const getPhaseStyle = (phase, isActive) => {
    // Volvemos a índigo + coral como colores base
    if (phase === 'Trascendencia') {
      return { color: colors.accent, bg: colors.accentMuted };
    }
    return { 
      color: isActive ? colors.primary : colors.textMuted, 
      bg: isActive ? colors.primaryMuted : colors.white 
    };
  };

  return (
    <div style={{ 
      fontFamily: "'Outfit', 'Montserrat', -apple-system, sans-serif",
      backgroundColor: colors.background,
      color: colors.textPrimary,
      lineHeight: 1.6,
      overflowX: 'hidden'
    }}>
      
      {/* Header */}
      <header style={{
        padding: '16px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Logo size={44} variant="light" />
          <div>
            <h1 style={{ fontSize: '17px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' }}>
              Liderar con Consciencia
            </h1>
            <p style={{ fontSize: '12px', color: colors.textMuted, margin: 0 }}>
              La teoría inspira, la consciencia transforma
            </p>
          </div>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {['Programa', 'Metodología', 'Autor'].map(item => (
            <a key={item} href="#" style={{
              color: colors.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500'
            }}>{item}</a>
          ))}
          <button style={{
            padding: '10px 20px',
            background: colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Comenzar
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '80px 48px',
        overflow: 'hidden'
      }}>
        <DecorativeCircles size={450} opacity={0.1} position={{ top: '-150px', right: '-150px' }} />
        <DecorativeCircles size={350} opacity={0.06} position={{ bottom: '-100px', left: '-100px' }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Badge variant="accent">Programa de 7 niveles</Badge>
          
          <h2 style={{
            fontSize: '52px', fontWeight: '700', lineHeight: 1.1, margin: '28px 0', letterSpacing: '-0.03em'
          }}>
            El viaje hacia tu<br />
            <span style={{ color: colors.accent }}>liderazgo consciente</span>
          </h2>
          
          <p style={{
            fontSize: '19px', color: colors.textSecondary, lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 40px'
          }}>
            Un programa que entrena tu capacidad de liderar cuando más importa: 
            bajo presión, en conflicto, con fatiga emocional.
          </p>

          <Card variant="elevated" style={{ maxWidth: '620px', margin: '0 auto 40px', textAlign: 'left' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
              backgroundColor: colors.accent, borderRadius: '20px 0 0 20px'
            }} />
            <p style={{ fontSize: '18px', fontWeight: '500', margin: 0, lineHeight: 1.65, paddingLeft: '16px' }}>
              "La brecha entre saber qué hacer y poder hacerlo cuando más cuenta 
              se llama consciencia. <span style={{ color: colors.accent, fontWeight: '600' }}>
              Y la consciencia se entrena, no se enseña.</span>"
            </p>
          </Card>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              padding: '16px 32px', backgroundColor: colors.accent, color: colors.white,
              border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '600',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: `0 4px 14px ${colors.accent}40`
            }}>
              Explorar el programa
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button style={{
              padding: '16px 32px', backgroundColor: 'transparent', color: colors.textPrimary,
              border: `2px solid ${colors.border}`, borderRadius: '14px', fontSize: '15px',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Ver metodología
            </button>
          </div>
        </div>
      </section>

      {/* Los 7 Módulos - TIMELINE MEJORADO CON ICONOS */}
      <section style={{ padding: '80px 48px', backgroundColor: colors.white }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ 
              color: colors.accent, fontSize: '14px', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px'
            }}>
              El recorrido
            </p>
            <h3 style={{ fontSize: '38px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Siete niveles de consciencia
            </h3>
            <p style={{ color: colors.textSecondary, fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
              Un viaje progresivo desde el autoconocimiento hasta el impacto consciente
            </p>
          </div>

          {/* NUEVO TIMELINE CON ICONOS */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '48px',
            position: 'relative',
            padding: '0 20px'
          }}>
            {/* Línea de conexión con gradiente de transición coral → índigo */}
            <div style={{
              position: 'absolute',
              top: '32px',
              left: '60px',
              right: '60px',
              height: '3px',
              background: `linear-gradient(90deg, 
                ${colors.accent} 0%, 
                ${colors.blend1} 15%,
                ${colors.blend2} 30%,
                ${colors.blend3} 45%,
                ${colors.blend4} 60%,
                ${colors.primaryLight} 75%,
                ${colors.primary} 100%)`,
              borderRadius: '2px',
              zIndex: 0
            }} />
            
            {modules.map((m) => {
              const isActive = activeModule === m.num;
              const phaseStyle = getPhaseStyle(m.phase, isActive);
              
              return (
                <div
                  key={m.num}
                  onClick={() => setActiveModule(m.num)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1,
                    flex: 1
                  }}
                >
                  {/* Contenedor del icono */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: isActive ? (m.phase === 'Trascendencia' ? colors.accentMuted : colors.primaryMuted) : colors.white,
                    border: isActive 
                      ? `2px solid ${m.phase === 'Trascendencia' ? colors.accent : colors.primary}`
                      : `2px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                  }}>
                    <ModuleIcon 
                      module={m.num} 
                      size={28} 
                      active={isActive}
                      color={isActive ? undefined : colors.textMuted}
                    />
                  </div>
                  
                  {/* Número */}
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: isActive ? phaseStyle.color : colors.textMuted,
                    marginTop: '10px'
                  }}>
                    {String(m.num).padStart(2, '0')}
                  </span>
                  
                  {/* Fase */}
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    color: m.phase === 'Trascendencia' ? colors.accent : colors.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '4px'
                  }}>
                    {m.phase}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detalle del módulo - Vuelve a usar índigo/coral base */}
          <Card variant="primary" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              {/* Icono grande - MANTIENE color de transición */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                backgroundColor: modules[activeModule-1].phase === 'Trascendencia' 
                  ? colors.accentMuted 
                  : colors.primaryMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ModuleIcon module={activeModule} size={40} active={true} />
              </div>
              
              <div style={{ flex: 1 }}>
                <Badge variant={modules[activeModule-1].phase === 'Trascendencia' ? 'accent' : 'primary'}>
                  Módulo {String(activeModule).padStart(2, '0')} · {modules[activeModule-1].phase}
                </Badge>
                
                <h4 style={{
                  fontSize: '28px', fontWeight: '700', margin: '16px 0 8px 0', letterSpacing: '-0.02em'
                }}>
                  Consciente de {modules[activeModule-1].name.toLowerCase()}
                </h4>
                
                <p style={{
                  fontSize: '16px', color: colors.accent, fontWeight: '600', margin: '0 0 16px 0', fontStyle: 'italic'
                }}>
                  {modules[activeModule-1].subtitle}
                </p>
                
                <p style={{ fontSize: '15px', color: colors.textSecondary, lineHeight: 1.75, margin: 0 }}>
                  {activeModule === 1 && "Comprender cómo tu cerebro automático toma decisiones de liderazgo antes de que tu mente consciente intervenga. Neurociencia del comportamiento, Sistema 1 vs Sistema 2, y la neuroplasticidad como herramienta de cambio."}
                  {activeModule === 2 && "Desarrollar la capacidad de 'leer' las señales internas del cuerpo como información crucial para liderar. La interocepción como radar emocional y sistema de alerta temprana."}
                  {activeModule === 3 && "Comprender la interconexión pensamiento-emoción y generar espacios para respuestas conscientes. Reconocer patrones automáticos y crear el intervalo que permite la elección."}
                  {activeModule === 4 && "Transformar la gestión del estrés en una competencia estratégica de liderazgo sostenible. Del automatismo de lucha-huida a la regulación consciente."}
                  {activeModule === 5 && "Desarrollar liderazgo compasivo y comunicación consciente para crear equipos más humanos y efectivos. Escucha profunda y decisiones difíciles con humanidad."}
                  {activeModule === 6 && "Mantener claridad en objetivos y decisiones, navegando entre propósito esencial y demandas cambiantes. Atención sostenida frente a la distracción."}
                  {activeModule === 7 && "Convertirse en semilla de cambio positivo a través de acciones éticas que inspiren transformación. La coherencia valores-acciones como fundamento del impacto."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Galería de Iconografía */}
      <section style={{ padding: '60px 48px', backgroundColor: colors.backgroundAlt }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '16px',
            color: colors.textSecondary
          }}>
            Sistema de iconografía
          </h3>
          <p style={{ 
            fontSize: '14px', color: colors.textMuted, textAlign: 'center', marginBottom: '32px'
          }}>
            Iconos con transición coral → índigo | UI general con índigo + coral base
          </p>
          
          {/* Barra de transición de colores - solo referencia visual */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '24px'
          }}>
            {[colors.accent, colors.blend1, colors.blend2, colors.blend3, colors.blend4, colors.primaryLight, colors.primary].map((c, i) => (
              <div key={i} style={{
                width: '40px',
                height: '8px',
                backgroundColor: c,
                borderRadius: i === 0 ? '4px 0 0 4px' : i === 6 ? '0 4px 4px 0' : '0'
              }} />
            ))}
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '16px'
          }}>
            {modules.map((m) => (
              <div key={m.num} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 12px',
                backgroundColor: colors.white,
                borderRadius: '16px',
                border: `1px solid ${colors.border}`
              }}>
                {/* Fondo del icono: índigo o coral según fase */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: m.phase === 'Trascendencia' ? colors.accentMuted : colors.primaryMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  {/* El icono SÍ usa su color de transición */}
                  <ModuleIcon module={m.num} size={28} active={true} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: colors.primary }}>
                  M{m.num}
                </span>
                <span style={{ 
                  fontSize: '10px', color: colors.textMuted, textAlign: 'center', marginTop: '4px',
                  lineHeight: 1.3
                }}>
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Página de contenido de ejemplo */}
      <section style={{ padding: '80px 48px', backgroundColor: colors.white }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            {/* Fondo índigo, icono con su color de transición */}
            <div style={{
              width: '56px', height: '56px', backgroundColor: colors.primary, borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ModuleIcon module={1} size={28} color={colors.white} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                Módulo uno · Fundación
              </p>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em' }}>
                La Atención: Puerta de Entrada
              </h2>
            </div>
          </div>

          <p style={{ fontSize: '18px', color: colors.textSecondary, lineHeight: 1.8, marginBottom: '48px' }}>
            El modo en que desplegamos nuestra atención determina lo que vemos. 
            Y lo que vemos determina cómo respondemos.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            <Card variant="default">
              <div style={{
                width: '44px', height: '44px', backgroundColor: colors.primaryMuted, borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '10px' }}>Sistema Abajo-Arriba</h4>
              <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.65, margin: 0 }}>
                Rápido, automático, diseñado para captar estímulos inmediatos.
              </p>
            </Card>
            
            <Card variant="default">
              <div style={{
                width: '44px', height: '44px', backgroundColor: colors.accentMuted, borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '10px' }}>Sistema Arriba-Abajo</h4>
              <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.65, margin: 0 }}>
                Más lento, deliberado, controlado por la corteza prefrontal.
              </p>
            </Card>
          </div>

          <Card variant="accent" style={{ marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
            <DecorativeCircles size={150} opacity={0.15} position={{ top: '-40px', right: '-40px' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: colors.accent, borderRadius: '50%' }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Concepto clave
                </span>
              </div>
              <h4 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                SODA: Si Observas, Desactivas el Automatismo
              </h4>
              <p style={{ fontSize: '15px', color: colors.textSecondary, lineHeight: 1.7, margin: 0 }}>
                Al prestar atención especial a la información entrante, dificultamos los 
                procesos automáticos. <strong style={{ color: colors.textPrimary }}>La observación consciente 
                es el interruptor que desactiva el piloto automático.</strong>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer - CON LOGO CORREGIDO PARA FONDO OSCURO */}
      <footer style={{
        backgroundColor: colors.textPrimary,
        color: colors.white,
        padding: '64px 48px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <DecorativeCircles size={300} opacity={0.05} position={{ top: '-100px', right: '-100px' }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                {/* Logo variante para fondo oscuro */}
                <Logo size={40} variant="dark" />
                <span style={{ fontSize: '17px', fontWeight: '700' }}>Liderar con Consciencia</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '280px' }}>
                Programa para desarrollar la capacidad real de liderar cuando más cuenta.
              </p>
            </div>
            {[
              { title: 'Programa', items: ['Los 7 módulos', 'Metodología', 'Testimonios'] },
              { title: 'Recursos', items: ['Investigación', 'Blog', 'FAQ'] },
              { title: 'Conectar', items: ['Contacto', 'LinkedIn', 'Newsletter'] }
            ].map(col => (
              <div key={col.title}>
                <h5 style={{ 
                  fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: colors.accent, marginBottom: '20px', fontWeight: '700'
                }}>{col.title}</h5>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.items.map(item => (
                    <li key={item} style={{ marginBottom: '12px' }}>
                      <a href="#" style={{ 
                        color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500'
                      }}>{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div style={{
            paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              © 2026 Liderar con Consciencia
            </span>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacidad', 'Términos'].map(item => (
                <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Nota sobre tipografía y colores */}
      <div style={{
        padding: '16px 48px',
        backgroundColor: colors.primarySubtle,
        fontSize: '12px',
        color: colors.textSecondary,
        textAlign: 'center'
      }}>
        <strong>Sistema visual:</strong> Outfit (web) / Montserrat (docs) | 
        <strong> Colores UI:</strong> Índigo + Coral | 
        <strong> Iconos módulos:</strong> Transición 7 colores
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        button:hover { transform: translateY(-1px); transition: transform 0.15s ease; }
        a:hover { color: ${colors.accent} !important; }
      `}</style>
    </div>
  );
}
