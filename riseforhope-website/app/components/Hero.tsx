'use client';

export default function Hero() {
    const handleScroll = () => {
        const missionSection = document.getElementById('mission');
        if (missionSection) {
            missionSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero-section" className="rise-hero">

            {/* BACKGROUND IMAGE LAYER */}
            <div
                className="hero-bg-layer"
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dvexnl19a/image/upload/v1764050764/IMG_0979_kddbxw.jpg')",
                    backgroundSize: 'cover',

                    /* UPDATED POSITION:
                       50% = Horizontal Center
                       25% = Vertical point (Top third).
                       Adjust the 25% number up or down to hit the nose exactly.
                       0% is the very top edge, 100% is the very bottom edge.
                    */
                    backgroundPosition: '50% 0%',

                    position: 'absolute',
                    height: '100%',
                    zIndex: 0
                }}
            ></div>

            <div className="hero-content">
                <button
                    className="scroll-btn"
                    onClick={handleScroll}
                    aria-label="Scroll down"
                >
                    <span className="scroll-arrow"></span>
                    <span className="scroll-text">Scroll</span>
                </button>
            </div>
        </section>
    );
}