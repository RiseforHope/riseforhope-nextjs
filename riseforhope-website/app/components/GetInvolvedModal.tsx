'use client';

import { useState, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
}

export default function GetInvolvedModal({ isOpen, onClose, topic }: ModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // SCROLL LOCK EFFECT
    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
            // Reset form state
            setIsSent(false);
            setIsSubmitting(false);
        } else {
            // Re-enable scrolling
            document.body.style.overflow = '';
        }

        // Cleanup: Ensure scrolling is re-enabled if component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
        }, 1500);
    };

    // ... (Rest of the render functions remain identical)
    let modalTitle = 'Let\'s Connect';
    if (topic.includes('family')) modalTitle = 'Support Form';
    if (topic.includes('volunteering')) modalTitle = 'Join the Team';
    if (topic.includes('partnering')) modalTitle = 'Partner With Us';

    const renderSpecificFields = () => {
        if (topic.includes('family')) {
            return (
                <>
                    <div style={{ margin: '20px 0', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#888', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient Information</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                            <div><label className="form-label">Child's Name</label><input type="text" className="form-input" placeholder="Patient Name" required /></div>
                            <div><label className="form-label">Child's Age</label><input type="text" className="form-input" placeholder="Age" required /></div>
                        </div>
                        <label className="form-label">Treatment Center / Hospital</label><input type="text" className="form-input" placeholder="Where is the child receiving care?" required />
                        <label className="form-label">Social Worker / Care Team Contact</label><input type="text" className="form-input" placeholder="Name (Optional)" />
                    </div>
                    <div style={{ margin: '20px 0', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#888', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Statement of Need</h4>
                        <label className="form-label">How can we help?</label>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px', fontFamily: 'var(--font-sans)' }}>Please briefly describe the specific financial or material support you are seeking.</p>
                        <textarea className="form-textarea" rows={4} placeholder="Describe your need..." required></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <input type="checkbox" required style={{ marginTop: '4px' }} />
                        <p style={{ fontSize: '0.8rem', color: '#555', fontFamily: 'var(--font-sans)' }}>I certify that the information provided is true and accurate. I understand that Rise for Hope may contact the medical facility to verify the diagnosis.</p>
                    </div>
                </>
            );
        }
        if (topic.includes('volunteering')) {
            return (
                <>
                    <label className="form-label">Interested Role</label>
                    <div className="select-wrapper"><select className="form-input"><option>General Support</option><option>Event Staff</option><option>Hospital Visits</option><option>Professional Skills (Legal/Admin)</option></select></div>
                    <label className="form-label">Availability</label><input type="text" className="form-input" placeholder="e.g. Weekends, Evenings" />
                    <label className="form-label">Why do you want to volunteer?</label><textarea className="form-textarea" rows={3} required></textarea>
                </>
            );
        }
        if (topic.includes('partnering')) {
            return (
                <>
                    <label className="form-label">Organization / Company Name</label><input type="text" className="form-input" placeholder="Your Organization" required />
                    <label className="form-label">Partnership Type</label>
                    <div className="select-wrapper"><select className="form-input"><option>Corporate Sponsorship</option><option>Event Hosting</option><option>Service Donation</option><option>Other</option></select></div>
                    <label className="form-label">Message</label><textarea className="form-textarea" rows={3} placeholder="Tell us about your idea..." required></textarea>
                </>
            );
        }
        return null;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ fontFamily: 'var(--font-sans)' }}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                {!isSent ? (
                    <>
                        <h2 className="mission-title" style={{ fontSize: '2rem', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>{modalTitle}</h2>
                        <p className="mission-text" style={{ fontSize: '1rem', marginBottom: '30px', fontFamily: 'var(--font-sans)' }}>Please fill out the details below.</p>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Full Name</label><input type="text" className="form-input" placeholder="Your Name" required />
                            <label className="form-label">Email Address</label><input type="email" className="form-input" placeholder="email@example.com" required />
                            <label className="form-label">Phone Number</label><input type="tel" className="form-input" placeholder="(555) 123-4567" required />
                            {renderSpecificFields()}
                            <button type="submit" className="btn-donate" style={{ width: '100%', fontSize: '1rem' }} disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit Request'}</button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✨</div>
                        <h3 className="mission-title" style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>Request Received</h3>
                        <p className="mission-text" style={{ fontFamily: 'var(--font-sans)' }}>Thank you. We will review your information and get in touch shortly.</p>
                        <button onClick={onClose} className="btn-donate" style={{ marginTop: '20px' }}>Close</button>
                    </div>
                )}
            </div>
            <style jsx>{` .form-label { display: block; margin-bottom: 8px; font-size: 0.9rem; font-weight: bold; font-family: var(--font-sans); } `}</style>
        </div>
    );
}