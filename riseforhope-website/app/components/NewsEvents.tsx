'use client';
import Link from 'next/link';

export default function NewsEvents() {
    const news = [
        { id: 1, date: 'NOV 26, 2025', title: 'Hope Delivered: Donations Reached Families This Week', link: '/blog/partnership' },
        { id: 2, date: 'NOV 19, 2025', title: 'Assembly Day: Thanksgiving Baskets Packed with Care', link: '/blog/volunteer' },
        { id: 3, date: 'OCT 5, 2025', title: 'The Thanksgiving Fundraiser Begins', link: '/blog/fundraising' },
        { id: 4, date: 'JULY 16, 2025', title: 'In the Community: Local Newspaper Shares Rise for Hope', link: '/blog/fundraising' },
    ];

    const events = [
        { id: 1, date: 'NOV 25, 2025', title: 'Volunteer Packing Day: Christmas Support Drive', location: 'Pennsburg, PA', link: '/events' },
        { id: 2, date: 'JULY 6, 2026', title: 'Community Fundraiser (Small Event, Real Impact)', location: 'East Greenville, PA', link: '/events' },
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
                            style={{ backgroundImage: "url('https://res.cloudinary.com/dvexnl19a/image/upload/v1764800787/love-you-hand-gesturel_nz8ntk.png')" }}
                        >
                            <div className="notch-up"></div>
                        </div>

                        <div className="ne-list">
                            {/* slice(0, 2) limits this to the first 2 items */}
                            {news.slice(0, 2).map((item) => (
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
                            style={{ backgroundImage: "url('https://res.cloudinary.com/dvexnl19a/image/upload/v1764802144/girl-decorating-a-christmas-tree-in-the-snow-528-smartphone-wallpaper_y81pgh.png')" }}
                        >
                            <div className="notch-up"></div>
                        </div>

                        <div className="ne-list">
                            {/* slice(0, 2) limits this to the first 2 items */}
                            {events.slice(0, 2).map((item) => (
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