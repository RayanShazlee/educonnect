import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-retro-border bg-retro-background/80 backdrop-blur-sm">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-press-start text-lg text-retro-primary mb-4">EduConnect</h3>
            <p className="font-vt323 text-lg">
              Learn, connect, and grow with our educational platform.
            </p>
          </div>
          <div>
            <h4 className="font-press-start text-sm text-retro-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2 font-vt323 text-lg">
              <li>
                <a href="/about" className="hover:text-retro-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-retro-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-retro-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-press-start text-sm text-retro-secondary mb-4">Resources</h4>
            <ul className="space-y-2 font-vt323 text-lg">
              <li>
                <a href="/blog" className="hover:text-retro-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/tutorials" className="hover:text-retro-accent transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/guides" className="hover:text-retro-accent transition-colors">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-press-start text-sm text-retro-secondary mb-4">Connect</h4>
            <ul className="space-y-2 font-vt323 text-lg">
              <li>
                <a href="https://twitter.com" className="hover:text-retro-accent transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:text-retro-accent transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://github.com" className="hover:text-retro-accent transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-retro-border">
          <p className="font-vt323 text-center text-lg">
            © {new Date().getFullYear()} EduConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 