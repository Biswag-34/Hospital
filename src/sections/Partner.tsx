

type Partner = {
  name: string
  logo: string
  href?: string
  needsBackdrop?: boolean // <— for logos that look invisible on light bg
}

const partners: Partner[] = [
  { name: "Timken Engineering & Research India Pvt Ltd", logo: "/partners/brand1.svg", href: "#" },
  { name: "GE aerospace", logo: "/partners/brand2.svg", href: "#", needsBackdrop: true },
  { name: "Sarasraj Health assistance", logo: "/partners/brand3.png", href: "#", needsBackdrop: true },
  { name: "Hatti Kaapi pvt ltd", logo: "/partners/brand4.png", href: "#", needsBackdrop: true },
  { name: "Nayapada Healing Solutions pvt ltd", logo: "/partners/brand5.png", href: "#" },
]

function PartnerTile({ p }: { p: Partner }) {
  const inner = (
    <div className="bp-tile" aria-label={p.name}>
      <div className={`bp-logoArea ${p.needsBackdrop ? "bp-logoArea--halo" : ""}`}>
        <img
          className={`bp-logo ${p.needsBackdrop ? "bp-logo--boost" : ""}`}
          src={p.logo}
          alt={`${p.name} logo`}
          loading="lazy"
        />
      </div>

      <div className="bp-label" title={p.name}>
        {p.name}
      </div>
    </div>
  )

  return p.href ? (
    <a className="bp-link" href={p.href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  )
}

export default function BrandPartnersStrip() {
  return (
    <section className="bp" aria-label="Brand partners">
      <div className="bp-inner">
        <div className="bp-head">
          <p className="bp-kicker">Trusted partners</p>
          <div className="bp-rule" aria-hidden="true" />
        </div>

        <div className="bp-grid" role="list" aria-label="Partner logos and names">
          {partners.map((p) => (
            <div className="bp-cell" role="listitem" key={p.name}>
              <PartnerTile p={p} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bp{
          background: var(--bg-section);
          padding: clamp(18px, 3vw, 28px) 0;
        }

        .bp-inner{
          width: min(1200px, calc(100% - 32px));
          margin: 0 auto;
        }

        .bp-head{
          display:flex;
          align-items:center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .bp-kicker{
          margin:0;
          font-size: 22px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
          font-weight: 700;
        }

        .bp-rule{
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(96,42,54,0.10) 0%,
            var(--surface-border) 40%,
            rgba(96,42,54,0.10) 100%
          );
        }

        .bp-grid{
          display:grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
        }

        .bp-cell{ min-width: 0; }

        .bp-link{
          display:block;
          text-decoration:none;
          color: inherit;
        }

        .bp-tile{
          background: var(--surface);
          border: 1px solid rgba(96,42,54,0.14);
          border-radius: 20px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);

          padding: 12px 8px 2px;
          height: 150px;

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;

          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease;
        }

        .bp-link:hover .bp-tile{
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(106,46,58,0.14);
          border-color: rgba(96,42,54,0.28);
          background: color-mix(in srgb, var(--surface) 84%, var(--primary-soft));
        }

        /* Logo stage */
        .bp-logoArea{
          width: 100%;
          height: 92px;
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom: 10px;
          position: relative;
          isolation: isolate; /* keeps halo behind logo cleanly */
        }

        /* ✅ Soft halo — NOT a box (no border, no rectangle) */
        .bp-logoArea--halo::before{
          content:"";
          position:absolute;
          inset: 10px 18px 18px;
          border-radius: 999px;
          background:
            radial-gradient(
              closest-side,
              rgba(106,46,58,0.18) 0%,
              rgba(106,46,58,0.08) 42%,
              rgba(106,46,58,0.00) 72%
            );
          filter: blur(2px);
          z-index: 0;
        }

        .bp-logo{
          max-width: 180px;
          max-height: 72px;
          width: auto;
          height: auto;
          object-fit: contain;
          z-index: 1;

          /* default refined look */
          filter: contrast(1.18) brightness(0.92);
          opacity: 0.98;
        }

        /* ✅ Extra boost for “invisible” transparent logos */
        .bp-logo--boost{
          mix-blend-mode: multiply;
          filter:
            contrast(1.35)
            brightness(0.78)
            drop-shadow(0 2px 10px rgba(106,46,58,0.22));
        }

        .bp-label{
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 650;
          color: var(--text-body);
          line-height: 1.25;

          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }

        @media (max-width: 980px){
          .bp-grid{ grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 640px){
          .bp-grid{ grid-template-columns: repeat(2, 1fr); }
          .bp-tile{ height: 142px; border-radius: 18px; }
          .bp-logoArea{ height: 86px; }
          .bp-logo{ max-width: 170px; max-height: 68px; }
        }

        @media (max-width: 420px){
          .bp-grid{ grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce){
          .bp-tile{ transition: none; }
        }
      `}</style>
    </section>
  )
}
