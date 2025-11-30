import { getPostBySlug, getAllPosts } from '../../lib/blog';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import BlogContent from '../../components/BlogContent'; // Import the new client component

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return <div>Post not found</div>;

    return (
        <main>
            <Header />

            <article className="max-w-container" style={{ padding: '150px 20px 80px', maxWidth: '800px' }}>

                {/* FIXED: Wrapper div for uniform spacing */}
                <div style={{ marginBottom: '40px' }}>
                    <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="mission-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>{post.title}</h1>
                <span className="item-date" style={{ fontSize: '1rem', color: '#888' }}>{post.date}</span>

                {post.image && (
                    <div
                        style={{
                            width: '100%', height: '400px',
                            backgroundImage: `url('${post.image}')`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            margin: '40px 0'
                        }}
                    />
                )}

                {/* Content moved to Client Component */}
                <BlogContent content={post.content} />

            </article>

            <Footer />
        </main>
    );
}