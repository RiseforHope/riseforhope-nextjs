'use client';
import Link from 'next/link';

export default function NewsEvents() {
    const news = [
        { id: 1, date: 'OCT 24, 2025', title: 'New Partnership Announced with Children\'s Hospital', link: '/blog/partnership' },
        { id: 2, date: 'NOV 01, 2025', title: 'Volunteer Spotlight: Sarah\'s Story', link: '/blog/volunteer' },
        { id: 3, date: 'NOV 15, 2025', title: 'End of Year Fundraising Goal Set', link: '/blog/fundraising' },
    ];

    const events = [
        { id: 1, date: 'DEC 05, 2025', title: 'Annual Holiday Gala & Auction', location: 'Grand Ballroom, NY', link: '/events' },
        { id: 2, date: 'JAN 12, 2026', title: 'Community Fun Run for Hope', location: 'Central Park', link: '/events' },
        { id: 3, date: 'FEB 14, 2026', title: 'Valentine\'s Day Virtual Concert', location: 'Online Event', link: '/events' },
    ];

    return (
        <section id="news-events" className="news-events-section">
            <div className="max-w-container">
                <div className="news-events-grid">

                    {/* NEWS COLUMN */}
                    <div className="ne-column">
                        <div className="section-label">News</div>
                        <div
                            className="featured-image-container"
                            style={{ backgroundImage: "url('https://res.cloudinary.com/dvexnl19a/image/upload/v1764050764/IMG_0979_kddbxw.jpg')" }}
                        >
                            <div className="notch-up"></div>
                        </div>

                        <div className="ne-list">
                            {news.map((item) => (
                                <Link href={item.link} key={item.id} className="news-list-item" style={{ display: 'block', textDecoration: 'none' }}>
                                    <span className="item-date">{item.date}</span>
                                    <h3 className="item-headline">{item.title}</h3>
                                </Link>
                            ))}
                        </div>
                        <Link href="/blog" className="btn-yellow">
                            See All News <span className="btn-yellow-arrow"></span>
                        </Link>
                    </div>

                    {/* EVENTS COLUMN */}
                    <div className="ne-column">
                        <div className="section-label">Calendar</div>
                        <div
                            className="featured-image-container"
                            style={{ backgroundImage: "url('https://res.cloudinary.com/dvexnl19a/image/upload/v1764050764/IMG_0979_kddbxw.jpg')" }}
                        >
                            <div className="notch-up"></div>
                        </div>

                        <div className="ne-list">
                            {events.map((item) => (
                                <Link href={item.link} key={item.id} className="events-list-item" style={{ display: 'block', textDecoration: 'none' }}>
                                    <div>
                                        <span className="item-date">{item.date}</span>
                                        <h3 className="item-headline">{item.title}</h3>
                                    </div>
                                    <span className="item-location">{item.location}</span>
                                </Link>
                            ))}
                        </div>
                        <Link href="/events" className="btn-yellow">
                            See All Events <span className="btn-yellow-arrow"></span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}