// app.jsx — root
const { useState: useS, useEffect: useE } = React;

const App = () => {
  const defaults = window.__TWEAKS__ || {};
  const [dark, setDark] = useS(!!defaults.dark);

  /* Apply theme + locked palette to root */
  useE(() => {
    const r = document.documentElement;
    r.setAttribute("data-palette", defaults.palette || "blush");
    r.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  /* Bridge to host edit-mode: keep dark-mode persistence, no panel */
  const [isHostEditMode, setHostEditMode] = useS(false);
  useE(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setHostEditMode(true);
      else if (d.type === "__deactivate_edit_mode") setHostEditMode(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({type: "__edit_mode_available"}, "*"); } catch (_) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const toggleTheme = () => {
    setDark(d => {
      const next = !d;
      if (isHostEditMode) {
        try { window.parent.postMessage({type: "__edit_mode_set_keys", edits: {dark: next}}, "*"); } catch (_) {}
      }
      return next;
    });
  };

  return (
    <>
      <Nav
        theme={dark ? "dark" : "light"}
        onToggleTheme={toggleTheme}
      />
      <div className="page">
        <Sidebar />
        <main className="main">
          <About />
          <TimelineSection
            id="education"
            index="02"
            title="Education"
            items={window.SITE.education}
          />
          <Publications />
          <TimelineSection
            id="experience"
            index="04"
            title="Experience"
            items={window.SITE.experience}
          />
          <Awards />
          <Miscellaneous />
          <Footer />
        </main>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
