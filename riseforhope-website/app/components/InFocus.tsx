'use client';
import Link from 'next/link';

export default function InFocus() {
    const stories = [
        {
            id: 1,
            title: 'A Quiet Goodbye',
            excerpt: 'When we laid my precious little Norah’s body to rest, family and friends gathered from across the country and the world to celebrate a life that, though far too short, was lived with love, true empathy, and selfless service to others.',
            // UPDATED: Replaced broken link with a working image
            image: 'https://res.cloudinary.com/dvexnl19a/image/upload/v1764366529/Image_1_je102o.jpg',
            link: 'infocus/a-quiet-goodbye',
            buttonText: 'READ THE STORY',
            reversed: false // Image Left, Content Right
        },
        {
            id: 2,
            title: 'A Legacy of Love',
            excerpt: 'Norah Celeste passed away on February 28, 2025, leaving behind a legacy defined by faith, kindness, and quiet strength. Born on Valentine’s Day in San Francisco de Macorís, she lived her life with purpose, devoted to her family, faith, and service.',
            image: 'https://res.cloudinary.com/dvexnl19a/image/upload/v1764050764/IMG_0979_kddbxw.jpg',
            link: '/infocus/norahs-story',
            buttonText: 'READ THE STORY',
            reversed: true // Content Left, Image Right
        }
    ];

    return (
        <section id="in-focus" className="infocus-section">
            <div className="max-w-container">
                <div className="section-label">In Focus</div>

                {stories.map((story) => (
                    <div key={story.id} className={`infocus-row ${story.reversed ? 'reversed' : ''}`}>

                        {/* Image Div */}
                        <div
                            className="infocus-image"
                            style={{ backgroundImage: `url('${story.image}')` }}
                        ></div>

                        {/* Content Div */}
                        <div className="infocus-content">
                            <h3 className="infocus-title">{story.title}</h3>
                            <p className="infocus-desc">{story.excerpt}</p>

                            <Link href={story.link} className="btn-yellow">
                                {story.buttonText} <span className="btn-yellow-arrow"></span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}