import Link from 'next/link';
import { getAllPosts } from '../lib/blog';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px' }}>

                {/* ADDED: Back to Home Link with Uniform Spacing */}
                <div style={{ marginBottom: '40px' }}>
                    <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                        ← Back to Home
                    </Link>
                </div>

                <div className="section-label">Our Journal</div>
                <h1 className="pathways-heading">Latest Stories</h1>

                <div className="news-events-section" style={{ padding: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {posts.map((post) => (
                        <div key={post.slug} className="news-column">
                            {/* Image */}
                            {post.image && (
                                <div
                                    className="featured-image-container"
                                    style={{ backgroundImage: `url('${post.image}')`, height: '250px' }}
                                >
                                    <div className="notch-up"></div>
                                </div>
                            )}

                            {/* Text Info */}
                            <div className="news-list-item" style={{ border: 'none' }}>
                                <span className="item-date">{post.date}</span>
                                <br/>
                                <Link href={`/blog/${post.slug}`} className="item-headline" style={{ fontSize: '1.8rem' }}>
                                    {post.title}
                                </Link>
                                <p className="item-excerpt">{post.excerpt}</p>

                                <Link href={`/blog/${post.slug}`} className="btn-yellow" style={{ marginTop: '20px' }}>
                                    Read Article <span className="btn-yellow-arrow"></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}