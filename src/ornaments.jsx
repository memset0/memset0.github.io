// ornaments.jsx — SVG icons, sprigs, mascot placeholder
const Icon = ({ name, ...props }) => {
  const icons = {
    mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
    github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.35-3.37-1.35-.46-1.17-1.12-1.48-1.12-1.48-.91-.63.07-.62.07-.62 1.01.07 1.54 1.05 1.54 1.05.89 1.55 2.34 1.1 2.92.84.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.13-4.55-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.04A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.73 0 3.9-2.34 4.76-4.57 5.02.36.31.68.94.68 1.89 0 1.36-.01 2.46-.01 2.8 0 .27.18.59.69.49C19.14 20.58 22 16.75 22 12.23 22 6.58 17.52 2 12 2z"/></svg>,
    scholar: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>,
    x: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>,
    pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    school: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 4 2 10l10 6 10-6zM6 12v5c3.3 2 8.7 2 12 0v-5"/></svg>,
    sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
    moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    sliders: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
    external: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  };
  return icons[name] || null;
};

/* Decorative lavender sprig — tiny stylized stem */
const Sprig = ({ style, color = "currentColor" }) => (
  <svg viewBox="0 0 40 80" style={style} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
    <path d="M20 78 L20 20" />
    {/* leaves */}
    <path d="M20 60 Q12 56 10 48" />
    <path d="M20 52 Q28 48 30 40" />
    <path d="M20 44 Q12 40 10 32" />
    {/* flower buds */}
    {[0,1,2,3,4,5].map(i => (
      <g key={i} transform={`translate(${i%2===0 ? 20 : 20} ${20 - i*3})`}>
        <ellipse cx={i%2===0 ? -3 : 3} cy={0} rx="2.5" ry="3.5" fill={color} fillOpacity="0.5" stroke="none" />
      </g>
    ))}
    <ellipse cx="20" cy="16" rx="3" ry="4" fill={color} fillOpacity="0.7" stroke="none" />
    <ellipse cx="20" cy="8" rx="2.5" ry="3.5" fill={color} fillOpacity="0.6" stroke="none" />
  </svg>
);

/* Small star / petal shapes used in bg decoration */
const Petal = ({ style, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" style={style} fill={color}>
    <path d="M12 2 C13 8, 16 11, 22 12 C16 13, 13 16, 12 22 C11 16, 8 13, 2 12 C8 11, 11 8, 12 2 Z" opacity="0.55"/>
  </svg>
);

/* Mascot placeholder — shows before user-supplied PNG loads. */
const MascotPlaceholder = () => (
  <div className="hero-avatar-placeholder">
    <div style={{fontSize:42, marginBottom:6}}>✿</div>
    <div>your<br/>portrait<br/>here</div>
  </div>
);

/* Background layer — dots/grid/sprigs/blobs, controlled by Tweaks */
const BackgroundLayer = ({ mode }) => {
  if (mode === "none") return null;
  return (
    <div className="bg-layer" aria-hidden="true">
      {mode === "dots" && <div className="bg-dots" />}
      {mode === "grid" && <div className="bg-grid" />}
      {mode === "blobs" && (
        <>
          <div className="bg-blob" style={{background:"var(--lav-300)", top:"-10%", left:"-5%"}}/>
          <div className="bg-blob" style={{background:"var(--lav-200)", top:"40%", right:"-10%", animationDelay:"-6s"}}/>
          <div className="bg-blob" style={{background:"var(--lav-100)", bottom:"-10%", left:"30%", animationDelay:"-12s"}}/>
        </>
      )}
      {mode === "sprigs" && (
        <>
          <Sprig style={{position:"absolute", width:50, top:"12%",  left:"4%",  color:"var(--accent)", "--r":"-10deg"}} />
          <Sprig style={{position:"absolute", width:38, top:"30%",  right:"6%", color:"var(--lav-300)", "--r":"15deg", animationDelay:"-2s"}} />
          <Sprig style={{position:"absolute", width:44, bottom:"18%", left:"7%", color:"var(--lav-400)", "--r":"-5deg", animationDelay:"-4s"}} />
          <Sprig style={{position:"absolute", width:30, top:"60%",  right:"9%", color:"var(--lav-200)", "--r":"20deg", animationDelay:"-1s"}} />
          <Petal style={{position:"absolute", width:22, top:"48%",  left:"12%", color:"var(--lav-300)"}} />
          <Petal style={{position:"absolute", width:16, bottom:"40%", right:"14%", color:"var(--lav-400)"}} />
        </>
      )}
    </div>
  );
};

Object.assign(window, { Icon, Sprig, Petal, MascotPlaceholder, BackgroundLayer });
