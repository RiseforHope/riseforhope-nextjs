'use client';

import Link from 'next/link';
import { useState } from 'react';
import GetInvolvedModal from './GetInvolvedModal';

export default function Pathways() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');

    const cards = [
        { text: 'A family needing support?', type: 'modal' },
        { text: 'Ready to help a family?', type: 'link', href: '/donate' },
        { text: 'Thinking of volunteering?', type: 'modal' },
        { text: 'Interested in partnering?', type: 'modal' }
    ];

    const handleCardClick = (card: { text: string, type: string, href?: string }) => {
        if (card.type === 'modal') {
            setSelectedTopic(card.text);
            setModalOpen(true);
        }
    };

    return (
        <>
            <section id="get-involved" className="pathways-section">
                {/* NEW: Content Wrapper */}
                <div className="max-w-container">

                    <div className="section-label">Get Involved</div>
                    <h2 className="pathways-heading">How can we help you?</h2>

                    <div className="pathways-grid">
                        {cards.map((card, i) => {
                            const CardContent = (
                                <>
                                    <span className="card-text">{card.text}</span>
                                    <span className="card-arrow"></span>
                                </>
                            );

                            if (card.type === 'link' && card.href) {
                                return (
                                    <Link key={i} href={card.href} className="pathway-card">
                                        {CardContent}
                                    </Link>
                                );
                            } else {
                                return (
                                    <div
                                        key={i}
                                        className="pathway-card"
                                        onClick={() => handleCardClick(card)}
                                    >
                                        {CardContent}
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="pathways-links">
                        <Link href="/donors" className="text-link">
                            Information for donors <span className="text-link-arrow"></span>
                        </Link>
                    </div>

                </div>
            </section>

            <GetInvolvedModal
                isOpen={isModalOpen}
                topic={selectedTopic}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}