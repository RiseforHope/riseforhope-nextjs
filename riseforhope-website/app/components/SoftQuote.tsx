'use client';

interface SoftQuoteProps {
    text?: string;
    author?: string;
    role?: string;
}

export default function SoftQuote({
                                      text = "We don't just offer financial aid; we offer a hand to hold. When a family feels like they are falling, we are there to catch them.",
                                      author = "Rise for Hope",
                                      role = "Community"
                                  }: SoftQuoteProps) {
    return (
        <section className="soft-quote-section">
            <div className="soft-quote-card">

                {/* Opening Quote */}
                <span className="quote-mark quote-open">“</span>

                {/* The Italic Text */}
                <p className="soft-quote-text">
                    {text}
                </p>

                {/* Closing Quote */}
                <span className="quote-mark quote-close">”</span>

                {/* Hidden elements (kept in code but hidden by CSS if you change your mind later) */}
                <div className="soft-quote-divider"></div>
                <footer className="soft-quote-author">
                    <span className="author-name">{author}</span>
                    <span className="author-role">{role}</span>
                </footer>
            </div>
        </section>
    );
}