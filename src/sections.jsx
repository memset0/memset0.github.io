// sections.jsx — layout: left sidebar (identity) + right main (content)
const { useEffect, useRef, useState } = React;

/* Intersection-observer reveal */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {el.classList.add("in");io.disconnect();}},
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, delay = 0, as: Tag = "div", ...rest }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${rest.className || ""}`} style={{ transitionDelay: `${delay}ms`, ...rest.style }}>
      {children}
    </Tag>);

};

/* -------- Navbar -------- */
const NAV_ITEMS = [
{ id: "education", label: "Education" },
{ id: "publications", label: "Publications" },
{ id: "experience", label: "Experience" },
{ id: "awards", label: "Honors and Awards" },
{ id: "misc", label: "Miscellaneous" }];


const Nav = ({ theme, onToggleTheme }) => {
  const [active, setActive] = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const linksRef = useRef(null);
  const linkRefs = useRef({});
  // When the user clicks a nav item, we "pin" that id — auto-detection may report
  // the previous section while the browser is still scrolling / because the target
  // section is too short to cross the sampling line. We override the detected
  // section with `pinned` until auto-detect moves BEYOND the neighborhood
  // (i.e. reports something that is neither the pinned id nor its immediate
  // predecessor). Matching the pinned id itself also releases the pin.
  const pinnedRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      // Trigger: once the user has scrolled more than 5% of viewport height,
      // the pill should appear. Before that we keep detected = null so the
      // pill stays collapsed (width: 0).
      const triggered = window.scrollY > window.innerHeight * 0.05;
      // Sampling line: ~28% down from top of viewport.
      const line = window.innerHeight * 0.28;
      let detected = null;
      let bestTop = -Infinity;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - line <= 0 && top > bestTop) {
          bestTop = top;
          detected = id;
        }
      }
      // After the trigger fires but no section has crossed the line yet,
      // fall back to the first nav item so the pill stretches into place.
      if (triggered && !detected) detected = NAV_ITEMS[0]?.id ?? null;
      if (!triggered) detected = null;
      // Manual-pin override (set by clicking a nav link).
      const pinned = pinnedRef.current;
      if (pinned) {
        const pIdx = NAV_ITEMS.findIndex((n) => n.id === pinned);
        const dIdx = detected ? NAV_ITEMS.findIndex((n) => n.id === detected) : -1;
        // Release pin when detection lands on pinned (we arrived) OR leaves
        // the neighborhood (anything that is not pinned-1).
        if (dIdx === pIdx || dIdx !== pIdx - 1) {
          pinnedRef.current = null;
          setActive(detected);
        } else {
          setActive(pinned);
        }
      } else {
        setActive(detected);
      }
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  /* Move the pill — appear from 50% + fade-in, disappear to 50% + fade-out */
  useEffect(() => {
    const container = linksRef.current;
    const target = active ? linkRefs.current[active] : null;
    if (!container || !target) {
      // Disappear: width → 50%, then fade opacity to 0.
      setPillStyle((s) => ({ ...s, width: s.width * 0.5, opacity: 0 }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const targetLeft = tRect.left - cRect.left;
    const targetWidth = tRect.width;
    setPillStyle((s) => {
      if (s.opacity > 0 && s.width > 0) {
        // Already visible → just slide/stretch to new target.
        return { left: targetLeft, width: targetWidth, opacity: 1 };
      }
      // Appear: start at 50% width + fade in to full width.
      return { left: targetLeft, width: targetWidth * 0.5, opacity: 0 };
    });
    const t = setTimeout(() => {
      setPillStyle({ left: targetLeft, width: targetWidth, opacity: 1 });
    }, 20);
    return () => clearTimeout(t);
  }, [active]);

  /* Also recompute on resize */
  useEffect(() => {
    const onResize = () => {
      const container = linksRef.current;
      const target = active ? linkRefs.current[active] : null;
      if (!container || !target) return;
      const cRect = container.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      setPillStyle({
        left: tRect.left - cRect.left,
        width: tRect.width,
        opacity: 1
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const handleClick = (e, id) => {
    e.preventDefault();
    pinnedRef.current = id;
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    // 避免 scrollIntoView —— 页面缩放 ≠ 100% 时它会连带滚动祖先容器，
    // 把 <main> 等元素挤出视口。改用 window.scrollTo + 元素的文档坐标。
    const navH = document.querySelector('.nav')?.offsetHeight ?? 0;
    const targetY = () =>
    el.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top: targetY(), behavior: "smooth" });
    // Smooth scroll can overshoot/undershoot if layout shifts mid-scroll
    // (Reveal transitions, sticky reflows). Re-target after the animation
    // settles to guarantee we land on the right section.
    let raf = 0,ticks = 0,lastY = window.scrollY;
    const settle = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) ticks++;else ticks = 0;
      lastY = y;
      if (ticks > 6) {
        const want = targetY();
        if (Math.abs(want - y) > 1) window.scrollTo({ top: want });
        return;
      }
      raf = requestAnimationFrame(settle);
    };
    raf = requestAnimationFrame(settle);
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand" onClick={(e) => {e.preventDefault();window.scrollTo({ top: 0, behavior: "smooth" });}} aria-label="Back to top">
          <img src="assets/avatar-cat.png" alt="" className="nav-brand-avatar" />
        </a>
        <div className="nav-links" ref={linksRef}>
          <span
            className="nav-pill"
            style={{
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
            aria-hidden="true" />
          
          {NAV_ITEMS.map((item) =>
          <a
            key={item.id}
            href={`#${item.id}`}
            ref={(el) => {if (el) linkRefs.current[item.id] = el;}}
            className={`nav-link ${active === item.id ? "active" : ""}`}
            onClick={(e) => handleClick(e, item.id)}>
            
              <span className="nav-link-label">{item.label}</span>
            </a>
          )}
          <a
            href={window.SITE.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-link-external">
            
            <span className="nav-link-label">Blog</span>
            <Icon name="external" />
          </a>
        </div>
        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle dark mode">
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
        </div>
      </div>
    </nav>);

};

/* -------- Sidebar (identity column) -------- */
const Sidebar = () => {
  const S = window.SITE;
  return (
    <aside className="sidebar" id="top">
      <div className="sidebar-inner">
        <Reveal>
          <div className="sidebar-avatar-wrap">
            <div className="sidebar-avatar-orbit-2" aria-hidden="true"></div>
            <div className="sidebar-avatar-orbit" aria-hidden="true"></div>
            <div className="sidebar-avatar">
              <img src="assets/avatar-photo.jpg" alt={S.name} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="sidebar-name">{S.name}</h1>
          <p className="sidebar-handle">@{S.handle}</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="sidebar-tagline" style={{ whiteSpace: "pre-line" }}>{S.tagline}</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="sidebar-meta">
            <div className="sidebar-meta-item"><Icon name="pin" /><span>{S.location}</span></div>
            <div className="sidebar-meta-item"><Icon name="mail" /><span>{S.email.replace("@", "#")}</span></div>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="sidebar-socials">
            {S.socials.map((s) =>
            <a key={s.label} href={s.href} className="social-pill" target="_blank" rel="noopener noreferrer" title={s.label}>
                <Icon name={s.icon} /> <span>{s.label}</span>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </aside>);

};

/* -------- Section head -------- */
const SectionHead = ({ index, title }) =>
<Reveal>
    <div className="section-head">
      <h2 className="section-title">{title}</h2>
    </div>
  </Reveal>;


/* -------- About (first section in right column) -------- */
const About = () => {
  const S = window.SITE;
  return (
    <section className="section section-first" id="about" style={{ padding: "0px 0px 8px" }}>
      <Reveal delay={60}>
        <div className="about-body">
          {S.about.map((p, i) =>
          <div key={i} className="about-para" dangerouslySetInnerHTML={{ __html: p }} />
          )}
        </div>
      </Reveal>
    </section>);

};

/* -------- Timeline sections -------- */
const TimelineSection = ({ id, index, title, items }) =>
<section className="section" id={id}>
    <SectionHead index={index} title={title} />
    <Reveal delay={80}>
      <div className="timeline">
        {items.map((it, i) =>
      <div key={i} className="timeline-item">
            {it.logo ? <img className="timeline-logo" src={it.logo} alt="" /> : <div className="timeline-logo" />}
            <div className="timeline-content">
              <div className="timeline-date">{it.date}</div>
              <h3 className="timeline-title">{it.title}</h3>
              <p className="timeline-org">{it.org}</p>
              {it.detail && <p className="timeline-detail">{it.detail}</p>}
            </div>
          </div>
      )}
      </div>
    </Reveal>
  </section>;


/* -------- Publications -------- */
const Publications = () => {
  const S = window.SITE;
  return (
    <section className="section" id="publications">
      <SectionHead index="03" title="Publications" />
      <Reveal delay={80}>
        <div className="pub-list">
          {S.publications.map((p, i) =>
          <article key={i} className="pub" style={{ padding: "0px 0px 10px" }}>
              <div className="pub-thumb">
                {p.thumbImg ?
              <img src={p.thumbImg} alt="" /> :
              p.thumb || "PAPER"}
              </div>
              <div className="pub-body">
                <div className="pub-venue">
                  <span dangerouslySetInnerHTML={{ __html: p.venue + (p.year ? ` · ${p.year}` : "") }} />
                  {p.badge && <span className="pub-badge">{p.badge}</span>}
                </div>
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-authors">
                  {p.authors.map((a, j) =>
                <React.Fragment key={j}>
                      {a.toLowerCase().includes(window.SITE.name.toLowerCase().split(" ")[0].toLowerCase()) ?
                  <span className="me">{a}</span> :
                  a}
                      {j < p.authors.length - 1 ? ", " : ""}
                    </React.Fragment>
                )}
                </p>
                {p.note && <p className="pub-note">{p.note}</p>}
                <div className="pub-links">
                  {p.links.map((l) =>
                <a key={l.label} href={l.href} className="pub-link">{l.label}</a>
                )}
                </div>
              </div>
            </article>
          )}
        </div>
      </Reveal>
    </section>);

};

/* -------- Awards (competitions) + Scholarships -------- */
const AwardRow = ({ it, i }) =>
<div className="award-row" style={{ transitionDelay: `${Math.min(i * 15, 120)}ms` }}>
    <div className="award-row-date">{it.year}</div>
    <div className="award-row-body">
      <h3 className="award-row-title">{it.title}</h3>
      {it.org ? <p className="award-row-org" dangerouslySetInnerHTML={{ __html: it.org }} /> : null}
    </div>
  </div>;


const Awards = () => {
  const S = window.SITE;
  const [showMore, setShowMore] = useState(false);
  const extra = S.awardsMore || [];
  return (
    <section className="section" id="awards">
      <SectionHead index="05" title="Honors and Awards" />
      <Reveal delay={60}>
        <h3 className="award-subhead">Competitive Programming</h3>
      </Reveal>
      <Reveal delay={80}>
        <div className="awards-list">
          {S.awards.map((a, i) => <AwardRow key={`a-${i}`} it={a} i={i} />)}
        </div>
      </Reveal>
      {extra.length > 0 &&
      <Reveal delay={90}>
          <div className={`awards-more ${showMore ? "open" : ""}`}>
            <button
            className="awards-more-toggle"
            onClick={() => setShowMore((s) => !s)}
            aria-expanded={showMore}>
            
              <svg className="awards-more-chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5 L6 7.5 L9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                {showMore ? "hide" : `${extra.length} more`}
              </span>
            </button>
            <div className="awards-more-body">
              <div className="awards-list">
                {extra.map((a, i) => <AwardRow key={`m-${i}`} it={a} i={i} />)}
              </div>
            </div>
          </div>
        </Reveal>
      }
      <Reveal delay={140}>
        <h3 className="award-subhead">Scholarships</h3>
      </Reveal>
      <Reveal delay={160}>
        <div className="awards-list">
          {S.scholarships.map((a, i) => <AwardRow key={`s-${i}`} it={a} i={i} />)}
        </div>
      </Reveal>
    </section>);

};

const Scholarships = () => null;

/* -------- Miscellaneous -------- */
const Miscellaneous = () => {
  const items = [
  "I really enjoy video games, especially <strong>Minecraft</strong> and <strong>Slay the Spire</strong>. I've also been competitive in Minecraft 1.8 PvP (Hypixel Bedwars and MegaWalls), where I've put in more hours than I'd care to admit.",
  "I'm also a hobbyist full-stack engineer with a soft spot for front-end work — long before modern AI agents made it look easy."];

  return (
    <section className="section" id="misc">
      <SectionHead index="06" title="Miscellaneous" />
      <Reveal delay={60}>
        <div className="about-body">
          {items.map((p, i) =>
          <div key={i} className="about-para" dangerouslySetInnerHTML={{ __html: p }} />
          )}
        </div>
      </Reveal>
    </section>);

};

/* -------- Footer -------- */
const Footer = () => {
  const S = window.SITE;
  return (
    <footer className="foot">
      <span>© 2026 {S.name}</span>
      <span>Made with Claude</span>
    </footer>);

};

Object.assign(window, { Nav, Sidebar, About, TimelineSection, Publications, Awards, Miscellaneous, Footer });