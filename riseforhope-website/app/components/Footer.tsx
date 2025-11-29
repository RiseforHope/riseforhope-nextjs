import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-logo-area">
                {/* UPDATED: Replaced text with White Logo */}
                <img
                    src="https://res.cloudinary.com/dvexnl19a/image/upload/v1764380694/logo-tree-white-r4h_2x_rep1gq.png"
                    alt="Rise For Hope"
                    style={{ height: '80px', width: 'auto', margin: '0 auto' }}
                />
            </div>

            <div className="footer-address">
                East Greenville, PA  |  United States<br />
                T: +1 (917) 473-1182
            </div>

            <ul className="footer-links" style={{ marginTop: '60px' }}>
                <li><Link href="/about">About Us</Link></li>
                <li className="separator">.</li>
                <li><Link href="/volunteer">Volunteer</Link></li>
                <li className="separator">.</li>
                <li><Link href="/contact">Contact</Link></li>
                <li className="separator">.</li>
                <li><Link href="/policies">Policy & Terms</Link></li>
            </ul>

            <div className="footer-bottom">
                <div className="copyright">© {currentYear} Rise for Hope</div>
                <div className="charity-info">Registered Charity No. 122605  |  EIN: 33-4151218</div>
                <div className="site-credit">Site by Brinl, LLC</div>
            </div>
        </footer>
    );
}