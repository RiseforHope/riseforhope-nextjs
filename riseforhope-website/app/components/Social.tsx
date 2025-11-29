import Link from 'next/link';

// 1. YOUR API URL
const FEED_URL = 'https://feeds.behold.so/T8XHno438OXE4L8xop9e';

// 2. YOUR INSTAGRAM HANDLE
const INSTAGRAM_HANDLE = 'team_riseforhope';

interface InstaPost {
    id: string;
    mediaUrl: string;
    permalink: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

async function getInstaFeed(): Promise<InstaPost[]> {
    try {
        const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error('Failed to fetch posts');

        const data = await res.json();
        const posts = data.posts || [];

        return posts.slice(0, 4);
    } catch (error) {
        console.error('Instagram Error:', error);
        return [];
    }
}

export default async function Social() {
    const posts = await getInstaFeed();
    const profileUrl = `https://instagram.com/${INSTAGRAM_HANDLE}`;

    return (
        <section className="social-section">
            {/* ADDED THIS WRAPPER TO FIX ALIGNMENT */}
            <div className="max-w-container">

                <div className="section-label">Stay Social</div>

                <div className="insta-header">
                    <div className="insta-avatar"></div>
                    <div className="insta-meta">
                        <Link href={profileUrl} target="_blank" className="insta-user">
                            {INSTAGRAM_HANDLE}
                        </Link>
                        <span className="insta-bio">Welcome to the official account for {INSTAGRAM_HANDLE}.</span>
                    </div>
                </div>

                <div className="insta-grid">
                    {posts.map((post) => (
                        <Link href={post.permalink} key={post.id} className="insta-item" target="_blank">
                            <div
                                className="insta-image-container"
                                style={{ backgroundImage: `url('${post.mediaUrl}')` }}
                            >
                                <div className="insta-overlay">
                                    {post.mediaType === 'VIDEO' && <span className="play-icon"></span>}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}