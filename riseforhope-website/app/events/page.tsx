import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUpcomingEvents, getPastEvents } from '../lib/events';

export default function EventsIndex() {
    const upcomingEvents = getUpcomingEvents();
    const pastEvents = getPastEvents();

    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px' }}>

                {/* FIXED: Wrapper div ensures it stays on its own line */}
                <div style={{ marginBottom: '40px' }}>
                    <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                        ← Back to Home
                    </Link>
                </div>

                {/* --- UPCOMING SECTION --- */}
                <div className="section-label">Calendar</div>
                <h1 className="pathways-heading">Upcoming Events</h1>

                {upcomingEvents.length > 0 ? (
                    <div className="pathways-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                        {upcomingEvents.map((event) => (
                            <div key={event.slug} className="pathway-card" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#f4f4f4', padding: '0' }}>
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    backgroundImage: `url('${event.image || "https://res.cloudinary.com/dvexnl19a/image/upload/v1764800787/love-you-hand-gesturel_nz8ntk.png"}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div style={{ padding: '30px' }}>
                                    <span className="item-date">{event.date}</span>
                                    <h3 className="item-headline" style={{ border: 'none', display: 'block', margin: '10px 0' }}>{event.title}</h3>
                                    <p className="item-location" style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                                        📍 {event.location}
                                    </p>
                                    <p className="item-excerpt">{event.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mission-text">No upcoming events scheduled at the moment.</p>
                )}

                {/* --- PAST EVENTS SECTION --- */}
                <div style={{ marginTop: '100px' }}>
                    <h2 className="mission-title" style={{ fontSize: '2rem' }}>Past Events</h2>
                    <p className="mission-text">A look back at our community gatherings.</p>

                    <div className="news-list" style={{ maxWidth: '800px' }}>
                        {pastEvents.map((event) => (
                            <div key={event.slug} className="news-list-item" style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                                <span className="item-date" style={{ minWidth: '120px' }}>{event.date}</span>
                                <div>
                                    <span className="item-headline" style={{ fontSize: '1.2rem' }}>{event.title}</span>
                                    <p className="item-location" style={{ margin: '5px 0 0' }}>{event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}