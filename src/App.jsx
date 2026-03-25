import { useState, useEffect } from "react";

// ─── PALETTE: Oregon Fog ───
// bg:       #111a26  deep slate navy
// text:     #cec4b0  warm stone
// accent:   #7a9e8a  muted sage green
// accent2:  #5e8272  deeper sage
// subtle:   #1c2735  lighter navy for cards
// border:   rgba(122, 158, 138, 0.15)

const PAGES = ["home", "about", "books", "justice", "speaking", "press", "events", "contact"];
const PAGE_TITLES = { home: "Home", about: "About", books: "Books", justice: "Justice Work", speaking: "Speaking & Coaching", press: "Press", events: "Events", contact: "Contact" };

const BOOKS = [
  { id: "talking-bone", title: "The Talking Bone", year: "July 21, 2026", publisher: "Harper", badge: "Forthcoming", cover: "/images/books/talking-bone.jpg", tagline: "Inspired by her work exonerating innocents.", description: "A new literary thriller from the award-winning author of The Enchanted and The Child Finder. Inspired by her decades of work as a licensed defense investigator, including exonerating innocents from death row. The Talking Bone is Rene Denfeld at her most powerful \u2014 fiction forged in the fire of real justice work.", quotes: [], links: { barnes: "https://www.barnesandnoble.com/w/the-talking-bone-rene-denfeld/1148536206", harper: "https://www.harpercollins.com/products/the-talking-bone-rene-denfeld?variant=44413756178466" }, color: "#7a9e8a" },
  { id: "sleeping-giants", title: "Sleeping Giants", year: "2023", publisher: "Harper", cover: "/images/books/sleeping-giants.jpg", tagline: "A compelling story of sibling bonds, foster children, and the power of love.", description: "A nine-year-old boy drowns on a remote Oregon beach. Twenty years later, a young woman discovers she had an older brother. From the bestselling author of The Child Finder and The Enchanted, a compelling and poignant story of sibling bonds, foster children, monsters masquerading as caretakers, terrifying secrets, and the power of love to right even the most egregious wrongs.", quotes: [{ text: "Rene Denfeld is one of the handful of living writers I most admire, and Sleeping Giants may be her masterpiece. Haunting, frightening and moving in equal measure, her new novel is a sublime page turner, evoking beauty and terror in the same moment. I read it in an afternoon, enthralled, and am still under its spell.", author: "Elizabeth Hand", source: "author of A Haunting on the Hill and Generation Loss" }], links: { amazon: "https://www.amazon.com/Fire-Water-Novel-Rene-Denfeld/dp/0063014734/", bookshop: "https://bookshop.org/p/books/fire-and-water-rene-denfeld/18386465?ean=9780063014732", ibooks: "https://books.apple.com/us/book/sleeping-giants/id1604170273" }, color: "#5c7e8a" },
  { id: "butterfly-girl", title: "The Butterfly Girl", year: "2019", publisher: "Harper", cover: "/images/books/butterfly-girl.jpg", tagline: "Naomi returns, searching for her missing sister in Portland.", description: "After captivating readers in The Child Finder, Naomi \u2014 the investigator with an uncanny ability for finding missing children \u2014 returns, trading snow-covered woods for dark, gritty streets on the search for her missing sister in a city where young, homeless girls have been going missing and turning up dead.", quotes: [{ text: "A heartbreaking, finger-gnawing, and yet ultimately hopeful novel by the amazing Rene Denfeld.", author: "Margaret Atwood", source: "via Twitter" }, { text: "Aptly unclassifiable, Denfeld\u2019s compulsively readable second novel calls on elements of horror, mystery, fairy tales, and even romance to explore legacies of violence and the resilience of the most vulnerable among us.", author: "Booklist", source: "" }], links: { amazon: "https://www.amazon.com/Butterfly-Girl-Novel-Naomi-Cottle/dp/0062698176/", bookshop: "https://bookshop.org/p/books/the-butterfly-girl-rene-denfeld/7953470?ean=9780062698179", ibooks: "https://books.apple.com/us/book/the-butterfly-girl/id1286660961" }, color: "#8a7e6a" },
  { id: "child-finder", title: "The Child Finder", year: "2017", publisher: "Harper", cover: "/images/books/child-finder.jpg", tagline: "A missing girl in Oregon\u2019s Skookum National Forest.", description: "International bestseller. A haunting, richly atmospheric, and deeply suspenseful novel from the acclaimed author of The Enchanted about an investigator who must use her unique insights to find a missing little girl. It\u2019s been three years since Madison Culver vanished when her family was picking a Christmas tree in Oregon\u2019s Skookum National Forest.", quotes: [{ text: "It\u2019s \u2018Deliverance\u2019 encased in ice.", author: "The New York Times Book Review", source: "" }], extras: ["No. 1 fiction bestseller at Powell\u2019s Books in its first week", "Indie Next pick", "International bestseller"], links: { amazon: "https://www.amazon.com/Child-Finder-Novel-Rene-Denfeld/dp/0062659065/", bookshop: "https://bookshop.org/p/books/the-child-finder-rene-denfeld/7322231?ean=9780062659064", ibooks: "https://books.apple.com/us/book/the-child-finder/id1185659033" }, color: "#6a8a7a" },
  { id: "enchanted", title: "The Enchanted", year: "2014", publisher: "Harper", cover: "/images/books/enchanted.jpg", tagline: "Death row, told from the point of view of a convict who finds transcendence.", description: "An astonishing and redemptive novel told from the point of view of a convict whose magical interpretations of prison life allow him to find absolute joy while isolated from the rest of humanity, and a female investigator who experiences her own personal salvation in her work as a death penalty investigator.", quotes: [{ text: "The Enchanted wrapped its beautiful and terrible fingers around me from the first page and refused to let go after the last. A wondrous book that finds transcendence in the most unlikely of places. So dark yet so exquisite.", author: "Erin Morgenstern", source: "author of The Night Circus" }, { text: "Rene Denfeld is a genius. In The Enchanted she has given us one of the most beautiful, heartrending, and riveting novels I have read.", author: "Donald Ray Pollock", source: "" }, { text: "A jubilant celebration that explores human darkness with profound lyric tenderness.", author: "Katherine Dunn", source: "" }], awards: ["French Prix du Premier Roman Etranger", "ALA Medal for Excellence in Fiction", "Finalist, Center for Fiction First Novel Prize", "Listed for the International Dublin Literary Award (IMPAC)", "Carnegie Listing", "Adapted for the London and Edinburgh stage", "Selected for community and campus reads including All Rochester Reads"], links: { amazon: "https://www.amazon.com/Enchanted-Novel-P-S-Paperback/dp/0062285513/", bookshop: "https://bookshop.org/p/books/the-enchanted-rene-denfeld/6433109?ean=9780062285515", ibooks: "https://books.apple.com/us/book/the-enchanted/id660530727" }, color: "#8a6a5c" },
];

const NONFICTION = [
  { title: "All God\u2019s Children", description: "About street families and homeless youth in Portland. Based on a decade of following the evolution of street family culture." },
  { title: "Kill the Body, the Head Will Fall", description: "On boxing." },
  { title: "The New Victorians", description: "Feminist critique, published when Rene was twenty-seven years old." },
];

const Icons = {
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Scale: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  Mic: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Quote: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.25"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>,
  ExternalLink: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Instagram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Facebook: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  Twitter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>,
  MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Heart: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

function GrainOverlay() {
  return <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />;
}

function SectionDivider() {
  return <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "0 auto", maxWidth: "200px" }}><div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #7a9e8a)" }}/><div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#7a9e8a", opacity: 0.6 }}/><div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #7a9e8a)" }}/></div>;
}

function Navigation({ currentPage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const h = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [menuOpen]);
  const navigate = (p) => { setPage(p); setMenuOpen(false); };
  return (<>
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "12px 32px" : "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(17,26,38,0.94)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(122,158,138,0.1)" : "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "19px", fontWeight: 700, color: "#ffffff", letterSpacing: "3px", textTransform: "uppercase" }}>Rene Denfeld</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "10px", color: "#7a9e8a", letterSpacing: "4px", textTransform: "uppercase" }}>Author & Investigator</span>
        </div>
      </button>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
        {PAGES.filter(p => p !== "home").map(page => (
          <button key={page} onClick={() => navigate(page)} style={{ background: "none", border: "none", color: currentPage === page ? "#7a9e8a" : "rgba(206,196,176,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", padding: "4px 0", borderBottom: currentPage === page ? "1px solid #7a9e8a" : "1px solid transparent", transition: "all 0.3s ease" }}>{PAGE_TITLES[page]}</button>
        ))}
      </div>
      <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label={menuOpen ? "Close menu" : "Open menu"} style={{ background: "none", border: "none", color: "#cec4b0", cursor: "pointer", display: "none", padding: "8px" }}>{menuOpen ? <Icons.X /> : <Icons.Menu />}</button>
    </nav>
    {menuOpen && <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(17,26,38,0.98)", zIndex: 999, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "24px", animation: "fadeIn 0.3s ease" }}>
      {PAGES.map(page => <button key={page} onClick={() => navigate(page)} style={{ background: "none", border: "none", color: currentPage === page ? "#7a9e8a" : "#cec4b0", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", cursor: "pointer", padding: "8px 16px" }}>{PAGE_TITLES[page]}</button>)}
    </div>}
  </>);
}

function HomePage({ setPage }) {
  const nav = (p) => { setPage(p); };
  return (<div>
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 20%, rgba(122,158,138,0.08) 0%, rgba(17,26,38,0) 60%)" }}/>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(17,26,38,0.6), transparent)" }}/>
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(122,158,138,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}/>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", border: "1px solid rgba(122,158,138,0.35)", borderRadius: "24px", marginBottom: "40px", animation: "fadeInUp 0.8s ease 0.2s both" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7a9e8a", animation: "pulse 2.5s infinite" }}/>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a" }}>New Novel — July 21, 2026</span>
        </div>
        <div style={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <img src="/images/books/talking-bone.jpg" alt="The Talking Bone book cover" style={{ width: "clamp(220px, 25vw, 340px)", height: "auto", boxShadow: "0 20px 80px rgba(0,0,0,0.7)", animation: "fadeInUp 0.8s ease 0.3s both" }} />
          <div style={{ textAlign: "center", maxWidth: "500px" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.05, marginBottom: "12px", animation: "fadeInUp 0.8s ease 0.4s both" }}>The Talking Bone</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "rgba(122,158,138,0.85)", fontStyle: "italic", marginBottom: "32px", fontWeight: 300, animation: "fadeInUp 0.8s ease 0.6s both" }}>A novel by Rene Denfeld</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.55)", lineHeight: 1.7, margin: "0 auto 48px", animation: "fadeInUp 0.8s ease 0.8s both" }}>A new literary thriller inspired by her decades of work as a licensed defense investigator, including exonerating innocents from death&nbsp;row.</p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.8s ease 1s both" }}>
              <a href="https://www.barnesandnoble.com/w/the-talking-bone-rene-denfeld/1148536206" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", background: "#5e8272", color: "#f0ece4", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>Pre-Order Now <Icons.ArrowRight /></a>
              <button onClick={() => nav("books")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", background: "transparent", color: "#cec4b0", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500, border: "1px solid rgba(206,196,176,0.2)", cursor: "pointer" }}>All Books</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "fadeInUp 0.8s ease 1.2s both" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(206,196,176,0.25)" }}>Scroll</span>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(122,158,138,0.35), transparent)" }}/>
      </div>
    </section>

    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ color: "#7a9e8a" }}><Icons.Quote /></div>
        <blockquote style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, fontStyle: "italic", color: "#cec4b0", lineHeight: 1.4, margin: "16px 0 24px" }}>Astonishing.</blockquote>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a" }}>Margaret Atwood</p>
      </div>
    </section>

    <section style={{ padding: "60px 24px 100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionDivider />
        <div style={{ marginTop: "60px", display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <img src="/images/author/rene-denfeld-lg.jpg" alt="Rene Denfeld" loading="lazy" style={{ width: "clamp(260px, 30vw, 380px)", height: "auto", flexShrink: 0, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }} />
          <div style={{ flex: "1 1 340px", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "20px" }}>New York Times Hero of the Year</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.2vw, 22px)", color: "rgba(206,196,176,0.7)", lineHeight: 1.8 }}>Rene Denfeld is the award-winning, bestselling author of five novels including The Enchanted and The Child Finder. For almost twenty years, she has worked as a licensed defense investigator. The past Chief Investigator for a public defenders office, she has worked hundreds of cases, including death row exonerations. She is a justice worker, a teacher, and a coach. She lives in Portland, Oregon, where she is the happy parent of adult kids she adopted from foster care.</p>
            <button onClick={() => nav("about")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#7a9e8a", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", marginTop: "28px", padding: "8px 0", borderBottom: "1px solid rgba(122,158,138,0.3)" }}>Read Full Bio <Icons.ArrowRight /></button>
          </div>
        </div>
      </div>
    </section>

    <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(122,158,138,0.07)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "16px" }}>Bibliography</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 400, color: "#cec4b0" }}>The Novels</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
          {BOOKS.slice(0, 4).map(book => (
            <div key={book.id} onClick={() => nav("books")} style={{ padding: "32px", border: "1px solid rgba(122,158,138,0.1)", background: "rgba(28,39,53,0.4)", cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: book.color, opacity: 0.7 }}/>
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <img src={book.cover} alt={`${book.title} cover`} loading="lazy" style={{ width: "80px", height: "auto", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }} />
                <div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(206,196,176,0.35)", letterSpacing: "1px" }}>{book.year}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#cec4b0", margin: "8px 0 12px" }}>{book.title}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", color: "rgba(206,196,176,0.45)", lineHeight: 1.6, fontStyle: "italic" }}>{book.tagline}</p>
                  {book.badge && <span style={{ display: "inline-block", marginTop: "12px", padding: "4px 10px", fontSize: "9px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", border: "1px solid rgba(122,158,138,0.3)" }}>{book.badge}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button onClick={() => nav("books")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", background: "transparent", color: "#cec4b0", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500, border: "1px solid rgba(206,196,176,0.15)", cursor: "pointer" }}>View Complete Bibliography <Icons.ArrowRight /></button>
        </div>
      </div>
    </section>

    <section style={{ padding: "100px 24px", position: "relative", borderTop: "1px solid rgba(122,158,138,0.07)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(122,158,138,0.04) 0%, transparent 60%)" }}/>
      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", color: "#7a9e8a" }}><Icons.Scale /></div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "24px" }}>The Investigation Work</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.3, marginBottom: "24px" }}>Fiction forged in the fire of real justice work</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.55)", lineHeight: 1.8, marginBottom: "32px" }}>For almost twenty years, Rene has worked as a licensed defense investigator. She has worked hundreds of cases, including death row exonerations. Her fiction is not researched from the outside — it is written from the inside. The Enchanted is a death row novel. The Talking Bone is inspired by exoneration work. She lives in these worlds.</p>
        <button onClick={() => nav("justice")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#7a9e8a", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", padding: "8px 0", borderBottom: "1px solid rgba(122,158,138,0.3)" }}>Justice Work <Icons.ArrowRight /></button>
      </div>
    </section>

    <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(122,158,138,0.07)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ color: "#7a9e8a" }}><Icons.Quote /></div>
        <blockquote style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, fontStyle: "italic", color: "#cec4b0", lineHeight: 1.5, margin: "16px 0 24px" }}>So dark yet so exquisite.</blockquote>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(122,158,138,0.7)" }}>Erin Morgenstern, author of The Night Circus</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "14px", color: "rgba(206,196,176,0.35)", marginTop: "4px", fontStyle: "italic" }}>on The Enchanted</p>
      </div>
    </section>
  </div>);
}

function AboutPage({ setPage }) {
  const nav = (p) => { setPage(p); };
  const linkStyle = { display: "inline-flex", alignItems: "center", gap: "8px", color: "#7a9e8a", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", textDecoration: "none", borderBottom: "1px solid rgba(122,158,138,0.3)", paddingBottom: "4px", width: "fit-content" };
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "24px" }}>About the Author</p>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "48px" }}>Rene Denfeld</h1>
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "40px" }}>
      <img src="/images/author/rene-denfeld-2.jpg" alt="Rene Denfeld, author photo by Brian McDonnell" loading="lazy" style={{ width: "260px", height: "auto", flexShrink: 0, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }} />
      <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", color: "rgba(206,196,176,0.8)", lineHeight: 1.8 }}>Rene Denfeld is the award-winning, bestselling author of five novels including The Enchanted and The Child Finder. Her writing has been praised by Margaret Atwood as "astonishing."</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>Her new literary thriller The Talking Bone will be published July 21, 2026 by Harper. It was inspired by her work exonerating innocents.</p>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>For almost twenty years, Rene has worked as a licensed defense investigator. The past Chief Investigator for a public defenders office, she has worked hundreds of cases, including death row exonerations. Rene is a justice worker, a teacher, and a coach.</p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>In 2017 The New York Times named Rene a Hero of the Year and she was awarded the Break The Silence Award in Washington, DC. Her novels have received many prestigious literary awards, including a French Prix, an ALA Medal for Excellence in Fiction, and a listing for the International Dublin Literary Award.</p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>She lives in Portland, Oregon, where she is the happy parent of adult kids she adopted from foster care.</p>
    </div>
    <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <a href="https://www.nytimes.com/2017/08/11/style/modern-love-four-castaways-make-a-family.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>Read Rene's viral Modern Love story in The New York Times <Icons.ExternalLink /></a>
      <a href="https://www.guernicamag.com/rene-denfeld-what-happens-after-the-trauma/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Read an interview with Rene in Guernica Magazine <Icons.ExternalLink /></a>
    </div>
    <div style={{ marginTop: "80px" }}><SectionDivider />
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#cec4b0", textAlign: "center", margin: "48px 0 32px" }}>Investigation. Fiction. Family.</h2>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8, textAlign: "center" }}>There is a through-line that connects Rene's investigation work to her fiction to her foster parenting to her advocacy. Her novels feature a recurring character, Naomi, a private investigator who finds missing children — a character drawn from her own experience. The books are set in Oregon's forests, Portland's streets, and remote coastal communities. They are Pacific Northwest to the bone. Her nonfiction — including All God's Children, about street families and homeless youth in Portland — is based on a decade of immersive work following the evolution of street family culture. Everything she writes comes from the world she lives in.</p>
    </div>
    <div style={{ marginTop: "80px" }}><SectionDivider />
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", textAlign: "center", margin: "48px 0 32px" }}>Recognition</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
        {["New York Times Hero of the Year (2017)","Break The Silence Award, Washington DC","French Prix du Premier Roman Etranger","ALA Medal for Excellence in Fiction","International Dublin Literary Award Listing","Carnegie Listing","No. 1 Fiction Bestseller, Powell's Books","Indie Next Pick"].map((a,i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", border: "1px solid rgba(122,158,138,0.08)", background: "rgba(28,39,53,0.3)" }}>
            <div style={{ color: "#7a9e8a", flexShrink: 0, marginTop: "2px" }}><Icons.Star /></div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(206,196,176,0.65)", lineHeight: 1.5 }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(206,196,176,0.25)", marginTop: "60px", textAlign: "center" }}>Photos by Brian McDonnell</p>
  </div></section></div>);
}

function BooksPage() {
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "900px", margin: "0 auto" }}>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "24px" }}>Bibliography</p>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "16px" }}>Novels</h1>
    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.45)", marginBottom: "60px" }}>Published by Harper (HarperCollins)</p>
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {BOOKS.map(book => (
        <div key={book.id} style={{ padding: "40px", border: "1px solid rgba(122,158,138,0.1)", background: "rgba(28,39,53,0.35)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: book.color }}/>
          <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "24px" }}>
            <img src={book.cover} alt={`${book.title} book cover`} loading="lazy" style={{ width: "140px", height: "auto", flexShrink: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }} />
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(206,196,176,0.35)", letterSpacing: "1px" }}>{book.year} / {book.publisher}</span>
                {book.badge && <span style={{ padding: "2px 8px", fontSize: "9px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", border: "1px solid rgba(122,158,138,0.3)" }}>{book.badge}</span>}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 400, color: "#cec4b0", marginBottom: "12px" }}>{book.title}</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", fontStyle: "italic", color: "rgba(122,158,138,0.7)", marginBottom: "16px" }}>{book.tagline}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", color: "rgba(206,196,176,0.55)", lineHeight: 1.8 }}>{book.description}</p>
            </div>
          </div>
          {book.quotes && book.quotes.length > 0 && <div style={{ marginBottom: "24px" }}>{book.quotes.map((q, qi) => (
            <div key={qi} style={{ padding: "20px", borderLeft: `2px solid ${book.color}`, marginBottom: "16px", background: "rgba(17,26,38,0.5)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", fontStyle: "italic", color: "rgba(206,196,176,0.65)", lineHeight: 1.7, marginBottom: "8px" }}>"{q.text}"</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#7a9e8a" }}>— {q.author}{q.source && <span style={{ color: "rgba(206,196,176,0.35)" }}>, {q.source}</span>}</p>
            </div>
          ))}</div>}
          {book.awards && <div style={{ marginBottom: "24px" }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "12px" }}>Awards & Honors</p><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{book.awards.map((a, ai) => <span key={ai} style={{ padding: "6px 12px", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", color: "rgba(206,196,176,0.55)", border: "1px solid rgba(122,158,138,0.1)", lineHeight: 1.4 }}>{a}</span>)}</div></div>}
          {book.extras && <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>{book.extras.map((e, ei) => <span key={ei} style={{ padding: "6px 12px", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", color: "rgba(206,196,176,0.55)", border: "1px solid rgba(122,158,138,0.1)" }}>{e}</span>)}</div>}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>{Object.entries(book.links).map(([s, u]) => <a key={s} href={u} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", textTransform: "capitalize", color: "#cec4b0", textDecoration: "none", border: "1px solid rgba(206,196,176,0.12)" }}>{s === "ibooks" ? "Apple Books" : s === "barnes" ? "Barnes & Noble" : s} <Icons.ExternalLink /></a>)}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: "80px" }}><SectionDivider />
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "32px", fontWeight: 400, color: "#cec4b0", textAlign: "center", margin: "48px 0 40px" }}>Nonfiction</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>{NONFICTION.map((b, i) => (
        <div key={i} style={{ padding: "24px 32px", border: "1px solid rgba(122,158,138,0.08)", background: "rgba(28,39,53,0.25)" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 400, color: "#cec4b0", marginBottom: "8px" }}>{b.title}</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px", color: "rgba(206,196,176,0.45)", lineHeight: 1.6 }}>{b.description}</p>
        </div>
      ))}</div>
    </div>
    <div style={{ marginTop: "60px", padding: "32px", border: "1px solid rgba(122,158,138,0.15)", textAlign: "center" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "12px" }}>Also Forthcoming</p>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", fontWeight: 400, color: "#cec4b0", fontStyle: "italic" }}>The Strawberry Palace</h3>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px", color: "rgba(206,196,176,0.35)", marginTop: "8px" }}>Details to come</p>
    </div>
  </div></section></div>);
}

function JusticePage() {
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#7a9e8a" }}><Icons.Scale /><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a" }}>Justice Work</p></div>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "48px" }}>Investigation & Advocacy</h1>
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", color: "rgba(206,196,176,0.9)", lineHeight: 1.8 }}>For almost twenty years, Rene has worked as a licensed defense investigator in the state of Oregon. She is the past Chief Investigator for a public defenders office, and has worked hundreds of cases, including death row exonerations.</p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>She is available for mitigation and fact work, and is versed in criminal, civil, and federal work — from juvenile to capital. She maintains the strictest confidentiality in her investigative work.</p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>In 2017, Rene was awarded the Break The Silence Award in Washington, DC for her advocacy work. The same year, The New York Times named her a Hero of the Year.</p>
    </div>
    <div style={{ marginTop: "60px", padding: "40px", border: "1px solid rgba(122,158,138,0.12)", background: "rgba(28,39,53,0.35)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: "linear-gradient(to right, #7a9e8a, transparent)" }}/>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", fontWeight: 400, color: "#cec4b0", marginBottom: "20px" }}>From Investigation to Fiction</h3>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.55)", lineHeight: 1.8 }}>Rene's fiction is directly informed by her investigation work. The Enchanted is a death row novel written from inside that world. The Child Finder and The Butterfly Girl feature Naomi, a private investigator who finds missing children — a character drawn from Rene's own life. The Talking Bone is inspired by her exoneration work. She is not researching these worlds from the outside. She lives in them. This is what makes her fiction singular.</p>
    </div>
    <div style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
      {[{l:"Years Active",v:"20+"},{l:"Cases Worked",v:"Hundreds"},{l:"Licensed In",v:"State of Oregon"}].map((s,i) => (
        <div key={i} style={{ textAlign: "center", padding: "24px", background: "rgba(28,39,53,0.3)", border: "1px solid rgba(122,158,138,0.06)" }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", color: "#7a9e8a", marginBottom: "8px" }}>{s.v}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(206,196,176,0.35)" }}>{s.l}</p>
        </div>
      ))}
    </div>
    <div style={{ marginTop: "60px" }}><SectionDivider /><div style={{ marginTop: "48px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px", color: "#7a9e8a" }}><Icons.Heart /></div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", fontWeight: 400, color: "#cec4b0", marginBottom: "20px" }}>Foster Care & Family</h3>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(206,196,176,0.55)", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>Rene is a foster adoptive mother. She adopted her children from foster care and has fostered additional kids. Her viral Modern Love essay in The New York Times documents her family story. This personal dimension adds extraordinary authenticity to her fiction about lost children, broken systems, and the possibility of redemption.</p>
      <a href="https://www.nytimes.com/2017/08/11/style/modern-love-four-castaways-make-a-family.html" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#7a9e8a", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", textDecoration: "none", marginTop: "20px", letterSpacing: "1px" }}>Read the Modern Love Essay <Icons.ExternalLink /></a>
    </div></div>
  </div></section></div>);
}

function SpeakingPage() {
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#7a9e8a" }}><Icons.Mic /><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a" }}>Speaking, Teaching & Coaching</p></div>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(37px, 5vw, 55px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "48px" }}>Engage Rene</h1>
    <div style={{ marginBottom: "60px" }}>
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <img src="/images/author/rene-denfeld-3.jpg" alt="Rene Denfeld speaking at a literary event" loading="lazy" style={{ width: "220px", height: "auto", flexShrink: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }} />
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "31px", fontWeight: 400, color: "#cec4b0", marginBottom: "20px" }}>Speaking</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>Rene regularly speaks on justice and trauma-related issues. Her speaking engagements include large nonprofit events such as Break the Silence events in Washington, DC, fundraisers such as the Community for Affordable Housing, and many literary events and festivals. She is a dynamic and touching speaker. She has appeared on many podcasts.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(206,196,176,0.4)", marginTop: "16px" }}>Represented by Authors Unbound</p>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: "60px", padding: "32px", border: "1px solid rgba(122,158,138,0.12)", background: "rgba(28,39,53,0.3)" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "27px", fontWeight: 400, color: "#cec4b0", marginBottom: "20px" }}>Investigation Services</h2>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>Rene is licensed as an investigator in the state of Oregon. She is available for mitigation and fact work, and is versed in criminal, civil, and federal work — from juvenile to capital. She maintains the strictest confidentiality in her investigative work.</p>
    </div>
    <div style={{ marginBottom: "60px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "27px", fontWeight: 400, color: "#cec4b0", marginBottom: "20px" }}>Book Coaching</h2>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.6)", lineHeight: 1.8 }}>In addition to her speaking and investigative work, Rene occasionally accepts book coaching clients. She has successfully coached clients from the first page to landing a publishing deal.</p>
    </div>
    <div style={{ padding: "32px", border: "1px solid rgba(122,158,138,0.12)", background: "rgba(28,39,53,0.25)" }}>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "20px" }}>Speaking Topics</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {["Justice & Criminal Defense","Death Penalty Investigation","Trauma & Resilience","Foster Care & Adoption","The Craft of Writing","Literary Events & Festivals","Nonprofit Fundraising","Advocacy & Social Justice"].map((t,i) => <span key={i} style={{ padding: "8px 16px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: "rgba(206,196,176,0.55)", border: "1px solid rgba(122,158,138,0.1)" }}>{t}</span>)}
      </div>
    </div>
  </div></section></div>);
}

function PressPage() {
  const items = [
    {s:"The New York Times",t:"Honor",d:"Named Rene Denfeld a Hero of the Year",y:"2017"},
    {s:"Margaret Atwood",t:"Praise",d:"\"Astonishing\" — on her writing. \"A heartbreaking, finger-gnawing, and yet ultimately hopeful novel by the amazing Rene Denfeld\" — on The Butterfly Girl"},
    {s:"Break The Silence Award",t:"Award",d:"Awarded in Washington, DC for advocacy work",y:"2017"},
    {s:"The New York Times Book Review",t:"Review",d:"Called The Child Finder \"It's 'Deliverance' encased in ice\"",y:"2017"},
    {s:"Powell's Books",t:"Bestseller",d:"The Child Finder was the No. 1 fiction bestseller in its first week",y:"2017"},
    {s:"Erin Morgenstern",t:"Praise",d:"\"So dark yet so exquisite\" — on The Enchanted"},
    {s:"Donald Ray Pollock",t:"Praise",d:"\"Rene Denfeld is a genius\" — on The Enchanted"},
    {s:"Katherine Dunn",t:"Praise",d:"\"A jubilant celebration that explores human darkness with profound lyric tenderness\" — on The Enchanted"},
    {s:"Elizabeth Hand",t:"Praise",d:"\"Rene Denfeld is one of the handful of living writers I most admire, and Sleeping Giants may be her masterpiece\" — on Sleeping Giants"},
    {s:"French Prix du Premier Roman Etranger",t:"Award",d:"Awarded for The Enchanted"},
    {s:"ALA Medal for Excellence in Fiction",t:"Award",d:"Awarded for The Enchanted"},
    {s:"Center for Fiction First Novel Prize",t:"Finalist",d:"Finalist for The Enchanted"},
    {s:"International Dublin Literary Award (IMPAC)",t:"Listing",d:"Listed for The Enchanted"},
    {s:"Carnegie Medal",t:"Listing",d:"Listed for The Enchanted"},
    {s:"London & Edinburgh Stage",t:"Adaptation",d:"The Enchanted adapted for theatrical production"},
    {s:"All Rochester Reads",t:"Selection",d:"The Enchanted selected for community read"},
    {s:"The New York Times / Modern Love",t:"Essay",d:"Viral personal essay on family and foster adoption",y:"2017",l:"https://www.nytimes.com/2017/08/11/style/modern-love-four-castaways-make-a-family.html"},
    {s:"Guernica Magazine",t:"Interview",d:"In-depth interview on trauma and writing",l:"https://www.guernicamag.com/rene-denfeld-what-happens-after-the-trauma/"},
    {s:"Indie Next",t:"Selection",d:"The Child Finder selected as an Indie Next pick",y:"2017"},
    {s:"Booklist",t:"Review",d:"\"Aptly unclassifiable, Denfeld's compulsively readable novel calls on elements of horror, mystery, fairy tales, and even romance\""},
  ];
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "900px", margin: "0 auto" }}>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "24px" }}>Press & Recognition</p>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(38px, 5vw, 56px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "60px" }}>Awards, Reviews & Praise</h1>
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {items.map((item,i) => (
        <div key={i} className="press-item" style={{ padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "baseline", borderBottom: "1px solid rgba(122,158,138,0.06)" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", minWidth: "100px" }}>{item.t}</span>
          <div style={{ flex: "1 1 200px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#cec4b0", fontWeight: 500 }}>{item.s}</span><p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", color: "rgba(206,196,176,0.45)", marginTop: "2px", lineHeight: 1.5 }}>{item.d}</p></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>{item.y && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(206,196,176,0.25)" }}>{item.y}</span>}{item.l && <a href={item.l} target="_blank" rel="noopener noreferrer" style={{ color: "#7a9e8a" }} aria-label={`Read at ${item.s}`}><Icons.ExternalLink /></a>}</div>
        </div>
      ))}
    </div>
  </div></section></div>);
}

function EventsPage() {
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#7a9e8a" }}><Icons.Calendar /><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a" }}>Events</p></div>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(37px, 5vw, 55px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "48px" }}>Appearances & Events</h1>
    <div style={{ padding: "40px", border: "1px solid rgba(122,158,138,0.2)", background: "rgba(28,39,53,0.4)", marginBottom: "48px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: "#7a9e8a" }}/>
      <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <img src="/images/books/talking-bone.jpg" alt="The Talking Bone cover" loading="lazy" style={{ width: "120px", height: "auto", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }} />
        <div style={{ flex: "1 1 280px" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a" }}>Book Launch</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "31px", fontWeight: 400, color: "#cec4b0", margin: "12px 0" }}>The Talking Bone</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.55)", marginBottom: "8px" }}>July 21, 2026 — Published by Harper</p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", color: "rgba(206,196,176,0.45)", lineHeight: 1.7 }}>Tour dates and launch events to be announced. Follow Rene on social media or check back here for updates.</p>
        </div>
      </div>
    </div>
    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.55)", lineHeight: 1.8, marginBottom: "32px" }}>Rene appears regularly at literary events and festivals, bookstores, libraries, and nonprofit events. She has appeared at Literary Arts in Portland, Powell's Books, and many other venues across the country.</p>
    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.55)", lineHeight: 1.8 }}>For booking inquiries, please visit the contact page or reach out through Authors Unbound.</p>
  </div></section></div>);
}

function ContactPage() {
  const cardStyle = { padding: "32px", border: "1px solid rgba(122,158,138,0.12)", background: "rgba(28,39,53,0.3)", textAlign: "center" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "16px" };
  const valStyle = { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", color: "rgba(206,196,176,0.7)" };
  return (<div style={{ paddingTop: "120px" }}><section style={{ padding: "0 24px 80px" }}><div style={{ maxWidth: "700px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#7a9e8a" }}><Icons.Mail /><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a9e8a" }}>Contact</p></div>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "#cec4b0", lineHeight: 1.1, marginBottom: "48px" }}>Get in Touch</h1>
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={cardStyle}><h3 style={labelStyle}>General Inquiries</h3><a href="mailto:renedenfeld@gmail.com" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "21px", color: "#cec4b0", textDecoration: "none", borderBottom: "1px solid rgba(122,158,138,0.3)", paddingBottom: "2px" }}>renedenfeld@gmail.com</a></div>
      <div style={cardStyle}><h3 style={labelStyle}>Publisher</h3><p style={valStyle}>Harper (HarperCollins)</p></div>
      <div style={cardStyle}><h3 style={labelStyle}>Speaking Representation</h3><p style={valStyle}>Authors Unbound</p></div>
      <div style={cardStyle}><h3 style={labelStyle}>Location</h3><div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#7a9e8a", justifyContent: "center" }}><Icons.MapPin /><p style={valStyle}>Portland, Oregon</p></div></div>
      <div style={cardStyle}><h3 style={labelStyle}>Follow Rene</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {[{i:<Icons.Instagram />,u:"https://www.instagram.com/rdenfeld/",l:"Instagram"},{i:<Icons.Facebook />,u:"https://www.facebook.com/rene.denfeld.9",l:"Facebook"},{i:<Icons.Twitter />,u:"https://twitter.com/ReneDenfeld",l:"X (Twitter)"}].map((s,i) => (
            <a key={i} href={s.u} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(206,196,176,0.55)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", padding: "8px 16px", border: "1px solid rgba(122,158,138,0.1)" }}>{s.i} {s.l}</a>
          ))}
        </div>
      </div>
    </div>
  </div></section></div>);
}

function Footer({ setPage }) {
  const nav = (p) => { setPage(p); };
  return (<footer style={{ borderTop: "1px solid rgba(122,158,138,0.07)", padding: "60px 24px 40px" }}>
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px", marginBottom: "60px" }}>
        <div><p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#cec4b0", marginBottom: "4px" }}>Rene Denfeld</p><p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px", color: "rgba(206,196,176,0.35)", fontStyle: "italic" }}>Author & Investigator</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(206,196,176,0.25)", marginTop: "12px" }}>Portland, Oregon</p></div>
        <div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "16px" }}>Navigate</p>{["about","books","justice","press"].map(p => <button key={p} onClick={() => nav(p)} style={{ display: "block", background: "none", border: "none", color: "rgba(206,196,176,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", cursor: "pointer", padding: "4px 0", marginBottom: "4px" }}>{PAGE_TITLES[p]}</button>)}</div>
        <div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "16px" }}>Connect</p><div style={{ display: "flex", gap: "12px" }}><a href="https://www.instagram.com/rdenfeld/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(206,196,176,0.45)" }}><Icons.Instagram /></a><a href="https://www.facebook.com/rene.denfeld.9" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(206,196,176,0.45)" }}><Icons.Facebook /></a><a href="https://twitter.com/ReneDenfeld" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(206,196,176,0.45)" }}><Icons.Twitter /></a></div></div>
        <div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a9e8a", marginBottom: "16px" }}>New Release</p><p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", color: "#cec4b0", fontStyle: "italic" }}>The Talking Bone</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(206,196,176,0.35)", marginTop: "4px" }}>July 21, 2026 — Harper</p></div>
      </div>
      <div style={{ borderTop: "1px solid rgba(122,158,138,0.06)", paddingTop: "20px", textAlign: "center" }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(206,196,176,0.18)", letterSpacing: "1px" }}>&copy; {new Date().getFullYear()} Rene Denfeld. All rights reserved. Published by Harper (HarperCollins).</p></div>
    </div>
  </footer>);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  useEffect(() => {
    window.scrollTo(0, 0);
    const base = "Rene Denfeld";
    document.title = currentPage === "home" ? `${base} — Author & Investigator` : `${PAGE_TITLES[currentPage]} — ${base}`;
  }, [currentPage]);
  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage setPage={setCurrentPage} />;
      case "about": return <AboutPage setPage={setCurrentPage} />;
      case "books": return <BooksPage />;
      case "justice": return <JusticePage />;
      case "speaking": return <SpeakingPage />;
      case "press": return <PressPage />;
      case "events": return <EventsPage />;
      case "contact": return <ContactPage />;
      default: return <HomePage setPage={setCurrentPage} />;
    }
  };
  return (
    <div style={{ minHeight: "100vh", background: "#111a26", color: "#cec4b0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(122,158,138,0.3); color: #cec4b0; }
        html { -webkit-font-smoothing: antialiased; }
        a:hover { opacity: 0.85; }
        button:hover { opacity: 0.85; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
        @media (min-width: 769px) { .desktop-nav { display: flex !important; } .mobile-menu-btn { display: none !important; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111a26; }
        ::-webkit-scrollbar-thumb { background: rgba(122,158,138,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(122,158,138,0.4); }
      `}</style>
      <GrainOverlay />
      <Navigation currentPage={currentPage} setPage={setCurrentPage} />
      <main style={{ animation: "fadeIn 0.5s ease" }}>{renderPage()}</main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
}
