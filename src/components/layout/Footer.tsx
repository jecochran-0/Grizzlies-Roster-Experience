const FOOTER_COLUMNS = [
  {
    heading: 'Tickets',
    links: ['Buy Tickets', 'Season Tickets', 'Group Tickets', 'Suites & Premium', 'Ticket Policies'],
  },
  {
    heading: 'Team',
    links: ['Roster', 'Coaches', 'Schedule', 'Stats', 'History'],
  },
  {
    heading: 'Community',
    links: ['Foundation', 'Youth Basketball', 'Programs', 'Partners', 'Fan Experiences'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact Us', 'Advertise'],
  },
]

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.75a4.84 4.84 0 0 1-1.02-.06z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1829' }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-white">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/50 transition-colors hover:text-white/80"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-white">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 text-white/60">
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-white">
                <IconFacebook />
              </a>
              <a href="#" aria-label="X / Twitter" className="transition-colors hover:text-white">
                <IconX />
              </a>
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
                <IconInstagram />
              </a>
              <a href="#" aria-label="YouTube" className="transition-colors hover:text-white">
                <IconYouTube />
              </a>
              <a href="#" aria-label="TikTok" className="transition-colors hover:text-white">
                <IconTikTok />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} NBA Media Ventures, LLC. All rights reserved.</p>
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap gap-4">
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility', 'AdChoices'].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-white/70">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
