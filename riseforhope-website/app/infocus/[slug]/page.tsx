import { getInFocusBySlug, getAllInFocus } from '../../lib/infocus';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import InFocusContent from '../../components/InFocusContent'; 

export async function generateStaticParams() {
    const posts = getAllInFocus();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function InFocusPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getInFocusBySlug(slug);

    if (!post) return <div>Post not found</div>;

    return (
        <main>
            <Header />
            <article className="max-w-container" style={{ padding: '150px 20px 80px', maxWidth: '800px' }}>
                <Link href="/#infocus" className="item-date" style={{ marginBottom: '20px', display: 'inline-block' }}>
                    ← Back to Home
                </Link>
                <h1 className="mission-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>{post.title}</h1>
                <figure style={{ margin: '40px 0' }}>
                    <div
                        style={{
                            width: '100%', height: '400px',
                            backgroundImage: `url('${post.image}')`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            borderRadius: '20px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    />
                    {post.imageCaption && (
                        <figcaption style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', marginTop: '10px', fontStyle: 'italic', fontFamily: 'var(--font-sans)' }}>
                            {post.imageCaption}
                        </figcaption>
                    )}
                </figure>
                <InFocusContent content={post.content} />
            </article>
            <Footer />
        </main>
    );
}
